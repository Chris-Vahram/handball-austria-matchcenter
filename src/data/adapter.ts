import { curatedDataset } from "./curated";
import { datasetSchema, type Dataset } from "../domain/schema";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { SOURCE_ALLOWLIST } from "../importer/config";
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

const unique = <T extends { id: string }>(items: T[]) => [...new Map(items.map((item) => [item.id, item])).values()];

export const cachedNormalizedAdapter: DataSourceAdapter = {
  getDataset: () => {
    const imported = Object.keys(SOURCE_ALLOWLIST).flatMap((competitionId) => {
      const file = path.join(process.cwd(), "data/import-cache/normalized", `${competitionId}.json`);
      return existsSync(file) ? [validateDataset(JSON.parse(readFileSync(file, "utf8")))] : [];
    });
    if (!imported.length) return curatedAdapter.getDataset();
    const matches = unique(imported.flatMap((dataset) => dataset.matches));
    return validateDataset({
      metadata: imported[0].metadata,
      associations: unique(imported.flatMap((dataset) => dataset.associations)),
      seasons: unique(imported.flatMap((dataset) => dataset.seasons)),
      competitions: unique(imported.flatMap((dataset) => dataset.competitions)),
      clubs: unique(imported.flatMap((dataset) => dataset.clubs)),
      teams: unique(imported.flatMap((dataset) => dataset.teams)),
      venues: unique(imported.flatMap((dataset) => dataset.venues)),
      matches,
      standings: imported.flatMap((dataset) => dataset.standings),
      matchReports: reviewedDemoReports.filter((report) => matches.some((match) => match.id === report.matchId)),
      parserProvenance: imported.flatMap((dataset) => dataset.parserProvenance),
      publicationProfiles: imported.flatMap((dataset) => dataset.publicationProfiles)
    });
  }
};
