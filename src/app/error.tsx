"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="surface border-accent-100 p-5 md:p-7"><p className="eyebrow">Fehler</p><h1 className="mt-2 text-2xl font-black text-navy">Daten konnten nicht geladen werden.</h1><p className="mt-2 text-sm leading-6 text-slate-600">Bitte versuche es erneut. Die zuletzt validierten Pilotdaten bleiben unverändert.</p><button className="button-primary mt-5" onClick={reset}>Erneut versuchen</button></section>;
}
