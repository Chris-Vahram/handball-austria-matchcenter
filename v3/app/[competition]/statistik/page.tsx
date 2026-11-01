import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@ui/shell";
import { ThinData } from "@ui/thin-data";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import type { TeamStats } from "@/domain/schema";
import { teamSlug } from "@/lib/teams";

type Props = { params: Promise<{ competition: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.map((competition) => ({ competition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition } = await params;
  return isCompetitionId(competition) ? { title: `${COMPETITIONS[competition].name} – Statistik` } : {};
}

const dec = (n: number) => n.toFixed(1).replace(".", ",");
const per = (n: number, t: TeamStats) => (t.games ? dec(n / t.games) : "–");
const rate = (t: TeamStats) => (t.sevenMAttempts ? `${Math.round((100 * t.sevenMGoals) / t.sevenMAttempts)} %` : "–");

export default async function StatsOverview({ params }: Props) {
  const { competition } = await params;
  if (!isCompetitionId(competition)) notFound();
  const c = COMPETITIONS[competition];
  const data = getDataset(competition);
  const gs = data?.groupStats ?? null;
  const g = gs?.group;
  const rank = new Map(data?.standings.map((s) => [s.team, s.rank]) ?? []);
  const teams = [...(gs?.teams ?? [])].sort((a, b) => (rank.get(a.name) ?? 99) - (rank.get(b.name) ?? 99));

  return (
    <>
      <Header id={competition} importedAt={data?.source.importedAt ?? null} tab="statistik" />
      <main className="page stats-overview">
        {!g ? (
          <section className="panel"><p className="empty">Für {c.fullName} gibt es noch keine Statistik.</p></section>
        ) : (
          <>
            <section className="panel" aria-labelledby="h-group">
              <h2 className="section-title" id="h-group">Liga gesamt <small>{g.games} von {g.scheduled} Spielen</small></h2>
              <ThinData played={g.games} scheduled={g.scheduled} />
              <dl className="totals tstats">
                <div><dt>Tore/Spiel</dt><dd>{per(g.goals, g)}</dd></div>
                <div><dt>7m-Quote</dt><dd>{rate(g)}</dd></div>
                <div><dt><abbr title="Zeitstrafen pro Spiel">2-Min/Sp.</abbr></dt><dd>{per(g.twoMin, g)}</dd></div>
                <div><dt>Heimsiege</dt><dd>{g.homeWins}</dd></div>
                <div><dt>Auswärtssiege</dt><dd>{g.awayWins}</dd></div>
                <div><dt>Unentschieden</dt><dd>{g.draws}</dd></div>
                <div><dt>Gelb / Rot</dt><dd>{g.yellow} / {g.red}</dd></div>
                {g.spectators !== null && <div><dt>Zuschauer/Spiel</dt><dd>{per(g.spectators, g).replace(/,\d$/, "")}</dd></div>}
                <div><dt>Tore gesamt</dt><dd>{g.goals}</dd></div>
              </dl>
            </section>
            <section className="panel" aria-labelledby="h-compare">
              <h2 className="section-title" id="h-compare">Teamvergleich</h2>
              <table className="ranking compare">
                <caption className="sr-only">Teamvergleich pro Spiel</caption>
                <thead>
                  <tr>
                    <th scope="col" className="nm">Team</th>
                    <th scope="col" className="lead">Tore/Sp.</th>
                    <th scope="col"><abbr title="7-Meter-Trefferquote">7m-Quote</abbr></th>
                    <th scope="col"><abbr title="Zeitstrafen pro Spiel">2-Min/Sp.</abbr></th>
                    <th scope="col" className="last"><abbr title="Zuschauer pro Spiel">Zuschauer/Sp.</abbr></th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((t) => (
                    <tr key={t.name} className={t.name === c.showcaseTeam ? "me" : undefined}>
                      <th scope="row" className="nm"><Link href={`/${competition}/team/${teamSlug(t.name)}`}>{t.name}</Link><small>{t.games} Spiele</small></th>
                      <td className="lead">{per(t.goals, t)}</td>
                      <td>{rate(t)}</td>
                      <td>{per(t.twoMin, t)}</td>
                      <td className="last">{t.spectators !== null ? per(t.spectators, t).replace(/,\d$/, "") : "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="legend">Werte pro Spiel aus der nuLiga-Gruppen- und Mannschaftsstatistik. Zuschauer wie von den Vereinen gemeldet.</p>
            </section>
          </>
        )}
      </main>
      <Footer id={competition} importedAt={data?.source.importedAt ?? null} />
    </>
  );
}
