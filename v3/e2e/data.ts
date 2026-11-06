// Expected values come from the committed snapshot, so a data refresh never breaks the e2e suite.
import hlaJson from "../src/data/snapshots/hla-challenge-west.json";
import type { Dataset } from "../src/domain/schema";
import { currentRound } from "../src/lib/rounds";

export const hla = hlaJson as unknown as Dataset;
export const hlaRound = currentRound(hla.matches);
export const match23 = hla.matches.find((m) => m.number === 23)!;
export const hlaGroup = hla.groupStats!.group;
