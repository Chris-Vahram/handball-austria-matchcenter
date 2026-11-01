import { datasetSchema, type Dataset } from "../domain/schema";
import { COMPETITIONS, COMPETITION_IDS, type CompetitionId } from "../importer/config";
import hlaWest from "./snapshots/hla-challenge-west.json";
import landesliga from "./snapshots/landesliga-ooe.json";

const SNAPSHOTS: Record<CompetitionId, unknown> = {
  "hla-challenge-west": hlaWest,
  "landesliga-ooe": landesliga
};

export const STALE_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

export { COMPETITIONS, COMPETITION_IDS, type CompetitionId };

export function isCompetitionId(value: string): value is CompetitionId {
  return (COMPETITION_IDS as string[]).includes(value);
}

/** Validated snapshot, or null when no import exists yet. */
export function getDataset(id: CompetitionId): Dataset | null {
  const raw = SNAPSHOTS[id];
  if (!raw) return null;
  return datasetSchema.parse(raw);
}

export function isStale(importedAt: string, now = Date.now()): boolean {
  return now - Date.parse(importedAt) > STALE_AFTER_MS;
}
