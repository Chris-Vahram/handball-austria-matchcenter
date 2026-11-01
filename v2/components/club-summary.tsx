import Link from "next/link";
import { byId, data, matchesForClub, teamInsights, teamsForClub } from "@/data/query";
import { teamVars } from "@/lib/team-color";
import { MatchRow, TeamAvatar, Tile } from "@ui/ui";
import { ArrowIcon } from "@ui/icons";

const now = () => new Date().toISOString();

/** Cross-Bewerb overview of one club: upcoming games across all competitions + team standings. */
export function ClubSummary({ clubId }: { clubId: string }) {
  const club = byId(data.clubs, clubId);
  if (!club) return null;
  const teams = teamsForClub(clubId);
  const all = matchesForClub(clubId);
  const upcoming = all.filter((match) => match.startsAt >= now() && match.status === "scheduled").slice(0, 3);
  const recent = all.filter((match) => match.status === "finished").slice(-2).reverse();
  const shown = upcoming.length ? upcoming : recent;
  return <div style={teamVars(clubId)} className="space-y-4">
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3"><TeamAvatar name={club.name} clubId={clubId} className="size-12 text-base" /><div className="min-w-0"><h2 className="truncate font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">{club.name}</h2><Link className="text-xs font-bold text-team" href={`/vereine/${club.slug}`}>Vereinsseite öffnen →</Link></div></div>
    </div>
    <div>
      <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-muted">{upcoming.length ? "Nächste Spiele · alle Bewerbe" : "Letzte Ergebnisse"}</p>
      {shown.length ? <div className="grid gap-3 md:grid-cols-2">{shown.map((match) => <MatchRow key={match.id} match={match} />)}</div> : <Tile className="text-sm text-muted">Aktuell keine Spiele in den Demo-Daten.</Tile>}
    </div>
    {teams.length > 0 && <div>
      <p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-muted">Teams & Tabelle</p>
      <div className="grid gap-2 md:grid-cols-2">{teams.map((team) => {
        const insights = teamInsights(team.id);
        return <Link className="tile-interactive flex items-center justify-between gap-3 p-3.5" href={`/teams/${team.slug}`} key={team.id}>
          <span className="min-w-0"><span className="block truncate text-sm font-bold text-ink">{team.name}</span><span className="text-xs text-muted">{insights.standingsCompetition?.name ?? "Kein Tabellenkontext"}</span></span>
          {insights.standingsRow ? <span className="num shrink-0 rounded-xl team-soft-bg px-2.5 py-1 text-sm font-extrabold text-team">{insights.standingsRow.rank}. · {insights.standingsRow.points} P</span> : <ArrowIcon className="size-4 shrink-0 text-faint" />}
        </Link>;
      })}</div>
    </div>}
  </div>;
}
