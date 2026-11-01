import Link from "next/link";
import { ArrowIcon, CalendarIcon, TrophyIcon, UsersIcon } from "@ui/icons";
import { PageHeader, Tile } from "@ui/ui";
import { Stagger, StaggerItem } from "@ui/motion";

const flows = [
  { href: "/", step: "01", title: "Meine Teams", text: "Beim ersten Start Teams folgen — danach ist die Startseite dein persönliches Dashboard." },
  { href: "/teams/edelweiss-traun", step: "02", title: "Team-Dashboard", text: "Nächstes Spiel, Form, Tabellenplatz und letztes Ergebnis als Widget-Kacheln." },
  { href: "/entdecken", step: "03", title: "Entdecken", text: "Bewerbe und Phasen als sekundärer Modus — inklusive HLA CHALLENGE." },
  { href: "/bewerbe/hla-challenge-west-abstiegsrunde/tabelle", step: "04", title: "Tabelle", text: "Mobile Karten statt gequetschter Desktop-Tabelle." },
  { href: "/spiele/m-2026-06-01", step: "05", title: "Spielbericht + Route", text: "Bericht, Statistiken, Spielfluss, Kalender, Teilen und Google-Maps-Routenlink." }
];

export default function DemoPage() {
  return <div className="space-y-8">
    <PageHeader eyebrow="nuLiga Preview" title="Folge deinen Handball-Teams" description="Ein unabhängiger, mobiler UX-Prototyp. Statt mit der Verbandsstruktur zu starten, beginnt alles bei deinen Teams — der Rest ist ein Modus." />
    <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <Tile className="team-soft-bg border-0"><p className="eyebrow-team">Problem</p><h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink">Die meisten wollen nur ihre eigenen Teams.</h2><div className="mt-5 grid gap-2 text-sm text-muted sm:grid-cols-2">{["Wann spielen wir?", "Wo ist die Halle?", "Wie war das Ergebnis?", "Wo stehen wir?", "Wie ist unsere Form?"].map((q) => <span className="flex items-center gap-2" key={q}><span className="size-1.5 rounded-full team-bg" />{q}</span>)}</div></Tile>
      <Tile><p className="eyebrow">Lösung</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">Ein persönliches Matchcenter.</h2><p className="mt-3 text-sm leading-6 text-muted">Du folgst deinen Teams, die Oberfläche färbt sich nach deinem aktiven Team, und ein Widget-Dashboard beantwortet die Spieltagsfragen sofort.</p></Tile>
    </section>
    <section><p className="eyebrow">Geführter Demo-Flow</p><h2 className="section-title mt-1">In fünf Minuten vorzeigbar</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-muted">Diese Reihenfolge zeigt die stärksten Produktargumente ohne Vorwissen: Teams folgen, persönliches Dashboard, Entdecken-Modus, Tabelle und ein kompletter Spielbericht.</p><Stagger className="mt-5 grid gap-3 md:grid-cols-2">{flows.map((flow) => <StaggerItem key={flow.href}><Link className="tile-interactive group flex h-full flex-col p-5" href={flow.href}><div className="flex items-start justify-between gap-3"><span className="avatar num team-soft-bg size-10 text-team">{flow.step}</span><ArrowIcon className="size-5 text-faint transition group-hover:translate-x-1 group-hover:text-team" /></div><h3 className="mt-4 font-display font-extrabold tracking-tight text-ink">{flow.title}</h3><p className="mt-1 text-sm leading-6 text-muted">{flow.text}</p></Link></StaggerItem>)}</Stagger></section>
    <section className="grid gap-4 lg:grid-cols-3">
      <Tile><UsersIcon className="size-6 text-team" /><h2 className="mt-4 font-display font-extrabold tracking-tight text-ink">Zielgruppen</h2><p className="mt-2 text-sm leading-6 text-muted">Spieler, Eltern, Trainer, Funktionäre und Fans folgen ihren Teams und sehen dieselben öffentlichen Sportdaten persönlicher aufbereitet.</p></Tile>
      <Tile><CalendarIcon className="size-6 text-team" /><h2 className="mt-4 font-display font-extrabold tracking-tight text-ink">Daten-Grenzen</h2><p className="mt-2 text-sm leading-6 text-muted">Nur geprüfte Demo-Fixtures. Produktive Synchronisierung erst mit genehmigter API, Export oder schriftlicher Freigabe.</p></Tile>
      <Tile><TrophyIcon className="size-6 text-team" /><h2 className="font-display font-extrabold tracking-tight text-ink">Privacy</h2><p className="mt-2 text-sm leading-6 text-muted">Favoriten bleiben lokal. Keine Kontakte, Schiri-Daten, Portraitlinks oder Personen-IDs. U18-Spielerstatistik bleibt ohne separate Freigabe deaktiviert.</p></Tile>
    </section>
    <Tile className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow">Nächster Schritt</p><h2 className="mt-1 font-display text-xl font-extrabold tracking-tight text-ink">20-Minuten Produktgespräch</h2><p className="mt-1 text-sm leading-6 text-muted">Feedback zum UX-Ansatz, möglicher Pilotumfang und offizieller Datenzugang.</p></div><a className="btn-team" href="mailto:c.vahram@students.htl-leonding.ac.at">Feedback senden</a></Tile>
  </div>;
}
