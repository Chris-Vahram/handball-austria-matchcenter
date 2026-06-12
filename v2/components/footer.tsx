import Link from "next/link";

export function Footer() {
  return <footer className="mt-16 border-t border-line">
    <div className="mx-auto grid max-w-5xl gap-4 px-4 py-8 text-xs leading-5 text-muted md:grid-cols-[1fr_auto] md:px-6">
      <div>
        <p className="font-display text-sm font-extrabold tracking-tight text-ink">Mein Handball</p>
        <p className="mt-1">Unabhängiger Pilot. Keine offizielle ÖHB- oder nuLiga-Anwendung.</p>
      </div>
      <nav aria-label="Rechtliches und Feedback" className="flex flex-wrap items-center gap-x-4 gap-y-2 font-bold text-ink-700">
        <Link className="hover:text-team" href="/pitch">Pitch</Link>
        <Link className="hover:text-team" href="/demo">nuLiga Demo</Link>
        <Link className="hover:text-team" href="/impressum">Impressum</Link>
        <Link className="hover:text-team" href="/datenschutz">Datenschutz</Link>
        <a className="hover:text-team" href="mailto:c.vahram@students.htl-leonding.ac.at">Feedback senden</a>
      </nav>
    </div>
  </footer>;
}
