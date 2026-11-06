import { describe, expect, it } from "vitest";
import { getDataset, isStale, STALE_AFTER_MS } from "../data";
import { formatDiff } from "./format";
import { currentRound, isOverdue, roundsOf } from "./rounds";

describe("liga data", () => {
  const hla = getDataset("hla-challenge-west")!;

  it("current round is the round of the next dated match", () => {
    expect(currentRound(hla.matches, "2026-11-06")).toBe(7);
    const preseason = hla.matches.map((m) => ({ ...m, status: "scheduled" as const, score: null }));
    expect(currentRound(preseason, "2026-08-01")).toBe(1);
    expect(roundsOf(hla.matches)).toHaveLength(14);
  });

  it("an overdue or postponed match does not hold back the current round", () => {
    // Runde 6 game left without a result, another Runde 6 game moved to February.
    const r6 = hla.matches.filter((m) => m.round === 6);
    const matches = hla.matches.map((m) =>
      m.number === r6[0].number ? { ...m, status: "scheduled" as const, score: null } :
      m.number === r6[1].number ? { ...m, status: "scheduled" as const, score: null, date: "2027-02-20" } : m);
    expect(isOverdue(matches.find((m) => m.number === r6[0].number)!, "2026-11-06")).toBe(true);
    expect(currentRound(matches, "2026-11-06")).toBe(7);
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

describe("form", async () => {
  const { lastFive } = await import("./form");
  it("returns the last five results oldest first", () => {
    const hla = getDataset("hla-challenge-west")!;
    const traun = lastFive(hla.matches, "SK Konstant Traun / Edelweiss");
    expect(traun).toHaveLength(5);
    expect(traun.at(-1)).toBe("N"); // 35:37 in Bregenz, 31.10.2026
    expect(lastFive(hla.matches, "HSC Wels").every((r) => r === "S")).toBe(true);
  });
});

describe("today", async () => {
  const { todayInVienna } = await import("./format");
  it("uses the Vienna calendar day", () => {
    expect(todayInVienna(new Date("2026-10-31T23:30:00Z"))).toBe("2026-11-01"); // 00:30 in Vienna
    expect(todayInVienna(new Date("2026-10-31T10:00:00Z"))).toBe("2026-10-31");
  });
});

describe("displayName", async () => {
  const { displayName } = await import("./format");
  it("title-cases all-caps surnames only", () => {
    expect(displayName("KRITZINGER, Maurice")).toBe("Kritzinger, Maurice");
    expect(displayName("NANA AGYAPONG, Marques")).toBe("Nana Agyapong, Marques");
    expect(displayName("CIOBANU, Narcis-Ionut")).toBe("Ciobanu, Narcis-Ionut");
    expect(displayName("Pitter, Noah")).toBe("Pitter, Noah");
    expect(displayName("McDONALD, Al")).toBe("McDONALD, Al");
  });
});
