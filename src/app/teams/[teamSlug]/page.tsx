import Link from "next/link";
import { notFound } from "next/navigation";
import { data, filterMatchesAcrossCompetitions } from "@/data/query";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { MatchList, PageHeader } from "@/components/ui";

export default async function TeamPage({ params }: { params: Promise<{ teamSlug: string }> }) {
  const { teamSlug } = await params;
  const team = data.teams.find((item) => item.slug === teamSlug);
  if (!team) notFound();
  const club = data.clubs.find((item) => item.id === team.clubId);
  const matches = filterMatchesAcrossCompetitions(data.matches, { team: team.id });
  const competitions = data.competitions.filter((competition) => matches.some((match) => match.competitionId === competition.id));
  return <>
    <PageHeader eyebrow="Team" title={team.name}>
      <p className="mt-3 text-sm text-slate-600">Verein: <Link className="font-black text-navy underline decoration-slate-300 underline-offset-2" href={`/vereine/${club?.slug}`}>{club?.name}</Link></p>
      <div className="mt-4 flex flex-wrap gap-2">{competitions.map((competition) => <Link className="chip" href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</div>
      <div className="mt-4"><FavoriteToggle id={team.id} kind="team" /></div>
      <a className="button-secondary mt-3" href={`/api/kalender/team/${team.id}`}>Team-Kalender exportieren</a>
    </PageHeader>
    <h2 className="mb-4 mt-8 text-2xl font-black text-navy">Spiele</h2><MatchList matches={matches} />
  </>;
}
