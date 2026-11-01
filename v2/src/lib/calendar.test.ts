import { describe, expect, it } from "vitest";
import { calendarFile, matchCalendarEvent } from "./calendar";
import { curatedDataset } from "@/data/curated";

describe("calendar export", () => {
  it("creates deterministic public fixture calendar", () => {
    const event = matchCalendarEvent(curatedDataset.matches[0], { competitionName: "Liga", homeName: "Home", awayName: "Away", venueName: "Halle, Linz", sourceReference: curatedDataset.metadata.sourceReference, generatedAt: "2026-06-01T00:00:00.000Z" });
    expect(calendarFile("Team", [event])).toContain("DTSTART:20251003T181500Z");
    expect(event).toContain("LOCATION:Halle\\, Linz");
    expect(event).not.toContain("email");
  });
});
