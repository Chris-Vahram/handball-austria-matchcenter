import { COMPETITIONS, COMPETITION_IDS, getDataset, type CompetitionId } from "../data";
import type { Dataset, Match, Venue } from "../domain/schema";
import type { HomeCompetition, HomeTeam } from "./favorites";
import { nextMatch, teamMatches } from "./teams";

export type VenueRef = { id: string; name: string; address: string[]; resin: string | null } | null;

export { teamKey } from "./favorites";
import { teamKey } from "./favorites";

export function venueOf(data: Dataset, m: Match): VenueRef {
  const v: Venue | undefined = m.venueId ? data.venues[m.venueId] : undefined;
  return v ? { id: v.id, name: v.name, address: v.address, resin: v.resin } : m.venue ? { id: "", name: m.venue, address: [], resin: null } : null;
}

export function mapsUrl(address: string[], name: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent([name, ...address].join(", "))}`;
}

/** Per team: next match and last result; per competition: standings. The client picks the favorites (`myLists`). */
export function homeData(today?: string): { teams: HomeTeam[]; competitions: HomeCompetition[] } {
  const teams: HomeTeam[] = [];
  const competitions: HomeCompetition[] = [];
  for (const competitionId of COMPETITION_IDS) {
    const data = getDataset(competitionId);
    if (!data) continue;
    const competition = COMPETITIONS[competitionId].name;
    competitions.push({ id: competitionId, name: competition, standings: data.standings.map((s) => ({ key: teamKey(competitionId, s.team), team: s.team, rank: s.rank, points: s.points })) });
    for (const s of data.standings) {
      const next = nextMatch(data, s.team, today);
      const last = [...teamMatches(data, s.team)].reverse().find((m) => m.score);
      const atHome = (m: Match) => m.home === s.team;
      teams.push({
        key: teamKey(competitionId, s.team),
        team: s.team,
        competitionId,
        competition,
        next: next ? { date: next.date, time: next.time, home: next.home, away: next.away, href: `/${competitionId}/vorschau/${next.number}` } : null,
        last: last?.score ? (() => {
          const own = atHome(last) ? last.score.home : last.score.away;
          const other = atHome(last) ? last.score.away : last.score.home;
          return { opponent: atHome(last) ? last.away : last.home, home: atHome(last), own, other, result: own > other ? "S" : own < other ? "N" : "U", href: last.reportId ? `/${competitionId}/spiel/${last.reportId}` : null };
        })() : null
      });
    }
  }
  return { teams, competitions };
}

/** Resin text as published, split into the rule and an optional note ("Besonderes Haftmittel: …"). */
export function resinRule(resin: string | null): { rule: string; note: string | null } | null {
  if (!resin) return null;
  const i = resin.indexOf("Besonderes Haftmittel:");
  return i < 0 ? { rule: resin, note: null } : { rule: resin.slice(0, i).trim(), note: resin.slice(i).replace("Besonderes Haftmittel:", "").trim() };
}

/** All venues of all competitions, with the matches played there. */
export function allVenues() {
  const venues = new Map<string, { venue: Venue; matches: { competitionId: CompetitionId; match: Match }[] }>();
  for (const competitionId of COMPETITION_IDS) {
    const data = getDataset(competitionId);
    if (!data) continue;
    for (const m of data.matches) {
      if (!m.venueId || !data.venues[m.venueId]) continue;
      const entry = venues.get(m.venueId) ?? { venue: data.venues[m.venueId], matches: [] };
      entry.matches.push({ competitionId, match: m });
      venues.set(m.venueId, entry);
    }
  }
  return venues;
}
