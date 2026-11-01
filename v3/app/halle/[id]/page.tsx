import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, TopBar } from "@ui/shell";
import { Chevron, RIGHT } from "@ui/chevron";
import { COMPETITIONS } from "@/data";
import { allVenues, mapsUrl, resinRule } from "@/lib/dashboard";
import { formatDay } from "@/lib/format";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return [...allVenues().keys()].map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = allVenues().get((await params).id);
  return v ? { title: v.venue.name } : {};
}

export default async function VenuePage({ params }: Props) {
  const entry = allVenues().get((await params).id);
  if (!entry) notFound();
  const { venue, matches } = entry;
  const resin = resinRule(venue.resin);
  const upcoming = matches.filter((x) => !x.match.score).sort((a, b) => (a.match.date + (a.match.time ?? "")).localeCompare(b.match.date + (b.match.time ?? "")));
  return (
    <>
      <header className="app-head"><TopBar /></header>
      <main className="page venue-page">
        <section className="panel venue-head" aria-labelledby="h-venue">
          <h1 id="h-venue">{venue.name}</h1>
          {venue.address.length > 0 && (
            <address>{venue.address.map((l) => <span key={l}>{l}</span>)}</address>
          )}
          <div className="team-actions">
            {venue.address.length > 0 && <a className="btn solid" href={mapsUrl(venue.address, venue.name)} target="_blank" rel="noopener noreferrer">Route planen</a>}
          </div>
          <dl className="team-facts">
            <div><dt>Harz (Haftmittel)</dt><dd>{resin ? resin.rule : "keine Angabe"}</dd></div>
          </dl>
          {resin?.note && <p className="legend">{resin.note}</p>}
        </section>
        <section className="panel" aria-labelledby="h-venue-games">
          <h2 className="section-title" id="h-venue-games">Kommende Spiele hier</h2>
          {upcoming.length === 0 && <p className="empty">Keine weiteren Spiele der erfassten Bewerbe in dieser Halle.</p>}
          <ul className="comp-list">
            {upcoming.slice(0, 12).map(({ competitionId, match: m }) => (
              <li key={`${competitionId}-${m.number}`}>
                <Link href={`/${competitionId}/spielplan?runde=${m.round}`}>
                  <span>
                    <strong>{m.home} – {m.away}</strong>
                    <small>{formatDay(m.date)}{m.time && `, ${m.time}`} · {COMPETITIONS[competitionId].name}, Runde {m.round}</small>
                  </span>
                  <Chevron d={RIGHT} size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <p className="scope">Hallenangaben wie auf nuLiga veröffentlicht. Nur Spiele der zwei Bewerbe dieses Prototyps.</p>
      </main>
      <Footer />
    </>
  );
}
