import path from "node:path";
import { IMPORT_DEFAULTS, type AllowedCompetitionId } from "./config";
import { ImportCache } from "./cache";
import { PacedPublicPageFetcher } from "./fetcher";
import { OehbPublicImporter } from "./service";

const competitionId = process.argv[2] as AllowedCompetitionId | undefined;
if (!competitionId) throw new Error("Usage: npm run import:oehb -- <competition-id>");

const cache = new ImportCache(path.join(process.cwd(), "data/import-cache"), IMPORT_DEFAULTS.cacheFreshnessMs);
const fetcher = new PacedPublicPageFetcher(IMPORT_DEFAULTS.minimumDelayMs, IMPORT_DEFAULTS.maximumRetries);
const result = await new OehbPublicImporter(cache, fetcher).importCompetition(competitionId);
console.log(JSON.stringify({ competitionId, cacheHit: result.cacheHit, retrievedAt: result.retrievedAt }, null, 2));

