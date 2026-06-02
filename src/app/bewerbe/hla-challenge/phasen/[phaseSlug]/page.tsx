import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState, Metadata, PageHeader } from "@/components/ui";
import { hlaChallengePhase } from "@/data/competition-groups";

export default async function HlaChallengePhasePage({ params }: { params: Promise<{ phaseSlug: string }> }) {
  const phase = hlaChallengePhase((await params).phaseSlug);
  if (!phase) notFound();
  return <><PageHeader eyebrow="HLA CHALLENGE · 2025/26" title={phase.name} description={phase.description} /><div className="mt-6"><EmptyState title="Noch keine geprüften Pilotdaten" text="Die Bewerbsphase ist öffentlich bestätigt. Für diese Demo werden erst nach Prüfung konkrete Termine und Tabellen veröffentlicht." resetHref="/bewerbe/hla-challenge" action="Zur HLA CHALLENGE" /></div><div className="mt-5"><Metadata sourceLabel={`ÖHB: ${phase.name}`} sourceReference={phase.sourceReference} /><Link className="button-secondary mt-4" href={phase.sourceReference}>Öffentliche ÖHB-Seite öffnen</Link></div></>;
}
