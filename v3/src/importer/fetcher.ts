import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { IMPORT_LIMITS, isAllowedSourceUrl } from "./config";

export type Transport = (url: string) => Promise<string>;

export interface FetcherDeps {
  transport: Transport;
  cacheDir: string;
  now: () => number;
  sleep: (ms: number) => Promise<void>;
}

const httpTransport: Transport = async (url) => {
  const res = await fetch(url, { headers: { "Accept-Language": "de-AT,de;q=0.9", "User-Agent": "matchcenter-v3-operator-import" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
};

export const defaultDeps = (cacheDir: string): FetcherDeps => ({
  transport: httpTransport,
  cacheDir,
  now: Date.now,
  sleep: (ms) => new Promise((r) => setTimeout(r, ms))
});

/** Cached, rate-limited, allowlisted fetcher (ADR-004). One instance per import run. */
export function createFetcher(deps: FetcherDeps) {
  let lastRequestAt = -Infinity;

  return async function get(url: string): Promise<string> {
    if (!isAllowedSourceUrl(url)) throw new Error(`Not allowlisted: ${url}`);
    const file = path.join(deps.cacheDir, createHash("sha256").update(url).digest("hex").slice(0, 32) + ".html");
    try {
      const info = await stat(file);
      if (deps.now() - info.mtimeMs < IMPORT_LIMITS.cacheFreshnessMs) return readFile(file, "utf8");
    } catch { /* not cached */ }

    let lastError: unknown;
    for (let attempt = 0; attempt <= IMPORT_LIMITS.maximumRetries; attempt++) {
      const wait = lastRequestAt + IMPORT_LIMITS.minimumDelayMs - deps.now();
      if (wait > 0) await deps.sleep(wait);
      lastRequestAt = deps.now();
      try {
        const body = await deps.transport(url);
        await mkdir(deps.cacheDir, { recursive: true });
        await writeFile(file, body);
        return body;
      } catch (error) {
        lastError = error;
      }
    }
    throw new Error(`Failed after ${IMPORT_LIMITS.maximumRetries + 1} attempts: ${url}`, { cause: lastError });
  };
}
