import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset } from "@/data";
import { formatStand } from "@/lib/format";
import { MIN_QUERY, search } from "@/lib/search";

export const metadata: Metadata = { title: "Suche", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] ?? "" : raw ?? "").slice(0, 80);
  const tooShort = q.trim().length < MIN_QUERY;
  const teams = search(q);

  return (
    <>
      <header className="app-head"><TopBar query={q} /></header>
      <main className="page results">
        <section className="panel" aria-labelledby="h-results">
          <h1 className="section-title" id="h-results">{tooShort ? "Suche" : <>Suche: „{q}“</>}</h1>
          {tooShort && <p className="empty">Mindestens {MIN_QUERY} Zeichen eingeben, z. B. einen Teamnamen.</p>}
          {!tooShort && teams.length === 0 && <p className="empty">Kein Team gefunden für „{q}“.</p>}
          {teams.length > 0 && (
            <ul className="hits">
              {teams.map((t) => (
                <li key={`${t.competitionId}|${t.team}`}>
                  <Link href={`/${t.competitionId}#tabelle`}>{t.team}<small>{COMPETITIONS[t.competitionId].name}</small></Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <footer className="foot">
        <span>
          Quelle: nuLiga · Stand {COMPETITION_IDS.map((id) => {
            const at = getDataset(id)?.source.importedAt;
            return `${COMPETITIONS[id].name} ${at ? formatStand(at) : "–"}`;
          }).join(", ")}. Unabhängiger Prototyp, kein Angebot von ÖHB oder nuLiga.
        </span>
      </footer>
    </>
  );
}
