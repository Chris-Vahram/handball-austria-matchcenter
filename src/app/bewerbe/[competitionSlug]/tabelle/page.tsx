import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionBySlug, standingsForCompetition, teamName } from "@/data/query";
import { CompetitionSwitcher, EmptyState, Metadata, PageHeader } from "@/components/ui";

export default async function StandingsPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const competition = competitionBySlug((await params).competitionSlug);
  if (!competition) notFound();
  const standings = standingsForCompetition(competition.id);
  return <><CompetitionSwitcher activeId={competition.id} /><div className="mt-6"><PageHeader eyebrow={`${competition.name} · 2025/26`} title="Tabelle" description="Rang, Punkte und Torverhältnis auf einen Blick." /></div>
    {!standings ? <div className="mt-6"><EmptyState text="Für diesen Bewerb ist keine Tabelle verfügbar." resetHref={`/bewerbe/${competition.slug}`} action="Zum Bewerb" /></div> :
      <><ol className="mt-6 space-y-2 md:hidden">{standings.rows.map((row) => <li className="surface grid grid-cols-[2rem_1fr_auto] items-center gap-3 p-3" key={row.teamId}><span className={`grid size-8 place-items-center rounded-xl text-sm font-black ${row.rank <= 3 ? "bg-navy text-white" : "bg-navy-50 text-navy"}`}>{row.rank}</span><div className="min-w-0"><Link className="block truncate text-sm font-black text-navy" href={`/teams/${row.teamId}`}>{teamName(row.teamId)}</Link><p className="mt-1 text-xs font-bold text-slate-500">{row.played} Sp. · {row.goalsFor}:{row.goalsAgainst} Tore · <span className={row.goalDifference >= 0 ? "text-success" : "text-accent"}>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</span></p></div><div className="text-right"><strong className="block text-xl tabular-nums text-navy">{row.points}</strong><span className="text-[0.62rem] font-black uppercase tracking-wide text-slate-500">Punkte</span></div></li>)}</ol>
      <div className="surface mt-6 hidden overflow-hidden md:block"><table className="w-full text-left text-sm"><caption className="sr-only">Tabelle für {competition.name}</caption><thead className="bg-navy text-white"><tr><th className="p-4">#</th><th>Team</th><th>Sp.</th><th>S</th><th>U</th><th>N</th><th>Tore</th><th>+/-</th><th className="pr-4">Punkte</th></tr></thead><tbody>{standings.rows.map((row) => <tr className="border-t border-line transition hover:bg-navy-50" key={row.teamId}><td className="p-4 font-black text-navy">{row.rank}</td><td><Link className="font-black text-navy hover:text-accent" href={`/teams/${row.teamId}`}>{teamName(row.teamId)}</Link></td><td>{row.played}</td><td>{row.wins}</td><td>{row.draws}</td><td>{row.losses}</td><td>{row.goalsFor}:{row.goalsAgainst}</td><td className={row.goalDifference >= 0 ? "text-success" : "text-accent"}>{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</td><td className="pr-4 font-black text-navy">{row.points}</td></tr>)}</tbody></table></div></>}
    <div className="mt-5"><Metadata /></div></>;
}
