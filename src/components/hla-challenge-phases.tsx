import Link from "next/link";
import { ArrowIcon, TrophyIcon } from "@/components/icons";
import { hlaChallengePhases } from "@/data/competition-groups";

export function HlaChallengePhases() {
  return <section className="mt-7"><p className="eyebrow">Bewerbsstruktur 2025/26</p><h2 className="section-title mt-1">Phase auswählen</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Die HLA CHALLENGE besteht aus mehreren Bereichen. Die Demo zeigt die öffentlich bestätigte Struktur und veröffentlicht nur geprüfte Pilotdaten.</p><div className="mt-4 grid gap-3 md:grid-cols-2">{hlaChallengePhases.map((phase) => <Link className="surface-interactive group p-4" href={phase.scheduleHref ?? `/bewerbe/hla-challenge/phasen/${phase.slug}`} key={phase.slug}><div className="flex items-start justify-between gap-3"><div className="grid size-9 place-items-center rounded-xl bg-navy-50 text-navy"><TrophyIcon className="size-4" /></div><ArrowIcon className="size-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-accent" /></div><h3 className="mt-4 font-black text-navy">{phase.name}</h3><p className="mt-1 text-sm leading-5 text-slate-600">{phase.description}</p></Link>)}</div></section>;
}
