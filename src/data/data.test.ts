import { describe, expect, it } from "vitest";
import { curatedDataset } from "@/data/curated";
import { validateDataset } from "@/data/adapter";
import { data, filterMatches, search, sortMatches, standingsForCompetition, visiblePlayerStatistics } from "@/data/query";

describe("curated dataset", () => {
  it("validates official pilot sample", () => {
    expect(validateDataset(curatedDataset).matches).toHaveLength(4);
  });

  it("rejects excluded or unknown fields", () => {
    expect(() => validateDataset({ ...curatedDataset, playerLists: [] })).toThrow();
  });

  it.each(["contacts", "phoneNumbers", "emailAddresses", "referees", "privateData"])("rejects excluded %s fields", (field) => {
    expect(() => validateDataset({ ...curatedDataset, [field]: [] })).toThrow();
  });

  it("rejects broken relationships", () => {
    const invalid = { ...curatedDataset, matches: [{ ...curatedDataset.matches[0], homeTeamId: "missing" }] };
    expect(() => validateDataset(invalid)).toThrow("Broken match reference");
  });

  it("rejects score on scheduled match", () => {
    const invalid = { ...curatedDataset, matches: [{ ...curatedDataset.matches[3], homeScore: 1, awayScore: 0 }] };
    expect(() => validateDataset(invalid)).toThrow("Only finished match may contain score");
  });

  it("rejects player display without approved review", () => {
    const invalid = { ...curatedDataset, publicationProfiles: [{ competitionId: "oohv-maenner-landesliga", category: "adult", playerLevelDisplay: true, reviewDecision: "pending" }] };
    expect(() => validateDataset(invalid)).toThrow("Player display requires approved review");
  });

  it("keeps official aliases as separate team records", () => {
    const variant = {
      ...curatedDataset,
      teams: [
        ...curatedDataset.teams,
        { id: "edelweiss-traun-mu18", slug: "edelweiss-traun-mu18", name: "SG SU EDELWEISS / SK Traun", clubId: "edelweiss-traun" }
      ]
    };
    expect(validateDataset(variant).teams.filter((team) => team.clubId === "edelweiss-traun").map((team) => team.name)).toEqual([
      "Sportunion EDELWEISS Linz / SK Traun",
      "SG SU EDELWEISS / SK Traun"
    ]);
  });
});

describe("queries", () => {
  it("sorts matches chronologically", () => {
    const startsAt = sortMatches([...data.matches].reverse()).map((match) => match.startsAt);
    expect(startsAt).toEqual([...startsAt].sort());
  });

  it("filters by team, venue and date", () => {
    const match = data.matches.find((item) => item.competitionId === "oohv-maenner-landesliga")!;
    expect(filterMatches(data.matches, match.competitionId, { team: match.homeTeamId })).toContainEqual(match);
    expect(filterMatches(data.matches, match.competitionId, { venue: match.venueId })).toContainEqual(match);
    expect(filterMatches(data.matches, match.competitionId, { date: match.startsAt.slice(0, 10) })).toContainEqual(match);
    expect(filterMatches(data.matches, "missing-competition", {})).toEqual([]);
  });

  it("looks standings up by competition context", () => {
    expect(standingsForCompetition("oohv-maenner-landesliga")?.competitionId).toBe("oohv-maenner-landesliga");
    expect(standingsForCompetition("missing-competition")).toBeUndefined();
  });

  it("hides player statistics while publication review is pending", () => {
    expect(visiblePlayerStatistics({
      matchId: data.matches[0].id,
      publicReportUrl: "https://www.oehb.at/de/bewerbe/public-report",
      teamStatistics: [],
      playerStatistics: [{ teamId: "edelweiss-traun", sourcePlayerReference: "private-source-id", displayLabel: "Hidden", goals: 1 }],
      events: []
    })).toEqual([]);
  });

  it("searches allowed public entities", () => {
    expect(search("Wels").map((result) => result.kind)).toEqual(expect.arrayContaining(["Verein", "Team", "Halle"]));
    expect(search("kein treffer")).toEqual([]);
  });
});
