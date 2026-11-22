import type { Metadata } from "next";
import { FavoritesHome } from "@ui/client/my-teams";
import { Footer, TopBar } from "@ui/shell";
import { homeData } from "@/lib/dashboard";
import { competitionsByAssociation, verbandSlug } from "@/lib/overview";

export const metadata: Metadata = { title: "Matchcenter – Meine Favoriten" };
export const revalidate = 3600;

export default function Home() {
  const { teams, competitions } = homeData();
  const verbande = competitionsByAssociation().map((g) => ({ slug: verbandSlug(g.association), association: g.association, count: g.competitions.length }));
  return (
    <>
      <header className="app-head"><TopBar /></header>
      <main className="page home">
        <FavoritesHome teams={teams} competitions={competitions} verbande={verbande} />
      </main>
      <Footer />
    </>
  );
}
