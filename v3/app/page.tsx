import type { Metadata } from "next";
import { CompetitionBlock } from "@ui/competition-block";
import { FavoritesHome } from "@ui/client/my-teams";
import { Directory } from "@ui/directory";
import { Footer, TopBar } from "@ui/shell";
import { COMPETITION_IDS } from "@/data";
import { allTeamCards } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Matchcenter – Meine Favoriten" };
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <header className="app-head"><TopBar /></header>
      <main className="page home">
        <FavoritesHome cards={allTeamCards()} blocks={COMPETITION_IDS.map((id) => ({ id, node: <CompetitionBlock id={id} /> }))} />
        <h2 className="section-title dir-title">Bewerbe nach Verband</h2>
        <Directory headingLevel={3} />
      </main>
      <Footer />
    </>
  );
}
