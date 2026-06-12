import Link from "next/link";
import { ArrowIcon, TrophyIcon } from "@ui/icons";
import { hlaChallengePhases } from "@/data/competition-groups";

export function HlaChallengePhases() {
  return <section className="mt-8"><p className="eyebrow">Bewerbsstruktur 2025/26</p><h2 className="section-title mt-1">Phase auswählen</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Die HLA CHALLENGE besteht aus fünf öffentlichen nuLiga-Gruppen. Tabellen sind vollständig geprüft; Spielpläne bleiben ein klar gekennzeichneter Pilot-Ausschnitt.</p><div className="mt-5 grid gap-3 md:grid-cols-2">{hlaChallengePhases.map((phase) => <Link className="tile-interactive group p-4" href={`/bewerbe/${phase.competitionSlug}`} key={phase.slug}><div className="flex items-start justify-between gap-3"><span className="avatar team-soft-bg size-9 text-team"><TrophyIcon className="size-4" /></span><ArrowIcon className="size-4 text-faint transition group-hover:translate-x-1 group-hover:text-team" /></div><h3 className="mt-4 font-display font-extrabold tracking-tight text-ink">{phase.name}</h3><p className="mt-1 text-sm leading-5 text-muted">{phase.description}</p></Link>)}</div></section>;
}
