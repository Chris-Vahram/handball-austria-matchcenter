import { COMPETITIONS, COMPETITION_IDS, getDataset, type CompetitionId } from "../data";

export type TeamHit = { team: string; competitionId: CompetitionId };
export type PlayerHit = { name: string; team: string; competitionId: CompetitionId };

export const MIN_QUERY = 2;
const LIMIT = 50;

/** Case- and diacritic-insensitive ("Jäger" = "jager"). */
export const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * Teams from the standings; players only from the nuLiga player rankings of adult
 * competitions (ADR-005 amendment 2026-10-31: owner chose "handball stats" as source).
 */
export function search(query: string): { teams: TeamHit[]; players: PlayerHit[] } {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  if (terms.join("").length < MIN_QUERY) return { teams: [], players: [] };
  const match = (text: string) => { const n = normalize(text); return terms.every((t) => n.includes(t)); };
  const teams: TeamHit[] = [];
  const players = new Map<string, PlayerHit>();
  for (const competitionId of COMPETITION_IDS) {
    const data = getDataset(competitionId);
    if (!data) continue;
    for (const s of data.standings) if (match(s.team)) teams.push({ team: s.team, competitionId });
    if (COMPETITIONS[competitionId].category !== "adult") continue;
    for (const rows of Object.values(data.stats)) for (const r of rows) {
      if (match(r.name)) players.set(`${competitionId}|${r.team}|${r.name}`, { name: r.name, team: r.team, competitionId });
    }
  }
  return {
    teams: teams.slice(0, LIMIT),
    players: [...players.values()].sort((a, b) => a.name.localeCompare(b.name, "de")).slice(0, LIMIT)
  };
}
