import { teamKey } from "@/lib/favorites";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chevron, LEFT } from "@ui/chevron";
import { Footer, SubHeader } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import type { ReportTeam, TimelineEvent } from "@/domain/schema";
import { mapsUrl } from "@/lib/dashboard";
import { displayName, formatDay } from "@/lib/format";
import { reportSummary } from "@/lib/report";

type Props = { params: Promise<{ competition: string; meeting: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.flatMap((competition) =>
    Object.keys(getDataset(competition)?.reports ?? {}).map((meeting) => ({ competition, meeting })));
}

function load(competition: string, meeting: string) {
  if (!isCompetitionId(competition)) return null;
  const data = getDataset(competition);
  const report = data?.reports[meeting];
  const match = data?.matches.find((m) => m.reportId === meeting);
  return data && report && match ? { competition, data, report, match } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition, meeting } = await params;
  const x = load(competition, meeting);
  return x ? { title: `${x.report.home.name} – ${x.report.away.name}` } : {};
}

const Card = ({ color, edge, label }: { color: string; edge: string; label: string }) => (
  <svg width="11" height="15" viewBox="0 0 11 15" role="img" aria-label={label}><rect x=".5" y=".5" width="10" height="14" rx="1.5" fill={color} stroke={edge} /></svg>
);

