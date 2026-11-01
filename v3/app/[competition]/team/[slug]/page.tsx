import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MatchRow } from "@ui/schedule";
import { Footer, Header } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { lastFive } from "@/lib/form";
import { formatDay, formatDiff } from "@/lib/format";
import { homeAway, nextMatch, teamBySlug, teamMatches, teamPlayers, teamSlug } from "@/lib/teams";

type Props = { params: Promise<{ competition: string; slug: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.flatMap((competition) =>
    (getDataset(competition)?.standings ?? []).map((s) => ({ competition, slug: teamSlug(s.team) })));
}

function load(competition: string, slug: string) {
  if (!isCompetitionId(competition)) return null;
  const data = getDataset(competition);
  const row = data ? teamBySlug(data, slug) : null;
  return data && row ? { competition, data, row } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition, slug } = await params;
  const x = load(competition, slug);
  return x ? { title: `${x.row.team} – ${COMPETITIONS[x.competition].name}` } : {};
}

const RESULT = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;

export default async function TeamPage({ params }: Props) {
  const { competition, slug } = await params;
  const x = load(competition, slug);
  if (!x) notFound();
  const { data, row } = x;
  const c = COMPETITIONS[x.competition];
  const team = row.team;
  const form = lastFive(data.matches, team);
  const { home, away } = homeAway(data, team);
  const next = nextMatch(data, team);
  const matches = teamMatches(data, team);
  const stats = data.groupStats?.teams.find((t) => t.name === team) ?? null;
  const players = c.category === "adult" ? teamPlayers(data, team) : [];
  const per = (n: number) => (stats && stats.games ? (n / stats.games).toFixed(1).replace(".", ",") : "–");

  return (
    <>
      <Header id={x.competition} importedAt={data.source.importedAt} tab="spiel" subpage />
      <main className="page team">
        <section className="panel team-head" aria-labelledby="h-team">
          <h1 id="h-team" className={team === c.showcaseTeam ? "me" : undefined}>{team}</h1>
          <p className="team-line">
            <strong>{row.rank}. Platz</strong> · {row.points} Punkte · {row.won}-{row.drawn}-{row.lost} · {row.goalsFor}:{row.goalsAgainst} ({formatDiff(row.goalDiff)})
          </p>
          <dl className="team-facts">
            <div><dt>Form</dt><dd className="form-chips">
              <span className="sr-only">{form.map((f) => RESULT[f]).join(", ") || "noch keine Spiele"}</span>
              <span aria-hidden="true">{form.map((f, i) => <i key={i} className={`f-${f}`}>{f}</i>)}</span>
            </dd></div>
            <div><dt>Heim</dt><dd>{home.won}-{home.drawn}-{home.lost}</dd></div>
            <div><dt>Auswärts</dt><dd>{away.won}-{away.drawn}-{away.lost}</dd></div>
          </dl>
        </section>

        {next && (
          <section className="panel next" aria-labelledby="h-next">
            <h2 className="section-title" id="h-next">Nächstes Spiel</h2>
            <p className="next-when">{formatDay(next.date)}{next.time && `, ${next.time}`}{next.venue && ` · ${next.venue}`}</p>
            <p className="next-vs">
              <span className={next.home === team ? "self" : undefined}>{next.home}</span>
              <span className="vs" aria-hidden="true">–</span>
              <span className="sr-only"> gegen </span>
              <span className={next.away === team ? "self" : undefined}>{next.away}</span>
            </p>
            <p className="next-meta">Spiel Nr. {next.number} · Runde {next.round} · {next.home === team ? "Heimspiel" : "Auswärtsspiel"}</p>
          </section>
        )}

        <div className="team-cols">
          <section className="panel" aria-labelledby="h-games">
            <h2 className="section-title" id="h-games">Spiele</h2>
            {matches.map((m) => <MatchRow key={m.number} id={x.competition} m={m} showcase="" showDate />)}
          </section>

          <div>
            {stats && (
              <section className="panel" aria-labelledby="h-tstats">
                <h2 className="section-title" id="h-tstats">Teamstatistik</h2>
                <dl className="totals tstats">
                  <div><dt>Tore/Spiel</dt><dd>{per(stats.goals)}</dd></div>
                  <div><dt><abbr title="7-Meter Tore/Versuche">7m</abbr></dt><dd>{stats.sevenMGoals}/{stats.sevenMAttempts}</dd></div>
                  <div><dt><abbr title="Zeitstrafen pro Spiel">2-Min/Sp.</abbr></dt><dd>{per(stats.twoMin)}</dd></div>
                  <div><dt>Gelb</dt><dd>{stats.yellow}</dd></div>
                  <div><dt>Rot</dt><dd>{stats.red}</dd></div>
                  {stats.spectators !== null && <div><dt>Zuschauer/Sp.</dt><dd>{per(stats.spectators).replace(/,\d$/, "")}</dd></div>}
                </dl>
                <p className="legend">nuLiga-Mannschaftsstatistik, {stats.games} von {stats.scheduled} Spielen. Karten inkl. Mannschaftsoffizielle, daher kann die Summe über der Spielerliste liegen.</p>
              </section>
            )}

            {players.length > 0 && (
              <section className="panel" aria-labelledby="h-players">
                <h2 className="section-title" id="h-players">Spieler</h2>
                <table className="roster squad">
                  <caption className="sr-only">Spielerstatistik {team}</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="nm">Spieler</th>
                      <th scope="col">Tore</th>
                      <th scope="col"><abbr title="7-Meter Tore/Versuche">7m</abbr></th>
                      <th scope="col"><abbr title="Zeitstrafen">2′</abbr></th>
                      <th scope="col"><abbr title="Gelbe Karten">G</abbr></th>
                      <th scope="col"><abbr title="Rote Karten">R</abbr></th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p) => (
                      <tr key={p.name}>
                        <th scope="row" className="nm">{p.name}</th>
                        <td className={p.goals ? "g" : "z"}>{p.goals || "–"}</td>
                        <td className={p.sevenMAttempts ? undefined : "z"}>{p.sevenMAttempts ? `${p.sevenMGoals}/${p.sevenMAttempts}` : "–"}</td>
                        <td className={p.twoMin ? undefined : "z"}>{p.twoMin || "–"}</td>
                        <td className={p.yellow ? undefined : "z"}>{p.yellow || "–"}</td>
                        <td className={p.red ? undefined : "z"}>{p.red || "–"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="legend">Aus den nuLiga-Ranglisten; Spieler ohne Eintrag in einer Liste fehlen.</p>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer id={x.competition} importedAt={data.source.importedAt} />
    </>
  );
}
