import { describe, expect, it } from "vitest";
import { getDataset } from "../data";
import { matchPreview } from "./preview";

const hla = getDataset("hla-challenge-west")!;

describe("match preview", () => {
  it("match 25: both teams with table row, form and top scorers", () => {
    const p = matchPreview(hla, 25)!;
    expect(p.match).toMatchObject({ home: "SK Konstant Traun / Edelweiss", away: "SMC Innsbruck Handball Tirol" });
    expect(p.home.row?.rank).toBe(7);
    expect(p.home.form).toHaveLength(5);
    expect(p.home.scorers.map((s) => s.name)).toContain("HALILOVIC, Maid");
    expect(p.home.scorers.length).toBeLessThanOrEqual(3);
    expect(p.away.scorers.every((s) => s.team === "SMC Innsbruck Handball Tirol")).toBe(true);
  });

  it("lists the first leg for a second-leg match, none for a first meeting", () => {
    const first = hla.matches.find((m) => m.score)!;
    const second = hla.matches.find((m) => m.number !== first.number && m.home === first.away && m.away === first.home)!;
    expect(matchPreview(hla, second.number)!.earlier.map((m) => m.number)).toEqual([first.number]);
    expect(matchPreview(hla, first.number)!.earlier).toEqual([]);
  });

  it("unknown match number", () => {
    expect(matchPreview(hla, 9999)).toBeNull();
  });
});
