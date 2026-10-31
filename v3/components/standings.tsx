import type { Match, StandingRow } from "@/domain/schema";
import { lastFive } from "@/lib/form";
import { formatDiff } from "@/lib/format";

const RESULT = { S: "Sieg", U: "Unentschieden", N: "Niederlage" } as const;

/** `matches` adds the desktop-only form column (last five results). */
export function Standings({ rows, showcase, matches }: { rows: StandingRow[]; showcase: string; matches?: Match[] }) {
  return (
    <table className="standings">
      <caption className="sr-only">Tabelle</caption>
      <thead>
        <tr>
          <th scope="col" className="rk"><abbr title="Rang">#</abbr></th>
          <th scope="col" className="tm">Team</th>
          <th scope="col"><abbr title="Spiele">Sp</abbr></th>
          <th scope="col"><abbr title="Siege-Unentschieden-Niederlagen">S-U-N</abbr></th>
          <th scope="col">Tore</th>
          <th scope="col"><abbr title="Tordifferenz">+/−</abbr></th>
          <th scope="col" className="pts"><abbr title="Punkte">Pkt</abbr></th>
          {matches && <th scope="col" className="form"><abbr title="Letzte 5 Spiele, neuestes rechts">Form</abbr></th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const me = r.team === showcase;
          return (
            <tr key={r.team} className={me ? "me" : undefined}>
              <td className="rk">{r.rank}</td>
              <th scope="row" className="tm">{r.team}{me && <span className="sr-only"> (Showcase-Team)</span>}</th>
              <td className="sp">{r.played}</td>
              <td className="sun">{r.won}-{r.drawn}-{r.lost}</td>
              <td className="goals">{r.goalsFor}:{r.goalsAgainst}</td>
              <td className="diff">{formatDiff(r.goalDiff)}</td>
              <td className="pts">{r.points}</td>
              {matches && (
                <td className="form">
                  <span className="sr-only">Letzte Spiele: {lastFive(matches, r.team).map((x) => RESULT[x]).join(", ")}</span>
                  <span aria-hidden="true">{lastFive(matches, r.team).map((x, i) => <i key={i} className={`f-${x}`}>{x}</i>)}</span>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
