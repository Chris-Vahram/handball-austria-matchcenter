import type { Dataset, Match } from "../domain/schema";
import { isUpcoming } from "./rounds";
import { normalize } from "./search";

export const teamSlug = (team: string) => normalize(team).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function teamBySlug(data: Dataset, slug: string) {
  return data.standings.find((s) => teamSlug(s.team) === slug) ?? null;
}

const byTime = (a: Match, b: Match) => (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")) || a.number - b.number;

export function teamMatches(data: Dataset, team: string): Match[] {
  return data.matches.filter((m) => m.home === team || m.away === team).sort(byTime);
}

export function nextMatch(data: Dataset, team: string, today?: string): Match | null {
  return teamMatches(data, team).find((m) => isUpcoming(m, today)) ?? null;
}

type Record = { won: number; drawn: number; lost: number };

/** Home/away split of played matches, derived from the schedule. */
export function homeAway(data: Dataset, team: string): { home: Record; away: Record } {
  const empty = () => ({ won: 0, drawn: 0, lost: 0 });
  const out = { home: empty(), away: empty() };
  for (const m of teamMatches(data, team)) {
    if (!m.score) continue;
    const atHome = m.home === team;
    const own = atHome ? m.score.home : m.score.away;
    const other = atHome ? m.score.away : m.score.home;
    const r = out[atHome ? "home" : "away"];
    if (own > other) r.won++; else if (own < other) r.lost++; else r.drawn++;
  }
  return out;
}

export type PlayerLine = { name: string; goals: number; sevenMGoals: number; sevenMAttempts: number; twoMin: number; yellow: number; red: number };

/** The team's players merged from the five nuLiga rankings (ADR-005 fields only). */
export function teamPlayers(data: Dataset, team: string): PlayerLine[] {
  const lines = new Map<string, PlayerLine>();
  const line = (name: string) => {
    if (!lines.has(name)) lines.set(name, { name, goals: 0, sevenMGoals: 0, sevenMAttempts: 0, twoMin: 0, yellow: 0, red: 0 });
    return lines.get(name)!;
  };
  const rows = (kind: string) => (data.stats[kind] ?? []).filter((r) => r.team === team);
  for (const r of rows("tore")) line(r.name).goals = r.value;
  for (const r of rows("7m")) { line(r.name).sevenMGoals = r.value; line(r.name).sevenMAttempts = r.attempts ?? 0; }
  for (const r of rows("zeitstrafen")) line(r.name).twoMin = r.value;
  for (const r of rows("gelb")) line(r.name).yellow = r.value;
  for (const r of rows("rot")) line(r.name).red = r.value;
  return [...lines.values()].sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, "de"));
}
