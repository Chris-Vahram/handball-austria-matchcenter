import { byId, data, filterMatchesAcrossCompetitions, teamName, venueName } from "@/data/query";
import { calendarFile, calendarResponse, matchCalendarEvent } from "@/lib/calendar";

export function GET(_request: Request, { params }: { params: Promise<{ teamId: string }> }) {
  return params.then(({ teamId }) => {
    const team = byId(data.teams, teamId);
    if (!team) return new Response("Team nicht gefunden", { status: 404 });
    const generatedAt = new Date().toISOString();
    const events = filterMatchesAcrossCompetitions(data.matches, { team: teamId }).map((match) => matchCalendarEvent(match, { competitionName: byId(data.competitions, match.competitionId)?.name ?? "Handball", homeName: teamName(match.homeTeamId), awayName: teamName(match.awayTeamId), venueName: venueName(match.venueId), sourceReference: data.metadata.sourceReference, generatedAt }));
    return calendarResponse(calendarFile(team.name, events), `${team.id}.ics`);
  });
}
