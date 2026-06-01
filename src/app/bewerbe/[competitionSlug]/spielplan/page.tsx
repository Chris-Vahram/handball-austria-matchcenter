import { notFound } from "next/navigation";
import Link from "next/link";
import { competitionBySlug, data, filterMatches } from "@/data/query";
import { FilterIcon } from "@/components/icons";
import { CompetitionSwitcher, MatchList, Metadata, PageHeader, ScheduleSummary } from "@/components/ui";

type Filters = { team?: string; club?: string; venue?: string; date?: string };

export default async function SchedulePage({ params, searchParams }: { params: Promise<{ competitionSlug: string }>; searchParams: Promise<Filters> }) {
  const { competitionSlug } = await params;
  const competition = competitionBySlug(competitionSlug);
  if (!competition) notFound();
  const filters = await searchParams;
  const matches = filterMatches(data.matches, competition.id, filters);
  const teams = data.teams.filter((team) => matches.some((match) => match.homeTeamId === team.id || match.awayTeamId === team.id) || data.matches.some((match) => match.competitionId === competition.id && (match.homeTeamId === team.id || match.awayTeamId === team.id)));
  const clubs = data.clubs.filter((club) => teams.some((team) => team.clubId === club.id));
  const venues = data.venues.filter((venue) => data.matches.some((match) => match.competitionId === competition.id && match.venueId === venue.id));
  const activeFilters = [["Datum", filters.date], ["Team", teams.find((team) => team.id === filters.team)?.name], ["Verein", clubs.find((club) => club.id === filters.club)?.name], ["Halle", venues.find((venue) => venue.id === filters.venue)?.name]].filter((filter) => filter[1]);
  return <><CompetitionSwitcher activeId={competition.id} /><div className="mt-6"><PageHeader eyebrow={`${competition.name} · 2025/26`} title="Spielplan" description="Alle Termine, Hallen und Ergebnisse. Filter bleiben in der URL teilbar." /><ScheduleSummary matches={matches} /></div>
    <form className="surface my-6 p-4 md:p-5"><div className="mb-3 flex items-center gap-2"><FilterIcon className="size-4 text-accent" /><h2 className="text-sm font-black text-navy">Spielplan filtern</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-xs font-black uppercase tracking-wide text-slate-600">Datum<input className="field font-normal normal-case tracking-normal" defaultValue={filters.date} name="date" type="date" /></label>
      <label className="text-xs font-black uppercase tracking-wide text-slate-600">Team<select className="field font-normal normal-case tracking-normal" defaultValue={filters.team} name="team"><option value="">Alle Teams</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label>
      <label className="text-xs font-black uppercase tracking-wide text-slate-600">Verein<select className="field font-normal normal-case tracking-normal" defaultValue={filters.club} name="club"><option value="">Alle Vereine</option>{clubs.map((club) => <option key={club.id} value={club.id}>{club.name}</option>)}</select></label>
      <label className="text-xs font-black uppercase tracking-wide text-slate-600">Halle<select className="field font-normal normal-case tracking-normal" defaultValue={filters.venue} name="venue"><option value="">Alle Hallen</option>{venues.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}</select></label>
    </div><div className="mt-4 flex flex-wrap items-center gap-2"><button className="button-primary" type="submit">Filter anwenden</button>{activeFilters.length > 0 && <Link className="button-secondary" href={`/bewerbe/${competition.slug}/spielplan`}>Alle Filter löschen</Link>}</div>
    </form>
    {activeFilters.length > 0 && <div className="mb-4 flex flex-wrap gap-2" aria-label="Aktive Filter">{activeFilters.map(([label, value]) => <span className="chip" key={label}><strong>{label}:</strong> {value}</span>)}</div>}
    <MatchList emptyHref={`/bewerbe/${competition.slug}/spielplan`} matches={matches} /><div className="mt-6"><Metadata /></div></>;
}
