import { COMPETITIONS, COMPETITION_IDS, getDataset, type CompetitionId } from "../data";

export type TeamHit = { team: string; competitionId: CompetitionId };
export type PlayerHit = { name: string; team: string; competitionId: CompetitionId };

export const MIN_QUERY = 2;
const LIMIT = 50;

/** Case- and diacritic-insensitive ("Jäger" = "jager"). */
export const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function buildIndex() {
  const teams: TeamHit[] = [];
  const players = new Map<string, PlayerHit>();
  for (const competitionId of COMPETITION_IDS) {
    const data = getDataset(competitionId);
    if (!data) continue;
    for (const s of data.standings) teams.push({ team: s.team, competitionId });
    if (COMPETITIONS[competitionId].category !== "adult") continue; // ADR-005
    const add = (name: string, team: string) => players.set(`${competitionId}|${team}|${name}`, { name, team, competitionId });
    for (const rows of Object.values(data.stats)) for (const r of rows) add(r.name, r.team);
    for (const r of Object.values(data.reports)) for (const t of [r.home, r.away]) for (const p of t.players) add(p.name, t.name);
  }
  return { teams, players: [...players.values()].sort((a, b) => a.name.localeCompare(b.name, "de")) };
}

let index: ReturnType<typeof buildIndex> | null = null;

export function search(query: string): { teams: TeamHit[]; players: PlayerHit[] } {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  if (terms.join("").length < MIN_QUERY) return { teams: [], players: [] };
  index ??= buildIndex();
  const match = (text: string) => { const n = normalize(text); return terms.every((t) => n.includes(t)); };
  return {
    teams: index.teams.filter((t) => match(t.team)).slice(0, LIMIT),
    players: index.players.filter((p) => match(p.name)).slice(0, LIMIT)
  };
}
