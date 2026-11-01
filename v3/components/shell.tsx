import Link from "next/link";
import { COMPETITIONS, COMPETITION_IDS, isStale, type CompetitionId } from "@/data";
import { sourceUrls } from "@/importer/config";
import { formatStand } from "@/lib/format";
import { Chevron, LEFT } from "./chevron";
import { SearchBox } from "./client/search-box";

export type Tab = "tabelle" | "spielplan" | "ranglisten" | "statistik" | null;

/** Wordmark, optional middle slot (competition switch) and search with suggestions. */
export function TopBar({ query = "", children }: { query?: string; children?: React.ReactNode }) {
  return (
    <div className="bar">
      <Link href="/" className="brand" aria-label="Matchcenter Startseite">Match<span>center</span></Link>
      {children}
      <SearchBox initial={query} />
    </div>
  );
}

function Switch({ id }: { id: CompetitionId }) {
  return (
    <nav className="switch" aria-label="Bewerb">
      {COMPETITION_IDS.map((other) => (
        <Link key={other} href={`/${other}`} aria-current={other === id ? "page" : undefined}>{COMPETITIONS[other].name}</Link>
      ))}
    </nav>
  );
}

const TABS: { tab: Exclude<Tab, null>; label: string; path: string }[] = [
  { tab: "tabelle", label: "Tabelle", path: "" },
  { tab: "spielplan", label: "Spielplan", path: "/spielplan" },
  { tab: "ranglisten", label: "Ranglisten", path: "/torschuetzen" },
  { tab: "statistik", label: "Statistik", path: "/statistik" }
];

/** Four real pages, exactly one active (or none on sub-pages). Sticky while scrolling. */
function Tabs({ id, tab }: { id: CompetitionId; tab: Tab }) {
  return (
    <div className="tabs-wrap">
      <nav className="tabs" aria-label="Ansicht">
        {TABS.map((t) => (
          <Link key={t.tab} href={`/${id}${t.path}`} aria-current={t.tab === tab ? "page" : undefined}>{t.label}</Link>
        ))}
      </nav>
    </div>
  );
}

function StandLine({ id, importedAt }: { id: CompetitionId; importedAt: string | null }) {
  const c = COMPETITIONS[id];
  return (
    <>
      {c.phase} {c.season}
      {importedAt && <> · Stand {formatStand(importedAt)}</>}
      {importedAt && isStale(importedAt) && <span className="stale"> · veraltet</span>}
    </>
  );
}

/** Competition pages (Tabelle, Spielplan, Ranglisten, Statistik): big competition title + tabs. */
export function Header({ id, importedAt, tab }: { id: CompetitionId; importedAt: string | null; tab: Tab }) {
  return (
    <>
      <header className="app-head">
        <TopBar><Switch id={id} /></TopBar>
        <div className="head-inner">
          <div className="title">
            <h1 className="h1">{COMPETITIONS[id].name}</h1>
            <p><StandLine id={id} importedAt={importedAt} /></p>
          </div>
        </div>
      </header>
      <Tabs id={id} tab={tab} />
    </>
  );
}

/** Sub-pages (team, report): a one-line breadcrumb instead of a second large heading; the page owns its h1. */
export function SubHeader({ id, importedAt, crumb }: { id: CompetitionId; importedAt: string | null; crumb: string }) {
  return (
    <>
      <header className="app-head">
        <TopBar />
        <nav className="crumb" aria-label="Brotkrumen">
          <Link href={`/${id}`}><Chevron d={LEFT} size={16} />{COMPETITIONS[id].name}</Link>
          <span aria-current="page">{crumb}</span>
          <small><StandLine id={id} importedAt={importedAt} /></small>
        </nav>
      </header>
      <Tabs id={id} tab={null} />
    </>
  );
}

export function Footer({ id, importedAt }: { id?: CompetitionId; importedAt?: string | null }) {
  return (
    <footer className="foot">
      {id && <a className="btn" href={`/${id}/druck`}>Tabelle &amp; Spielplan als PDF</a>}
      <span>
        Quelle: {id ? <a href={sourceUrls.groupPage(id)} rel="noopener noreferrer">nuLiga ({COMPETITIONS[id].fullName})</a> : "nuLiga"}
        {id && importedAt && <> · Stand {formatStand(importedAt)}</>}.
        Unabhängiger Prototyp, kein Angebot von ÖHB oder nuLiga.
      </span>
    </footer>
  );
}
