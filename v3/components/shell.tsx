import Link from "next/link";
import { COMPETITIONS, COMPETITION_IDS, isStale, type CompetitionId } from "@/data";
import { sourceUrls } from "@/importer/config";
import { formatStand } from "@/lib/format";
import { verbandSlug } from "@/lib/overview";
import { Chevron, LEFT } from "./chevron";
import { FollowStar } from "./client/favorites";
import { SearchBox } from "./client/search-box";

export type Tab = "tabelle" | "spielplan" | "statistik" | null;

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

const TABS: { tab: Exclude<Tab, null>; label: string; path: string }[] = [
  { tab: "tabelle", label: "Tabelle", path: "" },
  { tab: "spielplan", label: "Spielplan", path: "/spielplan" },
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
        <TopBar />
        <div className="head-inner">
          <div className="title">
            <p className="verband"><Link href={`/bewerbe#${verbandSlug(COMPETITIONS[id].association)}`}>{COMPETITIONS[id].association.split(" – ")[0]}</Link><span aria-hidden="true"> › </span><span className="sr-only">, </span>{COMPETITIONS[id].name}</p>
            <div className="title-row"><h1 className="h1">{COMPETITIONS[id].name}</h1><FollowStar kind="competition" id={id} label={COMPETITIONS[id].name} /></div>
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

/** `pdf` shows the "Tabelle & Spielplan als PDF" link (Tabelle and Spielplan pages only). */
export function Footer({ id, importedAt, pdf = false }: { id?: CompetitionId; importedAt?: string | null; pdf?: boolean }) {
  return (
    <footer className="foot">
      {id && pdf && <a className="link-action pdf" href={`/${id}/druck`}>Tabelle &amp; Spielplan als PDF</a>}
      <span>
        Quelle: {id ? <a href={sourceUrls.groupPage(id)} rel="noopener noreferrer">nuLiga ({COMPETITIONS[id].fullName})</a> : "nuLiga"}
        {id && importedAt && <> · Stand {formatStand(importedAt)}</>}.
        Unabhängiger Prototyp, kein Angebot von ÖHB oder nuLiga.
      </span>
    </footer>
  );
}
