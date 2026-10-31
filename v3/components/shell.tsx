import Link from "next/link";
import { COMPETITIONS, COMPETITION_IDS, isStale, type CompetitionId } from "@/data";
import { formatStand } from "@/lib/format";

type Tab = "liga" | "torschuetzen" | "spiel";

/** Wordmark + search field (plain GET form, works without JavaScript). */
export function TopBar({ query = "" }: { query?: string }) {
  return (
    <div className="bar">
      <Link href="/" className="brand">Match<span>center</span></Link>
      <form className="search" action="/suche" method="get" role="search">
        <label htmlFor="q" className="sr-only">Team oder Spieler suchen</label>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input id="q" name="q" type="search" placeholder="Team oder Spieler" defaultValue={query} minLength={2} required />
      </form>
    </div>
  );
}

export function Header({ id, importedAt, tab }: { id: CompetitionId; importedAt: string | null; tab: Tab }) {
  const c = COMPETITIONS[id];
  return (
    <header className="app-head">
      <TopBar />
      <div className="head-inner">
        <nav className="switch" aria-label="Bewerb">
          {COMPETITION_IDS.map((other) => (
            <Link key={other} href={`/${other}`} aria-current={other === id ? "page" : undefined}>{COMPETITIONS[other].name}</Link>
          ))}
        </nav>
        <div className="title">
          <h1>{c.name}</h1>
          <p>
            {c.phase} {c.season}
            {importedAt && <> · Stand {formatStand(importedAt)}</>}
            {importedAt && isStale(importedAt) && <span className="stale"> · veraltet</span>}
          </p>
        </div>
        <nav className="tabs" aria-label="Ansicht">
          <Link href={`/${id}#tabelle`} className={tab === "liga" ? "on" : undefined}>Tabelle</Link>
          <Link href={`/${id}#spielplan`}>Spielplan</Link>
          <Link href={`/${id}/torschuetzen`} aria-current={tab === "torschuetzen" ? "page" : undefined}>Torschützen</Link>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ id, importedAt }: { id: CompetitionId; importedAt: string | null }) {
  return (
    <footer className="foot">
      <a className="btn" href={`/${id}/druck`}>Tabelle &amp; Spielplan als PDF</a>
      <span>
        Quelle: nuLiga ({COMPETITIONS[id].fullName}){importedAt && <> · Stand {formatStand(importedAt)}</>}.
        Unabhängiger Prototyp, kein Angebot von ÖHB oder nuLiga.
      </span>
    </footer>
  );
}
