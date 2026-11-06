import { describe, expect, it } from "vitest";
import { readList, toggle, writeList } from "./favorites";

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
