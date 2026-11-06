"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { COMPETITIONS_KEY, TEAMS } from "@/lib/favorites";
import type { TeamCard } from "@/lib/dashboard";
import { useFavorites } from "./favorites";
import { SearchBox } from "./search-box";

const RESULT = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;
const day = (iso: string) => new Intl.DateTimeFormat("de-AT", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
const maps = (name: string, address: string[]) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent([name, ...address].join(", "))}`;

/**
 * Home: followed teams (cards) and followed Bewerbe (server-rendered blocks, kept in the DOM and toggled with `hidden`
 * so the favorite highlighter can mark their rows). Without favorites: a search and a hint how ★ works.
 * ponytail: every team card and Bewerb block ships with the page; fetch per favorite once there are many Bewerbe.
 */
export function FavoritesHome({ cards, blocks }: { cards: TeamCard[]; blocks: { id: string; node: ReactNode }[] }) {
  const [teams, , teamsReady] = useFavorites(TEAMS);
  const [comps, , compsReady] = useFavorites(COMPETITIONS_KEY);
  const ready = teamsReady && compsReady;
  const mine = teams.map((k) => cards.find((c) => c.key === k)).filter((c): c is TeamCard => !!c);
  const followed = new Set(comps);
  const any = mine.length > 0 || blocks.some((b) => followed.has(b.id));

  return (
    <>
      {ready && !any && (
        <section className="panel entry" aria-labelledby="h-entry">
          <h1 id="h-entry">Finde dein Team</h1>
          <SearchBox placeholder="Team, Verein oder Bewerb" className="search big" />
          <p className="hint">Tippe bei einem Team oder Bewerb auf <svg className="hint-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg><span className="sr-only">den Stern</span>, dann siehst du es hier mit nächstem Spiel und Tabelle. Gespeichert nur auf diesem Gerät.</p>
        </section>
      )}
      {ready && any && <h1 className="home-title">Meine Favoriten</h1>}
      {mine.length > 0 && (
        <div className="cards">
          {mine.map((c) => (
            <article key={c.key} className="card">
              <header>
                <Link href={c.href} className="card-team">{c.team}</Link>
                <span className="card-comp">{c.competition} · {c.rank}. Platz · {c.points} Pkt · {c.record}</span>
              </header>
              {c.next && (
                <div className="next-card">
                  <h3 className="nc-when">Nächstes Spiel · {day(c.next.date)}{c.next.time && `, ${c.next.time}`}</h3>
                  <p className="nc-vs">{c.next.home ? "Heim gegen" : "Auswärts bei"} <strong>{c.next.opponent}</strong></p>
                  {c.next.venue && (
                    <p className="nc-venue">
                      {c.next.venue.id ? <Link href={`/halle/${c.next.venue.id}`}>{c.next.venue.name}</Link> : c.next.venue.name}
                      {c.next.venue.address.length > 0 && <><br />{c.next.venue.address.join(", ")}</>}
                    </p>
                  )}
                  <p className="nc-meta">
                    {c.next.venue && c.next.venue.address.length > 0 && <a className="nc-route" href={maps(c.next.venue.name, c.next.venue.address)} target="_blank" rel="noopener noreferrer">Route planen</a>}
                    <Link href={`/${c.competitionId}/vorschau/${c.next.number}`}>Vorschau</Link>
                  </p>
                </div>
              )}
              {c.last && (
                <p className="card-last">
                  <span className={`chip f-${c.last.result}`} title={RESULT[c.last.result]}>{c.last.result}</span>
                  Zuletzt {c.last.home ? "gegen" : "bei"} {c.last.opponent}{" "}
                  {c.last.reportHref ? <Link href={c.last.reportHref}><strong>{c.last.own}:{c.last.other}</strong></Link> : <strong>{c.last.own}:{c.last.other}</strong>}
                  <span className="sr-only"> ({RESULT[c.last.result]})</span>
                </p>
              )}
              <p className="card-links"><Link href={c.href}>Spiele, Form und Spieler</Link></p>
            </article>
          ))}
        </div>
      )}
      {blocks.map((b) => <div key={b.id} hidden={!followed.has(b.id)}>{b.node}</div>)}
    </>
  );
}
