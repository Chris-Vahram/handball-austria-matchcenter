import { PageHeader, Panel } from "@/components/ui";

export default function ImprintPage() {
  return <><PageHeader eyebrow="Rechtliches" title="Impressum" description="Angaben für den unabhängigen Handball-Matchcenter Pilot." /><Panel className="mt-6 space-y-4 text-sm leading-6 text-slate-700"><p className="rounded-xl bg-warning-50 p-3 font-black text-warning">[Vor öffentlichem Launch ergänzen]</p><div><h2 className="font-black text-navy">Medieninhaber und Betreiber</h2><p>[Vor öffentlichem Launch ergänzen]</p></div><div><h2 className="font-black text-navy">Kontakt</h2><p>[Vor öffentlichem Launch ergänzen]</p></div><div><h2 className="font-black text-navy">Hinweis</h2><p>Diese Website ist ein unabhängiger Pilot und keine offizielle ÖHB- oder nuLiga-Anwendung. Vor einem öffentlichen Deployment müssen alle Betreiberangaben geprüft und finalisiert werden.</p></div></Panel></>;
}
