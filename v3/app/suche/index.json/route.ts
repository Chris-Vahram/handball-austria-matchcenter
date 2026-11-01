import { COMPETITIONS, COMPETITION_IDS, getDataset } from "@/data";
import { displayName } from "@/lib/format";
import { normalize } from "@/lib/search";
import { teamSlug } from "@/lib/teams";

export const dynamic = "force-static";
export const revalidate = 3600;

/** Static suggestion index: teams and ranked players (ADR-005 amendment), ~350 entries. */
export function GET() {
  const entries: { label: string; sub: string; href: string; kind: "Team" | "Spieler"; key: string }[] = [];
  const seen = new Set<string>();
  for (const id of COMPETITION_IDS) {
    const data = getDataset(id);
    if (!data) continue;
    const c = COMPETITIONS[id];
    for (const s of data.standings) entries.push({ label: s.team, sub: c.name, href: `/${id}/team/${teamSlug(s.team)}`, kind: "Team", key: normalize(s.team) });
    if (c.category !== "adult") continue;
    for (const rows of Object.values(data.stats)) for (const r of rows) {
      const k = `${id}|${r.team}|${r.name}`;
      if (seen.has(k)) continue;
      seen.add(k);
      entries.push({ label: displayName(r.name), sub: `${r.team} · ${c.name}`, href: `/${id}/team/${teamSlug(r.team)}#h-players`, kind: "Spieler", key: normalize(r.name) });
    }
  }
  return Response.json(entries);
}
