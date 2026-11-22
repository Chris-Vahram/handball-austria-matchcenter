import { describe, expect, it } from "vitest";
import { myLists, readList, toggle, writeList, type HomeCompetition, type HomeTeam } from "./favorites";

const memory = () => { const m = new Map<string, string>(); return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v) }; };

describe("favorites", () => {
  it("round-trips a list and toggles items", () => {
    const s = memory();
    writeList(s, "k", toggle(toggle([], "a"), "b"));
    expect(readList(s, "k")).toEqual(["a", "b"]);
    expect(toggle(["a", "b"], "a")).toEqual(["b"]);
  });

  it("survives broken JSON, wrong types and missing storage", () => {
    const s = memory();
    s.setItem("k", "{oops");
    expect(readList(s, "k")).toEqual([]);
    s.setItem("k", JSON.stringify(["a", 3, null]));
    expect(readList(s, "k")).toEqual(["a"]);
    expect(readList(undefined, "k")).toEqual([]);
    const throwing = { getItem: () => { throw new Error("denied"); }, setItem: () => { throw new Error("quota"); } };
    expect(readList(throwing, "k")).toEqual([]);
    expect(() => writeList(throwing, "k", ["a"])).not.toThrow();
  });
});

const team = (key: string, competitionId: string, next: string | null, last = true): HomeTeam => ({
  key, team: key.split("|")[1], competitionId, competition: competitionId,
  next: next ? { date: next, time: "18:00", home: key.split("|")[1], away: "X", href: `/${competitionId}/vorschau/1` } : null,
  last: last ? { opponent: "X", home: true, own: 30, other: 28, result: "S", href: null } : null
});
const comps: HomeCompetition[] = [
  { id: "a", name: "Liga A", standings: [{ key: "a|Eins", team: "Eins", rank: 1, points: 10 }, { key: "a|Zwei", team: "Zwei", rank: 2, points: 8 }] },
  { id: "b", name: "Liga B", standings: [{ key: "b|Drei", team: "Drei", rank: 1, points: 4 }] }
];

describe("home lists", () => {
  const teams = [team("a|Eins", "a", "2026-12-05"), team("a|Zwei", "a", "2026-11-28"), team("b|Drei", "b", null)];

  it("sorts next matches by date and leaves out teams without one, but keeps them under Zuletzt", () => {
    const l = myLists(teams, comps, ["a|Eins", "a|Zwei", "b|Drei"], []);
    expect(l.next.map((t) => t.team)).toEqual(["Zwei", "Eins"]);
    expect(l.last.map((t) => t.team)).toEqual(["Eins", "Zwei", "Drei"]);
  });

  it("lists the Bewerb of a favorite team once with the favorite rows", () => {
    const l = myLists(teams, comps, ["a|Eins", "a|Zwei"], ["a"]);
    expect(l.bewerbe).toEqual([{ id: "a", name: "Liga A", rows: [
      { team: "Eins", rank: 1, points: 10, favorite: true }, { team: "Zwei", rank: 2, points: 8, favorite: true }] }]);
  });

  it("falls back to the leader when no favorite team plays in a followed Bewerb; ignores unknown keys", () => {
    const l = myLists(teams, comps, ["gone|Team"], ["b", "unknown"]);
    expect(l.bewerbe).toEqual([{ id: "b", name: "Liga B", rows: [{ team: "Drei", rank: 1, points: 4, favorite: false }] }]);
    expect(l.next).toEqual([]);
  });
});
