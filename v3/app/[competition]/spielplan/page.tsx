import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoundMatches, RoundPicker } from "@ui/schedule";
import { Footer, Header } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { currentRound, roundsOf } from "@/lib/rounds";

type Props = { params: Promise<{ competition: string }>; searchParams: Promise<{ runde?: string | string[] }> };

export function generateStaticParams() {
  return COMPETITION_IDS.map((competition) => ({ competition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition } = await params;
  return isCompetitionId(competition) ? { title: `${COMPETITIONS[competition].name} – Spielplan` } : {};
}

export default async function SchedulePage({ params, searchParams }: Props) {
  const { competition } = await params;
  if (!isCompetitionId(competition)) notFound();
  const c = COMPETITIONS[competition];
  const data = getDataset(competition);
  const raw = (await searchParams).runde;
  const requested = Number(Array.isArray(raw) ? raw[0] : raw);
  const rounds = data ? roundsOf(data.matches) : [];
  const round = rounds.includes(requested) ? requested : data ? currentRound(data.matches) : 1;

  return (
    <>
      <Header id={competition} importedAt={data?.source.importedAt ?? null} tab="spielplan" />
      <main className="page schedule-page">
        <section className="panel" id="spielplan" aria-labelledby="h-spielplan">
          <h2 className="sr-only" id="h-spielplan">Spielplan, {rounds.length} Runden</h2>
          {!data ? <p className="empty">Für {c.fullName} wurden noch keine Daten importiert.</p> : (
            <>
              <RoundPicker id={competition} data={data} round={round} />
              <div aria-live="polite"><RoundMatches id={competition} data={data} round={round} showcase={c.showcaseTeam} /></div>
            </>
          )}
        </section>
      </main>
      <Footer id={competition} importedAt={data?.source.importedAt ?? null} />
    </>
  );
}
