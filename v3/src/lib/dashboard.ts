import { COMPETITIONS, COMPETITION_IDS, getDataset, type CompetitionId } from "../data";
import type { Dataset, Match, Venue } from "../domain/schema";
import { lastFive, type Result } from "./form";
import { teamMatches, teamSlug } from "./teams";

export type VenueRef = { id: string; name: string; address: string[]; resin: string | null } | null;

export type TeamCard = {
  key: string;
  competitionId: CompetitionId;
  competition: string;
  team: string;
  href: string;
  rank: number;
  points: number;
  record: string;
  form: Result[];
  next: { date: string; time: string | null; opponent: string; home: boolean; number: number; venue: VenueRef } | null;
  last: { date: string; opponent: string; home: boolean; own: number; other: number; result: Result; reportHref: string | null } | null;
};

export const teamKey = (competitionId: string, team: string) => `${competitionId}|${team}`;

export function venueOf(data: Dataset, m: Match): VenueRef {
  const v: Venue | undefined = m.venueId ? data.venues[m.venueId] : undefined;
  return v ? { id: v.id, name: v.name, address: v.address, resin: v.resin } : m.venue ? { id: "", name: m.venue, address: [], resin: null } : null;
}

export function mapsUrl(address: string[], name: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent([name, ...address].join(", "))}`;
}

/** Compact summary of every team, used by the home page (client picks the remembered ones). */
export function allTeamCards(): TeamCard[] {
  return COMPETITION_IDS.flatMap((competitionId) => {
    const data = getDataset(competitionId);
    if (!data) return [];
    return data.standings.map((s): TeamCard => {
      const matches = teamMatches(data, s.team);
      const next = matches.find((m) => m.status === "scheduled");
      const last = [...matches].reverse().find((m) => m.score);
      const side = (m: Match) => m.home === s.team;
      return {
        key: teamKey(competitionId, s.team),
        competitionId,
        competition: COMPETITIONS[competitionId].name,
        team: s.team,
        href: `/${competitionId}/team/${teamSlug(s.team)}`,
        rank: s.rank,
        points: s.points,
        record: `${s.won}-${s.drawn}-${s.lost}`,
        form: lastFive(data.matches, s.team),
        next: next ? { date: next.date, time: next.time, opponent: side(next) ? next.away : next.home, home: side(next), number: next.number, venue: venueOf(data, next) } : null,
        last: last && last.score ? (() => {
          const own = side(last) ? last.score.home : last.score.away;
          const other = side(last) ? last.score.away : last.score.home;
          return { date: last.date, opponent: side(last) ? last.away : last.home, home: side(last), own, other, result: own > other ? "S" : own < other ? "N" : "U", reportHref: last.reportId ? `/${competitionId}/spiel/${last.reportId}` : null };
        })() : null
      };
    });
  });
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
