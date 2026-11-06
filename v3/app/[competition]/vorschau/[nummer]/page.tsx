import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Footer, SubHeader } from "@ui/shell";
import { COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { mapsUrl, resinRule, venueOf } from "@/lib/dashboard";
import { teamKey } from "@/lib/favorites";
import { displayName, formatDay, formatShortDate } from "@/lib/format";
import { matchPreview } from "@/lib/preview";
import { teamSlug } from "@/lib/teams";

type Props = { params: Promise<{ competition: string; nummer: string }> };

export const revalidate = 3600;

const RESULT = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;

export function generateStaticParams() {
  return COMPETITION_IDS.flatMap((competition) =>
    (getDataset(competition)?.matches ?? []).filter((m) => !m.reportId).map((m) => ({ competition, nummer: String(m.number) })));
}

function load(competition: string, nummer: string) {
  if (!isCompetitionId(competition) || !/^\d{1,5}$/.test(nummer)) return null;
  const data = getDataset(competition);
  const preview = data ? matchPreview(data, Number(nummer)) : null;
  return data && preview ? { competition, data, preview } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition, nummer } = await params;
  const x = load(competition, nummer);
  return x ? { title: `Vorschau ${x.preview.match.home} – ${x.preview.match.away}` } : {};
}

export default async function PreviewPage({ params }: Props) {
  const { competition, nummer } = await params;
  const x = load(competition, nummer);
  if (!x) notFound();
  const { data, preview: p } = x;
  const m = p.match;
  if (m.reportId) redirect(`/${x.competition}/spiel/${m.reportId}`);
  const venue = venueOf(data, m);
  const resin = resinRule(venue?.id ? data.venues[venue.id]?.resin ?? null : null);
  const sides = [p.home, p.away];

  return (
    <>
      <SubHeader id={x.competition} importedAt={data.source.importedAt} crumb="Vorschau" />
      <main className="page preview">
        <section className="panel scoreboard" aria-labelledby="h-preview">
          <h1 className="sr-only" id="h-preview">Vorschau {m.home} gegen {m.away}, Spiel Nr. {m.number}</h1>
          <p className="pv-when">{formatDay(m.date)}{m.time && <>, <strong>{m.time}</strong></>}</p>
          <div className="teams">
            <p data-team={teamKey(x.competition, m.home)}>{m.home}</p>
            <p className="score pv-vs" aria-hidden="true">–</p>
            <p data-team={teamKey(x.competition, m.away)}>{m.away}</p>
          </div>
          <p className="facts">
            Spiel Nr. {m.number} · Runde {m.round}
            {m.score && <> · Endstand {m.score.home}:{m.score.away}</>}
          </p>
          {venue && (
            <p className="pv-venue">
              {venue.id ? <Link href={`/halle/${venue.id}`}>{venue.name}</Link> : venue.name}
              {venue.address.length > 0 && <><br />{venue.address.join(", ")} · <a href={mapsUrl(venue.address, venue.name)} target="_blank" rel="noopener noreferrer">Route planen</a></>}
              {resin && <><br />Harz {resin.rule}</>}
            </p>
          )}
        </section>

        <div className="pv-cols">
        <section className="panel" aria-labelledby="h-pv-table">
          <h2 className="section-title" id="h-pv-table">Tabelle und Form</h2>
          <table className="mini pv-table">
            <caption className="sr-only">Tabellenplatz und Form beider Teams</caption>
            <thead><tr><th scope="col"><abbr title="Rang">#</abbr></th><th scope="col">Team</th><th scope="col"><abbr title="Siege-Unentschieden-Niederlagen">S-U-N</abbr></th><th scope="col"><abbr title="Punkte">Pkt</abbr></th></tr></thead>
            <tbody>
              {sides.map((s) => (
                <tr key={s.team} data-team={teamKey(x.competition, s.team)}>
                  <td>{s.row?.rank ?? "–"}</td>
                  <th scope="row">
                    <Link href={`/${x.competition}/team/${teamSlug(s.team)}`}>{s.team}</Link>
                    <span className="form-chips pv-form">
                      <span className="sr-only">Form: {s.form.map((f) => RESULT[f]).join(", ") || "noch keine Spiele"}</span>
                      <span aria-hidden="true">{s.form.map((f, i) => <i key={i} className={`f-${f}`}>{f}</i>)}</span>
                    </span>
                  </th>
                  <td>{s.row ? `${s.row.won}-${s.row.drawn}-${s.row.lost}` : "–"}</td>
                  <td className="pts">{s.row?.points ?? "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel" aria-labelledby="h-pv-h2h">
          <h2 className="section-title" id="h-pv-h2h">Direktvergleich <small>diese Saison</small></h2>
          {p.earlier.length === 0 ? <p className="empty">Erstes Duell in dieser Saison.</p> : (
            <ul className="hits">
              {p.earlier.map((e) => {
                const label = <>{formatShortDate(e.date)} · {e.home} – {e.away} <strong>{e.score!.home}:{e.score!.away}</strong></>;
                return <li key={e.number}>{e.reportId ? <Link href={`/${x.competition}/spiel/${e.reportId}`}>{label}</Link> : <span>{label}</span>}</li>;
              })}
            </ul>
          )}
        </section>
        </div>

        {sides.some((s) => s.scorers.length > 0) && (
          <section className="panel" aria-labelledby="h-pv-scorers">
            <h2 className="section-title" id="h-pv-scorers">Beste Torschützen</h2>
            <div className="sum-cols">
              {sides.map((s) => (
                <div key={s.team} className="sum-team">
                  <h3 data-team={teamKey(x.competition, s.team)}>{s.team}</h3>
                  <ol>{s.scorers.map((r) => <li key={r.name}><span>{displayName(r.name)}</span><strong>{r.value}</strong></li>)}</ol>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer id={x.competition} importedAt={data.source.importedAt} />
    </>
  );
}
