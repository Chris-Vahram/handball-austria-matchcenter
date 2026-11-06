import type { Metadata } from "next";
import Link from "next/link";
import { Chevron, RIGHT } from "@ui/chevron";
import { Footer, TopBar } from "@ui/shell";
import { competitionsByAssociation } from "@/lib/overview";

export const metadata: Metadata = { title: "Bewerbe" };
export const revalidate = 3600;

export default function Competitions() {
  const groups = competitionsByAssociation();
  return (
    <>
      <header className="app-head"><TopBar /></header>
      <main className="page bewerbe">
        <h1 className="page-title">Bewerbe</h1>
        <p className="scope">Prototyp mit zwei Bewerben als Beispiel. Die Gliederung nach ÖHB und Landesverbänden ist für alle Bewerbe in Österreich gedacht.</p>
        {groups.map((g) => (
          <section key={g.association} className="panel" aria-labelledby={`h-${g.association}`}>
            <h2 className="day assoc" id={`h-${g.association}`}>{g.association}</h2>
            <ul className="comp-list">
              {g.competitions.map((c) => (
                <li key={c.id}>
                  <Link href={`/${c.id}`}>
                    <span>
                      <strong>{c.name}</strong>
                      <small>{c.phase} {c.season} · Runde {c.round} von {c.rounds} · {c.played} von {c.total} Spielen{c.leader && <> · Erster: {c.leader}</>}</small>
                    </span>
                    <Chevron d={RIGHT} size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
