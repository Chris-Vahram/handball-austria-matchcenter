import Link from "next/link";

export function Footer() {
  return <footer className="border-t border-line bg-white"><div className="mx-auto grid max-w-6xl gap-4 px-4 py-7 text-xs leading-5 text-slate-600 md:grid-cols-[1fr_auto] md:px-6"><div><p className="font-black text-navy">Handball Matchcenter</p><p>Unabhängiger Pilot. Keine offizielle ÖHB- oder nuLiga-Anwendung.</p></div><nav aria-label="Rechtliches und Feedback" className="flex flex-wrap gap-x-4 gap-y-2 font-bold text-navy"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><a href="mailto:c.vahram@students.htl-leonding.ac.at">Feedback senden</a></nav></div></footer>;
}
