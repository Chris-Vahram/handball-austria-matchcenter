import { byId, data, teamName, venueName } from "@/data/query";
import { calendarFile, calendarResponse, matchCalendarEvent } from "@/lib/calendar";

export function GET(_request: Request, { params }: { params: Promise<{ matchId: string }> }) {
  return params.then(({ matchId }) => {
    const match = byId(data.matches, matchId);
    if (!match) return new Response("Spiel nicht gefunden", { status: 404 });
    const competition = byId(data.competitions, match.competitionId);
    const generatedAt = new Date().toISOString();
    const event = matchCalendarEvent(match, { competitionName: competition?.name ?? "Handball", homeName: teamName(match.homeTeamId), awayName: teamName(match.awayTeamId), venueName: venueName(match.venueId), sourceReference: data.metadata.sourceReference, generatedAt });
    return calendarResponse(calendarFile(`${teamName(match.homeTeamId)} - ${teamName(match.awayTeamId)}`, [event]), `${match.id}.ics`);
  });
}
