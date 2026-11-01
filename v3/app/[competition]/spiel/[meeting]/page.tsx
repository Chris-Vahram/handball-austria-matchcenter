import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chevron, LEFT } from "@ui/chevron";
import { Footer, Header } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import type { ReportTeam } from "@/domain/schema";
import { formatDay } from "@/lib/format";

type Props = { params: Promise<{ competition: string; meeting: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.flatMap((competition) =>
    Object.keys(getDataset(competition)?.reports ?? {}).map((meeting) => ({ competition, meeting })));
}

function load(competition: string, meeting: string) {
  if (!isCompetitionId(competition)) return null;
  const data = getDataset(competition);
  const report = data?.reports[meeting];
  const match = data?.matches.find((m) => m.reportId === meeting);
  return data && report && match ? { competition, data, report, match } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition, meeting } = await params;
  const x = load(competition, meeting);
  return x ? { title: `${x.report.home.name} – ${x.report.away.name}` } : {};
}

const Card = ({ color, edge, label }: { color: string; edge: string; label: string }) => (
  <svg width="11" height="15" viewBox="0 0 11 15" role="img" aria-label={label}><rect x=".5" y=".5" width="10" height="14" rx="1.5" fill={color} stroke={edge} /></svg>
);

function Lineup({ team, side, showcase }: { team: ReportTeam; side: string; showcase: string }) {
  return (
    <section className="panel lineup" aria-labelledby={`h-${side}`}>
      <h2 className={`section-title${team.name === showcase ? " me" : ""}`} id={`h-${side}`}>
        {team.name}<span className="side">· {side}</span>
      </h2>
      <table className="roster">
        <caption className="sr-only">Aufstellung {team.name}</caption>
        <thead>
          <tr>
            <th scope="col" className="nr"><abbr title="Trikotnummer">#</abbr></th>
            <th scope="col" className="nm">Spieler</th>
            <th scope="col">Tore</th>
            <th scope="col"><abbr title="7-Meter Tore/Versuche">7m</abbr></th>
            <th scope="col"><abbr title="Gelbe Karte">G</abbr></th>
            <th scope="col"><abbr title="2-Minuten-Strafen">2′</abbr></th>
            <th scope="col"><abbr title="Disqualifikation">D</abbr></th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((p) => (
            <tr key={p.shirt + p.name}>
              <td className="nr">{p.shirt}</td>
              <th scope="row" className="nm">{p.name}</th>
              <td className={p.goals ? "g" : "z"}>{p.goals || "–"}</td>
              <td className={p.sevenMAttempts ? undefined : "z"}>{p.sevenMAttempts ? `${p.sevenMGoals}/${p.sevenMAttempts}` : "–"}</td>
              <td>{p.yellow ? <Card color="#f2c200" edge="#6b5600" label="Gelbe Karte" /> : ""}</td>
              <td>{p.twoMin || ""}</td>
              <td>{p.disqualified ? <Card color="#c8102e" edge="#7a0a1c" label="Disqualifikation" /> : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="totals">
        <div><dt><abbr title="7-Meter Tore/Versuche">7m</abbr></dt><dd>{team.totals.sevenMGoals}/{team.totals.sevenMAttempts}</dd></div>
        <div><dt><abbr title="2-Minuten-Strafen">2-Min</abbr></dt><dd>{team.totals.twoMin}</dd></div>
        <div><dt><abbr title="Gelbe Karten">Gelb</abbr></dt><dd>{team.totals.yellow}</dd></div>
        <div><dt><abbr title="Disqualifikationen">Disq.</abbr></dt><dd>{team.totals.disqualifications}</dd></div>
        <div><dt>Timeouts</dt><dd>{team.totals.timeouts}</dd></div>
      </dl>
    </section>
  );
}

export default async function ReportPage({ params }: Props) {
  const { competition, meeting } = await params;
  const x = load(competition, meeting);
  if (!x) notFound();
  const { data, report: r, match } = x;
  const showcase = COMPETITIONS[x.competition].showcaseTeam;
  const homeWin = r.score.home > r.score.away;
  const awayWin = r.score.away > r.score.home;

  return (
    <>
      <Header id={x.competition} importedAt={data.source.importedAt} tab="spiel" subpage />
      <main className="page report">
        <section className="panel scoreboard" aria-labelledby="h-match">
          <h1 className="sr-only" id="h-match">Spielbericht {r.home.name} gegen {r.away.name}, Spiel Nr. {r.number}</h1>
          <Link className="back" href={`/${x.competition}?runde=${match.round}#spielplan`}><Chevron d={LEFT} size={16} />Runde {match.round}</Link>
          <div className="teams">
            <p className={`${homeWin ? "win " : ""}${r.home.name === showcase ? "me" : ""}`}>{r.home.name}</p>
            <p className="score" aria-label={`Endstand ${r.score.home} zu ${r.score.away}`}>
              {r.score.home}<span>:</span>{r.score.away}
              {r.halftime && <small>Halbzeit {r.halftime.home}:{r.halftime.away}</small>}
            </p>
            <p className={`${awayWin ? "win " : ""}${r.away.name === showcase ? "me" : ""}`}>{r.away.name}</p>
          </div>
          <p className="facts">
            Spiel Nr. {r.number} · {formatDay(r.date)}{r.time && `, ${r.time}`}{r.venue && ` · ${r.venue}`}
          </p>
          <p className={`status${r.approved ? "" : " pending"}`}>
            {r.approved ? "Spielbericht genehmigt" : "Spielbericht noch nicht genehmigt"}
          </p>
        </section>
        <div className="lineups">
          <Lineup team={r.home} side="Heim" showcase={showcase} />
          <Lineup team={r.away} side="Gast" showcase={showcase} />
        </div>
      </main>
      <Footer id={x.competition} importedAt={data.source.importedAt} />
    </>
  );
}
