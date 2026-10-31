import type { Match } from "../domain/schema";

type Unrounded = Omit<Match, "round">;

/**
 * Runde per match. nuLiga numbers a round-robin group contiguously 1..N in round
 * order (HLA West: Nr. 21–24 = Runde 6), so Runde = ceil(Nr / games per round).
 * When numbering is not contiguous (e.g. an inserted game), fall back to
 * grouping by calendar week (Mon–Sun) in date order.
 */
export function assignRounds(matches: Unrounded[], teamCount: number): Match[] {
  const perRound = Math.floor(teamCount / 2);
  const numbers = matches.map((m) => m.number).sort((a, b) => a - b);
  const contiguous = perRound > 0 && numbers.every((n, i) => n === i + 1) && numbers.length % perRound === 0;
  if (contiguous) return matches.map((m) => ({ ...m, round: Math.ceil(m.number / perRound) }));

  const weekKey = (iso: string) => {
    const d = new Date(`${iso}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
    return d.toISOString().slice(0, 10);
  };
  const weeks = [...new Set(matches.map((m) => weekKey(m.date)))].sort();
  return matches.map((m) => ({ ...m, round: weeks.indexOf(weekKey(m.date)) + 1 }));
}

/** First round with an unplayed match; the last round once everything is played. */
export function currentRound(matches: Match[]): number {
  const open = matches.filter((m) => m.status === "scheduled").map((m) => m.round);
  if (open.length) return Math.min(...open);
  return Math.max(1, ...matches.map((m) => m.round));
}

export function roundsOf(matches: Match[]): number[] {
  return [...new Set(matches.map((m) => m.round))].sort((a, b) => a - b);
}
