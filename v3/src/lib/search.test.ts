import { describe, expect, it } from "vitest";
import { normalize, search } from "./search";

describe("search", () => {
  it("finds Traun teams in both competitions", () => {
    expect(search("traun").teams).toEqual(expect.arrayContaining([
      { team: "SK Konstant Traun / Edelweiss", competitionId: "hla-challenge-west" },
      { team: "Sportunion EDELWEISS Linz / SK Traun", competitionId: "landesliga-ooe" }
    ]));
  });

  it("finds players from the rankings with team and competition", () => {
    expect(search("strauch").players).toContainEqual({ name: "STRAUCH, Tore", team: "SK Konstant Traun / Edelweiss", competitionId: "hla-challenge-west" });
  });

  it("ignores case and diacritics, needs two characters", () => {
    expect(normalize("JÄGER")).toBe("jager");
    expect(search("hsc wels").teams.map((h) => h.team)).toContain("HSC Wels");
    expect(search("t")).toEqual({ competitions: [], teams: [], players: [] });
    expect(search("xyzq")).toEqual({ competitions: [], teams: [], players: [] });
  });

  it("finds Bewerbe by name and Verband", () => {
    expect(search("landes").competitions).toEqual([{ competitionId: "landesliga-ooe" }]);
    expect(search("handballbund").competitions).toEqual([{ competitionId: "hla-challenge-west" }]);
  });

  it("finds a team by its official Verein name, hyphen or not", () => {
    for (const q of ["SK-Handball Traun", "sk handball traun"]) {
      expect(search(q).teams).toContainEqual({ team: "SK Konstant Traun / Edelweiss", competitionId: "hla-challenge-west" });
    }
  });
});
