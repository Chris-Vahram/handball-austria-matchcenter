import Link from "next/link";
import { ArrowIcon, CalendarIcon, StarIcon, TrophyIcon, UsersIcon } from "@ui/icons";
import { Tile } from "@ui/ui";
import { Reveal, Stagger, StaggerItem } from "@ui/motion";

const demoFlow = [
  { href: "/", label: "01", title: "Folge deinen Teams", text: "Beim ersten Start Teams wählen — die App wird zu deinem persönlichen Dashboard." },
  { href: "/teams/edelweiss-traun", label: "02", title: "Team-Dashboard", text: "Nächstes Spiel, Form, Tabellenplatz und letztes Ergebnis als Widgets." },
  { href: "/entdecken", label: "03", title: "Entdecken", text: "Bewerbe, Phasen und Tabellen als sekundärer Modus — nicht im Weg." },
  { href: "/spiele/m-2026-06-01", label: "04", title: "Spielbericht", text: "Statistik, Spielfluss, Verlauf und Matchday-Aktionen, in Teamfarbe." }
];
const audiences = [
  { title: "Spieler", text: "Eigene Teams folgen, nächstes Spiel und Halle sofort sehen." },
  { title: "Eltern", text: "Ein Dashboard pro Kind-Team: Wann, wo, gegen wen, Route." },
  { title: "Trainer", text: "Form, Tabellenstand und kommender Gegner auf einen Blick." },
  { title: "Funktionäre", text: "Bewerbe und Phasen im Entdecken-Modus, rechtlich vorsichtig." }
];
const proofPoints = [
  "Follow-first: deine Teams sind die App, nicht die Verbandsstruktur",
  "Adaptive Oberfläche — färbt sich nach deinem aktiven Team",
  "Widget-Dashboard: Nächstes Spiel, Form, Tabelle, Ergebnis",
  "Entdecken als Modus, nicht als Startseite",
  "Keine Kontakte, Telefonnummern, E-Mails oder Schiedsrichterdaten",
  "Öffentliche Demo-Daten, keine Login-Seiten, kein Scraping-Ausbau"
];

export default function PitchPage() {
  return <div className="space-y-10">
    <section className="tile team-soft-bg border-0 p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <header>
          <p className="eyebrow-team">nuLiga Sales Preview</p>
          <h1 className="mt-3 font-display text-[2.5rem] font-extrabold leading-[0.96] tracking-tight text-ink sm:text-5xl md:text-6xl">Dein Verein.<br /><span className="text-team">Dein Matchcenter.</span></h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted md:text-base">Ein unabhängiger Prototyp, der öffentliche Handball-Sportdaten als persönliches Produkt zeigt: du folgst deinen Teams, alles andere ordnet sich unter.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link className="btn-team" href="/demo">Demo starten<ArrowIcon /></Link><a className="btn-soft" href="mailto:c.vahram@students.htl-leonding.ac.at">Feedback senden</a></div>
        </header>
        <div className="tile border-0 p-5"><p className="eyebrow">Kernidee</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">Follow statt Suchen.</h2><div className="mt-4 grid gap-2 text-sm text-muted">{["Folge deinen Teams", "Dashboard statt Tabellenwand", "Nächstes Spiel zuerst", "Form & Tabellenplatz als Widget", "Oberfläche in Teamfarbe"].map((q) => <span className="flex items-center gap-2" key={q}><StarIcon className="size-3.5 text-team" />{q}</span>)}</div></div>
      </div>
    </section>

    <Reveal><section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Tile><p className="eyebrow">Problem</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">Verbandssoftware zeigt alles — nur nicht zuerst, was mich betrifft.</h2><p className="mt-3 text-sm leading-6 text-muted">Bestehende Ansichten starten bei Bewerb und Tabelle. Die meisten Nutzer wollen aber nur ihre eigenen Teams. Dieses Produkt dreht die Reihenfolge um.</p></Tile>
      <Tile><p className="eyebrow-team">Lösung</p><div className="mt-3 grid gap-3 sm:grid-cols-3">{[{ icon: UsersIcon, t: "Folgen", d: "Teams wählen, Dashboard erscheint." }, { icon: CalendarIcon, t: "Matchday", d: "Nächstes Spiel, Halle, Route." }, { icon: TrophyIcon, t: "Tabelle", d: "Rang & Form als Widget." }].map(({ icon: Icon, t, d }) => <div className="rounded-2xl bg-canvas p-4" key={t}><Icon className="size-6 text-team" /><h3 className="mt-3 font-display font-extrabold tracking-tight text-ink">{t}</h3><p className="mt-1 text-sm leading-6 text-muted">{d}</p></div>)}</div></Tile>
    </section></Reveal>

    <section><p className="eyebrow">Demo Ablauf</p><h2 className="section-title mt-1">Sendbarer 5-Minuten Flow</h2><Stagger className="mt-5 grid gap-3 md:grid-cols-2">{demoFlow.map((item) => <StaggerItem key={item.href}><Link className="tile-interactive group flex h-full flex-col p-5" href={item.href}><div className="flex items-start justify-between gap-3"><span className="avatar num team-bg size-10">{item.label}</span><ArrowIcon className="size-5 text-faint transition group-hover:translate-x-1 group-hover:text-team" /></div><h3 className="mt-4 font-display font-extrabold tracking-tight text-ink">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted">{item.text}</p></Link></StaggerItem>)}</Stagger></section>

    <section className="grid gap-4 lg:grid-cols-4">{audiences.map((audience) => <Tile className="p-4 md:p-5" key={audience.title}><h2 className="font-display font-extrabold tracking-tight text-ink">{audience.title}</h2><p className="mt-2 text-sm leading-6 text-muted">{audience.text}</p></Tile>)}</section>

    <section className="grid gap-4 lg:grid-cols-2">
      <Tile><StarIcon className="size-6 text-team" /><h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">Was schon demo-reif ist</h2><ul className="mt-4 grid gap-2 text-sm leading-6 text-ink-700">{proofPoints.map((point) => <li className="flex gap-2" key={point}><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full team-bg" />{point}</li>)}</ul></Tile>
      <Tile className="team-soft-bg border-0"><p className="eyebrow-team">Fairer Rahmen</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">Dies ist kein offizieller Launch.</h2><p className="mt-3 text-sm leading-6 text-muted">Der Prototyp ist ein kontrollierter UX-Vorschlag. Für Produktion braucht es offizielle Datenfreigabe, finalisierte Rechtstexte, Betreiberangaben und abgestimmte Datenschutzprüfung.</p><div className="mt-5 rounded-2xl bg-surface p-4 text-sm font-semibold text-ink">Ziel: Feedbacktermin, Datenzugang klären, Pilotumfang definieren.</div></Tile>
    </section>
  </div>;
}
