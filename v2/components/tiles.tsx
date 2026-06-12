import Link from "next/link";
import type { Match } from "@/domain/schema";
import { teamName, venueName } from "@/data/query";
import { mapsSearchUrl } from "@/lib/venue";
import { Tile, TeamAvatar } from "@ui/ui";
import { ArrowIcon, CalendarIcon, ClockIcon, PinIcon } from "@ui/icons";

const relativeDay = (iso: string) => {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (days <= 0) return "Heute";
  if (days === 1) return "Morgen";
  if (days < 7) return `in ${days} Tagen`;
  return new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "short" }).format(new Date(iso));
};
const dayTime = (iso: string) => new Intl.DateTimeFormat("de-AT", { weekday: "long", day: "2-digit", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Vienna" }).format(new Date(iso));

export function NextMatchTile({ match }: { match?: Match }) {
  if (!match) return <Tile className="team-soft-bg border-0"><p className="eyebrow-team">Nächstes Spiel</p><p className="mt-3 text-sm font-semibold text-ink-700">Kein kommendes Spiel in den Demo-Daten.</p></Tile>;
  return <Link className="tile-interactive team-soft-bg group block border-0 p-5 md:p-6" href={`/spiele/${match.id}`}>
    <div className="flex items-center justify-between"><p className="eyebrow-team">Nächstes Spiel</p><span className="team-bg inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider"><ClockIcon className="size-3" />{relativeDay(match.startsAt)}</span></div>
    <div className="mt-4 space-y-2.5">{[match.homeTeamId, match.awayTeamId].map((id) => <div className="flex items-center gap-3" key={id}><TeamAvatar name={teamName(id)} teamId={id} className="size-9 text-xs" /><span className="min-w-0 flex-1 truncate font-display text-base font-extrabold text-ink">{teamName(id)}</span></div>)}</div>
    <p className="mt-4 flex items-center gap-1.5 border-t border-line/70 pt-3 text-xs font-semibold text-muted"><PinIcon className="size-4 shrink-0 text-team" />{venueName(match.venueId)}</p>
    <p className="mt-1 text-xs text-faint">{dayTime(match.startsAt)}</p>
  </Link>;
}

const formStyle = { W: "bg-win-soft text-win", D: "bg-draw-soft text-muted", L: "bg-loss-soft text-loss" } as const;
const formLetter = { W: "S", D: "U", L: "N" } as const;

export function FormTile({ form }: { form: { matchId: string; outcome: "W" | "D" | "L" }[] }) {
  return <Tile><p className="eyebrow">Formkurve</p>{form.length ? <div className="mt-4 flex gap-2">{form.map((item) => <span className={`avatar num size-10 text-sm ${formStyle[item.outcome]}`} key={item.matchId}>{formLetter[item.outcome]}</span>)}</div> : <p className="mt-3 text-sm text-muted">Noch keine abgeschlossenen Spiele.</p>}<p className="mt-4 text-xs text-faint">Letzte {form.length || 0} Ergebnisse</p></Tile>;
}

export function TableTile({ row, competitionName, totalTeams }: { row?: { rank: number; points: number; goalDifference: number }; competitionName?: string; totalTeams?: number }) {
  if (!row) return <Tile><p className="eyebrow">Tabelle</p><p className="mt-3 text-sm text-muted">Für dieses Team ist keine Tabellenzeile geprüft.</p></Tile>;
  const pct = totalTeams ? Math.max(6, 100 - ((row.rank - 1) / Math.max(1, totalTeams - 1)) * 100) : 50;
  return <Tile><div className="flex items-end justify-between gap-3"><div><p className="eyebrow">Tabelle</p><p className="mt-1 text-xs font-semibold text-muted">{competitionName ?? ""}</p></div><span className="num font-display text-4xl font-extrabold text-team">{row.rank}.</span></div>
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-canvas"><span className="block h-full rounded-full team-bg" style={{ width: `${pct}%` }} /></div>
    <dl className="mt-4 grid grid-cols-3 gap-2 text-center"><div><dt className="text-[0.6rem] font-extrabold uppercase tracking-wider text-muted">Rang</dt><dd className="num text-lg font-extrabold text-ink">{row.rank}{totalTeams ? <span className="text-faint">/{totalTeams}</span> : ""}</dd></div><div><dt className="text-[0.6rem] font-extrabold uppercase tracking-wider text-muted">Punkte</dt><dd className="num text-lg font-extrabold text-ink">{row.points}</dd></div><div><dt className="text-[0.6rem] font-extrabold uppercase tracking-wider text-muted">+/-</dt><dd className="num text-lg font-extrabold text-ink">{row.goalDifference > 0 ? "+" : ""}{row.goalDifference}</dd></div></dl></Tile>;
}

export function LastResultTile({ match }: { match?: Match }) {
  if (!match) return <Tile><p className="eyebrow">Letztes Ergebnis</p><p className="mt-3 text-sm text-muted">Noch kein Ergebnis in den Demo-Daten.</p></Tile>;
  return <Link className="tile-interactive group block p-5 md:p-6" href={`/spiele/${match.id}`}><p className="eyebrow">Letztes Ergebnis</p>
    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center"><span className="truncate text-sm font-bold text-ink-700">{teamName(match.homeTeamId)}</span><span className="num font-display text-3xl font-extrabold text-ink">{match.homeScore}:{match.awayScore}</span><span className="truncate text-sm font-bold text-ink-700">{teamName(match.awayTeamId)}</span></div>
    <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-team">Bericht ansehen<ArrowIcon className="size-3.5 transition group-hover:translate-x-0.5" /></span></Link>;
}

export function QuickLinksTile({ teamSlug, teamId, venue }: { teamSlug: string; teamId: string; venue?: string }) {
  const route = venue ? mapsSearchUrl(venue) : undefined;
  return <Tile><p className="eyebrow">Schnellzugriff</p><div className="mt-4 grid gap-2">
    <Link className="flex items-center justify-between rounded-2xl bg-canvas px-4 py-3 text-sm font-bold text-ink transition hover:text-team" href={`/teams/${teamSlug}`}>Voller Spielplan<ArrowIcon className="size-4" /></Link>
    <a className="flex items-center justify-between rounded-2xl bg-canvas px-4 py-3 text-sm font-bold text-ink transition hover:text-team" href={`/api/kalender/team/${teamId}`}><span className="flex items-center gap-2"><CalendarIcon className="size-4 text-team" />Kalender exportieren</span><ArrowIcon className="size-4" /></a>
    {route && <a className="flex items-center justify-between rounded-2xl bg-canvas px-4 py-3 text-sm font-bold text-ink transition hover:text-team" href={route} rel="noreferrer" target="_blank"><span className="flex items-center gap-2"><PinIcon className="size-4 text-team" />Route zur Halle</span><ArrowIcon className="size-4" /></a>}
  </div></Tile>;
}
