import Link from "next/link";
import { competitionMatches, standingsForCompetition, topLevelCompetitions } from "@/data/query";
import { ArrowIcon, CalendarIcon, TrophyIcon } from "@ui/icons";
import { Stagger, StaggerItem } from "@ui/motion";

export function CompetitionsGrid() {
  return <Stagger className="grid gap-4 md:grid-cols-2">{topLevelCompetitions.map((competition) => {
    const matches = competitionMatches(competition.id);
    const standings = standingsForCompetition(competition.id);
    return <StaggerItem key={competition.id}><Link className="tile-interactive group flex h-full flex-col p-5" href={`/bewerbe/${competition.slug}`}>
      <div className="flex items-start justify-between gap-3"><span className="avatar team-soft-bg size-11 text-team"><TrophyIcon className="size-5" /></span><ArrowIcon className="size-5 text-faint transition group-hover:translate-x-1 group-hover:text-team" /></div>
      <p className="eyebrow mt-6">Saison 2025/26</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">{competition.name}</h2>
      <div className="mt-4 flex flex-wrap gap-2"><span className="chip"><CalendarIcon className="size-3.5" />{matches.length} Spiele</span><span className="chip">{standings?.rows.length ?? 0} Teams</span></div>
    </Link></StaggerItem>;
  })}</Stagger>;
}
