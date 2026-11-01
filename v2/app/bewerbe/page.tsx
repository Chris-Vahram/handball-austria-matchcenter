import { PageHeader } from "@ui/ui";
import { CompetitionsGrid } from "@ui/competitions-grid";

export default function CompetitionsPage() {
  return <div className="space-y-8">
    <PageHeader eyebrow="Entdecken" title="Bewerbe" description="Wähle deinen Bewerb. Jeder Bereich zeigt den vollständigen Spielplan und die aktuelle Tabelle im passenden Kontext." />
    <CompetitionsGrid />
  </div>;
}
