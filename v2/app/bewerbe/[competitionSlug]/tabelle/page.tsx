import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionBySlug, standingsForCompetition, teamName } from "@/data/query";
import { CompetitionSwitcher, EmptyState, Metadata, PageHeader, TeamAvatar } from "@ui/ui";

export default async function StandingsPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const competition = competitionBySlug((await params).competitionSlug);
  if (!competition) notFound();
  const standings = standingsForCompetition(competition.id);
  return <><CompetitionSwitcher activeId={competition.id} /><div className="mt-6"><PageHeader eyebrow={`${competition.name} · 2025/26`} title="Tabelle" description="Rang, Punkte und Torverhältnis auf einen Blick." /></div>
    {!standings ? <div className="mt-6"><EmptyState text="Für diesen Bewerb ist keine Tabelle verfügbar." resetHref={`/bewerbe/${competition.slug}`} action="Zum Bewerb" /></div> :
      <>
        <ol className="mt-6 space-y-2 md:hidden">{standings.rows.map((row) => { const relegation = row.rank > standings.rows.length - 2; return <li className={`tile grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 p-3 ${relegation ? "border-loss/30" : ""}`} key={row.teamId}>
          <span className={`avatar num size-9 text-sm ${row.rank === 1 ? "team-bg" : row.rank <= 3 ? "team-soft-bg text-team" : "bg-canvas text-muted"}`}>{row.rank}</span>
          <div className="flex min-w-0 items-center gap-2"><TeamAvatar name={teamName(row.teamId)} teamId={row.teamId} className="size-7 text-[0.55rem]" /><div className="min-w-0"><Link className="block truncate text-sm font-bold text-ink hover:text-team" href={`/teams/${row.teamId}`}>{teamName(row.teamId)}</Link><p className="num mt-0.5 text-[0.68rem] text-muted">{row.played} Sp · {row.goalsFor}:{row.goalsAgainst} · <span className={row.goalDifference >= 0 ? "text-win" : "text-loss"}>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</span></p></div></div>
          <div className="text-right"><strong className="num block text-2xl font-extrabold text-ink">{row.points}</strong><span className="text-[0.55rem] font-extrabold uppercase tracking-wider text-faint">Punkte</span></div>
        </li>; })}</ol>
        <div className="tile mt-6 overflow-hidden max-md:hidden"><table className="hidden w-full text-left text-sm md:table"><caption className="sr-only">Tabelle für {competition.name}</caption><thead className="border-b border-line bg-canvas text-[0.62rem] uppercase tracking-wider text-muted"><tr><th className="p-4">#</th><th>Team</th><th>Sp</th><th>S</th><th>U</th><th>N</th><th>Tore</th><th>+/-</th><th className="pr-4">Punkte</th></tr></thead><tbody>{standings.rows.map((row) => <tr className="border-t border-line transition hover:bg-canvas" key={row.teamId}><td className="num p-4 font-extrabold text-ink">{row.rank}</td><td><Link className="font-semibold text-ink hover:text-team" href={`/teams/${row.teamId}`}>{teamName(row.teamId)}</Link></td><td className="num text-muted">{row.played}</td><td className="num text-muted">{row.wins}</td><td className="num text-muted">{row.draws}</td><td className="num text-muted">{row.losses}</td><td className="num text-muted">{row.goalsFor}:{row.goalsAgainst}</td><td className={`num ${row.goalDifference >= 0 ? "text-win" : "text-loss"}`}>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</td><td className="num pr-4 font-extrabold text-ink">{row.points}</td></tr>)}</tbody></table></div>
      </>}
    <div className="mt-5"><Metadata {...standings?.metadata} /></div></>;
}
