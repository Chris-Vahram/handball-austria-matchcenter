import Link from "next/link";
import { data, sortMatches } from "@/data/query";
import { CompetitionSwitcher, MatchCard, Metadata, Panel, SectionHeader } from "@/components/ui";
import { ArrowIcon, TrophyIcon } from "@/components/icons";

export default function Home() {
  const matches = sortMatches(data.matches);
  const nextMatch = matches.find((match) => match.startsAt >= new Date().toISOString()) ?? matches.at(-1);
  const latestMatches = matches.filter((match) => match.id !== nextMatch?.id).slice(-4).reverse();
  return <div className="space-y-9">
    <section className="relative overflow-hidden rounded-4xl bg-navy px-5 py-7 text-white shadow-lift md:px-8 md:py-10"><div className="absolute -right-14 -top-20 size-52 rounded-full border-[28px] border-white/5" /><div className="absolute -bottom-16 right-20 size-36 rounded-full border-[18px] border-accent/20" /><p className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-red-200">Matchday Hub · Österreich</p><h1 className="mt-3 max-w-2xl text-4xl font-black tracking-tight md:text-6xl">Dein Spiel.<br /><span className="text-red-200">Sofort im Blick.</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 md:text-base">Spielzeiten, Hallen, Ergebnisse und Tabellen. Für vier ausgewählte Handball-Bewerbe.</p><Link className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-accent-700" href="/bewerbe">Bewerb auswählen<ArrowIcon /></Link></section>
    <CompetitionSwitcher />
    {nextMatch && <section><SectionHeader eyebrow="Als Nächstes" title="Nächstes Spiel" /><MatchCard featured match={nextMatch} /></section>}
    <section><SectionHeader eyebrow="Ergebnisse & Termine" title="Aktuelle Spiele" action={<Link className="flex items-center gap-1 text-sm font-black text-navy hover:text-accent" href="/bewerbe">Alle Bewerbe<ArrowIcon /></Link>} /><div className="grid gap-3 lg:grid-cols-2">{latestMatches.map((match) => <MatchCard key={match.id} match={match} />)}</div></section>
    <Panel className="flex flex-col gap-4 sm:flex-row sm:items-center"><div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy"><TrophyIcon /></div><div className="min-w-0"><h2 className="font-black text-navy">Kontrollierte Pilotdaten</h2><Metadata /></div></Panel>
  </div>;
}
