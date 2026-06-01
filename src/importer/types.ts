import type { Dataset } from "../domain/schema";

export interface CachedSnapshot {
  sourceUrl: string;
  retrievedAt: string;
  body: string;
}

export interface ImportResult {
  dataset: Dataset;
  sourceUrl: string;
  retrievedAt: string;
  cacheHit: boolean;
}

export interface PublicPageFetcher {
  fetch(sourceUrl: string): Promise<CachedSnapshot>;
}

