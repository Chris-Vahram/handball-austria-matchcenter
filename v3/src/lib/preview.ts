import type { Dataset, Match } from "../domain/schema";
import { lastFive } from "./form";

/** Everything the Spielvorschau shows for one match, from imported data only. Null for unknown numbers. */
export function matchPreview(data: Dataset, number: number) {
  const match = data.matches.find((m) => m.number === number);
  if (!match) return null;
  const side = (team: string) => ({
    team,
    row: data.standings.find((s) => s.team === team) ?? null,
    form: lastFive(data.matches, team),
    scorers: (data.stats.tore ?? []).filter((r) => r.team === team).slice(0, 3)
  });
  const pair = (m: Match) => (m.home === match.home && m.away === match.away) || (m.home === match.away && m.away === match.home);
  const earlier = data.matches
    .filter((m) => m.number !== match.number && m.score && pair(m) && m.date <= match.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  return { match, home: side(match.home), away: side(match.away), earlier };
}
