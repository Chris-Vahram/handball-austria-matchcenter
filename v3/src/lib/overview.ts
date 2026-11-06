import { COMPETITIONS, COMPETITION_IDS, getDataset, type CompetitionId } from "../data";
import { currentRound } from "./rounds";

export type CompetitionSummary = { id: CompetitionId; name: string; phase: string; season: string; round: number; rounds: number; played: number; total: number; leader: string | null };

/** Anchor id of a Verband on /bewerbe ("ÖHB – Österreichischer Handballbund" → "oehb"). */
export const verbandSlug = (association: string) =>
  association.split(" – ")[0].normalize("NFD").replace(/\p{Diacritic}/gu, (m) => (m === "\u0308" ? "e" : "")).toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Competitions grouped by association, in configuration order (ÖHB first, then Landesverbände). */
export function competitionsByAssociation(): { association: string; competitions: CompetitionSummary[] }[] {
  const groups = new Map<string, CompetitionSummary[]>();
  for (const id of COMPETITION_IDS) {
    const c = COMPETITIONS[id];
    const data = getDataset(id);
    const list = groups.get(c.association) ?? [];
    list.push({
      id, name: c.name, phase: c.phase, season: c.season,
      round: data ? currentRound(data.matches) : 0,
      rounds: data ? new Set(data.matches.map((m) => m.round)).size : 0,
      played: data ? data.matches.filter((m) => m.score).length : 0,
      total: data?.matches.length ?? 0,
      leader: data?.standings[0]?.team ?? null
    });
    groups.set(c.association, list);
  }
  return [...groups].map(([association, competitions]) => ({ association, competitions }));
}
