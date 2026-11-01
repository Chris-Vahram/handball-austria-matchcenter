import Link from "next/link";

export default function NotFound() {
  return <section className="tile border-dashed p-6 text-center md:p-10">
    <p className="eyebrow-team">404</p>
    <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink md:text-3xl">Seite nicht gefunden</h1>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Diese Seite gibt es nicht (mehr). Vielleicht ist der Spieler, das Team oder der Bewerb noch nicht freigegeben.</p>
    <div className="mt-5 flex flex-wrap justify-center gap-2"><Link className="btn-team" href="/">Zu meinen Vereinen</Link><Link className="btn-soft" href="/entdecken">Entdecken</Link></div>
  </section>;
}
