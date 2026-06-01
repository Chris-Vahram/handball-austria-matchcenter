import { curatedDataset } from "./curated";
import { reviewedDemoDataset } from "./reviewed-demo";
import { datasetSchema, type Dataset } from "../domain/schema";
import { reviewedDemoReports } from "./reports";

export interface DataSourceAdapter {
  getDataset(): Dataset;
}

function assertReferences(data: Dataset): Dataset {
  const ids = <T extends { id: string }>(items: T[]) => new Set(items.map(({ id }) => id));
  const associations = ids(data.associations);
  const seasons = ids(data.seasons);
  const clubs = ids(data.clubs);
  const teams = ids(data.teams);
  const venues = ids(data.venues);
  const competitions = ids(data.competitions);
  for (const competition of data.competitions) {
    if (!associations.has(competition.associationId) || !seasons.has(competition.seasonId)) throw new Error(`Broken competition reference: ${competition.id}`);
  }
  for (const team of data.teams) if (!clubs.has(team.clubId)) throw new Error(`Broken team reference: ${team.id}`);
  for (const match of data.matches) {
    if (!competitions.has(match.competitionId) || !seasons.has(match.seasonId) || !teams.has(match.homeTeamId) || !teams.has(match.awayTeamId) || (match.venueId && !venues.has(match.venueId))) throw new Error(`Broken match reference: ${match.id}`);
  }
  for (const report of data.matchReports) {
    if (!data.matches.some((match) => match.id === report.matchId)) throw new Error(`Broken report reference: ${report.matchId}`);
    for (const statistics of report.teamStatistics) if (!teams.has(statistics.teamId)) throw new Error(`Broken team statistics reference: ${statistics.teamId}`);
    for (const statistics of report.playerStatistics) if (!teams.has(statistics.teamId)) throw new Error(`Broken player statistics reference: ${statistics.teamId}`);
    for (const event of report.events) if (event.teamId && !teams.has(event.teamId)) throw new Error(`Broken event reference: ${event.teamId}`);
  }
  for (const provenance of data.parserProvenance) if (!competitions.has(provenance.competitionId)) throw new Error(`Broken provenance reference: ${provenance.competitionId}`);
  for (const profile of data.publicationProfiles) if (!competitions.has(profile.competitionId)) throw new Error(`Broken publication profile reference: ${profile.competitionId}`);
  return data;
}

export function validateDataset(input: unknown): Dataset {
  return assertReferences(datasetSchema.parse(input));
}

export const curatedAdapter: DataSourceAdapter = {
  getDataset: () => validateDataset(curatedDataset)
};

export const reviewedDemoAdapter: DataSourceAdapter = {
  getDataset: () => validateDataset({ ...reviewedDemoDataset, matchReports: reviewedDemoReports })
};
