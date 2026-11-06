import { describe, expect, it } from "vitest";
import { getDataset } from "../data";
import { reportSummary } from "./report";

describe("report summary", () => {
  const r = getDataset("hla-challenge-west")!.reports["93135"];

  it("lists the top scorers of match 23 per team", () => {
    expect(reportSummary(r.away).scorers[0]).toMatchObject({ name: "STRAUCH, Tore", goals: 12 });
    expect(reportSummary(r.home).scorers[0].goals).toBe(9);
    expect(reportSummary(r.home).scorers).toHaveLength(3);
    expect(reportSummary(r.away)).toMatchObject({ sevenM: `${r.away.totals.sevenMGoals}/${r.away.totals.sevenMAttempts}`, twoMin: r.away.totals.twoMin });
  });

  it("handles a team without goals", () => {
    expect(reportSummary({ ...r.home, players: r.home.players.map((p) => ({ ...p, goals: 0 })) }).scorers).toEqual([]);
  });
});
