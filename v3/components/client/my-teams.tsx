"use client";

import Link from "next/link";
import { COMPETITIONS_KEY, TEAMS, myLists, teamKey, type HomeCompetition, type HomeTeam } from "@/lib/favorites";
import { formatWeekdayDate } from "@/lib/format";
import { Chevron, RIGHT } from "../chevron";
import { useFavorites } from "./favorites";
import { SearchBox } from "./search-box";

const RESULT = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;

export type VerbandRow = { slug: string; association: string; count: number };

/**
 * Home. With favorites: three short lists (next matches, last results, my Bewerbe) and one link to all Bewerbe.
 * Without (and before hydration / without JS): one search, a hint how ★ works, and the Verbände (the header search is hidden by CSS while `.entry` exists).
 * ponytail: every team's row data ships with the page; fetch per favorite once there are many Bewerbe (expand-v3-austria).
 */
export function FavoritesHome({ teams, competitions, verbande }: { teams: HomeTeam[]; competitions: HomeCompetition[]; verbande: VerbandRow[] }) {
  const [teamKeys, , teamsReady] = useFavorites(TEAMS);
  const [competitionIds, , compsReady] = useFavorites(COMPETITIONS_KEY);
  // Until localStorage is read (and without JS) the server-rendered entry view stands in, so the first paint is never empty.
  const ready = teamsReady && compsReady;
  const { next, last, bewerbe } = myLists(teams, competitions, ready ? teamKeys : [], ready ? competitionIds : []);

  if (!last.length && !next.length && !bewerbe.length) {
    return (
      <>
        <section className="panel entry" aria-labelledby="h-entry">
          <h1 id="h-entry">Finde dein Team</h1>
          <SearchBox placeholder="Team, Verein oder Bewerb" className="search big" />
          <p className="hint">Tippe bei einem Team oder Bewerb auf <svg className="hint-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg><span className="sr-only">den Stern</span>, dann siehst du es hier mit nächstem Spiel und Tabelle. Gespeichert nur auf diesem Gerät.</p>
        </section>
        <section className="panel" aria-labelledby="h-verbaende">
          <h2 className="section-title" id="h-verbaende">Nach Verband</h2>
          <ul className="comp-list">
            {verbande.map((v) => (
              <li key={v.slug}>
                <Link href={`/bewerbe#${v.slug}`}>
                  <span><strong>{v.association}</strong><small>{v.count === 1 ? "1 Bewerb" : `${v.count} Bewerbe`}</small></span>
                  <Chevron d={RIGHT} size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }

  return (
    <>
      <h1 className="home-title">Meine Favoriten</h1>
      {next.length > 0 && (
        <section className="panel" aria-labelledby="h-next">
          <h2 className="section-title" id="h-next">Meine nächsten Spiele</h2>
          {next.map(({ key, competitionId, competition, next: m }) => m && (
            <div key={key} className="match linked">
              <time dateTime={`${m.date}${m.time ? `T${m.time}` : ""}`}><span className="nowrap">{formatWeekdayDate(m.date).replace(",", "")}</span><br />{m.time ?? "–"}</time>
              <span className="t r1" data-team={teamKey(competitionId, m.home)}>{m.home}</span>
              <span className="t r2" data-team={teamKey(competitionId, m.away)}>{m.away}</span>
              <span className="meta">{competition}</span>
              <Link className="stretch" href={m.href} aria-label={`${m.home} gegen ${m.away}, ${formatWeekdayDate(m.date)}${m.time ? ` ${m.time}` : ""} – Vorschau`}>
                <Chevron d={RIGHT} size={16} />
              </Link>
            </div>
          ))}
        </section>
      )}
      {last.length > 0 && (
        <section className="panel" aria-labelledby="h-last">
          <h2 className="section-title" id="h-last">Zuletzt</h2>
          <ul className="comp-list last-list">
            {last.map(({ key, team, competition, last: r }) => {
              if (!r) return null;
              const body = (
                <>
                  <span className={`chip f-${r.result}`} title={RESULT[r.result]} aria-hidden="true">{r.result}</span>
                  <span className="grow">
                    <strong>{r.own}:{r.other} {r.home ? "gegen" : "bei"} {r.opponent}<span className="sr-only"> ({RESULT[r.result]})</span></strong>
                    <small><span data-team={key}>{team}</span> · {competition}</small>
                  </span>
                </>
              );
              return (
                <li key={key}>
                  {r.href ? <Link href={r.href}>{body}<Chevron d={RIGHT} size={16} /></Link> : <span className="row">{body}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {bewerbe.length > 0 && (
        <section className="panel" aria-labelledby="h-bewerbe">
          <h2 className="section-title" id="h-bewerbe">Meine Bewerbe</h2>
          <ul className="comp-list">
            {bewerbe.map((b) => (
              <li key={b.id}>
                <Link href={`/${b.id}`}>
                  <span>
                    <strong>{b.name}</strong>
                    {b.rows.map((r) => (
                      <small key={r.team}>
                        {r.favorite ? <><span data-team={teamKey(b.id, r.team)}>{r.team}</span> · {r.rank}. Platz</> : <>Erster: {r.team}</>} · {r.points} Pkt
                      </small>
                    ))}
                  </span>
                  <Chevron d={RIGHT} size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="panel">
        <Link className="more" href="/bewerbe">Alle Bewerbe<Chevron d={RIGHT} size={16} /></Link>
      </section>
    </>
  );
}
