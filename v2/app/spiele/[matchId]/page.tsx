import { notFound } from "next/navigation";
import { data, byId, reportForMatch, teamName, venueName, visiblePlayerStatistics } from "@/data/query";
import Link from "next/link";
import { goalShare, playerSlug } from "@/data/player-stats";
import { teamVars } from "@/lib/team-color";
import { Metadata, Tile, TeamAvatar, StatusBadge } from "@ui/ui";
import { ShareButton } from "@ui/share-button";
import { CalendarIcon, PinIcon } from "@ui/icons";
import { mapsSearchUrl } from "@/lib/venue";

const statisticLabels = { goals: "Tore", sevenMetreThrows: "7-Meter", twoMinutePenalties: "2-Minuten", yellowCards: "Gelbe Karten", redCards: "Rote Karten" } as const;
const playerStatisticLabels = { goals: "Tore", sevenMetre: "7m", twoMinutePenalties: "2 Min.", yellowCards: "Gelb", redCards: "Rot" } as const;
const eventLabels = { "half-time": "Halbzeit", "full-time": "Endstand", goal: "Tor", "seven-metre": "7-Meter-Tor", "seven-metre-missed": "7-Meter vergeben", "two-minute-penalty": "2-Minuten", "yellow-card": "Gelbe Karte", "red-card": "Rote Karte", timeout: "Auszeit" };
const eventTone = { "half-time": "bg-canvas text-ink-700", "full-time": "bg-canvas text-ink-700", goal: "bg-win-soft text-win", "seven-metre": "bg-win-soft text-win", "seven-metre-missed": "bg-warn-soft text-warn", "two-minute-penalty": "bg-loss-soft text-loss", "yellow-card": "bg-warn-soft text-warn", "red-card": "bg-loss-soft text-loss", timeout: "bg-canvas text-muted" };
const eventDot = { "half-time": "bg-faint", "full-time": "bg-faint", goal: "bg-win", "seven-metre": "bg-win", "seven-metre-missed": "bg-warn", "two-minute-penalty": "bg-loss", "yellow-card": "bg-warn", "red-card": "bg-loss", timeout: "bg-faint" };
const sevenMetreValue = (goals?: number, attempts?: number) => goals === undefined || attempts === undefined ? "–" : attempts > 0 ? `${goals}/${attempts} (${Math.round((goals / attempts) * 100)}%)` : `${goals}/${attempts}`;

function ComparisonRow({ label, home, away }: { label: string; home: number; away: number }) {
  const max = Math.max(home, away, 1);
  return <div className="grid grid-cols-[2.5rem_1fr_auto_1fr_2.5rem] items-center gap-2 py-2.5">
    <strong className="num text-right text-sm font-extrabold text-team">{home}</strong>
    <div className="flex justify-end"><span className="h-2.5 rounded-full team-bg" style={{ width: `${(home / max) * 100}%` }} /></div>
    <span className="px-1 text-center text-[0.6rem] font-extrabold uppercase tracking-wider text-muted">{label}</span>
    <div className="flex justify-start"><span className="h-2.5 rounded-full bg-ink-700" style={{ width: `${(away / max) * 100}%` }} /></div>
    <strong className="num text-sm font-extrabold text-ink-700">{away}</strong>
  </div>;
}

function ScoreFlow({ points, homeLabel, awayLabel }: { points: { home: number; away: number }[]; homeLabel: string; awayLabel: string }) {
  if (points.length < 2) return null;
  const max = Math.max(...points.map((point) => Math.max(point.home, point.away)), 1);
  const width = 100;
  const height = 46;
  const x = (index: number) => (index / (points.length - 1)) * width;
  const y = (value: number) => height - (value / max) * height;
  const line = (key: "home" | "away") => points.map((point, index) => `${index === 0 ? "M" : "L"}${x(index).toFixed(2)} ${y(point[key]).toFixed(2)}`).join(" ");
  return <Tile className="mt-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow-team">Spielfluss</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">Score-Verlauf</h2></div><div className="flex gap-3 text-[0.7rem] font-bold uppercase tracking-wider"><span className="flex items-center gap-1.5 text-team"><span className="size-2.5 rounded-full team-bg" />{homeLabel}</span><span className="flex items-center gap-1.5 text-ink-700"><span className="size-2.5 rounded-full bg-ink-700" />{awayLabel}</span></div></div><svg aria-hidden="true" className="mt-5 w-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="presentation" style={{ height: "9rem" }}><path d={line("home")} fill="none" stroke="var(--team)" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" /><path d={line("away")} fill="none" stroke="#334155" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" /></svg></Tile>;
}

