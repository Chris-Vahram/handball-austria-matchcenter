"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TeamCard } from "@/lib/dashboard";

const KEY = "matchcenter:my-teams";

export function readTeams(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}
function writeTeams(keys: string[]) {
  try { localStorage.setItem(KEY, JSON.stringify(keys)); } catch { /* private mode: session only */ }
  window.dispatchEvent(new Event("my-teams"));
}
export function useMyTeams(): [string[], (keys: string[]) => void, boolean] {
  const [keys, setKeys] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setKeys(readTeams());
    sync(); setReady(true);
    window.addEventListener("my-teams", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("my-teams", sync); window.removeEventListener("storage", sync); };
  }, []);
  return [keys, (next) => { setKeys(next); writeTeams(next); }, ready];
}

/** "Als Mein Team merken" toggle on team pages. */
export function RememberButton({ teamKey, team }: { teamKey: string; team: string }) {
  const [keys, setKeys] = useMyTeams();
  const on = keys.includes(teamKey);
  return (
    <button type="button" className={on ? "btn remember on" : "btn remember"} aria-pressed={on}
      onClick={() => setKeys(on ? keys.filter((k) => k !== teamKey) : [...keys, teamKey])}>
      {on ? "Gemerkt als Mein Team" : "Als Mein Team merken"}<span className="sr-only">: {team}</span>
    </button>
  );
}

const RESULT = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;
const day = (iso: string) => new Intl.DateTimeFormat("de-AT", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${iso}T12:00:00Z`));
const maps = (name: string, address: string[]) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent([name, ...address].join(", "))}`;

/** Home: remembered teams as dashboard cards, otherwise a picker. Everything else is server-rendered around it. */
export function MyTeams({ cards, groups }: { cards: TeamCard[]; groups: { competition: string; teams: { key: string; team: string }[] }[] }) {
  const [keys, setKeys, ready] = useMyTeams();
  const [editing, setEditing] = useState(false);
  const mine = keys.map((k) => cards.find((c) => c.key === k)).filter((c): c is TeamCard => !!c);
  const picking = ready && (editing || mine.length === 0);
  // Stay in the picker until "Fertig", so several teams can be chosen in one go.
  const toggle = (k: string) => { setEditing(true); setKeys(keys.includes(k) ? keys.filter((x) => x !== k) : [...keys, k]); };

  if (!ready) return <section className="panel my" aria-busy="true"><p className="empty">Meine Teams werden geladen …</p></section>;

  return (
    <section className="my" aria-labelledby="h-my">
      <div className="my-head">
        <h1 id="h-my">{mine.length && !editing ? "Meine Teams" : "Mein Team wählen"}</h1>
        {mine.length > 0 && <button type="button" className="link-btn" onClick={() => setEditing(!editing)}>{editing ? "Fertig" : "Ändern"}</button>}
      </div>
      {picking ? (
        <div className="panel picker">
          <p className="hint">Tippe dein Team an. Mehrere sind möglich, z. B. derselbe Verein in zwei Bewerben. Gespeichert wird nur auf diesem Gerät.</p>
          {groups.map((g) => (
            <fieldset key={g.competition}>
              <legend>{g.competition}</legend>
              {g.teams.map((t) => (
                <label key={t.key} className={keys.includes(t.key) ? "pick on" : "pick"}>
                  <input type="checkbox" checked={keys.includes(t.key)} onChange={() => toggle(t.key)} />
                  <span>{t.team}</span>
                </label>
              ))}
            </fieldset>
          ))}
          {mine.length > 0 && <button type="button" className="btn solid" onClick={() => setEditing(false)}>Fertig</button>}
        </div>
      ) : (
        <div className="cards">
          {mine.map((c) => (
            <article key={c.key} className="card">
              <header>
                <Link href={c.href} className="card-team">{c.team}</Link>
                <span className="card-comp">{c.competition} · {c.rank}. Platz · {c.points} Pkt · {c.record}</span>
              </header>
              {c.next && (
                <div className="next-card">
                  <p className="nc-label">Nächstes Spiel</p>
                  <p className="nc-when">{day(c.next.date)}{c.next.time && `, ${c.next.time}`}</p>
                  <p className="nc-vs">{c.next.home ? "gegen" : "bei"} <strong>{c.next.opponent}</strong> · {c.next.home ? "Heimspiel" : "Auswärts"}</p>
                  {c.next.venue && (
                    <p className="nc-venue">
                      {c.next.venue.id ? <Link href={`/halle/${c.next.venue.id}`}>{c.next.venue.name}</Link> : c.next.venue.name}
                      {c.next.venue.address.length > 0 && <> · {c.next.venue.address.join(", ")} · <a href={maps(c.next.venue.name, c.next.venue.address)} target="_blank" rel="noopener noreferrer">Route</a></>}
                    </p>
                  )}
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
    </section>
  );
}
