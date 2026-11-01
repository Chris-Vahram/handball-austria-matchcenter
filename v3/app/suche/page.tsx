import type { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset } from "@/data";
import { displayName, formatStand } from "@/lib/format";
import { MIN_QUERY, search } from "@/lib/search";
import { teamSlug } from "@/lib/teams";

export const metadata: Metadata = { title: "Suche", robots: { index: false } };

type Props = { searchParams: Promise<{ q?: string | string[] }> };

export default async function SearchPage({ searchParams }: Props) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] ?? "" : raw ?? "").slice(0, 80);
  const tooShort = q.trim().length < MIN_QUERY;
  const { teams, players } = search(q);

  return (
    <>
      <header className="app-head"><TopBar query={q} /></header>
      <main className="page results">
        <section className="panel" aria-labelledby="h-results">
          <h1 className="section-title" id="h-results">{tooShort ? "Suche" : <>Suche: „{q}“</>}</h1>
          {tooShort && <p className="empty">Mindestens {MIN_QUERY} Zeichen eingeben, z. B. einen Teamnamen oder Spieler-Nachnamen.</p>}
          {!tooShort && teams.length === 0 && players.length === 0 && <p className="empty">Nichts gefunden für „{q}“.</p>}
          {teams.length > 0 && (
            <>
              <h2 className="day">Teams</h2>
              <ul className="hits">
                {teams.map((t) => (
                  <li key={`${t.competitionId}|${t.team}`}>
                    <Link href={`/${t.competitionId}/team/${teamSlug(t.team)}`}>{t.team}<small>{COMPETITIONS[t.competitionId].name}</small></Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          {players.length > 0 && (
            <>
              <h2 className="day">Spieler</h2>
              <ul className="hits">
                {players.map((p) => (
                  <li key={`${p.competitionId}|${p.team}|${p.name}`}>
                    <Link href={`/${p.competitionId}/team/${teamSlug(p.team)}#h-players`}>{displayName(p.name)}<small>{p.team} · {COMPETITIONS[p.competitionId].name}</small></Link>
                  </li>
                ))}
              </ul>
            </>
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
