import Link from "next/link";
import { COMPETITIONS, COMPETITION_IDS, isStale, type CompetitionId } from "@/data";
import { sourceUrls } from "@/importer/config";
import { formatStand } from "@/lib/format";

type Tab = "liga" | "torschuetzen" | "statistik" | "spiel";

/** Wordmark + search field (plain GET form, works without JavaScript). */
/** `children` (the competition switch) sits between wordmark and search on desktop and wraps below on phones. */
export function TopBar({ query = "", children }: { query?: string; children?: React.ReactNode }) {
  return (
    <div className="bar">
      <Link href="/" className="brand">Match<span>center</span></Link>
      {children}
      <form className="search" action="/suche" method="get" role="search">
        <label htmlFor="q" className="sr-only">Team oder Spieler suchen</label>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input id="q" name="q" type="search" placeholder="Team oder Spieler" defaultValue={query} minLength={2} required />
      </form>
    </div>
  );
}

/**
 * `subpage` pages (Spielbericht) own their h1; the competition name then is a plain line.
 * The tab bar sits outside <header> so `position: sticky` holds while the page scrolls.
 */
export function Header({ id, importedAt, tab, subpage = false }: { id: CompetitionId; importedAt: string | null; tab: Tab; subpage?: boolean }) {
  const c = COMPETITIONS[id];
  const Title = subpage ? "p" : "h1";
  return (
    <>
      <header className="app-head">
        <TopBar>
          <nav className="switch" aria-label="Bewerb">
            {COMPETITION_IDS.map((other) => (
              <Link key={other} href={`/${other}`} aria-current={other === id ? "page" : undefined}>{COMPETITIONS[other].name}</Link>
            ))}
          </nav>
        </TopBar>
        <div className="head-inner">
          <div className="title">
            <Title className="h1">{c.name}</Title>
            <p>
              {c.phase} {c.season}
              {importedAt && <> · Stand {formatStand(importedAt)}</>}
              {importedAt && isStale(importedAt) && <span className="stale"> · veraltet</span>}
            </p>
          </div>
        </div>
      </header>
      <div className="tabs-wrap">
        <nav className="tabs" aria-label="Ansicht">
          <Link href={`/${id}#tabelle`} className={tab === "liga" ? "on" : undefined}>Tabelle</Link>
          <Link href={`/${id}#spielplan`}>Spielplan</Link>
          <Link href={`/${id}/torschuetzen`} aria-current={tab === "torschuetzen" ? "page" : undefined}>Ranglisten</Link>
          <Link href={`/${id}/statistik`} aria-current={tab === "statistik" ? "page" : undefined}>Statistik</Link>
        </nav>
      </div>
    </>
  );
}

export function Footer({ id, importedAt }: { id: CompetitionId; importedAt: string | null }) {
  return (
    <footer className="foot">
      <a className="btn" href={`/${id}/druck`}>Tabelle &amp; Spielplan als PDF</a>
      <span>
        Quelle: <a href={sourceUrls.groupPage(id)} rel="noopener noreferrer">nuLiga ({COMPETITIONS[id].fullName})</a>
        {importedAt && <> · Stand {formatStand(importedAt)}</>}.
        Unabhängiger Prototyp, kein Angebot von ÖHB oder nuLiga.
      </span>
    </footer>
  );
}
