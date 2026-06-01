import { notFound } from "next/navigation";
import { data, byId, reportForMatch, teamName, venueName, visiblePlayerStatistics } from "@/data/query";
import { CalendarIcon, PinIcon } from "@/components/icons";
import { Metadata, Panel, Stat, StatusBadge } from "@/components/ui";
import { ShareButton } from "@/components/share-button";
import { mapsSearchUrl } from "@/lib/venue";

const statisticLabels = { goals: "Tore", sevenMetreThrows: "7-Meter", twoMinutePenalties: "2-Minuten", yellowCards: "Gelbe Karten", redCards: "Rote Karten" } as const;
const eventLabels = { "half-time": "Halbzeit", "full-time": "Endstand", goal: "Tor", "seven-metre": "7-Meter", "two-minute-penalty": "2-Minuten", "yellow-card": "Gelbe Karte", "red-card": "Rote Karte" };

export default async function MatchReportPage({ params }: { params: Promise<{ matchId: string }> }) {
  const match = byId(data.matches, (await params).matchId);
  if (!match) notFound();
  const competition = byId(data.competitions, match.competitionId);
  const report = reportForMatch(match.id);
  const publicReportUrl = match.publicReportUrl ?? report?.publicReportUrl;
  const playerStatistics = report ? visiblePlayerStatistics(report) : [];
  const date = new Intl.DateTimeFormat("de-AT", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Vienna" }).format(new Date(match.startsAt));
  const routeUrl = match.venueId ? mapsSearchUrl(venueName(match.venueId)) : undefined;
  return <><p className="eyebrow">{competition?.name} · Spielbericht</p><section className="mt-3 overflow-hidden rounded-4xl bg-navy text-white shadow-lift"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 px-5 py-4"><StatusBadge status={match.status} /><p className="flex items-center gap-1.5 text-xs font-bold text-blue-100"><CalendarIcon className="size-4" />{date}</p></div><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-8 text-center md:px-8"><h1 className="text-base font-black leading-tight md:text-2xl">{teamName(match.homeTeamId)}</h1><strong className="rounded-2xl bg-white/10 px-3 py-2 text-3xl tabular-nums tracking-tight md:text-5xl">{match.homeScore ?? "–"}:{match.awayScore ?? "–"}</strong><p className="text-base font-black leading-tight md:text-2xl">{teamName(match.awayTeamId)}</p></div><div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/15 px-4 py-3 text-xs font-bold text-blue-100"><span className="flex items-center gap-1.5"><PinIcon className="size-4" />{venueName(match.venueId)}</span>{match.halfTimeHomeScore !== undefined && <span>Halbzeit {match.halfTimeHomeScore}:{match.halfTimeAwayScore}</span>}</div></section>
    {report?.teamStatistics.length ? <section className="mt-7"><p className="eyebrow">Teamvergleich</p><h2 className="mt-1 text-2xl font-black text-navy">Statistiken</h2><div className="mt-4 grid gap-4 lg:grid-cols-2">{report.teamStatistics.map((statistics) => <Panel key={statistics.teamId}><h3 className="font-black text-navy">{teamName(statistics.teamId)}</h3><dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{Object.entries(statisticLabels).map(([key, label]) => <Stat key={key} label={label} value={statistics[key as keyof typeof statisticLabels] ?? "–"} />)}</dl></Panel>)}</div></section> : null}
    {report?.events.length ? <Panel className="mt-5"><p className="eyebrow">Chronologisch</p><h2 className="mt-1 text-xl font-black text-navy">Spielverlauf</h2><ol className="mt-4 space-y-3">{report.events.map((event, index) => <li className="grid grid-cols-[2.5rem_1fr] items-center gap-3 text-sm" key={`${event.minute}-${index}`}><strong className="grid size-10 place-items-center rounded-xl bg-navy text-white">{event.minute}&apos;</strong><span className="font-bold text-navy">{eventLabels[event.type]} {event.homeScore !== undefined && <span className="text-accent">{event.homeScore}:{event.awayScore}</span>}</span></li>)}</ol></Panel> : null}
    {playerStatistics.length ? <Panel className="mt-5"><h2 className="text-xl font-black text-navy">Spielerstatistik</h2></Panel> : null}
    {!report && <Panel className="mt-6"><h2 className="font-black text-navy">Keine Detailstatistiken verfügbar</h2><p className="mt-1 text-sm leading-6 text-slate-600">Für dieses Spiel liegt kein geprüfter interner Detailbericht vor.</p></Panel>}
    <div className="mt-5 flex flex-wrap gap-2"><a className="button-secondary" href={`/api/kalender/spiel/${match.id}`}>Termin exportieren</a><ShareButton title={`${teamName(match.homeTeamId)} - ${teamName(match.awayTeamId)}`} />{routeUrl && <a className="button-secondary" href={routeUrl} rel="noreferrer" target="_blank">In Google Maps öffnen</a>}{publicReportUrl && <a className="button-secondary" href={publicReportUrl}>Öffentlichen ÖHB-Bericht öffnen</a>}</div><div className="mt-6"><Metadata /></div></>;
}