export default async function MatchReportPage({ params }: { params: Promise<{ matchId: string }> }) {
  const match = byId(data.matches, (await params).matchId);
  if (!match) notFound();
  const competition = byId(data.competitions, match.competitionId);
  const report = reportForMatch(match.id);
  const publicReportUrl = match.publicReportUrl ?? report?.publicReportUrl;
  const playerStatistics = report ? visiblePlayerStatistics(report) : [];
  const date = new Intl.DateTimeFormat("de-AT", { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Vienna" }).format(new Date(match.startsAt));
  const routeUrl = match.venueId ? mapsSearchUrl(venueName(match.venueId)) : undefined;
  const home = teamName(match.homeTeamId);
  const away = teamName(match.awayTeamId);
  const homeClub = data.teams.find((team) => team.id === match.homeTeamId)?.clubId;
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const meta = hasScore ? `Endstand ${match.homeScore}:${match.awayScore}${match.halfTimeHomeScore !== undefined ? ` · Halbzeit ${match.halfTimeHomeScore}:${match.halfTimeAwayScore}` : ""}` : date;
  const scorePoints = (report?.events ?? []).filter((event) => event.homeScore !== undefined && event.awayScore !== undefined).map((event) => ({ home: event.homeScore!, away: event.awayScore! }));
  const homeStats = report?.teamStatistics.find((item) => item.teamId === match.homeTeamId);
  const awayStats = report?.teamStatistics.find((item) => item.teamId === match.awayTeamId);
  const topScorer = playerStatistics.reduce<number>((best, item) => Math.max(best, item.goals ?? 0), 0);
  return <div style={teamVars(homeClub)}>
    <p className="eyebrow-team">{competition?.name} · Spielbericht</p>
    <Tile className="team-soft-bg mt-3 border-0 p-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 px-5 py-3"><StatusBadge status={match.status} /><span className="text-xs font-bold text-muted">{date}</span></div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-8 md:px-8">
        <div className="flex flex-col items-center gap-2 text-center"><TeamAvatar name={home} teamId={match.homeTeamId} className="size-14 text-base" /><h1 className="font-display text-sm font-extrabold leading-tight text-ink md:text-xl">{home}</h1></div>
        <span className="num rounded-2xl bg-surface px-3 py-2 font-display text-4xl font-extrabold text-ink shadow-pop md:px-5 md:text-6xl">{match.homeScore ?? "–"}:{match.awayScore ?? "–"}</span>
        <div className="flex flex-col items-center gap-2 text-center"><TeamAvatar name={away} teamId={match.awayTeamId} className="size-14 text-base" /><p className="font-display text-sm font-extrabold leading-tight text-ink md:text-xl">{away}</p></div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-line/70 px-4 py-3 text-xs font-bold text-muted"><span className="flex items-center gap-1.5"><PinIcon className="size-4 text-team" />{venueName(match.venueId)}</span><span>{meta}</span></div>
    </Tile>
    <div className="mt-5 flex flex-wrap gap-2"><a className="btn-soft" href={`/api/kalender/spiel/${match.id}`}><CalendarIcon className="size-4" />Termin exportieren</a><ShareButton title={`${home} - ${away}`} />{routeUrl && <a className="btn-soft" href={routeUrl} rel="noreferrer" target="_blank">In Google Maps öffnen</a>}{publicReportUrl && <a className="btn-soft" href={publicReportUrl} rel="noreferrer" target="_blank">Öffentlichen nuLiga-Bericht öffnen</a>}</div>
    <ScoreFlow points={scorePoints} homeLabel={home} awayLabel={away} />
    {report?.teamStatistics.length ? <section className="mt-7"><p className="eyebrow">Teamvergleich</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">Statistiken</h2>{homeStats && awayStats ? <Tile className="mt-4"><div className="mb-3 flex items-center justify-between gap-2 text-[0.66rem] font-extrabold uppercase tracking-wider"><span className="flex items-center gap-2 text-team"><TeamAvatar name={home} teamId={match.homeTeamId} className="size-6 text-[0.5rem]" />{home}</span><span className="flex items-center gap-2 text-ink-700">{away}<TeamAvatar name={away} teamId={match.awayTeamId} className="size-6 text-[0.5rem]" /></span></div><div className="divide-y divide-line">{Object.entries(statisticLabels).map(([key, label]) => <ComparisonRow key={key} label={label} home={homeStats[key as keyof typeof statisticLabels] ?? 0} away={awayStats[key as keyof typeof statisticLabels] ?? 0} />)}</div></Tile> : <div className="mt-4 grid gap-4 md:grid-cols-2">{report.teamStatistics.map((statistics) => <Tile key={statistics.teamId}><h3 className="font-display font-extrabold tracking-tight text-ink">{teamName(statistics.teamId)}</h3><dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">{Object.entries(statisticLabels).map(([key, label]) => <div className="rounded-2xl bg-canvas p-3" key={key}><dt className="text-[0.58rem] font-extrabold uppercase tracking-wider text-muted">{label}</dt><dd className="num mt-1 text-lg font-extrabold text-ink">{statistics[key as keyof typeof statisticLabels] ?? "–"}</dd></div>)}</dl></Tile>)}</div>}</section> : null}
    {report?.events.length ? <Tile className="mt-6"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="eyebrow">Chronologisch</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">Spielverlauf</h2></div><span className="chip">{report.events.length} geprüfte Aktionen</span></div><ol className="mt-5 space-y-1">{report.events.map((event, index) => <li className="grid grid-cols-[3.25rem_auto_1fr] items-center gap-3 py-2.5" key={`${event.clock ?? event.minute}-${index}`}><time className="num grid h-9 place-items-center rounded-xl bg-canvas text-xs font-extrabold text-ink">{event.clock ?? `${event.minute}'`}</time><span aria-hidden="true" className="flex flex-col items-center self-stretch"><span className={`size-2.5 rounded-full ${eventDot[event.type]}`} />{index < report.events.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}</span><div className="min-w-0 pb-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-wider ${eventTone[event.type]}`}>{eventLabels[event.type]}</span>{event.homeScore !== undefined && <strong className="num text-base font-extrabold text-team">{event.homeScore}:{event.awayScore}</strong>}</div>{event.teamId && <p className="mt-1 truncate text-sm font-semibold text-muted">{teamName(event.teamId)}</p>}</div></li>)}</ol></Tile> : null}
    {playerStatistics.length ? <section className="mt-7"><p className="eyebrow">Freigegeben</p><h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-ink">Spielerstatistik</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Offizielle öffentliche Berichtsdaten. Gespeichert werden nur Anzeigename, Rückennummer und Sportstatistik; keine Portraitlinks oder Personen-IDs.</p><div className="mt-4 grid gap-4 md:grid-cols-2">{[match.homeTeamId, match.awayTeamId].map((teamId) => { const teamGoals = playerStatistics.filter((item) => item.teamId === teamId).reduce((sum, item) => sum + (item.goals ?? 0), 0); return <Tile key={teamId}><h3 className="font-display font-extrabold tracking-tight text-ink">{teamName(teamId)}</h3><div className="mt-4 overflow-hidden rounded-2xl border border-line"><table className="w-full text-left text-sm"><thead className="border-b border-line bg-canvas text-[0.58rem] uppercase tracking-wider text-muted"><tr><th className="px-3 py-2">Nr</th><th className="px-3 py-2">Spieler</th>{Object.values(playerStatisticLabels).map((label) => <th className="px-2 py-2 text-right" key={label}>{label}</th>)}</tr></thead><tbody className="divide-y divide-line">{playerStatistics.filter((item) => item.teamId === teamId).sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0)).map((item) => { const isTop = (item.goals ?? 0) === topScorer && topScorer > 0; return <tr className={isTop ? "team-soft-bg" : undefined} key={item.sourcePlayerReference}><td className="num px-3 py-3 text-muted">{item.shirtNumber ?? "–"}</td><td className="px-3 py-3 font-semibold text-ink"><Link className="hover:text-team" href={`/spieler/${playerSlug(item.displayLabel, item.shirtNumber)}`}>{isTop && <span aria-hidden="true" className="mr-1 text-team">★</span>}{item.displayLabel}</Link></td><td className="px-2 py-3"><div className="flex flex-col items-end gap-1"><span className="num font-extrabold text-team">{item.goals ?? "–"}</span>{(item.goals ?? 0) > 0 && <span className="block h-1 w-9 overflow-hidden rounded-full bg-canvas"><span className="block h-full team-bg" style={{ width: `${goalShare(item.goals ?? 0, teamGoals)}%` }} /></span>}</div></td><td className="num px-2 py-3 text-right text-muted">{sevenMetreValue(item.sevenMetreGoals, item.sevenMetreAttempts)}</td><td className="num px-2 py-3 text-right text-muted">{item.twoMinutePenalties ?? "–"}</td><td className="num px-2 py-3 text-right text-muted">{item.yellowCards ?? "–"}</td><td className="num px-2 py-3 text-right text-muted">{item.redCards ?? "–"}</td></tr>; })}</tbody></table></div></Tile>; })}</div></section> : <Tile className="mt-6 border-dashed"><p className="eyebrow text-warn">Datenschutz-Gate</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">Spielerstatistik noch nicht öffentlich</h2><p className="mt-2 text-sm leading-6 text-muted">Der Bericht kann später Tore, 7-Meter und Strafen pro Spieler anzeigen. In dieser Version bleiben Namen, Spielerportraits und personenbezogene Daten deaktiviert, bis eine dokumentierte Freigabe vorliegt.</p><p className="mt-3 text-sm font-bold text-loss">Status: Veröffentlichung pending.</p></Tile>}
    {!report && <Tile className="mt-6"><h2 className="font-display font-extrabold tracking-tight text-ink">Keine Detailstatistiken verfügbar</h2><p className="mt-1 text-sm leading-6 text-muted">Für dieses Spiel liegt kein geprüfter interner Detailbericht vor.</p></Tile>}
    <div className="mt-6"><Metadata /></div>
  </div>;
}
