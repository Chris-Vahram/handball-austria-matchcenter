import { COMPETITION_IDS, getDataset, type CompetitionId } from "../data";

export type TeamHit = { team: string; competitionId: CompetitionId };

export const MIN_QUERY = 2;

/** Case- and diacritic-insensitive ("Jäger" = "jager"). */
export const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * Teams only. ADR-005 rules out search by person; player search needs a new
 * owner decision recorded there first.
 */
export function search(query: string): TeamHit[] {
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  if (terms.join("").length < MIN_QUERY) return [];
  return COMPETITION_IDS.flatMap((competitionId) =>
    (getDataset(competitionId)?.standings ?? [])
      .filter((s) => terms.every((t) => normalize(s.team).includes(t)))
      .map((s) => ({ team: s.team, competitionId })));
}
