import { describe, expect, it } from "vitest";
import { getDataset } from "../data";
import { teamCalendar } from "./calendar";
import { allVenues, homeData, mapsUrl, resinRule } from "./dashboard";

const traun = "SK Konstant Traun / Edelweiss";

describe("home dashboard", () => {
  it("summarises Traun on 06.11.2026: next match links to the preview, last result to the report", () => {
    const t = homeData("2026-11-06").teams.find((c) => c.team === traun)!;
    expect(t.next).toMatchObject({ date: "2026-11-15", home: traun, away: "SMC Innsbruck Handball Tirol", href: "/hla-challenge-west/vorschau/25" });
    expect(t.last).toMatchObject({ opponent: "Bregenz Handball FT", own: 35, other: 37, result: "N" });
    expect(t.last?.href).toMatch(/^\/hla-challenge-west\/spiel\/\d+$/);
  });

  it("covers every team and competition", () => {
    const d = homeData("2026-11-06");
    expect(d.teams).toHaveLength(13);
    expect(d.competitions.map((c) => c.id)).toEqual(["hla-challenge-west", "landesliga-ooe"]);
  });
});

describe("venues", () => {
  it("map link and resin rule", () => {
    expect(mapsUrl(["Am Nordsaum 160", "4050 Traun"], "Sportzentrum Traun")).toContain("destination=Sportzentrum%20Traun%2C%20Am%20Nordsaum%20160%2C%204050%20Traun");
    expect(resinRule("erlaubt Besonderes Haftmittel: nur wasserlösliche Haftmittel zugelassen")).toEqual({ rule: "erlaubt", note: "nur wasserlösliche Haftmittel zugelassen" });
    expect(allVenues().get("18346")?.venue.name).toBe("Handball-Arena Bregenz");
  });
});

describe("calendar", () => {
  it("has all 14 Traun fixtures with venue", () => {
    const ics = teamCalendar(getDataset("hla-challenge-west")!, traun, "HLA Challenge West", new Date("2026-11-01T12:00:00Z"));
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(14);
    expect(ics).toContain("DTSTART;TZID=Europe/Vienna:20261115T180000");
    expect(ics).toContain("SUMMARY:SK Konstant Traun / Edelweiss – SMC Innsbruck Handball Tirol");
    expect(ics).toContain("LOCATION:Sportzentrum Traun\\, Am Nordsaum 160\\, 4050 Traun");
    expect(ics.startsWith("BEGIN:VCALENDAR\r\n")).toBe(true);
  });
});
