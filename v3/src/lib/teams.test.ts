import { describe, expect, it } from "vitest";
import { getDataset } from "../data";
import { homeAway, nextMatch, teamBySlug, teamPlayers, teamSlug } from "./teams";

const hla = getDataset("hla-challenge-west")!;
const traun = "SK Konstant Traun / Edelweiss";

describe("team pages data", () => {
  it("slugs are stable and resolve back", () => {
    expect(teamSlug(traun)).toBe("sk-konstant-traun-edelweiss");
    expect(teamBySlug(hla, "sk-konstant-traun-edelweiss")?.team).toBe(traun);
    expect(new Set(hla.standings.map((s) => teamSlug(s.team))).size).toBe(8);
  });

  it("next match is Nr. 25 against Innsbruck on 15.11.2026", () => {
    expect(nextMatch(hla, traun, "2026-11-06")).toMatchObject({ number: 25, date: "2026-11-15", away: "SMC Innsbruck Handball Tirol" });
  });

  it("an unplayed match from yesterday is not the next match", () => {
    const n25 = hla.matches.find((m) => m.number === 25)!;
    expect(nextMatch(hla, traun, "2026-11-16")?.number).not.toBe(n25.number);
    expect(nextMatch(hla, traun, "2026-11-16")!.date >= "2026-11-16").toBe(true);
  });

  it("home/away records add up to the table", () => {
    for (const s of hla.standings) {
      const { home, away } = homeAway(hla, s.team);
      expect([home.won + away.won, home.drawn + away.drawn, home.lost + away.lost]).toEqual([s.won, s.drawn, s.lost]);
    }
  });

  it("merges the rankings into one player table", () => {
    const players = teamPlayers(hla, traun);
    expect(players[0]).toMatchObject({ name: "HALILOVIC, Maid", goals: 35 });
    expect(players.some((p) => p.twoMin > 0)).toBe(true);
    expect(Object.keys(players[0]).sort()).toEqual(["goals", "name", "red", "sevenMAttempts", "sevenMGoals", "twoMin", "yellow"]);
  });
});

describe("player table reconciles with nuLiga team statistics", () => {
  it("player card and suspension sums never exceed the team totals (team totals include officials)", () => {
    for (const s of hla.standings) {
      const team = hla.groupStats!.teams.find((t) => t.name === s.team)!;
      const players = teamPlayers(hla, s.team);
      const sum = (k: "yellow" | "red" | "twoMin" | "goals") => players.reduce((a, p) => a + p[k], 0);
      expect(sum("yellow")).toBeLessThanOrEqual(team.yellow);
      expect(sum("red")).toBeLessThanOrEqual(team.red);
      expect(sum("twoMin")).toBeLessThanOrEqual(team.twoMin);
      expect(sum("goals")).toBeLessThanOrEqual(team.goals);
    }
  });
});
