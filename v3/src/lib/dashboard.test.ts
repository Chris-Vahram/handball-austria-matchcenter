import { describe, expect, it } from "vitest";
import { getDataset } from "../data";
import { teamCalendar } from "./calendar";
import { allTeamCards, allVenues, mapsUrl, resinRule } from "./dashboard";

const traun = "SK Konstant Traun / Edelweiss";

describe("home dashboard", () => {
  it("summarises Traun: next match with venue, last result, rank", () => {
    const card = allTeamCards().find((c) => c.team === traun)!;
    expect(card).toMatchObject({ rank: 7, points: 6, record: "3-0-3", href: "/hla-challenge-west/team/sk-konstant-traun-edelweiss" });
    expect(card.next).toMatchObject({ date: "2026-11-15", opponent: "SMC Innsbruck Handball Tirol", home: true, number: 25 });
    expect(card.next?.venue).toMatchObject({ name: "Sportzentrum Traun", address: ["Am Nordsaum 160", "4050 Traun"] });
    expect(card.last).toMatchObject({ opponent: "Bregenz Handball FT", own: 35, other: 37, result: "N" });
  });

  it("covers every team of both competitions", () => {
    expect(allTeamCards()).toHaveLength(13);
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
