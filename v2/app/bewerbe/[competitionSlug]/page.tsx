import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionMatches, data, standingsForCompetition } from "@/data/query";
import { topScorersForCompetition } from "@/data/player-stats";
import { ArrowIcon, CalendarIcon, HandballIcon, TrophyIcon } from "@ui/icons";
import { FavoriteToggle } from "@ui/favorite-toggle";
import { HlaChallengePhases } from "@ui/hla-challenge-phases";
import { CompetitionSwitcher, PageHeader } from "@ui/ui";

export default async function CompetitionPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;
  const competition = data.competitions.find((item) => item.slug === competitionSlug);
  if (!competition) notFound();
  const matches = competitionMatches(competition.id);
  const standings = standingsForCompetition(competition.id);
  const scorers = topScorersForCompetition(competition.id);
  const isHlaChallenge = competition.id === "hla-challenge";
  return <>
    <CompetitionSwitcher activeId={competition.id} />
    <div className="mt-6"><PageHeader eyebrow="Saison 2025/26" title={competition.name} description={isHlaChallenge ? "Wähle zuerst die passende Phase. Spielplan und Tabelle bleiben im korrekten Bewerbskontext." : "Spielplan und Tabellenstand kompakt, mobil und im offiziellen Bewerbskontext."}><div className="mt-4"><FavoriteToggle id={competition.id} kind="competition" /></div></PageHeader></div>
    {isHlaChallenge && <HlaChallengePhases />}
    {!isHlaChallenge && <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Link className="tile-interactive group p-5" href={`/bewerbe/${competition.slug}/spielplan`}><span className="avatar team-soft-bg size-11 text-team"><CalendarIcon className="size-5" /></span><p className="eyebrow mt-6">Alle Termine</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">Spielplan</h2><p className="mt-2 text-sm text-muted">{matches.length} Spiele mit Hallen und Ergebnissen.</p><span className="mt-5 flex items-center gap-1 text-sm font-extrabold text-team">Spielplan öffnen<ArrowIcon /></span></Link>
      <Link className="tile-interactive group p-5" href={`/bewerbe/${competition.slug}/tabelle`}><span className="avatar team-soft-bg size-11 text-team"><TrophyIcon className="size-5" /></span><p className="eyebrow mt-6">Rangliste</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">Tabelle</h2><p className="mt-2 text-sm text-muted">{standings?.rows.length ?? 0} Teams mit Punkten und Torverhältnis.</p><span className="mt-5 flex items-center gap-1 text-sm font-extrabold text-team">Tabelle öffnen<ArrowIcon /></span></Link>
      <Link className="tile-interactive group p-5" href={`/bewerbe/${competition.slug}/torschuetzen`}><span className="avatar team-soft-bg size-11 text-team"><HandballIcon className="size-5" /></span><p className="eyebrow mt-6">Torjäger</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">Torschützen</h2><p className="mt-2 text-sm text-muted">{scorers.released && scorers.rows.length ? `${scorers.rows.length} Spieler aus geprüften Berichten.` : "Nur aus freigegebenen Erwachsenen-Berichten."}</p><span className="mt-5 flex items-center gap-1 text-sm font-extrabold text-team">Torschützen öffnen<ArrowIcon /></span></Link>
    </div>}
  </>;
}
