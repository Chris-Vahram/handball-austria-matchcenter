import Link from "next/link";
import { notFound } from "next/navigation";
import { data, filterMatchesAcrossCompetitions, teamInsights, teamName, venueName } from "@/data/query";
import { ArrowIcon } from "@/components/icons";
import { FavoriteToggle } from "@/components/favorite-toggle";
import { MatchCard, MatchList, PageHeader, Panel, Stat, StatusBadge } from "@/components/ui";

const formLabel = { W: "S", D: "U", L: "N" } as const;
const formClass = { W: "bg-success-50 text-success", D: "bg-warning-50 text-warning", L: "bg-accent-50 text-accent" } as const;
const formatDate = (value: string) => new Intl.DateTimeFormat("de-AT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vienna" }).format(new Date(value));

export default async function TeamPage({ params }: { params: Promise<{ teamSlug: string }> }) {
  const { teamSlug } = await params;
  const team = data.teams.find((item) => item.slug === teamSlug);
  if (!team) notFound();
  const club = data.clubs.find((item) => item.id === team.clubId);
  const matches = filterMatchesAcrossCompetitions(data.matches, { team: team.id });
  const competitions = data.competitions.filter((competition) => matches.some((match) => match.competitionId === competition.id));
  const insights = teamInsights(team.id);
  return <>
    <PageHeader eyebrow="Team" title={team.name} description="Für Spieler, Eltern und Trainer: hier stehen die wichtigsten Spieltagsfragen zuerst, bevor der komplette Spielplan kommt.">
      <p className="mt-3 text-sm text-slate-600">Verein: <Link className="font-black text-navy underline decoration-slate-300 underline-offset-2" href={`/vereine/${club?.slug}`}>{club?.name}</Link></p>
      <div className="mt-4 flex flex-wrap gap-2">{competitions.map((competition) => <Link className="chip" href={`/bewerbe/${competition.slug}`} key={competition.id}>{competition.name}</Link>)}</div>
      <div className="mt-4"><FavoriteToggle id={team.id} kind="team" /></div>
      <a className="button-secondary mt-3" href={`/api/kalender/team/${team.id}`}>Team-Kalender exportieren</a>
    </PageHeader>
    <section className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <Panel className="bg-navy text-white"><p className="eyebrow text-red-200">Matchday</p><h2 className="mt-1 text-2xl font-black">Team-Überblick</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{insights.nextMatch ? <div className="rounded-3xl bg-white/10 p-4"><p className="text-xs font-black uppercase tracking-wide text-blue-100">Nächstes Spiel</p><p className="mt-2 text-sm font-bold text-white">{formatDate(insights.nextMatch.startsAt)}</p><p className="mt-2 text-sm font-black">{teamName(insights.nextMatch.homeTeamId)} : {teamName(insights.nextMatch.awayTeamId)}</p><p className="mt-2 text-xs text-blue-100">{venueName(insights.nextMatch.venueId)}</p></div> : <div className="rounded-3xl bg-white/10 p-4"><p className="text-xs font-black uppercase tracking-wide text-blue-100">Nächstes Spiel</p><p className="mt-2 text-sm font-bold text-white">Kein kommendes Spiel verfügbar.</p></div>}{insights.latestResult ? <div className="rounded-3xl bg-white/10 p-4"><p className="text-xs font-black uppercase tracking-wide text-blue-100">Letztes Ergebnis</p><p className="mt-2 text-sm font-black">{teamName(insights.latestResult.homeTeamId)} : {teamName(insights.latestResult.awayTeamId)}</p><p className="mt-2 text-3xl font-black tabular-nums">{insights.latestResult.homeScore}:{insights.latestResult.awayScore}</p></div> : <div className="rounded-3xl bg-white/10 p-4"><p className="text-xs font-black uppercase tracking-wide text-blue-100">Letztes Ergebnis</p><p className="mt-2 text-sm font-bold text-white">Noch kein Ergebnis in den Demo-Daten.</p></div>}</div></Panel>
      <Panel><p className="eyebrow">Tabelle & Form</p>{insights.standingsRow ? <div className="mt-4 grid grid-cols-3 gap-2"><Stat label="Rang" value={insights.standingsRow.rank} /><Stat label="Punkte" value={insights.standingsRow.points} /><Stat label="+/-" value={insights.standingsRow.goalDifference} /></div> : <p className="mt-3 rounded-2xl bg-navy-50 px-3 py-3 text-sm font-bold text-slate-600">Für dieses Team ist noch keine Tabellenzeile geprüft.</p>}<p className="mt-3 text-xs font-bold text-slate-500">{insights.standingsCompetition?.name ?? "Kein Tabellenkontext verfügbar"}</p><div className="mt-5"><p className="text-xs font-black uppercase tracking-wide text-slate-500">Formkurve</p>{insights.form.length ? <div className="mt-2 flex gap-2">{insights.form.map((item) => <span className={`grid size-9 place-items-center rounded-full text-sm font-black ${formClass[item.outcome]}`} key={item.matchId}>{formLabel[item.outcome]}</span>)}</div> : <p className="mt-2 text-sm font-bold text-slate-600">Noch keine abgeschlossenen Spiele für eine Formkurve.</p>}</div></Panel>
    </section>
    <section className="mt-7 grid gap-4 lg:grid-cols-2">
      {insights.nextMatch && <div><h2 className="mb-4 text-2xl font-black text-navy">Nächstes Spiel</h2><MatchCard match={insights.nextMatch} /></div>}
      {insights.reportMatches.length ? <Panel><div className="flex items-center justify-between gap-3"><div><p className="eyebrow">Berichte</p><h2 className="mt-1 text-xl font-black text-navy">Spielberichte</h2></div><StatusBadge status="finished" /></div><div className="mt-4 space-y-3">{insights.reportMatches.map((match) => <Link className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-3 py-3 text-sm font-black text-navy transition hover:border-navy-100 hover:bg-navy-50" href={`/spiele/${match.id}`} key={match.id}><span>{teamName(match.homeTeamId)} : {teamName(match.awayTeamId)}</span><ArrowIcon className="size-4 text-accent" /></Link>)}</div></Panel> : <Panel className="border-dashed"><p className="eyebrow">Berichte</p><h2 className="mt-1 text-xl font-black text-navy">Keine geprüften Spielberichte</h2><p className="mt-2 text-sm leading-6 text-slate-600">Für dieses Team gibt es aktuell keinen internen Demo-Bericht.</p></Panel>}
    </section>
    <h2 className="mb-4 mt-8 text-2xl font-black text-navy">Spiele</h2><MatchList matches={matches} />
  </>;
}
