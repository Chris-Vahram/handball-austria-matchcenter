import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CachedSnapshot } from "./types";

const snapshotFile = (root: string, competitionId: string) => path.join(root, "raw", `${competitionId}.json`);
const normalizedFile = (root: string, competitionId: string) => path.join(root, "normalized", `${competitionId}.json`);

export class ImportCache {
  constructor(private readonly root: string, private readonly freshnessMs: number) {}

  async readFreshSnapshot(competitionId: string, now = Date.now()): Promise<CachedSnapshot | undefined> {
    try {
      const snapshot = JSON.parse(await readFile(snapshotFile(this.root, competitionId), "utf8")) as CachedSnapshot;
      return now - Date.parse(snapshot.retrievedAt) <= this.freshnessMs ? snapshot : undefined;
    } catch {
      return undefined;
    }
  }

  async writeSnapshot(competitionId: string, snapshot: CachedSnapshot): Promise<void> {
    await mkdir(path.join(this.root, "raw"), { recursive: true });
    await writeFile(snapshotFile(this.root, competitionId), JSON.stringify(snapshot, null, 2), "utf8");
  }

  async writeNormalized(competitionId: string, dataset: unknown): Promise<void> {
    await mkdir(path.join(this.root, "normalized"), { recursive: true });
    await writeFile(normalizedFile(this.root, competitionId), JSON.stringify(dataset, null, 2), "utf8");
  }
}

