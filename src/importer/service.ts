import { validateDataset } from "../data/adapter";
import { IMPORT_DEFAULTS, SOURCE_ALLOWLIST, type AllowedCompetitionId } from "./config";
import { ImportCache } from "./cache";
import { parsePublicSportsSnapshot } from "./parser";
import type { ImportResult, PublicPageFetcher } from "./types";

export class OehbPublicImporter {
  constructor(private readonly cache: ImportCache, private readonly fetcher: PublicPageFetcher) {}

  async importCompetition(competitionId: AllowedCompetitionId): Promise<ImportResult> {
    const sourceUrl = SOURCE_ALLOWLIST[competitionId];
    const cached = await this.cache.readFreshSnapshot(competitionId);
    const snapshot = cached ?? await this.fetcher.fetch(sourceUrl);
    if (!cached) await this.cache.writeSnapshot(competitionId, snapshot);
    const parsed = parsePublicSportsSnapshot(snapshot.body, competitionId);
    const dataset = validateDataset({
      ...parsed,
      parserProvenance: [
        ...parsed.parserProvenance.filter((item) => item.competitionId !== competitionId),
        normalizedProvenance(competitionId, snapshot.retrievedAt)
      ]
    });
    await this.cache.writeNormalized(competitionId, dataset);
    return { dataset, sourceUrl, retrievedAt: snapshot.retrievedAt, cacheHit: Boolean(cached) };
  }
}

export function normalizedProvenance(competitionId: AllowedCompetitionId, retrievedAt: string) {
  return {
    competitionId,
    sourceReference: SOURCE_ALLOWLIST[competitionId],
    retrievedAt,
    parserVersion: IMPORT_DEFAULTS.parserVersion,
    validationStatus: "valid" as const,
    rawSnapshotReference: `raw/${competitionId}.json`
  };
}
