import { isAllowedPublicReportUrl, isAllowedSourceUrl } from "./config";
import type { CachedSnapshot, PublicPageFetcher } from "./types";

type FetchLike = typeof fetch;
type Sleep = (milliseconds: number) => Promise<void>;

export class PacedPublicPageFetcher implements PublicPageFetcher {
  private lastRequestAt = 0;

  constructor(
    private readonly minimumDelayMs: number,
    private readonly maximumRetries: number,
    private readonly fetchImpl: FetchLike = fetch,
    private readonly sleep: Sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
    private readonly now: () => number = Date.now
  ) {}

  async fetch(sourceUrl: string): Promise<CachedSnapshot> {
    return this.fetchAllowed(sourceUrl, isAllowedSourceUrl);
  }

  async fetchReport(sourceUrl: string): Promise<CachedSnapshot> {
    return this.fetchAllowed(sourceUrl, isAllowedPublicReportUrl);
  }

  private async fetchAllowed(sourceUrl: string, allowed: (url: string) => boolean): Promise<CachedSnapshot> {
    if (!allowed(sourceUrl)) throw new Error(`Source URL is not allowlisted: ${sourceUrl}`);
    let lastError: Error | undefined;
    for (let attempt = 0; attempt <= this.maximumRetries; attempt += 1) {
      await this.waitForPacing();
      try {
        const response = await this.fetchImpl(sourceUrl, { headers: { "user-agent": "handball-austria-matchcenter-pilot/0.1" } });
        if (!response.ok) throw new Error(`OEHB request failed with HTTP ${response.status}`);
        return { sourceUrl, retrievedAt: new Date(this.now()).toISOString(), body: await response.text() };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
      }
    }
    throw new Error(`OEHB request aborted after ${this.maximumRetries + 1} attempts: ${lastError?.message}`);
  }

  private async waitForPacing(): Promise<void> {
    const remaining = this.minimumDelayMs - (this.now() - this.lastRequestAt);
    if (remaining > 0) await this.sleep(remaining);
    this.lastRequestAt = this.now();
  }
}
