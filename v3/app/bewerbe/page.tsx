import type { Metadata } from "next";
import { Directory } from "@ui/directory";
import { Footer, TopBar } from "@ui/shell";

export const metadata: Metadata = { title: "Bewerbe" };
export const revalidate = 3600;

export default function Competitions() {
  return (
    <>
      <header className="app-head"><TopBar /></header>
      <main className="page bewerbe">
        <h1 className="page-title">Bewerbe</h1>
        <p className="scope">Prototyp mit zwei Bewerben als Beispiel. Die Gliederung nach ÖHB und Landesverbänden ist für alle Bewerbe in Österreich gedacht.</p>
        <Directory />
      </main>
      <Footer />
    </>
  );
}
