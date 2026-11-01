import type { Metadata } from "next";
import Link from "next/link";
import { Chevron, RIGHT } from "@ui/chevron";
import { MyTeams } from "@ui/client/my-teams";
import { Footer, TopBar } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset } from "@/data";
import { allTeamCards, teamKey } from "@/lib/dashboard";
import { competitionsByAssociation } from "@/lib/overview";

export const metadata: Metadata = { title: "Matchcenter – Meine Teams" };
export const revalidate = 3600;

export default function Home() {
  const groups = COMPETITION_IDS.map((id) => ({
    competition: COMPETITIONS[id].name,
    teams: (getDataset(id)?.standings ?? []).map((s) => ({ key: teamKey(id, s.team), team: s.team }))
  }));
  return (
    <>
      <header className="app-head"><TopBar /></header>
      <main className="page home">
        <MyTeams cards={allTeamCards()} groups={groups} />
        <section className="panel" aria-labelledby="h-comps">
          <h2 className="section-title" id="h-comps">Bewerbe</h2>
          <ul className="comp-list">
            {competitionsByAssociation().flatMap((g) => g.competitions.map((c) => (
              <li key={c.id}>
                <Link href={`/${c.id}`}>
                  <span><strong>{c.name}</strong><small>{g.association.split(" – ")[0]} · {c.phase} · Runde {c.round} von {c.rounds}</small></span>
                  <Chevron d={RIGHT} size={16} />
                </Link>
              </li>
            )))}
          </ul>
          <Link className="more" href="/bewerbe">Alle Bewerbe nach Verband<Chevron d={RIGHT} size={16} /></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
