import { data, byId, visiblePlayerStatistics } from "@/data/query";

export type PlayerScorer = {
  ref: string;
  displayLabel: string;
  shirtNumber?: number;
  teamId: string;
  matches: number;
  goals: number;
  sevenMetreGoals: number;
  sevenMetreAttempts: number;
  twoMinutePenalties: number;
};

const add = (a: number | undefined, b: number | undefined) => (a ?? 0) + (b ?? 0);

/** True when the competition's publication profile allows adult player-level display. */
export function competitionPlayerReleased(competitionId: string): boolean {
  const profile = data.publicationProfiles.find((item) => item.competitionId === competitionId);
  return Boolean(profile?.playerLevelDisplay && profile.reviewDecision === "approved");
}

/** Aggregate visible (gated) player statistics across the given reports. */
function aggregate(reports: typeof data.matchReports): PlayerScorer[] {
  const byRef = new Map<string, PlayerScorer>();
  for (const report of reports) {
    for (const stat of visiblePlayerStatistics(report)) {
      const current = byRef.get(stat.sourcePlayerReference) ?? { ref: stat.sourcePlayerReference, displayLabel: stat.displayLabel, shirtNumber: stat.shirtNumber, teamId: stat.teamId, matches: 0, goals: 0, sevenMetreGoals: 0, sevenMetreAttempts: 0, twoMinutePenalties: 0 };
      current.matches += 1;
      current.goals = add(current.goals, stat.goals);
      current.sevenMetreGoals = add(current.sevenMetreGoals, stat.sevenMetreGoals);
      current.sevenMetreAttempts = add(current.sevenMetreAttempts, stat.sevenMetreAttempts);
      current.twoMinutePenalties = add(current.twoMinutePenalties, stat.twoMinutePenalties);
      byRef.set(stat.sourcePlayerReference, current);
    }
  }
  return [...byRef.values()].sort((a, b) => b.goals - a.goals || b.sevenMetreGoals - a.sevenMetreGoals || a.displayLabel.localeCompare(b.displayLabel, "de"));
}

const reportsForCompetition = (competitionId: string) => data.matchReports.filter((report) => byId(data.matches, report.matchId)?.competitionId === competitionId);

/** Ranked scorers for a competition, plus whether player publication is released. */
export function topScorersForCompetition(competitionId: string): { rows: PlayerScorer[]; released: boolean } {
  return { rows: aggregate(reportsForCompetition(competitionId)), released: competitionPlayerReleased(competitionId) };
}

/** Top scorers for a single team across all its matches with released reports. */
export function topScorersForTeam(teamId: string, limit = 5): PlayerScorer[] {
  const reports = data.matchReports.filter((report) => {
    const match = byId(data.matches, report.matchId);
    return match && (match.homeTeamId === teamId || match.awayTeamId === teamId);
  });
  return aggregate(reports).filter((row) => row.teamId === teamId).slice(0, limit);
}

export const sevenMetreQuota = (goals: number, attempts: number) => attempts > 0 ? Math.round((goals / attempts) * 100) : undefined;
export const goalShare = (playerGoals: number, teamGoals: number) => teamGoals > 0 ? Math.round((playerGoals / teamGoals) * 100) : 0;

const slugify = (value: string) => value.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** URL slug from display name + shirt — never the internal source reference. */
export const playerSlug = (displayLabel: string, shirtNumber?: number) => `${slugify(displayLabel)}${shirtNumber !== undefined ? `-${shirtNumber}` : ""}`;

export type PlayerMatchLine = { matchId: string; competitionId: string; goals: number; sevenMetreGoals: number; sevenMetreAttempts: number; twoMinutePenalties: number };
export type PlayerProfile = {
  slug: string;
  displayLabel: string;
  shirtNumber?: number;
  teamId: string;
  competitionIds: string[];
  totals: { matches: number; goals: number; sevenMetreGoals: number; sevenMetreAttempts: number; twoMinutePenalties: number };
  perMatch: PlayerMatchLine[];
};

/** All released players (one entry per slug) — for links and the sitemap. */
export function releasedPlayers(): { slug: string; displayLabel: string; shirtNumber?: number; teamId: string; goals: number }[] {
  const bySlug = new Map<string, { slug: string; displayLabel: string; shirtNumber?: number; teamId: string; goals: number }>();
  for (const report of data.matchReports) {
    for (const stat of visiblePlayerStatistics(report)) {
      const slug = playerSlug(stat.displayLabel, stat.shirtNumber);
      const current = bySlug.get(slug) ?? { slug, displayLabel: stat.displayLabel, shirtNumber: stat.shirtNumber, teamId: stat.teamId, goals: 0 };
      current.goals = add(current.goals, stat.goals);
      bySlug.set(slug, current);
    }
  }
  return [...bySlug.values()].sort((a, b) => b.goals - a.goals || a.displayLabel.localeCompare(b.displayLabel, "de"));
}

/** Aggregated profile for one released player, or undefined if no released data. */
export function getPlayerProfile(slug: string): PlayerProfile | undefined {
  let profile: PlayerProfile | undefined;
  const competitions = new Set<string>();
  for (const report of data.matchReports) {
    const match = byId(data.matches, report.matchId);
    if (!match) continue;
    for (const stat of visiblePlayerStatistics(report)) {
      if (playerSlug(stat.displayLabel, stat.shirtNumber) !== slug) continue;
      profile ??= { slug, displayLabel: stat.displayLabel, shirtNumber: stat.shirtNumber, teamId: stat.teamId, competitionIds: [], totals: { matches: 0, goals: 0, sevenMetreGoals: 0, sevenMetreAttempts: 0, twoMinutePenalties: 0 }, perMatch: [] };
      competitions.add(match.competitionId);
      profile.totals.matches += 1;
      profile.totals.goals = add(profile.totals.goals, stat.goals);
      profile.totals.sevenMetreGoals = add(profile.totals.sevenMetreGoals, stat.sevenMetreGoals);
      profile.totals.sevenMetreAttempts = add(profile.totals.sevenMetreAttempts, stat.sevenMetreAttempts);
      profile.totals.twoMinutePenalties = add(profile.totals.twoMinutePenalties, stat.twoMinutePenalties);
      profile.perMatch.push({ matchId: match.id, competitionId: match.competitionId, goals: stat.goals ?? 0, sevenMetreGoals: stat.sevenMetreGoals ?? 0, sevenMetreAttempts: stat.sevenMetreAttempts ?? 0, twoMinutePenalties: stat.twoMinutePenalties ?? 0 });
    }
  }
  if (profile) profile.competitionIds = [...competitions];
  return profile;
}
