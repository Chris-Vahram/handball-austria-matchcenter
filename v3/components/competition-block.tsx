import Link from "next/link";
import { COMPETITIONS, getDataset, type CompetitionId } from "@/data";
import { teamKey } from "@/lib/favorites";
import { currentRound } from "@/lib/rounds";
import { teamSlug } from "@/lib/teams";
import { Chevron, RIGHT } from "./chevron";
import { RoundMatches } from "./schedule";

/** Home overview of one followed Bewerb: top 3 plus favorite teams' rows (CSS shows `.extra.me`), then the current round. */
export function CompetitionBlock({ id }: { id: CompetitionId }) {
  const data = getDataset(id);
  if (!data) return null;
  const round = currentRound(data.matches);
  return (
    <section className="panel comp-block" aria-labelledby={`h-cb-${id}`}>
      <h2 className="section-title" id={`h-cb-${id}`}><Link href={`/${id}`}>{COMPETITIONS[id].name}</Link> <small>{COMPETITIONS[id].phase}</small></h2>
      <div className="cb-table">
      <table className="mini">
        <caption className="sr-only">Tabelle {COMPETITIONS[id].name}, die ersten drei und deine Teams</caption>
        <thead><tr><th scope="col"><abbr title="Rang">#</abbr></th><th scope="col">Team</th><th scope="col"><abbr title="Spiele">Sp</abbr></th><th scope="col"><abbr title="Punkte">Pkt</abbr></th></tr></thead>
        <tbody>
          {data.standings.map((s) => (
            <tr key={s.team} className={s.rank > 3 ? "extra" : undefined} data-team={teamKey(id, s.team)}>
              <td>{s.rank}</td>
              <th scope="row"><Link href={`/${id}/team/${teamSlug(s.team)}`}>{s.team}</Link></th>
              <td>{s.played}</td>
              <td className="pts">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="more" href={`/${id}`}>Ganze Tabelle<Chevron d={RIGHT} size={16} /></Link>
      </div>
      <div className="cb-round">
        <h3 className="day">Runde {round}</h3>
        <RoundMatches id={id} data={data} round={round} />
      </div>
    </section>
  );
}
