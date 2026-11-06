import type { ReportTeam } from "../domain/schema";

/** Kurzfazit per team: three best scorers (ties keep lineup order), 7m and 2-minute totals. */
export function reportSummary(team: ReportTeam) {
  const scorers = team.players
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.goals > 0)
    .sort((a, b) => b.p.goals - a.p.goals || a.i - b.i)
    .slice(0, 3)
    .map(({ p }) => ({ name: p.name, shirt: p.shirt, goals: p.goals }));
  return { scorers, sevenM: `${team.totals.sevenMGoals}/${team.totals.sevenMAttempts}`, twoMin: team.totals.twoMin };
}
