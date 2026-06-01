import { PageHeader, Panel } from "@/components/ui";

export default function PrivacyPage() {
  return <><PageHeader eyebrow="Rechtliches" title="Datenschutz" description="Datenschutzhinweise für den unabhängigen Handball-Matchcenter Pilot." /><Panel className="mt-6 space-y-4 text-sm leading-6 text-slate-700"><p className="rounded-xl bg-warning-50 p-3 font-black text-warning">[Vor öffentlichem Launch ergänzen]</p><div><h2 className="font-black text-navy">Aktueller Demo-Stand</h2><p>Favoriten werden ausschließlich lokal im Browser als öffentliche IDs gespeichert. Es gibt kein Benutzerkonto, kein Feedback-Formular, keine eingebettete Karte und keine nicht notwendigen Tracking-Skripte.</p></div><div><h2 className="font-black text-navy">Vor öffentlichem Deployment</h2><p>Verantwortliche Stelle, Hostinganbieter, Rechtsgrundlagen und finaler Datenschutzhinweis müssen geprüft und ergänzt werden.</p></div></Panel></>;
}
