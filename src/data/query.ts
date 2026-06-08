import { reviewedDemoAdapter } from "@/data/adapter";
import type { Match, MatchReport } from "@/domain/schema";
import { hlaChallengeDemo } from "@/data/hla-challenge";

export const data = reviewedDemoAdapter.getDataset();
export const topLevelCompetitions = data.competitions.filter((competition) => !competition.id.startsWith("hla-challenge-"));
export const byId = <T extends { id: string }>(items: T[], id: string) => items.find((item) => item.id === id);
export const sortMatches = (matches: Match[]) => [...matches].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
export const competitionBySlug = (slug: string) => data.competitions.find((competition) => competition.slug === slug);
export const competitionMatches = (competitionId: string) => data.matches.filter((match) => match.competitionId === competitionId);
export const filterMatches = (matches: Match[], competitionId: string, filters: { team?: string; club?: string; venue?: string; date?: string }) => sortMatches(matches).filter((match) => {
  const selectedTeam = filters.team;
  const clubTeamIds = filters.club ? data.teams.filter((team) => team.clubId === filters.club).map((team) => team.id) : [];
  return match.competitionId === competitionId
    && (!selectedTeam || match.homeTeamId === selectedTeam || match.awayTeamId === selectedTeam)
    && (!filters.club || clubTeamIds.includes(match.homeTeamId) || clubTeamIds.includes(match.awayTeamId))
    && (!filters.venue || match.venueId === filters.venue)
    && (!filters.date || match.startsAt.slice(0, 10) === filters.date);
});
export const filterMatchesAcrossCompetitions = (matches: Match[], filters: { team?: string; club?: string; venue?: string; date?: string }) =>
  data.competitions.flatMap((competition) => filterMatches(matches, competition.id, filters));
export const standingsForCompetition = (competitionId: string) => data.standings.find((standings) => standings.competitionId === competitionId);
export const metadataForCompetition = (competitionId: string) => hlaChallengeDemo.metadataByCompetition[competitionId as keyof typeof hlaChallengeDemo.metadataByCompetition] ?? data.metadata;
export const reportForMatch = (matchId: string) => data.matchReports.find((report) => report.matchId === matchId);
export type TeamFormOutcome = "W" | "D" | "L";
const matchOutcome = (match: Match, teamId: string): TeamFormOutcome | undefined => {
  if (match.status !== "finished" || match.homeScore === undefined || match.awayScore === undefined) return undefined;
  const own = match.homeTeamId === teamId ? match.homeScore : match.awayScore;
  const opponent = match.homeTeamId === teamId ? match.awayScore : match.homeScore;
  return own === opponent ? "D" : own > opponent ? "W" : "L";
};
export const teamInsights = (teamId: string, now = new Date().toISOString()) => {
  const matches = sortMatches(filterMatchesAcrossCompetitions(data.matches, { team: teamId }));
  const finishedMatches = matches.filter((match) => match.status === "finished");
  const nextMatch = matches.find((match) => match.status === "scheduled" && match.startsAt >= now);
  const latestResult = finishedMatches.at(-1);
  const standings = data.standings.find((table) => table.rows.some((row) => row.teamId === teamId));
  const standingsRow = standings?.rows.find((row) => row.teamId === teamId);
  const standingsCompetition = standings ? byId(data.competitions, standings.competitionId) : undefined;
  const form = finishedMatches.slice(-5).flatMap((match) => {
    const outcome = matchOutcome(match, teamId);
    return outcome ? [{ matchId: match.id, outcome }] : [];
  });
  const reportMatches = matches.filter((match) => reportForMatch(match.id));
  return { matches, nextMatch, latestResult, standings, standingsRow, standingsCompetition, form, reportMatches };
};
export const visiblePlayerStatistics = (report: MatchReport) => {
  const match = byId(data.matches, report.matchId);
  const profile = match && data.publicationProfiles.find((item) => item.competitionId === match.competitionId);
  return profile?.playerLevelDisplay && profile.reviewDecision === "approved" ? report.playerStatistics : [];
};
export const teamName = (id: string) => byId(data.teams, id)?.name ?? "Unbekanntes Team";
export const venueName = (id?: string) => id ? byId(data.venues, id)?.name ?? "Spielort nicht verfügbar" : "Spielort nicht verfügbar";
export const search = (query: string) => {
  const q = query.trim().toLocaleLowerCase("de");
  if (!q) return [];
  return [
    ...data.competitions.map((item) => ({ ...item, kind: "Bewerb", href: `/bewerbe/${item.slug}` })),
    ...data.clubs.map((item) => ({ ...item, kind: "Verein", href: `/vereine/${item.slug}` })),
    ...data.teams.map((item) => ({ ...item, kind: "Team", href: `/teams/${item.slug}` })),
    ...data.venues.map((item) => ({ ...item, kind: "Halle", href: `/bewerbe/${data.matches.find((match) => match.venueId === item.id)?.competitionId ?? data.competitions[0].slug}/spielplan?venue=${item.id}` }))
  ].filter((item) => item.name.toLocaleLowerCase("de").includes(q));
};
