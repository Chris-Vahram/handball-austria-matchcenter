import { notFound } from "next/navigation";
import { competitionBySlug } from "@/data/query";
import { topScorersForCompetition } from "@/data/player-stats";
import { CompetitionSwitcher, Metadata, PageHeader, Tile } from "@ui/ui";
import { ScorerTable } from "@ui/scorer-table";

export default async function ScorersPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const competition = competitionBySlug((await params).competitionSlug);
  if (!competition) notFound();
  const { rows, released } = topScorersForCompetition(competition.id);
  return <><CompetitionSwitcher activeId={competition.id} /><div className="mt-6"><PageHeader eyebrow={`${competition.name} · 2025/26`} title="Torschützen" description="Tore, 7-Meter und Strafen pro Spieler aus geprüften öffentlichen Spielberichten." /></div>
    {released && rows.length ? <div className="mt-6"><ScorerTable rows={rows} /></div> : <Tile className="mt-6 border-dashed"><p className="eyebrow text-warn">Datenschutz-Gate</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">Spielerstatistik für diesen Bewerb noch nicht freigegeben</h2><p className="mt-2 text-sm leading-6 text-muted">{released ? "Für diesen Bewerb liegen noch keine geprüften Spielberichte mit Spielerdaten vor." : "Spieler-Tore werden nur aus freigegebenen, öffentlichen Erwachsenen-Berichten angezeigt. U18 und nicht freigegebene Bewerbe bleiben deaktiviert."}</p></Tile>}
    <div className="mt-5"><Metadata /></div></>;
}
