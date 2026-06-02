import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionMatches, data, standingsForCompetition } from "@/data/query";
import { ArrowIcon, CalendarIcon, TrophyIcon } from "@/components/icons";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { HlaChallengePhases } from "@/components/hla-challenge-phases";
import { CompetitionSwitcher, PageHeader } from "@/components/ui";

export default async function CompetitionPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;
  const competition = data.competitions.find((item) => item.slug === competitionSlug);
  if (!competition) notFound();
  const matches = competitionMatches(competition.id);
  const standings = standingsForCompetition(competition.id);
  const isHlaChallenge = competition.id === "hla-challenge";
  return <>
    <CompetitionSwitcher activeId={competition.id} />
    <div className="mt-6"><PageHeader eyebrow="Saison 2025/26" title={competition.name} description={isHlaChallenge ? "Wähle zuerst die passende Phase. Spielplan und Tabelle bleiben im korrekten Bewerbskontext." : "Spielplan und Tabellenstand kompakt, mobil und im offiziellen Bewerbskontext."}><div className="mt-4"><FavoriteToggle id={competition.id} kind="competition" /></div></PageHeader></div>
    {isHlaChallenge && <HlaChallengePhases />}
    {!isHlaChallenge && <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <Link className="surface-interactive group p-5" href={`/bewerbe/${competition.slug}/spielplan`}><CalendarIcon className="size-6 text-accent" /><p className="eyebrow mt-7">{isHlaChallenge ? "Aufstiegsrunde" : "Alle Termine"}</p><h2 className="mt-1 text-xl font-black text-navy">Spielplan</h2><p className="mt-2 text-sm text-slate-600">{matches.length} Spiele mit Hallen und Ergebnissen.</p><span className="mt-5 flex items-center gap-1 text-sm font-black text-accent">Vollständigen Spielplan öffnen<ArrowIcon /></span></Link>
      <Link className="surface-interactive group p-5" href={`/bewerbe/${competition.slug}/tabelle`}><TrophyIcon className="size-6 text-accent" /><p className="eyebrow mt-7">Rangliste</p><h2 className="mt-1 text-xl font-black text-navy">Tabelle</h2><p className="mt-2 text-sm text-slate-600">{standings?.rows.length ?? 0} Teams mit Punkten und Torverhältnis.</p><span className="mt-5 flex items-center gap-1 text-sm font-black text-accent">Tabelle öffnen<ArrowIcon /></span></Link>
    </div>}
  </>;
}
