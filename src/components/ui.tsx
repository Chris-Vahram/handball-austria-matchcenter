import Link from "next/link";
import type { Match } from "@/domain/schema";
import { data, teamName, venueName } from "@/data/query";
import { ArrowIcon, CalendarIcon, PinIcon } from "@/components/icons";

export const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => <section className={`surface p-5 md:p-6 ${className}`}>{children}</section>;

export function PageHeader({ eyebrow, title, description, children }: { eyebrow: string; title: string; description?: string; children?: React.ReactNode }) {
  return <header><p className="eyebrow">{eyebrow}</p><h1 className="page-title mt-2">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">{description}</p>}{children}</header>;
}

export function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: React.ReactNode }) {
  return <div className="mb-4 flex items-end justify-between gap-4"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="section-title mt-1">{title}</h2></div>{action}</div>;
}

export function Metadata({ sourceReference = data.metadata.sourceReference, sourceLabel = data.metadata.sourceLabel, updatedAt = data.metadata.updatedAt }: { sourceReference?: string; sourceLabel?: string; updatedAt?: string }) {
  return <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-slate-500"><span className="rounded-full bg-success-50 px-2 py-1 font-bold text-success">Validierte Pilotdaten</span><span>Abruf: {new Intl.DateTimeFormat("de-AT", { dateStyle: "medium" }).format(new Date(updatedAt))}</span><span aria-hidden="true">·</span><a className="font-bold underline decoration-slate-300 underline-offset-2 hover:text-navy" href={sourceReference}>Quelle: {sourceLabel}</a></div>;
}

const statusConfig = {
  scheduled: { label: "Geplant", className: "bg-navy-50 text-navy" },
  finished: { label: "Beendet", className: "bg-success-50 text-success" },
  postponed: { label: "Verschoben", className: "bg-warning-50 text-warning" },
  cancelled: { label: "Abgesagt", className: "bg-accent-50 text-accent" }
};

export function StatusBadge({ status }: { status: Match["status"] }) {
  const config = statusConfig[status];
  return <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider ${config.className}`}>{config.label}</span>;
}

export function MatchCard({ match, featured = false }: { match: Match; featured?: boolean }) {
  const date = new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "short", timeZone: "Europe/Vienna" }).format(new Date(match.startsAt));
  const time = new Intl.DateTimeFormat("de-AT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Vienna" }).format(new Date(match.startsAt));
  const competition = data.competitions.find((item) => item.id === match.competitionId);
  const hasScore = match.homeScore !== undefined;
  return <article className={`surface-interactive group overflow-hidden ${featured ? "border-navy bg-navy text-white" : ""}`}>
    <div className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${featured ? "border-white/15" : "border-line"}`}>
      <p className={`truncate text-[0.66rem] font-black uppercase tracking-[0.13em] ${featured ? "text-blue-100" : "text-accent"}`}>{competition?.name}</p>
      <StatusBadge status={match.status} />
    </div>
    <div className="grid grid-cols-[4rem_1fr] gap-3 p-4">
      <div className={`flex flex-col items-center justify-center rounded-2xl border py-3 text-center ${featured ? "border-white/15 bg-white/10" : "border-line bg-navy-50"}`}><span className={`text-[0.65rem] font-black uppercase tracking-wider ${featured ? "text-blue-100" : "text-slate-500"}`}>{date}</span><strong className={`mt-1 text-xl tracking-tight ${featured ? "text-white" : "text-navy"}`}>{time}</strong></div>
      <div className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2">
        <Link className={`truncate text-sm font-bold transition group-hover:text-accent ${featured ? "text-white" : "text-navy"}`} href={`/teams/${match.homeTeamId}`}>{teamName(match.homeTeamId)}</Link><strong className={`text-xl tabular-nums ${featured ? "text-white" : "text-navy"}`}>{match.homeScore ?? "–"}</strong>
        <Link className={`truncate text-sm font-bold transition group-hover:text-accent ${featured ? "text-white" : "text-navy"}`} href={`/teams/${match.awayTeamId}`}>{teamName(match.awayTeamId)}</Link><strong className={`text-xl tabular-nums ${featured ? "text-white" : "text-navy"}`}>{match.awayScore ?? "–"}</strong>
      </div>
    </div>
    <div className={`flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-xs ${featured ? "border-white/15 text-blue-100" : "border-line text-slate-500"}`}><span className="flex min-w-0 items-center gap-1.5"><PinIcon className="size-3.5 shrink-0" /><span className="truncate">{venueName(match.venueId)}</span></span>{match.publicReportUrl && <Link className={`flex items-center gap-1 font-black ${featured ? "text-white" : "text-accent"}`} href={`/spiele/${match.id}`}>{hasScore ? "Spielbericht" : "Details"}<ArrowIcon className="size-3.5" /></Link>}</div>
  </article>;
}

export function EmptyState({ title = "Keine Treffer", text = "Keine passenden Spiele gefunden.", resetHref = "/bewerbe", action = "Filter zurücksetzen" }: { title?: string; text?: string; resetHref?: string; action?: string }) {
  return <Panel className="border-dashed text-center"><div className="mx-auto grid size-12 place-items-center rounded-full bg-navy-50 text-xl font-black text-navy">?</div><h2 className="mt-4 font-black text-navy">{title}</h2><p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-600">{text}</p><Link className="button-secondary mt-5" href={resetHref}>{action}</Link></Panel>;
}

export function CompetitionSwitcher({ activeId }: { activeId?: string }) {
  return <nav aria-label="Bewerb wechseln" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">{data.competitions.map((competition) => <Link aria-current={competition.id === activeId ? "page" : undefined} className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-[0.68rem] font-black uppercase tracking-wide transition ${competition.id === activeId ? "border-navy bg-navy text-white shadow-sm" : "border-line bg-white text-navy hover:border-navy-100 hover:bg-navy-50"}`} href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</nav>;
}

export function MatchList({ matches, emptyHref }: { matches: Match[]; emptyHref?: string }) {
  return matches.length ? <div className="grid gap-3 lg:grid-cols-2">{matches.map((match) => <MatchCard key={match.id} match={match} />)}</div> : <EmptyState resetHref={emptyHref} />;
}

export function LoadingCards() {
  return <div aria-label="Daten werden geladen" className="space-y-4"><div className="skeleton h-7 w-32" /><div className="skeleton h-11 w-72 max-w-full" /><div className="grid gap-3 pt-4 md:grid-cols-2">{[0, 1, 2, 3].map((item) => <div className="surface space-y-4 p-4" key={item}><div className="skeleton h-4 w-2/3" /><div className="skeleton h-20 w-full" /><div className="skeleton h-4 w-1/2" /></div>)}</div></div>;
}

export function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-2xl bg-navy-50 p-3"><dt className="text-[0.65rem] font-black uppercase tracking-wide text-slate-500">{label}</dt><dd className="mt-1 text-lg font-black text-navy">{value}</dd></div>;
}

export function ScheduleSummary({ matches }: { matches: Match[] }) {
  return <p className="mt-2 flex items-center gap-1.5 text-sm font-bold text-slate-500"><CalendarIcon className="size-4 text-accent" />{matches.length} Spiele im aktuellen Ergebnis</p>;
}
