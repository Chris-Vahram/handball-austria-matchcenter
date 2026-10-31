import { describe, expect, it } from "vitest";
import { getDataset, isStale, STALE_AFTER_MS } from "../data";
import { formatDiff } from "./format";
import { currentRound, roundsOf } from "./rounds";

describe("liga data", () => {
  const hla = getDataset("hla-challenge-west")!;

  it("current round is the first with an unplayed match", () => {
    const first = Math.min(...hla.matches.filter((m) => m.status === "scheduled").map((m) => m.round));
    expect(currentRound(hla.matches)).toBe(first);
    expect(roundsOf(hla.matches)).toHaveLength(14);
  });

  it("falls back to the last round when all matches are played", () => {
    const done = hla.matches.map((m) => ({ ...m, status: "played" as const }));
    expect(currentRound(done)).toBe(14);
  });

  it("flags data older than 7 days as stale", () => {
    const t = Date.parse("2026-10-31T20:00:00Z");
    expect(isStale("2026-10-31T10:00:00Z", t)).toBe(false);
    expect(isStale(new Date(t - STALE_AFTER_MS - 1).toISOString(), t)).toBe(true);
  });

  it("formats goal difference with a typographic minus", () => {
    expect([formatDiff(63), formatDiff(-21), formatDiff(0)]).toEqual(["+63", "−21", "0"]);
  });
});
