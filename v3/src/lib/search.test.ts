import { describe, expect, it } from "vitest";
import { normalize, search } from "./search";

describe("search", () => {
  it("finds Traun teams in both competitions", () => {
    expect(search("traun")).toEqual(expect.arrayContaining([
      { team: "SK Konstant Traun / Edelweiss", competitionId: "hla-challenge-west" },
      { team: "Sportunion EDELWEISS Linz / SK Traun", competitionId: "landesliga-ooe" }
    ]));
  });

  it("does not search persons (ADR-005)", () => {
    expect(search("strauch")).toEqual([]);
  });

  it("ignores case and diacritics, needs two characters", () => {
    expect(normalize("JÄGER")).toBe("jager");
    expect(search("hsc wels").map((h) => h.team)).toContain("HSC Wels");
    expect(search("t")).toEqual([]);
    expect(search("xyzq")).toEqual([]);
  });
});
