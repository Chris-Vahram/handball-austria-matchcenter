import Link from "next/link";
import { search } from "@/data/query";
import { SearchIcon } from "@/components/icons";
import { EmptyState, PageHeader } from "@/components/ui";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const results = search(q ?? "");
  return <><PageHeader eyebrow="Schnell finden" title="Suche" description="Teams, Vereine, Bewerbe und Hallen ohne Umwege finden." /><form className="surface my-6 flex gap-2 p-2"><label className="sr-only" htmlFor="q">Suchbegriff</label><input className="min-w-0 flex-1 rounded-xl border-0 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400" defaultValue={q} id="q" name="q" placeholder="Team, Verein, Bewerb oder Halle" /><button aria-label="Suchen" className="button-primary gap-1.5"><SearchIcon />Suchen</button></form>{q && !results.length ? <EmptyState title="Nichts gefunden" text={`Für „${q}“ wurden keine passenden Einträge gefunden. Prüfe die Schreibweise oder suche nach einem kürzeren Begriff.`} resetHref="/suche" action="Suche zurücksetzen" /> : <div className="grid gap-3 md:grid-cols-2">{results.map((result) => <Link className="surface-interactive group p-4" key={`${result.kind}-${result.id}`} href={result.href}><p className="eyebrow">{result.kind}</p><h2 className="mt-1 font-black text-navy transition group-hover:text-accent">{result.name}</h2></Link>)}</div>}</>;
}
