import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionsForTeam, data, matchesForClub, teamsForClub } from "@/data/query";
import { teamVars } from "@/lib/team-color";
import { FavoriteToggle } from "@ui/favorite-toggle";
import { MatchList, PageHeader, Tile, TeamAvatar } from "@ui/ui";

export default async function ClubPage({ params }: { params: Promise<{ clubSlug: string }> }) {
  const { clubSlug } = await params;
  const club = data.clubs.find((item) => item.slug === clubSlug);
  if (!club) notFound();
  const teams = teamsForClub(club.id);
  const matches = matchesForClub(club.id);
  return <div style={teamVars(club.id)}>
    <PageHeader eyebrow="Verein / Spielgemeinschaft" title={club.name} description="Ein gemeinsamer Vereinskontext für mehrere Bewerbe. Die einzelnen Teamseiten bleiben pro Liga und Phase getrennt."><div className="mt-4"><FavoriteToggle id={club.id} kind="club" /></div></PageHeader>
    <h2 className="mb-4 mt-8 font-display text-2xl font-extrabold tracking-tight text-ink">Teams</h2>
    <section className="grid gap-3 md:grid-cols-2">{teams.map((team) => {
      const competitions = competitionsForTeam(team.id);
      return <Tile className="p-4" key={team.id}><div className="flex items-center gap-3"><TeamAvatar name={team.name} clubId={team.clubId} className="size-10 text-sm" /><Link className="font-display font-extrabold tracking-tight text-ink hover:text-team" href={`/teams/${team.slug}`}>{team.name}</Link></div><div className="mt-3 flex flex-wrap gap-2">{competitions.map((competition) => <Link className="chip hover:text-team" href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</div></Tile>;
    })}</section>
    <h2 className="mb-4 mt-8 font-display text-2xl font-extrabold tracking-tight text-ink">Spiele</h2><MatchList matches={matches} />
  </div>;
}
