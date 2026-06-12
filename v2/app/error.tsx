"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="tile border-loss/30 p-5 md:p-7"><p className="eyebrow text-loss">Fehler</p><h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">Daten konnten nicht geladen werden.</h1><p className="mt-2 text-sm leading-6 text-muted">Bitte versuche es erneut. Die zuletzt validierten Pilotdaten bleiben unverändert.</p><button className="btn-team mt-5" onClick={reset}>Erneut versuchen</button></section>;
}
