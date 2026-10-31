import { writeFile } from "node:fs/promises";
import path from "node:path";
import { COMPETITION_IDS, type CompetitionId } from "./config";
import { createFetcher, defaultDeps } from "./fetcher";
import { importCompetition } from "./import";

// Operator CLI (ADR-004): npm run import -- <competition|all>
const arg = process.argv[2] ?? "all";
const ids: CompetitionId[] = arg === "all" ? COMPETITION_IDS : COMPETITION_IDS.filter((id) => id === arg);
if (!ids.length) {
  console.error(`Unknown competition "${arg}". Use one of: all, ${COMPETITION_IDS.join(", ")}`);
  process.exit(1);
}

const root = process.cwd();
const get = createFetcher(defaultDeps(path.join(root, "data/import-cache")));

async function main() {
  for (const id of ids) {
    try {
      const dataset = await importCompetition(id, get);
      const file = path.join(root, "src/data/snapshots", `${id}.json`);
      await writeFile(file, JSON.stringify(dataset, null, 2) + "\n");
      console.log(`${id}: ${dataset.standings.length} teams, ${dataset.matches.length} matches, ${Object.keys(dataset.reports).length} reports → ${path.relative(root, file)}`);
    } catch (error) {
      // Last validated snapshot stays untouched.
      console.error(`${id}: import failed, snapshot unchanged.`, error instanceof Error ? error.message : error);
      process.exitCode = 1;
    }
  }
}

void main();
