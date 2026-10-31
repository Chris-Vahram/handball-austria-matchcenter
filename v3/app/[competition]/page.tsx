import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@ui/shell";
import { Schedule } from "@ui/schedule";
import { Standings } from "@ui/standings";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { currentRound, roundsOf } from "@/lib/rounds";

type Props = { params: Promise<{ competition: string }>; searchParams: Promise<{ runde?: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.map((competition) => ({ competition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition } = await params;
  return isCompetitionId(competition) ? { title: `${COMPETITIONS[competition].name} – Tabelle & Spielplan` } : {};
}

export default async function LigaPage({ params, searchParams }: Props) {
  const { competition } = await params;
  if (!isCompetitionId(competition)) notFound();
  const c = COMPETITIONS[competition];
  const data = getDataset(competition);
  const { runde } = await searchParams;
  const rounds = data ? roundsOf(data.matches) : [];
  const requested = Number(runde);
  const round = rounds.includes(requested) ? requested : data ? currentRound(data.matches) : 1;

  return (
    <>
      <Header id={competition} importedAt={data?.source.importedAt ?? null} tab="liga" />
      <main className="page liga">
        {!data ? (
          <section className="panel"><p className="empty">Für {c.fullName} wurden noch keine Daten importiert.</p></section>
        ) : (
          <>
            <section className="panel" id="tabelle" aria-labelledby="h-tabelle">
              <h2 className="section-title sr-only" id="h-tabelle">Tabelle</h2>
              <Standings rows={data.standings} showcase={c.showcaseTeam} matches={data.matches} />
              <p className="legend">Tabelle nach Punktestand, wie auf nuLiga. Nach Saisonende entscheidet der direkte Vergleich.</p>
            </section>
            <section className="panel" id="spielplan" aria-labelledby="h-spielplan">
              <h2 className="section-title" id="h-spielplan">Spielplan</h2>
              <Schedule id={competition} matches={data.matches} round={round} showcase={c.showcaseTeam} />
            </section>
          </>
        )}
      </main>
      <Footer id={competition} importedAt={data?.source.importedAt ?? null} />
    </>
  );
}
