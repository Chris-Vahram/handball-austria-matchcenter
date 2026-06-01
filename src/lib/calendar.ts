import type { Match } from "@/domain/schema";

const escape = (value: string) => value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
const stamp = (value: string) => value.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function matchCalendarEvent(match: Match, options: { competitionName: string; homeName: string; awayName: string; venueName?: string; sourceReference: string; generatedAt: string }) {
  const summary = `${options.homeName} - ${options.awayName}`;
  return ["BEGIN:VEVENT", `UID:${escape(match.id)}@handball-matchcenter`, `DTSTAMP:${stamp(options.generatedAt)}`, `DTSTART:${stamp(match.startsAt)}`, `SUMMARY:${escape(summary)}`, `DESCRIPTION:${escape(`${options.competitionName}\\nQuelle: ${options.sourceReference}\\nGeneriert: ${options.generatedAt}`)}`, ...(options.venueName ? [`LOCATION:${escape(options.venueName)}`] : []), "END:VEVENT"].join("\r\n");
}

export function calendarFile(name: string, events: string[]) {
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Handball Matchcenter Pilot//DE", "CALSCALE:GREGORIAN", `X-WR-CALNAME:${escape(name)}`, ...events, "END:VCALENDAR", ""].join("\r\n");
}

export const calendarResponse = (body: string, filename: string) => new Response(body, { headers: { "content-disposition": `attachment; filename="${filename}"`, "content-type": "text/calendar; charset=utf-8" } });
