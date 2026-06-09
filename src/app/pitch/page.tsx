import Link from "next/link";
import { ArrowIcon, CalendarIcon, PinIcon, SearchIcon, TrophyIcon } from "@/components/icons";
import { Panel } from "@/components/ui";

const demoFlow = [
  { href: "/", label: "01", title: "Persönlicher Einstieg", text: "Favorit wählen und sofort nächstes Spiel, Halle und Status sehen." },
  { href: "/vereine/edelweiss-traun", label: "02", title: "Vereinskontext", text: "Ein gemeinsamer Kontext für Edelweiss/Traun über mehrere Bewerbe." },
  { href: "/bewerbe/hla-challenge", label: "03", title: "Bewerbe & Phasen", text: "HLA CHALLENGE Grunddurchgänge und Playoffs als klare Auswahl." },
  { href: "/spiele/m-2026-06-01", label: "04", title: "Spielbericht", text: "Demo-Bericht mit Statistik, Spielverlauf und Matchday-Aktionen." }
];

const audiences = [
  { title: "Spieler", text: "Nächstes Spiel, Treffpunkt-Halle, Ergebnis und Bericht ohne langes Suchen." },
  { title: "Eltern", text: "Schneller Überblick am Handy: Wann, wo, gegen wen und Route öffnen." },
  { title: "Trainer", text: "Team-Kontext, Tabellenstand, letzte Resultate und kommender Gegner." },
  { title: "Funktionäre", text: "Bewerbe, Phasen, Quellenhinweise und rechtlich vorsichtiger Demo-Modus." }
];

const proofPoints = [
  "Mobile-first Matchcards statt gequetschter Tabellen",
  "Favoriten und Team-Kontext als Startpunkt",
  "Spielbericht-Demo mit klarer Statistik-Hierarchie",
  "Rechtliche Platzhalter sichtbar vor öffentlichem Launch",
  "Keine Kontakte, Telefonnummern, E-Mails oder Schiedsrichterdaten",
  "Öffentliche Demo-Daten, keine Login-Seiten, kein Scraping-Ausbau"
];

export default function PitchPage() {
  return <div className="space-y-9">
    <section className="relative overflow-hidden rounded-4xl bg-navy px-5 py-7 text-white shadow-lift md:px-8 md:py-10">
      <div className="absolute -right-16 -top-16 size-56 rounded-full border-[30px] border-white/5" />
      <div className="absolute -bottom-20 left-1/2 size-44 rounded-full border-[22px] border-accent/20" />
      <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <header>
          <p className="eyebrow text-red-200">nuLiga Sales Preview</p>
          <h1 aria-label="Moderner Matchcenter statt Verwaltungsansicht" className="mt-2 text-[2.45rem] font-black leading-[0.96] tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Moderner</span>
            <span className="block">Matchcenter statt</span>
            <span className="block">Verwaltungs-</span>
            <span className="block">ansicht</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">Ein unabhängiger Prototyp, der öffentliche Handball-Sportdaten so zeigt, wie Spieler, Eltern, Trainer und Funktionäre sie im Alltag brauchen.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-primary bg-accent hover:bg-accent-700" href="/demo">Demo starten<ArrowIcon /></Link>
            <a className="button-secondary border-white/20 bg-white/10 text-white hover:bg-white/15" href="mailto:c.vahram@students.htl-leonding.ac.at">Feedback senden</a>
          </div>
        </header>
        <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
          <p className="eyebrow text-red-200">Kernversprechen</p>
          <h2 className="mt-2 text-2xl font-black">Fünf Antworten in unter zehn Sekunden.</h2>
          <div className="mt-4 grid gap-2 text-sm font-bold text-blue-100">
            <span>Wann spielen wir?</span>
            <span>Wo ist die Halle?</span>
            <span>Was war das Ergebnis?</span>
            <span>Wo stehen wir in der Tabelle?</span>
            <span>Welches Team und welcher Verein ist gemeint?</span>
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Panel>
        <p className="eyebrow">Problem</p>
        <h2 className="mt-2 text-2xl font-black text-navy">Nutzer suchen Sport-Information, nicht Verbandssoftware.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">Viele Matchcenter zeigen zwar Daten, aber der Alltag beginnt am Handy: nächstes Spiel, Halle, Route, Ergebnis, Tabelle. Der Prototyp stellt diese Fragen vor die Datenstruktur.</p>
      </Panel>
      <Panel className="bg-navy-50">
        <p className="eyebrow">Lösung</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-4"><CalendarIcon className="size-6 text-accent" /><h3 className="mt-3 font-black text-navy">Matchday</h3><p className="mt-1 text-sm leading-6 text-slate-600">Spiel, Zeit, Status, Ergebnis.</p></div>
          <div className="rounded-2xl bg-white p-4"><PinIcon className="size-6 text-accent" /><h3 className="mt-3 font-black text-navy">Halle</h3><p className="mt-1 text-sm leading-6 text-slate-600">Venue und Route ohne Map-Tracking.</p></div>
          <div className="rounded-2xl bg-white p-4"><TrophyIcon className="size-6 text-accent" /><h3 className="mt-3 font-black text-navy">Tabelle</h3><p className="mt-1 text-sm leading-6 text-slate-600">Rang, Punkte, Differenz sofort lesbar.</p></div>
        </div>
      </Panel>
    </section>

    <section>
      <p className="eyebrow">Demo Ablauf</p>
      <h2 className="section-title mt-1">Sendbarer 5-Minuten Flow</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {demoFlow.map((item) => <Link className="surface-interactive group p-5" href={item.href} key={item.href}>
          <div className="flex items-start justify-between gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-navy text-sm font-black text-white">{item.label}</span>
            <ArrowIcon className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-accent" />
          </div>
          <h3 className="mt-4 font-black text-navy">{item.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
        </Link>)}
      </div>
    </section>

    <section className="grid gap-4 lg:grid-cols-4">
      {audiences.map((audience) => <Panel className="p-4 md:p-5" key={audience.title}>
        <h2 className="font-black text-navy">{audience.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{audience.text}</p>
      </Panel>)}
    </section>

    <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
      <Panel>
        <SearchIcon className="size-6 text-accent" />
        <h2 className="mt-4 text-2xl font-black text-navy">Was schon demo-reif ist</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
          {proofPoints.map((point) => <li className="flex gap-2" key={point}><span aria-hidden="true" className="mt-2 size-1.5 rounded-full bg-accent" />{point}</li>)}
        </ul>
      </Panel>
      <Panel className="bg-navy text-white">
        <p className="eyebrow text-red-200">Fairer Rahmen</p>
        <h2 className="mt-2 text-2xl font-black">Dies ist kein offizieller Launch.</h2>
        <p className="mt-3 text-sm leading-6 text-blue-100">Der Prototyp ist ein kontrollierter UX-Vorschlag. Für Produktion braucht es offizielle Datenfreigabe, finalisierte Rechtstexte, Betreiberangaben und abgestimmte Datenschutzprüfung.</p>
        <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-bold text-white">Ziel: Feedbacktermin, Datenzugang klären, Pilotumfang definieren.</div>
      </Panel>
    </section>
  </div>;
}
