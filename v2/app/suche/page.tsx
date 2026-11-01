import Link from "next/link";
import { search } from "@/data/query";
import { SearchIcon } from "@ui/icons";
import { EmptyState, PageHeader } from "@ui/ui";
import { FollowStar } from "@ui/follow-star";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const results = search(q ?? "");
  return <><PageHeader eyebrow="Schnell finden" title="Suche" description="Teams, Vereine, Bewerbe und Hallen ohne Umwege finden — und direkt folgen." />
    <form className="tile my-6 flex gap-2 p-2"><label className="sr-only" htmlFor="q">Suchbegriff</label><input className="min-w-0 flex-1 rounded-2xl border-0 bg-transparent px-3 py-2 text-sm text-ink outline-none placeholder:text-faint" defaultValue={q} id="q" name="q" placeholder="Team, Verein, Bewerb oder Halle" /><button aria-label="Suchen" className="btn-team"><SearchIcon />Suchen</button></form>
    {q && !results.length ? <EmptyState title="Nichts gefunden" text={`Für „${q}“ wurden keine passenden Einträge gefunden. Prüfe die Schreibweise oder suche nach einem kürzeren Begriff.`} resetHref="/suche" action="Suche zurücksetzen" /> : <div className="grid gap-3 md:grid-cols-2">{results.map((result) => {
      const clubId = result.kind === "Verein" ? result.id : result.kind === "Team" ? (result as { clubId?: string }).clubId : undefined;
      return <div className="tile-interactive flex items-center justify-between gap-3 p-4" key={`${result.kind}-${result.id}`}>
        <Link className="group min-w-0" href={result.href}><p className="eyebrow">{result.kind}</p><h2 className="mt-1 truncate font-display font-extrabold tracking-tight text-ink transition group-hover:text-team">{result.name}</h2></Link>
        {clubId && <FollowStar clubId={clubId} name={result.name} />}
      </div>;
    })}</div>}</>;
}
