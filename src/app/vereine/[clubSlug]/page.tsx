import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionsForTeam, data, matchesForClub, teamsForClub } from "@/data/query";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { MatchList, PageHeader, Panel } from "@/components/ui";

export default async function ClubPage({ params }: { params: Promise<{ clubSlug: string }> }) {
  const { clubSlug } = await params;
  const club = data.clubs.find((item) => item.slug === clubSlug);
  if (!club) notFound();
  const teams = teamsForClub(club.id);
  const matches = matchesForClub(club.id);
  return <>
    <PageHeader eyebrow="Verein / Spielgemeinschaft" title={club.name} description="Ein gemeinsamer Vereinskontext für mehrere Bewerbe. Die einzelnen Teamseiten bleiben pro Liga und Phase getrennt."><div className="mt-4"><FavoriteToggle id={club.id} kind="club" /></div></PageHeader>
    <h2 className="mb-3 mt-8 text-2xl font-black text-navy">Teams</h2><section className="grid gap-3 md:grid-cols-2">{teams.map((team) => {
      const competitions = competitionsForTeam(team.id);
      return <Panel className="p-4" key={team.id}><Link className="font-black text-navy hover:text-accent" href={`/teams/${team.slug}`}>{team.name}</Link><div className="mt-3 flex flex-wrap gap-2">{competitions.map((competition) => <Link className="chip" href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</div></Panel>;
    })}</section>
    <h2 className="mb-4 mt-8 text-2xl font-black text-navy">Spiele</h2><MatchList matches={matches} />
  </>;
}
