/** Device-only favorites (ADR: no accounts). Team keys are `competitionId|team`, Bewerb keys are competition ids. */
export const TEAMS = "matchcenter:my-teams";
export const COMPETITIONS_KEY = "matchcenter:my-competitions";
export const FAVORITES_EVENT = "favorites";

export const teamKey = (competitionId: string, team: string) => `${competitionId}|${team}`;

type Store = Pick<Storage, "getItem" | "setItem">;

export function readList(store: Store | undefined, key: string): string[] {
  try {
    const value: unknown = JSON.parse(store?.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function writeList(store: Store | undefined, key: string, list: string[]) {
  try { store?.setItem(key, JSON.stringify(list)); } catch { /* private mode / quota: keep in memory only */ }
}

export const toggle = (list: string[], item: string) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);

export type HomeTeam = {
  key: string;
  team: string;
  competitionId: string;
  competition: string;
  next: { date: string; time: string | null; home: string; away: string; href: string } | null;
  last: { opponent: string; home: boolean; own: number; other: number; result: "S" | "U" | "N"; href: string | null } | null;
};
export type HomeCompetition = { id: string; name: string; standings: { key: string; team: string; rank: number; points: number }[] };
export type BewerbRow = { id: string; name: string; rows: { team: string; rank: number; points: number; favorite: boolean }[] };

/**
 * Home lists for the stored favorites: next matches (soonest first, teams without one left out), last results,
 * and Bewerbe = followed ones plus those of favorite teams, each with the favorite teams' rows or else the leader.
 */
export function myLists(teams: HomeTeam[], competitions: HomeCompetition[], teamKeys: string[], competitionIds: string[]) {
  const mine = teamKeys.map((k) => teams.find((t) => t.key === k)).filter((t): t is HomeTeam => !!t);
  const next = mine.filter((t) => t.next).sort((a, b) => (a.next!.date + (a.next!.time ?? "")).localeCompare(b.next!.date + (b.next!.time ?? "")));
  const last = mine.filter((t) => t.last);
  const ids = [...new Set([...competitionIds, ...mine.map((t) => t.competitionId)])];
  const bewerbe = ids.flatMap((id): BewerbRow[] => {
    const c = competitions.find((x) => x.id === id);
    if (!c) return [];
    const favorites = c.standings.filter((s) => teamKeys.includes(s.key));
    const rows = favorites.length ? favorites : c.standings.slice(0, 1);
    return [{ id, name: c.name, rows: rows.map((s) => ({ team: s.team, rank: s.rank, points: s.points, favorite: favorites.length > 0 })) }];
  });
  return { next, last, bewerbe };
}
