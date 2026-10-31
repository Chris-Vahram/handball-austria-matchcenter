import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chevron, LEFT } from "@ui/chevron";
import { PrintButton } from "@ui/print-button";
import { Standings } from "@ui/standings";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { formatShortDate, formatStand } from "@/lib/format";
import { roundsOf } from "@/lib/rounds";

type Props = { params: Promise<{ competition: string }> };

export function generateStaticParams() {
  return COMPETITION_IDS.map((competition) => ({ competition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition } = await params;
  return isCompetitionId(competition) ? { title: `${COMPETITIONS[competition].name} – Tabelle und Spielplan`, robots: { index: false } } : {};
}

export default async function PrintPage({ params }: Props) {
  const { competition } = await params;
  if (!isCompetitionId(competition)) notFound();
  const c = COMPETITIONS[competition];
  const data = getDataset(competition);
  if (!data) notFound();
  const stand = formatStand(data.source.importedAt);
  const byTime = [...data.matches].sort((a, b) => a.round - b.round || (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")) || a.number - b.number);

  return (
    <div className="print">
      <div className="print-actions">
        <Link href={`/${competition}`}><Chevron d={LEFT} size={16} />Zurück</Link>
        <PrintButton />
      </div>
      <header className="print-head">
        <h1>{c.fullName}</h1>
        <p>{c.phase} {c.season} · Tabelle und Spielplan · Stand {stand}</p>
      </header>
      <h2>Tabelle</h2>
      <Standings rows={data.standings} showcase={c.showcaseTeam} />
      <h2>Spielplan</h2>
      <table className="print-schedule">
        <thead>
          <tr><th scope="col">Rd.</th><th scope="col">Datum</th><th scope="col">Zeit</th><th scope="col">Nr.</th><th scope="col">Heim</th><th scope="col">Gast</th><th scope="col">Ergebnis</th></tr>
        </thead>
        {roundsOf(byTime).map((round) => (
          <tbody key={round}>
            {byTime.filter((m) => m.round === round).map((m, i) => (
              <tr key={m.number} className={m.home === c.showcaseTeam || m.away === c.showcaseTeam ? "me" : undefined}>
                <td>{i === 0 ? round : ""}</td>
                <td>{formatShortDate(m.date)}</td>
                <td>{m.time ?? ""}</td>
                <td>{m.number}</td>
                <td>{m.home}</td>
                <td>{m.away}</td>
                <td className="res">{m.score ? `${m.score.home}:${m.score.away}` : ""}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <footer className="print-foot">
        Quelle: nuLiga ({c.fullName}) · Stand {stand} · Unabhängiger Prototyp, kein Angebot von ÖHB oder nuLiga.
      </footer>
    </div>
  );
}
