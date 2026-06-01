import Link from "next/link";
import { notFound } from "next/navigation";
import { data, filterMatchesAcrossCompetitions } from "@/data/query";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { MatchList, PageHeader } from "@/components/ui";

export default async function ClubPage({ params }: { params: Promise<{ clubSlug: string }> }) {
  const { clubSlug } = await params;
  const club = data.clubs.find((item) => item.slug === clubSlug);
  if (!club) notFound();
  const teams = data.teams.filter((team) => team.clubId === club.id);
  const matches = filterMatchesAcrossCompetitions(data.matches, { club: club.id });
  return <>
    <PageHeader eyebrow="Verein" title={club.name} description="Teams und Bewerbsspiele dieses Vereins im Matchcenter."><div className="mt-4"><FavoriteToggle id={club.id} kind="club" /></div></PageHeader>
    <h2 className="mb-3 mt-8 text-2xl font-black text-navy">Teams</h2><div className="grid gap-3 sm:grid-cols-2">{teams.map((team) => <Link className="surface-interactive p-4 font-black text-navy hover:text-accent" key={team.id} href={`/teams/${team.slug}`}>{team.name}</Link>)}</div>
    <h2 className="mb-4 mt-8 text-2xl font-black text-navy">Spiele</h2><MatchList matches={matches} />
  </>;
}
