import Link from "next/link";
import { notFound } from "next/navigation";
import { byId, data, teamName, venueName } from "@/data/query";
import { getPlayerProfile, sevenMetreQuota } from "@/data/player-stats";
import { teamVars } from "@/lib/team-color";
import { Metadata, Stat, Tile, TeamAvatar, teamInitials } from "@ui/ui";
import { ArrowIcon } from "@ui/icons";

const fmtDate = (iso: string) => new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "short", year: "numeric", timeZone: "Europe/Vienna" }).format(new Date(iso));

export default async function PlayerProfilePage({ params }: { params: Promise<{ playerSlug: string }> }) {
  const profile = getPlayerProfile((await params).playerSlug);
  if (!profile) notFound();
  const team = byId(data.teams, profile.teamId);
  const clubId = team?.clubId;
  const competitions = profile.competitionIds.map((id) => byId(data.competitions, id)).filter(Boolean);
  const quota = sevenMetreQuota(profile.totals.sevenMetreGoals, profile.totals.sevenMetreAttempts);
  return <div className="space-y-8" style={teamVars(clubId)}>
    <header className="tile team-soft-bg border-0 p-6 md:p-8">
      <p className="eyebrow-team">Spieler</p>
      <div className="mt-3 flex items-center gap-4">
        <span aria-hidden="true" className="avatar team-bg size-16 text-xl text-[color:var(--team-on)]">{teamInitials(profile.displayLabel)}</span>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{profile.displayLabel}</h1>
          <p className="mt-1 text-sm text-muted">{profile.shirtNumber !== undefined && <span className="num font-bold text-team">#{profile.shirtNumber} · </span>}<Link className="font-bold text-team hover:underline" href={`/teams/${team?.slug}`}>{teamName(profile.teamId)}</Link></p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{competitions.map((competition) => <Link className="chip hover:text-team" href={`/bewerbe/${competition!.slug}/torschuetzen`} key={competition!.id}>{competition!.name}</Link>)}</div>
    </header>

    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Tore" value={profile.totals.goals} />
      <Stat label="7-Meter" value={`${profile.totals.sevenMetreGoals}/${profile.totals.sevenMetreAttempts}${quota !== undefined ? ` · ${quota}%` : ""}`} />
      <Stat label="2-Minuten" value={profile.totals.twoMinutePenalties} />
      <Stat label="Spiele" value={profile.totals.matches} />
    </section>

    <section>
      <h2 className="section-title mb-4">Spiele</h2>
      <div className="grid gap-3">{profile.perMatch.map((line) => {
        const match = byId(data.matches, line.matchId);
        if (!match) return null;
        const opponentId = match.homeTeamId === profile.teamId ? match.awayTeamId : match.homeTeamId;
        const lineQuota = sevenMetreQuota(line.sevenMetreGoals, line.sevenMetreAttempts);
        return <Link className="tile-interactive group flex items-center justify-between gap-3 p-4" href={`/spiele/${match.id}`} key={line.matchId}>
          <div className="flex min-w-0 items-center gap-3">
            <TeamAvatar name={teamName(opponentId)} teamId={opponentId} className="size-9 text-[0.6rem]" />
            <div className="min-w-0"><span className="block truncate text-sm font-bold text-ink">vs {teamName(opponentId)}</span><span className="text-xs text-muted">{byId(data.competitions, line.competitionId)?.name} · {fmtDate(match.startsAt)} · {venueName(match.venueId)}</span></div>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-right">
            <div><span className="num block text-lg font-extrabold text-team">{line.goals}</span><span className="text-[0.6rem] font-bold uppercase tracking-wider text-muted">Tore</span></div>
            <div className="hidden sm:block"><span className="num block text-sm font-bold text-ink-700">{line.sevenMetreGoals}/{line.sevenMetreAttempts}{lineQuota !== undefined ? ` (${lineQuota}%)` : ""}</span><span className="text-[0.6rem] font-bold uppercase tracking-wider text-muted">7m</span></div>
            <ArrowIcon className="size-4 text-faint transition group-hover:translate-x-0.5 group-hover:text-team" />
          </div>
        </Link>;
      })}</div>
    </section>

    <div><Metadata /></div>
  </div>;
}
