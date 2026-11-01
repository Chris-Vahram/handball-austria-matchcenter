import { datasetSchema, type Dataset, type Report } from "../domain/schema";
import { assignRounds } from "../lib/rounds";
import { COMPETITIONS, STAT_KINDS, sourceUrls, type CompetitionId, type StatKind } from "./config";
import { STAT_VALUE_HEADER, parseGroupStats, parseReport, parseSchedule, parseStandings, parseStats, parseVenue } from "./parse";

/**
 * nuLiga statistics name a player's Verein ("SK-Handball Traun"), the table names the
 * team ("SK Konstant Traun / Edelweiss"). Resolve the team from the match reports:
 * the player's own lineup first, else the team most players of that Verein played for.
 */
export function teamResolver(reports: Report[]) {
  const teamsOf = new Map<string, Set<string>>();
  for (const r of reports) for (const t of [r.home, r.away]) for (const p of t.players) {
    teamsOf.set(p.name, (teamsOf.get(p.name) ?? new Set()).add(t.name));
  }
  // Same name in two teams = ambiguous; those players resolve via their Verein instead.
  const byPlayer = new Map([...teamsOf].filter(([, s]) => s.size === 1).map(([n, s]) => [n, [...s][0]]));
  return (row: { name: string; club: string }, rows?: { name: string; club: string }[]) => {
    const direct = byPlayer.get(row.name);
    if (direct) return direct;
    const votes = new Map<string, number>();
    for (const other of rows ?? []) {
      const team = other.club === row.club ? byPlayer.get(other.name) : undefined;
      if (team) votes.set(team, (votes.get(team) ?? 0) + 1);
    }
    return [...votes].sort((a, b) => b[1] - a[1])[0]?.[0] ?? row.club;
  };
}

/** Fetches and normalizes one competition. Throws instead of returning invalid data. */
export async function importCompetition(id: CompetitionId, get: (url: string) => Promise<string>, now = new Date()): Promise<Dataset> {
  const urls = [sourceUrls.groupPage(id), sourceUrls.schedule(id)];
  const standings = parseStandings(await get(urls[0]));
  const matches = assignRounds(parseSchedule(await get(urls[1])), standings.length);

  const reports: Dataset["reports"] = {};
  for (const m of matches) {
    if (!m.reportId) continue;
    const url = sourceUrls.report(id, m.reportId);
    urls.push(url);
    reports[m.reportId] = parseReport(await get(url), m.reportId);
  }

  const stats: Dataset["stats"] = {};
  if (COMPETITIONS[id].category === "adult") {
    const teamOf = teamResolver(Object.values(reports));
    for (const kind of Object.keys(STAT_KINDS) as StatKind[]) {
      const url = sourceUrls.stats(id, kind);
      urls.push(url);
      const rows = parseStats(await get(url), STAT_VALUE_HEADER[kind]);
      stats[kind] = rows.map((row) => ({ ...row, team: teamOf(row, rows) }));
    }
  } else {
    // ADR-005: youth competitions carry no player-level data.
    for (const r of Object.values(reports)) { r.home.players = []; r.away.players = []; }
  }

  const groupStatsUrl = sourceUrls.groupStats(id);
  urls.push(groupStatsUrl);
  const groupStats = parseGroupStats(await get(groupStatsUrl));

  const venues: Dataset["venues"] = {};
  for (const venueId of [...new Set(matches.map((m) => m.venueId).filter((v): v is string => v !== null))].sort()) {
    const url = sourceUrls.venue(id, venueId);
    urls.push(url);
    venues[venueId] = parseVenue(await get(url), venueId);
  }

  return datasetSchema.parse({ competitionId: id, source: { urls, importedAt: now.toISOString() }, standings, matches, reports, stats, groupStats, venues });
}
