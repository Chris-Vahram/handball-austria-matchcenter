import Link from "next/link";
import { PageHeader } from "@ui/ui";
import { VerbandBrowse } from "@ui/verband-browse";
import { SearchIcon, UsersIcon } from "@ui/icons";

export default function EntdeckenPage() {
  return <div className="space-y-8">
    <PageHeader eyebrow="Entdecken" title="Verbände & Bewerbe" description="Stöbere wie gewohnt nach Verband und Bewerb — nur moderner. Tabellen und Spielpläne ohne Verwaltungs-Ballast." />
    <div className="grid gap-3 sm:grid-cols-2">
      <Link className="tile-interactive group flex items-center gap-3 p-4" href="/suche"><span className="avatar team-soft-bg size-10 text-team"><SearchIcon className="size-5" /></span><span><span className="block font-bold text-ink">Suche</span><span className="text-xs text-muted">Team, Verein, Bewerb oder Halle finden</span></span></Link>
      <Link className="tile-interactive group flex items-center gap-3 p-4" href="/"><span className="avatar team-soft-bg size-10 text-team"><UsersIcon className="size-5" /></span><span><span className="block font-bold text-ink">Meine Vereine</span><span className="text-xs text-muted">Dein persönliches Dashboard</span></span></Link>
    </div>
    <VerbandBrowse />
  </div>;
}
