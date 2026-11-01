import { describe, expect, it } from "vitest";
import { mapsSearchUrl } from "./venue";

describe("venue navigation", () => {
  it("creates external search link from allowed hall name only", () => {
    expect(mapsSearchUrl("SMS Kleinmünchen, Linz")).toBe("https://www.google.com/maps/search/?api=1&query=SMS%20Kleinm%C3%BCnchen%2C%20Linz");
    expect(mapsSearchUrl()).toBeUndefined();
  });
});
