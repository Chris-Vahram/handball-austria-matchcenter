import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RememberButton } from "@ui/client/my-teams";
import { FixtureRow, PendingNote } from "@ui/schedule";
import { Footer, SubHeader } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { mapsUrl, resinRule, teamKey, venueOf } from "@/lib/dashboard";
import { lastFive } from "@/lib/form";
import { displayName, formatDay, formatDiff } from "@/lib/format";
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
  const nextVenue = next ? venueOf(data, next) : null;
  const resin = resinRule(nextVenue && nextVenue.id ? data.venues[nextVenue.id]?.resin ?? null : null);
  const matches = teamMatches(data, team);
  const played = matches.filter((m) => m.score).reverse();
  // The next match is the dark card; the list continues after it.
  const later = matches.filter((m) => !m.score && m.number !== next?.number);
  const stats = data.groupStats?.teams.find((t) => t.name === team) ?? null;
  const players = c.category === "adult" ? teamPlayers(data, team) : [];
  const per = (n: number) => (stats && stats.games ? (n / stats.games).toFixed(1).replace(".", ",") : "–");
  const result = (own: number, other: number) => (own > other ? "S" : own < other ? "N" : "U");

  return (
    <>
      <SubHeader id={x.competition} importedAt={data.source.importedAt} crumb="Team" />
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
          <div className="team-actions">
            <RememberButton teamKey={teamKey(x.competition, team)} team={team} />
            <a className="btn" href={`/${x.competition}/team/${slug}/kalender.ics`} download={`${slug}.ics`}>Spiele in Kalender</a>
          </div>
        </section>

        {next && (
          <section className="next-card big" aria-labelledby="h-next">
            <h2 className="nc-when" id="h-next">Nächstes Spiel · {formatDay(next.date)}{next.time && `, ${next.time}`}</h2>
            <p className="nc-vs">{next.home === team ? "Heim gegen" : "Auswärts bei"} <strong>{next.home === team ? next.away : next.home}</strong></p>
            {nextVenue && (
              <p className="nc-venue">
                {nextVenue.id ? <Link href={`/halle/${nextVenue.id}`}>{nextVenue.name}</Link> : nextVenue.name}
                {nextVenue.address.length > 0 && <><br />{nextVenue.address.join(", ")}</>}
              </p>
            )}
            <p className="nc-meta">
              {nextVenue && nextVenue.address.length > 0 && <a className="nc-route" href={mapsUrl(nextVenue.address, nextVenue.name)} target="_blank" rel="noopener noreferrer">Route planen</a>}
              <span>Runde {next.round}{resin && <> · Harz {resin.rule}</>}</span>
            </p>
          </section>
        )}

        <div className="team-cols">
          <div className="col">
            <section className="panel" aria-labelledby="h-results">
              <h2 className="section-title" id="h-results">Ergebnisse <small>{played.length} Spiele</small></h2>
              {played.length === 0 && <p className="empty">Noch keine Spiele gespielt.</p>}
              {played.map((m) => {
                const own = m.home === team ? m.score!.home : m.score!.away;
                const other = m.home === team ? m.score!.away : m.score!.home;
                const r = result(own, other);
                return (
                  <div key={m.number} className="result-row">
                    <span className={`chip f-${r}`} title={RESULT[r]}><span aria-hidden="true">{r}</span><span className="sr-only">{RESULT[r]}</span></span>
                    <FixtureRow id={x.competition} m={m} data={data} team={team} />
                  </div>
                );
              })}
              <PendingNote matches={played} />
            </section>
            <section className="panel" aria-labelledby="h-upcoming">
              <h2 className="section-title" id="h-upcoming">Danach <small>{later.length} weitere Spiele</small></h2>
              {later.length === 0 && <p className="empty">Keine weiteren Spiele in dieser Phase.</p>}
              {later.slice(0, 3).map((m) => <FixtureRow key={m.number} id={x.competition} m={m} data={data} team={team} />)}
              {later.length > 3 && (
                <details className="more-games">
                  <summary>Alle {later.length} Spiele anzeigen</summary>
                  {later.slice(3).map((m) => <FixtureRow key={m.number} id={x.competition} m={m} data={data} team={team} />)}
                </details>
              )}
            </section>
          </div>

          <div className="col">
            {stats && (
              <section className="panel" aria-labelledby="h-tstats">
                <h2 className="section-title" id="h-tstats">Teamstatistik</h2>
                <dl className="totals tstats">
                  <div><dt>Tore/Sp.</dt><dd>{per(stats.goals)}</dd></div>
                  <div><dt><abbr title="7-Meter Tore/Versuche">7m</abbr></dt><dd>{stats.sevenMGoals}/{stats.sevenMAttempts}</dd></div>
                  <div><dt><abbr title="Zeitstrafen pro Spiel">2′/Sp.</abbr></dt><dd>{per(stats.twoMin)}</dd></div>
                  <div><dt><abbr title="Gelbe Karten">G</abbr></dt><dd>{stats.yellow}</dd></div>
                  <div><dt><abbr title="Rote Karten / Disqualifikationen">R</abbr></dt><dd>{stats.red}</dd></div>
                  {stats.spectators !== null && <div><dt>Zuschauer/Sp.</dt><dd>{per(stats.spectators).replace(/,\d$/, "")}</dd></div>}
                </dl>
                <p className="legend">nuLiga-Mannschaftsstatistik, {stats.games} von {stats.scheduled} Spielen. Karten inkl. Mannschaftsoffizielle, daher kann die Summe über der Spielerliste liegen.</p>
              </section>
            )}

            {players.length > 0 && (
              <section className="panel" aria-labelledby="h-players" id="h-players-section">
                <h2 className="section-title" id="h-players">Spieler</h2>
                <table className="roster squad">
                  <caption className="sr-only">Spielerstatistik {team}</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="nm">Spieler</th>
                      <th scope="col">Tore</th>
                      <th scope="col"><abbr title="7-Meter Tore/Versuche">7m</abbr></th>
                      <th scope="col"><abbr title="Zeitstrafen (2 Minuten)">2′</abbr></th>
                      <th scope="col"><abbr title="Gelbe Karten">G</abbr></th>
                      <th scope="col"><abbr title="Rote Karten / Disqualifikationen">R</abbr></th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p) => (
                      <tr key={p.name}>
                        <th scope="row" className="nm">{displayName(p.name)}</th>
                        <td className="g">{p.goals || ""}</td>
                        <td>{p.sevenMAttempts ? `${p.sevenMGoals}/${p.sevenMAttempts}` : ""}</td>
                        <td>{p.twoMin || ""}</td>
                        <td>{p.yellow || ""}</td>
                        <td>{p.red || ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="legend">7m = Tore/Versuche · 2′ = Zeitstrafen · G = Gelbe Karte · R = Rote Karte / Disqualifikation. Aus den nuLiga-Ranglisten; wer in keiner Liste steht, fehlt.</p>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer id={x.competition} importedAt={data.source.importedAt} />
    </>
  );
}
