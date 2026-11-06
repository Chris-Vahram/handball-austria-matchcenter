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
