import Link from "next/link";
import { ArrowIcon, CalendarIcon, TrophyIcon } from "@/components/icons";
import { PageHeader, Panel } from "@/components/ui";

const flows = [
  { href: "/", title: "Startseite", text: "Nächstes Spiel, Favoriten und Demo-Spielbericht." },
  { href: "/teams/edelweiss-traun", title: "Team-Kontext", text: "Teamseite mit Tabelle, Formkurve und Spielberichten." },
  { href: "/bewerbe/hla-challenge", title: "HLA CHALLENGE", text: "Phasen-Hub mit öffentlichen nuLiga-Gruppen." },
  { href: "/bewerbe/hla-challenge-west-abstiegsrunde/tabelle", title: "Tabelle", text: "Mobile Karten und Desktop-Tabelle im Bewerbskontext." },
  { href: "/spiele/m-2026-06-01", title: "Spielbericht", text: "Spielerstatistik, 7m, 2-Minuten und Verlauf." }
];

export default function DemoPage() {
  return <div className="space-y-8">
    <PageHeader eyebrow="nuLiga Preview" title="Moderner Handball-Matchcenter für alle" description="Ein unabhängiger, mobiler UX-Prototyp für Spieler, Eltern, Trainer, Fans und Funktionäre. Ziel ist nicht mehr Datenfülle, sondern sofort verständliche Spieltags-Information." />
    <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <Panel className="bg-navy text-white"><p className="eyebrow text-red-200">Problem</p><h2 className="mt-2 text-3xl font-black">Viele Nutzer wollen nur fünf Antworten.</h2><div className="mt-5 grid gap-2 text-sm font-bold text-blue-100 sm:grid-cols-2"><span>Wann spielen wir?</span><span>Wo ist die Halle?</span><span>Wie war das Ergebnis?</span><span>Wo stehen wir?</span><span>Welches Team sehe ich?</span></div></Panel>
      <Panel><p className="eyebrow">Lösung</p><h2 className="mt-2 text-2xl font-black text-navy">Matchcenter statt Verwaltungsansicht.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Der Prototyp zeigt geprüfte Demo-Daten als modernes Sportprodukt: mobile Karten, Favoriten, Team-Kontext, Berichtseite, Kalender, Teilen und klare Quellen.</p></Panel>
    </section>
    <section><p className="eyebrow">Demo-Flow</p><h2 className="section-title mt-1">In fünf Minuten vorzeigbar</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{flows.map((flow) => <Link className="surface-interactive group p-5" href={flow.href} key={flow.href}><div className="flex items-start justify-between gap-3"><div className="grid size-10 place-items-center rounded-2xl bg-navy-50 text-navy"><CalendarIcon /></div><ArrowIcon className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-accent" /></div><h3 className="mt-4 font-black text-navy">{flow.title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{flow.text}</p></Link>)}</div></section>
    <section className="grid gap-4 lg:grid-cols-3">
      <Panel><TrophyIcon className="size-6 text-accent" /><h2 className="mt-4 font-black text-navy">Zielgruppen</h2><p className="mt-2 text-sm leading-6 text-slate-600">Spieler, Eltern, Trainer, Funktionäre und Fans bekommen dieselben öffentlichen Sportdaten in einer leichteren Oberfläche.</p></Panel>
      <Panel><h2 className="font-black text-navy">Daten-Grenzen</h2><p className="mt-2 text-sm leading-6 text-slate-600">Nur geprüfte Demo-Fixtures. Produktive Synchronisierung erst mit genehmigter API, Export oder schriftlicher Freigabe.</p></Panel>
      <Panel><h2 className="font-black text-navy">Privacy</h2><p className="mt-2 text-sm leading-6 text-slate-600">Keine Kontakte, Schiri-Daten, Portraitlinks oder Personen-IDs. U18-Spielerstatistik bleibt ohne separate Freigabe deaktiviert.</p></Panel>
    </section>
    <Panel className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Nächster Schritt</p><h2 className="mt-1 text-xl font-black text-navy">20-Minuten Produktgespräch</h2><p className="mt-1 text-sm leading-6 text-slate-600">Feedback zum UX-Ansatz, möglicher Pilotumfang und offizieller Datenzugang.</p></div><a className="button-primary" href="mailto:c.vahram@students.htl-leonding.ac.at">Feedback senden</a></Panel>
  </div>;
}
