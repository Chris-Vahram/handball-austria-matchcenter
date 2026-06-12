import Link from "next/link";
import { competitionMatches, data, standingsForCompetition, topLevelCompetitions } from "@/data/query";
import { ArrowIcon, CalendarIcon, TrophyIcon } from "@ui/icons";
import { Stagger, StaggerItem } from "@ui/motion";

const categoryLabel: Record<string, string> = { adult: "Erwachsene", u18: "U18", u16: "U16" };

export function VerbandBrowse() {
  const associations = data.associations.filter((association) => topLevelCompetitions.some((competition) => competition.associationId === association.id));
  return <div className="space-y-10">{associations.map((association) => {
    const competitions = topLevelCompetitions.filter((competition) => competition.associationId === association.id);
    return <section key={association.id}>
      <div className="mb-4 flex items-center gap-3"><span className="avatar team-soft-bg size-10 text-team"><TrophyIcon className="size-5" /></span><div><p className="text-[0.7rem] font-extrabold uppercase tracking-wider text-muted">Verband</p><h2 className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">{association.name}</h2></div></div>
      <Stagger className="grid gap-4 md:grid-cols-2">{competitions.map((competition) => {
        const matches = competitionMatches(competition.id);
        const standings = standingsForCompetition(competition.id);
        return <StaggerItem key={competition.id}><Link className="tile-interactive group flex h-full flex-col p-5" href={`/bewerbe/${competition.slug}`}>
          <div className="flex items-start justify-between gap-3"><span className="chip-team">{categoryLabel[competition.category] ?? "Bewerb"}</span><ArrowIcon className="size-5 text-faint transition group-hover:translate-x-1 group-hover:text-team" /></div>
          <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-ink">{competition.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2"><span className="chip"><CalendarIcon className="size-3.5" />{matches.length} Spiele</span><span className="chip">{standings?.rows.length ?? 0} Teams</span></div>
        </Link></StaggerItem>;
      })}</Stagger>
    </section>;
  })}</div>;
}
