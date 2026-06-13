import Link from "next/link";
import { notFound } from "next/navigation";
import { data, standingsForCompetition, teamInsights, teamName, venueName } from "@/data/query";
import { topScorersForTeam } from "@/data/player-stats";
import { teamVars } from "@/lib/team-color";
import { ArrowIcon } from "@ui/icons";
import { FavoriteToggle } from "@ui/favorite-toggle";
import { MatchList, Tile, TeamAvatar } from "@ui/ui";
import { NextMatchTile, FormTile, TableTile, LastResultTile, QuickLinksTile } from "@ui/tiles";

export default async function TeamPage({ params }: { params: Promise<{ teamSlug: string }> }) {
  const { teamSlug } = await params;
  const team = data.teams.find((item) => item.slug === teamSlug);
  if (!team) notFound();
  const club = data.clubs.find((item) => item.id === team.clubId);
  const insights = teamInsights(team.id);
  const competitions = data.competitions.filter((competition) => insights.matches.some((match) => match.competitionId === competition.id));
  const standings = insights.standingsCompetition ? standingsForCompetition(insights.standingsCompetition.id) : undefined;
  const topScorers = topScorersForTeam(team.id);
  return <div className="space-y-8" style={teamVars(team.clubId)}>
    <header className="tile team-soft-bg border-0 p-6 md:p-8">
      <p className="eyebrow-team">Team</p>
      <div className="mt-3 flex items-center gap-4"><TeamAvatar name={team.name} clubId={team.clubId} className="size-14 text-lg" /><h1 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{team.name}</h1></div>
      <p className="mt-3 text-sm text-muted">Verein: <Link className="font-bold text-team underline decoration-line underline-offset-2" href={`/vereine/${club?.slug}`}>{club?.name}</Link></p>
      <div className="mt-4 flex flex-wrap gap-2">{competitions.map((competition) => <Link className="chip hover:text-team" href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</div>
      {club && <div className="mt-5"><FavoriteToggle id={club.id} kind="club" /></div>}
    </header>

    <section className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2 md:row-span-2">{insights.nextMatch ? <NextMatchTile match={insights.nextMatch} /> : <LastResultTile match={insights.latestResult} />}</div>
      <TableTile row={insights.standingsRow} competitionName={insights.standingsCompetition?.name} totalTeams={standings?.rows.length} />
      <FormTile form={insights.form} />
      {insights.nextMatch && <LastResultTile match={insights.latestResult} />}
      <div className="md:col-span-2"><QuickLinksTile teamSlug={team.slug} teamId={team.id} venue={insights.nextMatch ? venueName(insights.nextMatch.venueId) : undefined} /></div>
    </section>

    {topScorers.length > 0 && <section><div className="mb-4 flex items-end justify-between gap-3"><h2 className="section-title">Top-Torschützen</h2>{insights.standingsCompetition && <Link className="text-sm font-bold text-team" href={`/bewerbe/${insights.standingsCompetition.slug}/torschuetzen`}>Ganze Liste →</Link>}</div><Tile className="divide-y divide-line p-0">{topScorers.map((scorer, index) => <div className="flex items-center gap-3 px-4 py-3" key={scorer.ref}><span className="num w-5 text-center font-extrabold text-muted">{index + 1}</span><span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{index === 0 && <span aria-hidden="true" className="mr-1 text-team">★</span>}{scorer.displayLabel}</span><span className="num shrink-0 text-sm font-extrabold text-team">{scorer.goals} <span className="text-[0.7rem] font-bold text-muted">Tore</span></span></div>)}</Tile></section>}

    {insights.reportMatches.length > 0 && <section><h2 className="section-title mb-4">Spielberichte</h2><div className="grid gap-3 md:grid-cols-2">{insights.reportMatches.map((match) => <Link className="tile-interactive group flex items-center justify-between gap-3 p-4" href={`/spiele/${match.id}`} key={match.id}><span className="flex min-w-0 items-center gap-2 text-sm font-bold text-ink"><TeamAvatar name={teamName(match.homeTeamId)} teamId={match.homeTeamId} className="size-6 text-[0.5rem]" /><span className="truncate">{teamName(match.homeTeamId)} : {teamName(match.awayTeamId)}</span></span><ArrowIcon className="size-4 shrink-0 text-team" /></Link>)}</div></section>}

    <section><h2 className="section-title mb-4">Alle Spiele</h2><MatchList matches={insights.matches} highlightTeamId={team.id} /></section>
  </div>;
}
