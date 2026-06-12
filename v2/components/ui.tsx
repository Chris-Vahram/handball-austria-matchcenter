import Link from "next/link";
import type { Match } from "@/domain/schema";
import { data, teamName, topLevelCompetitions, venueName } from "@/data/query";
import { teamVars } from "@/lib/team-color";
import { ArrowIcon, PinIcon } from "@ui/icons";
import { FollowStar } from "@ui/follow-star";

const clubFor = (teamId: string) => data.teams.find((team) => team.id === teamId)?.clubId;
const clubLabel = (clubId?: string) => data.clubs.find((club) => club.id === clubId)?.name ?? "Verein";

export const Tile = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <section className={`tile p-5 md:p-6 ${className}`}>{children}</section>;

export function teamInitials(name: string) {
  const cleaned = name.replace(/[^\p{L}\p{N}\s/]/gu, " ").split(/[\s/]+/).filter(Boolean);
  const letters = cleaned.filter((part) => /^\p{L}/u.test(part)).slice(0, 2).map((part) => part[0]);
  return (letters.join("") || name.slice(0, 2)).toUpperCase();
}

const clubOf = (teamId?: string) => teamId ? data.teams.find((team) => team.id === teamId)?.clubId : undefined;

/** Accent monogram tinted to its own club color. */
export function TeamAvatar({ name, teamId, clubId, className = "size-9 text-xs" }: { name: string; teamId?: string; clubId?: string; className?: string }) {
  const resolved = clubId ?? clubOf(teamId);
  return <span aria-hidden="true" className={`avatar shrink-0 text-[color:var(--team-on)] ${className}`} style={{ ...teamVars(resolved), backgroundColor: "var(--team)" }}>{teamInitials(name)}</span>;
}

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: React.ReactNode }) {
  return <header><p className="eyebrow-team">{eyebrow}</p><h1 className="page-title mt-3">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted md:text-base">{description}</p>}{children}</header>;
}

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-title mt-1">{title}</h2></div>{action}</div>;
}

export function Metadata({ sourceReference = data.metadata.sourceReference, sourceLabel = data.metadata.sourceLabel, updatedAt = data.metadata.updatedAt }: { sourceReference?: string; sourceLabel?: string; updatedAt?: string }) {
  return <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-faint"><span className="rounded-full bg-win-soft px-2 py-1 font-bold text-win">Validierte Pilotdaten</span><span>Abruf: {new Intl.DateTimeFormat("de-AT", { dateStyle: "medium" }).format(new Date(updatedAt))}</span><span aria-hidden="true">·</span><a className="font-bold underline decoration-line underline-offset-2 hover:text-ink" href={sourceReference}>Quelle: {sourceLabel}</a></div>;
}

const statusConfig = {
  scheduled: { label: "Geplant", className: "bg-canvas text-muted" },
  finished: { label: "Beendet", className: "bg-win-soft text-win" },
  postponed: { label: "Verschoben", className: "bg-warn-soft text-warn" },
  cancelled: { label: "Abgesagt", className: "bg-loss-soft text-loss" }
};

export function StatusBadge({ status }: { status: Match["status"] }) {
  const config = statusConfig[status];
  return <span className={`rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-wider ${config.className}`}>{config.label}</span>;
}

const outcomeConfig = { win: { label: "Sieg", className: "bg-win-soft text-win" }, loss: { label: "Niederlage", className: "bg-loss-soft text-loss" }, draw: { label: "Remis", className: "bg-draw-soft text-muted" } } as const;

export function OutcomeChip({ home, away }: { home: number; away: number }) {
  const key = home > away ? "win" : home < away ? "loss" : "draw";
  const config = outcomeConfig[key];
  return <span className={`rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-wider ${config.className}`}>{config.label}</span>;
}

