import Link from "next/link";
import { competitionMatches, standingsForCompetition, topLevelCompetitions } from "@/data/query";
import { ArrowIcon, CalendarIcon, TrophyIcon } from "@/components/icons";
import { PageHeader } from "@/components/ui";

export default function CompetitionsPage() {
  return <><PageHeader eyebrow="Matchcenter" title="Bewerbe" description="Wähle deinen Bewerb. Jeder Bereich zeigt den vollständigen Spielplan und die aktuelle Tabelle im passenden Kontext." /><div className="mt-7 grid gap-4 md:grid-cols-2">{topLevelCompetitions.map((competition) => { const matches = competitionMatches(competition.id); const standings = standingsForCompetition(competition.id); return <Link className="surface-interactive group p-5" key={competition.id} href={`/bewerbe/${competition.slug}`}><div className="flex items-start justify-between gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-navy-50 text-navy"><TrophyIcon /></div><ArrowIcon className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-accent" /></div><p className="eyebrow mt-6">Saison 2025/26</p><h2 className="mt-1 text-xl font-black text-navy">{competition.name}</h2><div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-500"><span className="chip"><CalendarIcon className="size-3.5" />{matches.length} Spiele</span><span className="chip">{standings?.rows.length ?? 0} Teams</span></div></Link>; })}</div></>;
}
