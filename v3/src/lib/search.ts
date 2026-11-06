import { COMPETITIONS, COMPETITION_IDS, getDataset, type CompetitionId } from "../data";
import type { Dataset } from "../domain/schema";

export type CompetitionHit = { competitionId: CompetitionId };
export type TeamHit = { team: string; competitionId: CompetitionId };
export type PlayerHit = { name: string; team: string; competitionId: CompetitionId };

export const MIN_QUERY = 2;
const LIMIT = 50;

/** Case-, diacritic- and hyphen-insensitive ("Jäger" = "jager", "SK-Handball" = "sk handball"). */
export const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/-/g, " ");

/** Official club ("Verein") names that the nuLiga rankings attribute to each team, e.g. "SK-Handball Traun". */
export function clubAliases(data: Dataset): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const rows of Object.values(data.stats)) for (const r of rows) {
    if (!r.club || !r.team || r.club === r.team) continue;
    const list = out.get(r.team) ?? [];
    if (!list.includes(r.club)) list.push(r.club);
    out.set(r.team, list);
  }
  return out;
}

/** Text a competition is found by: name, full name and Verband. */
export const competitionTerms = (id: CompetitionId) => [COMPETITIONS[id].name, COMPETITIONS[id].fullName, COMPETITIONS[id].association].join(" ");

/**
 * Bewerbe first, then teams (by name or Verein alias), then players from the nuLiga player rankings
 * (ADR-005 amendments 2026-10-31 and 2026-11-06: rankings as source, youth like adult).
 */
export function search(query: string): { competitions: CompetitionHit[]; teams: TeamHit[]; players: PlayerHit[] } {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  if (terms.join("").length < MIN_QUERY) return { competitions: [], teams: [], players: [] };
  const match = (text: string) => { const n = normalize(text); return terms.every((t) => n.includes(t)); };
  const competitions: CompetitionHit[] = [];
  const teams: TeamHit[] = [];
  const players = new Map<string, PlayerHit>();
  for (const competitionId of COMPETITION_IDS) {
    if (match(competitionTerms(competitionId))) competitions.push({ competitionId });
    const data = getDataset(competitionId);
    if (!data) continue;
    const aliases = clubAliases(data);
    for (const s of data.standings) {
      if (match(s.team) || (aliases.get(s.team) ?? []).some(match)) teams.push({ team: s.team, competitionId });
    }
    for (const rows of Object.values(data.stats)) for (const r of rows) {
      if (match(r.name)) players.set(`${competitionId}|${r.team}|${r.name}`, { name: r.name, team: r.team, competitionId });
    }
  }
  return {
    competitions,
    teams: teams.slice(0, LIMIT),
    players: [...players.values()].sort((a, b) => a.name.localeCompare(b.name, "de")).slice(0, LIMIT)
  };
}