/** Compact match row for lists/schedules. */
export function MatchRow({ match, highlightTeamId, showFollow = false }: { match: Match; highlightTeamId?: string; showFollow?: boolean }) {
  const date = new Intl.DateTimeFormat("de-AT", { weekday: "short", day: "2-digit", month: "short", timeZone: "Europe/Vienna" }).format(new Date(match.startsAt));
  const time = new Intl.DateTimeFormat("de-AT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Vienna" }).format(new Date(match.startsAt));
  const competition = data.competitions.find((item) => item.id === match.competitionId);
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const TeamLine = ({ id, score, win }: { id: string; score?: number; win: boolean }) => { const club = clubFor(id); return <div className={`grid items-center gap-2.5 ${showFollow ? "grid-cols-[auto_1fr_auto_auto]" : "grid-cols-[auto_1fr_auto]"}`}><TeamAvatar name={teamName(id)} teamId={id} className="size-7 text-[0.6rem]" /><Link className={`truncate text-sm ${highlightTeamId === id ? "font-extrabold text-ink" : "font-semibold text-ink-700"} hover:text-team`} href={`/teams/${id}`}>{teamName(id)}</Link><span className={`num text-lg font-extrabold ${win ? "text-ink" : "text-faint"}`}>{score ?? "–"}</span>{showFollow && club && <FollowStar clubId={club} name={clubLabel(club)} className="size-7" />}</div>; };
  const homeWin = hasScore && match.homeScore! > match.awayScore!;
  const awayWin = hasScore && match.awayScore! > match.homeScore!;
  return <article className="tile-interactive group overflow-hidden">
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5"><span className="truncate text-[0.66rem] font-extrabold uppercase tracking-wider text-faint">{competition?.name}</span><span className="text-[0.66rem] font-bold text-muted">{date} · {time}</span></div>
    <div className="grid gap-2 p-4">
      <TeamLine id={match.homeTeamId} score={match.homeScore} win={homeWin} />
      <TeamLine id={match.awayTeamId} score={match.awayScore} win={awayWin} />
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-2.5 text-xs text-muted"><span className="flex min-w-0 items-center gap-1.5"><PinIcon className="size-3.5 shrink-0" /><span className="truncate">{venueName(match.venueId)}</span></span>{hasScore ? <OutcomeChip home={match.homeScore!} away={match.awayScore!} /> : <StatusBadge status={match.status} />}{match.publicReportUrl && <Link className="flex items-center gap-1 font-extrabold text-team" href={`/spiele/${match.id}`}>{hasScore ? "Bericht" : "Details"}<ArrowIcon className="size-3.5 transition group-hover:translate-x-0.5" /></Link>}</div>
  </article>;
}

export function EmptyState({ title = "Keine Treffer", text = "Keine passenden Spiele gefunden.", resetHref = "/entdecken", action = "Filter zurücksetzen" }: { title?: string; text?: string; resetHref?: string; action?: string }) {
  return <Tile className="border-dashed text-center"><div className="mx-auto grid size-14 place-items-center rounded-full bg-canvas text-team"><svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M4.5 8.5c3 1.6 3 5.4 0 7M19.5 8.5c-3 1.6-3 5.4 0 7M9 4c1.5 2.6 4.5 2.6 6 0M9 20c1.5-2.6 4.5-2.6 6 0" /></svg></div><h2 className="mt-4 font-display text-lg font-extrabold text-ink">{title}</h2><p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted">{text}</p><Link className="btn-soft mt-5" href={resetHref}>{action}</Link></Tile>;
}

export function CompetitionSwitcher({ activeId }: { activeId?: string }) {
  return <nav aria-label="Bewerb wechseln" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">{topLevelCompetitions.map((competition) => <Link aria-current={competition.id === activeId ? "page" : undefined} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-[0.7rem] font-extrabold uppercase tracking-wider transition ${competition.id === activeId ? "team-bg team-border" : "border-line bg-surface text-ink-700 hover:border-line hover:text-team"}`} href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</nav>;
}

export function MatchList({ matches, emptyHref, highlightTeamId, showFollow = false }: { matches: Match[]; emptyHref?: string; highlightTeamId?: string; showFollow?: boolean }) {
  return matches.length ? <div className="grid gap-3 md:grid-cols-2">{matches.map((match) => <MatchRow key={match.id} match={match} highlightTeamId={highlightTeamId} showFollow={showFollow} />)}</div> : <EmptyState resetHref={emptyHref} />;
}

export function LoadingCards() {
  return <div aria-label="Daten werden geladen" className="space-y-4"><div className="skeleton h-8 w-40" /><div className="skeleton h-12 w-72 max-w-full" /><div className="grid gap-3 pt-4 md:grid-cols-2">{[0, 1, 2, 3].map((item) => <div className="tile space-y-4 p-4" key={item}><div className="skeleton h-4 w-2/3" /><div className="skeleton h-16 w-full" /><div className="skeleton h-4 w-1/2" /></div>)}</div></div>;
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-2xl bg-canvas p-3"><dt className="text-[0.6rem] font-extrabold uppercase tracking-wider text-muted">{label}</dt><dd className="num mt-1 text-lg font-extrabold text-ink">{value}</dd></div>;
}
