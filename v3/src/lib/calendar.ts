import type { Dataset } from "../domain/schema";
import { teamMatches } from "./teams";

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const stamp = (date: string, time: string) => `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;

/** iCalendar (RFC 5545) with local Vienna times; matches without a time become all-day events. */
export function teamCalendar(data: Dataset, team: string, competitionName: string, now = new Date()): string {
  const dtstamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "Z");
  const events = teamMatches(data, team).map((m) => {
    const v = m.venueId ? data.venues[m.venueId] : undefined;
    const location = v ? [v.name, ...v.address].join(", ") : m.venue ?? "";
    const when = m.time
      ? [`DTSTART;TZID=Europe/Vienna:${stamp(m.date, m.time)}`, `DURATION:PT2H`]
      : [`DTSTART;VALUE=DATE:${m.date.replace(/-/g, "")}`];
    const result = m.score ? ` (${m.score.home}:${m.score.away})` : "";
    return [
      "BEGIN:VEVENT",
      `UID:${data.competitionId}-${m.number}@matchcenter-v3`,
      `DTSTAMP:${dtstamp}`,
      ...when,
      `SUMMARY:${esc(`${m.home} – ${m.away}${result}`)}`,
      `LOCATION:${esc(location)}`,
      `DESCRIPTION:${esc(`${competitionName}, Spiel Nr. ${m.number}, Runde ${m.round}. Quelle: nuLiga.`)}`,
      "END:VEVENT"
    ].join("\r\n");
  });
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Matchcenter v3//DE", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${esc(team)}`, ...events, "END:VCALENDAR", ""].join("\r\n");
}