function Lineup({ team, side, competition }: { team: ReportTeam; side: string; competition: string }) {
  return (
    <section className="panel lineup" aria-labelledby={`h-${side}`}>
      <h2 className="section-title" data-team={teamKey(competition, team.name)} id={`h-${side}`}>
        {team.name}<span className="side">· {side}</span>
      </h2>
      <table className="roster">
        <caption className="sr-only">Aufstellung {team.name}</caption>
        <thead>
          <tr>
            <th scope="col" className="nr"><abbr title="Trikotnummer">#</abbr></th>
            <th scope="col" className="nm">Spieler</th>
            <th scope="col">Tore</th>
            <th scope="col"><abbr title="7-Meter Tore/Versuche">7m</abbr></th>
            <th scope="col"><abbr title="Zeitstrafen (2 Minuten)">2′</abbr></th>
            <th scope="col"><abbr title="Gelbe Karte">G</abbr></th>
            <th scope="col"><abbr title="Rote Karte / Disqualifikation">R</abbr></th>
          </tr>
        </thead>
        <tbody>
          {team.players.map((p) => (
            <tr key={p.shirt + p.name}>
              <td className="nr">{p.shirt}</td>
              <th scope="row" className="nm">{displayName(p.name)}</th>
              <td className="g">{p.goals || ""}</td>
              <td>{p.sevenMAttempts ? `${p.sevenMGoals}/${p.sevenMAttempts}` : ""}</td>
              <td>{p.twoMin || ""}</td>
              <td>{p.yellow ? <Card color="#f2c200" edge="#6b5600" label="Gelbe Karte" /> : ""}</td>
              <td>{p.disqualified ? <Card color="#c8102e" edge="#7a0a1c" label="Rote Karte / Disqualifikation" /> : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="totals">
        <div><dt><abbr title="7-Meter Tore/Versuche">7m</abbr></dt><dd>{team.totals.sevenMGoals}/{team.totals.sevenMAttempts}</dd></div>
        <div><dt><abbr title="Zeitstrafen (2 Minuten)">2′</abbr></dt><dd>{team.totals.twoMin}</dd></div>
        <div><dt><abbr title="Gelbe Karten">G</abbr></dt><dd>{team.totals.yellow}</dd></div>
        <div><dt><abbr title="Rote Karten / Disqualifikationen">R</abbr></dt><dd>{team.totals.disqualifications}</dd></div>
        <div><dt>Timeouts</dt><dd>{team.totals.timeouts}</dd></div>
      </dl>
    </section>
  );
}

const ICON: Record<TimelineEvent["type"], string> = {
  "Tor": "Tor", "7m-Tor": "7m-Tor", "7m vergeben": "7m vergeben", "Verwarnung": "Gelb",
  "2 Minuten": "2 Min", "Disqualifikation": "Rot", "Disqualifikation mit Bericht": "Rot (Bericht)"
};

/** Spielverlauf (ADR-005 amendment 2026-11-01): collapsed by default, split by half; minute | home | score | away. */
function Timeline({ events, home, away }: { events: TimelineEvent[]; home: string; away: string }) {
  const halves = [
    { title: "1. Halbzeit", list: events.filter((e) => e.minute < "30:00") },
    { title: "2. Halbzeit", list: events.filter((e) => e.minute >= "30:00") }
  ].filter((h) => h.list.length);
  const row = (e: TimelineEvent, i: number) => {
    const who = e.shirt ? `${e.shirt} ${displayName(e.name ?? "")}`.trim() : "Mannschaftsoffizieller";
    const goal = e.type === "Tor" || e.type === "7m-Tor";
    const ev = <><span className="tl-type">{ICON[e.type]}</span> {who}<span className="sr-only"> ({e.side === "home" ? home : away})</span></>;
    return (
      <li key={i} className={`tl${goal ? " goal" : ""}`}>
        <span className="tl-min">{e.minute}</span>
        <span className="tl-home">{e.side === "home" ? ev : null}</span>
        <span className="tl-score">{e.score ? `${e.score.home}:${e.score.away}` : ""}</span>
        <span className="tl-away">{e.side === "away" ? ev : null}</span>
      </li>
    );
  };
  return (
    <section className="panel timeline" aria-labelledby="h-timeline">
      <details>
        <summary><h2 className="section-title" id="h-timeline">Spielverlauf <small>{events.length} Ereignisse</small></h2></summary>
        <p className="tl-sides" aria-hidden="true"><span /><span>{home}</span><span /><span>{away}</span></p>
        {halves.map((h) => (
          <div key={h.title}>
            <h3 className="day">{h.title}</h3>
            <ol>{h.list.map(row)}</ol>
          </div>
        ))}
      </details>
    </section>
  );
}

export default async function ReportPage({ params }: Props) {
  const { competition, meeting } = await params;
  const x = load(competition, meeting);
  if (!x) notFound();
  const { data, report: r, match } = x;
  const homeWin = r.score.home > r.score.away;
  const awayWin = r.score.away > r.score.home;
  const venue = match.venueId ? data.venues[match.venueId] : undefined;

  return (
    <>
      <SubHeader id={x.competition} importedAt={data.source.importedAt} crumb="Spielbericht" />
      <main className="page report">
        <section className="panel scoreboard" aria-labelledby="h-match">
          <h1 className="sr-only" id="h-match">Spielbericht {r.home.name} gegen {r.away.name}, Spiel Nr. {r.number}</h1>
          <Link className="back" href={`/${x.competition}/spielplan?runde=${match.round}`}><Chevron d={LEFT} size={16} />Runde {match.round}</Link>
          <div className="teams">
            <p className={homeWin ? "win" : undefined} data-team={teamKey(x.competition, r.home.name)}>{r.home.name}</p>
            <p className="score" aria-label={`Endstand ${r.score.home} zu ${r.score.away}`}>
              {r.score.home}<span>:</span>{r.score.away}
              {r.halftime && <small>Halbzeit {r.halftime.home}:{r.halftime.away}</small>}
            </p>
            <p className={awayWin ? "win" : undefined} data-team={teamKey(x.competition, r.away.name)}>{r.away.name}</p>
          </div>
          <p className="facts">
            Spiel Nr. {r.number} · {formatDay(r.date)}{r.time && `, ${r.time}`}
            {venue ? <> · <Link href={`/halle/${venue.id}`}>{venue.name}</Link> · <a href={mapsUrl(venue.address, venue.name)} target="_blank" rel="noopener noreferrer">Route</a></> : r.venue && ` · ${r.venue}`}
          </p>
          <p className={`status${r.approved ? "" : " pending"}`}>
            {r.approved ? "Spielbericht genehmigt" : "Spielbericht noch nicht genehmigt"}
          </p>
        </section>
        <section className="panel summary" aria-labelledby="h-summary">
          <h2 className="section-title" id="h-summary">Kurzfazit</h2>
          <div className="sum-cols">
            {[r.home, r.away].map((t) => {
              const s = reportSummary(t);
              return (
                <div key={t.name} className="sum-team">
                  <h3 data-team={teamKey(x.competition, t.name)}>{t.name}</h3>
                  <ol>{s.scorers.map((p) => <li key={p.shirt + p.name}><span>{displayName(p.name)}</span><strong>{p.goals}</strong></li>)}</ol>
                  <p><abbr title="7-Meter Tore/Versuche">7m</abbr> {s.sevenM} · <abbr title="Zeitstrafen">2′</abbr> {s.twoMin}</p>
                </div>
              );
            })}
          </div>
        </section>
        <div className="lineups">
          <Lineup team={r.home} side="Heim" competition={x.competition} />
          <Lineup team={r.away} side="Gast" competition={x.competition} />
        </div>
        <p className="legend lineup-legend">7m = Tore/Versuche · 2′ = Zeitstrafen · G = Gelbe Karte · R = Rote Karte / Disqualifikation · Summen inkl. Mannschaftsoffizielle</p>
        {r.timeline.length > 0 && <Timeline events={r.timeline} home={r.home.name} away={r.away.name} />}
      </main>
      <Footer id={x.competition} importedAt={data.source.importedAt} />
    </>
  );
}
