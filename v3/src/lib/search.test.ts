import { describe, expect, it } from "vitest";
import { normalize, search } from "./search";

describe("search", () => {
  it("finds Traun teams in both competitions", () => {
    const { teams } = search("traun");
    expect(teams).toEqual(expect.arrayContaining([
      { team: "SK Konstant Traun / Edelweiss", competitionId: "hla-challenge-west" },
      { team: "Sportunion EDELWEISS Linz / SK Traun", competitionId: "landesliga-ooe" }
    ]));
  });

  it("finds a player with team and competition", () => {
    expect(search("strauch").players).toContainEqual({ name: "STRAUCH, Tore", team: "SK Konstant Traun / Edelweiss", competitionId: "hla-challenge-west" });
  });

  it("ignores case and diacritics", () => {
    expect(normalize("JÄGER, Christian")).toBe("jager, christian");
    expect(search("jager").players.some((p) => p.name === "JÄGER, Christian")).toBe(true);
  });

  it("requires two characters and reports no hits", () => {
    expect(search("t")).toEqual({ teams: [], players: [] });
    expect(search("xyzq")).toEqual({ teams: [], players: [] });
  });
});
