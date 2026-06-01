import { describe, expect, it } from "vitest";
import { FAVORITES_STORAGE_KEY, emptyFavorites, parseFavorites, readFavorites, toggleFavorite } from "./favorites";

describe("favorites", () => {
  it("stores public IDs only", () => {
    let value = "";
    const storage = { getItem: () => value, setItem: (_key: string, next: string) => { value = next; } };
    expect(toggleFavorite(storage, "team", "hc-urfahr").team).toEqual(["hc-urfahr"]);
    expect(JSON.parse(value)).toEqual({ competition: [], team: ["hc-urfahr"], club: [] });
    expect(toggleFavorite(storage, "team", "Not Allowed!").team).toEqual(["hc-urfahr"]);
  });

  it("sanitizes persisted unknown values", () => {
    expect(parseFavorites(JSON.stringify({ team: ["hc-urfahr", "Bad Value", 7], contact: ["private"] }))).toEqual({ competition: [], team: ["hc-urfahr"], club: [] });
  });

  it("fails gracefully when storage is unavailable", () => {
    const storage = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(readFavorites(storage)).toEqual(emptyFavorites());
    expect(toggleFavorite(storage, "club", "hc-urfahr")).toEqual(emptyFavorites());
  });

  it("uses versioned storage key", () => {
    expect(FAVORITES_STORAGE_KEY).toBe("handball-matchcenter:favorites:v1");
  });
});
