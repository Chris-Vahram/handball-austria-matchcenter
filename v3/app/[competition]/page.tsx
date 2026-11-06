import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chevron, RIGHT } from "@ui/chevron";
import { RoundMatches } from "@ui/schedule";
import { Footer, Header } from "@ui/shell";
import { Standings } from "@ui/standings";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { currentRound } from "@/lib/rounds";
import { teamSlug } from "@/lib/teams";

type Props = { params: Promise<{ competition: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.map((competition) => ({ competition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition } = await params;
  return isCompetitionId(competition) ? { title: `${COMPETITIONS[competition].name} – Tabelle` } : {};
}

export default async function LigaPage({ params }: Props) {
  const { competition } = await params;
  if (!isCompetitionId(competition)) notFound();
  const c = COMPETITIONS[competition];
  const data = getDataset(competition);
  const round = data ? currentRound(data.matches) : 1;

  return (
    <>
      <Header id={competition} importedAt={data?.source.importedAt ?? null} tab="tabelle" />
      <main className="page liga">
        {!data ? (
          <section className="panel"><p className="empty">Für {c.fullName} wurden noch keine Daten importiert.</p></section>
        ) : (
          <>
            <section className="panel" id="tabelle" aria-labelledby="h-tabelle">
              <h2 className="section-title sr-only" id="h-tabelle">Tabelle</h2>
              <Standings rows={data.standings} id={competition} matches={data.matches} teamHref={(team) => `/${competition}/team/${teamSlug(team)}`} />
              <p className="legend">Tabelle nach Punktestand, wie auf nuLiga. Nach Saisonende entscheidet der direkte Vergleich.<span className="form-hint"> Form: letzte 5 Spiele, neuestes rechts (S Sieg, U Unentschieden, N Niederlage).</span></p>
            </section>
            <section className="panel" aria-labelledby="h-runde">
              <h2 className="section-title" id="h-runde">Aktuelle Runde <small>Runde {round}</small></h2>
              <RoundMatches id={competition} data={data} round={round} />
              <Link className="more" href={`/${competition}/spielplan?runde=${round}`}>Ganzer Spielplan<Chevron d={RIGHT} size={16} /></Link>
            </section>
          </>
        )}
      </main>
      <Footer id={competition} importedAt={data?.source.importedAt ?? null} pdf />
    </>
  );
}
