import type { Match } from "../domain/schema";

export type Result = "S" | "U" | "N";

/** Last five played results of a team, oldest first (as read left to right). */
export function lastFive(matches: Match[], team: string): Result[] {
  return matches
    .filter((m) => m.score && (m.home === team || m.away === team))
    .sort((a, b) => (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")) || a.number - b.number)
    .slice(-5)
    .map((m) => {
      const own = m.home === team ? m.score!.home : m.score!.away;
      const other = m.home === team ? m.score!.away : m.score!.home;
      return own > other ? "S" : own < other ? "N" : "U";
    });
}
