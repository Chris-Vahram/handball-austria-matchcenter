import Link from "next/link";
import { teamName } from "@/data/query";
import { playerSlug, sevenMetreQuota, type PlayerScorer } from "@/data/player-stats";
import { TeamAvatar, Tile } from "@ui/ui";

export function ScorerTable({ rows, showTeam = true }: { rows: PlayerScorer[]; showTeam?: boolean }) {
  return <Tile className="overflow-hidden p-0">
    <div className="overflow-x-auto">
    <table className="w-full min-w-[32rem] text-left text-sm">
      <thead className="border-b border-line bg-canvas text-[0.6rem] uppercase tracking-wider text-muted">
        <tr><th className="px-3 py-2.5">#</th><th className="px-2 py-2.5">Spieler</th>{showTeam && <th className="px-2 py-2.5">Team</th>}<th className="px-2 py-2.5 text-right">Sp</th><th className="px-2 py-2.5 text-right">Tore</th><th className="px-2 py-2.5 text-right">7m</th><th className="px-3 py-2.5 text-right">2′</th></tr>
      </thead>
      <tbody className="divide-y divide-line">{rows.map((row, index) => {
        const quota = sevenMetreQuota(row.sevenMetreGoals, row.sevenMetreAttempts);
        return <tr className={index === 0 ? "team-soft-bg" : undefined} key={row.ref}>
          <td className="num px-3 py-3 font-extrabold text-muted">{index + 1}</td>
          <td className="px-2 py-3"><Link className="flex items-center gap-1.5 font-semibold text-ink hover:text-team" href={`/spieler/${playerSlug(row.displayLabel, row.shirtNumber)}`}>{index === 0 && <span aria-hidden="true" className="text-team">★</span>}{row.displayLabel}</Link></td>
          {showTeam && <td className="px-2 py-3"><Link className="flex items-center gap-1.5 text-xs font-bold text-muted hover:text-team" href={`/teams/${row.teamId}`}><TeamAvatar name={teamName(row.teamId)} teamId={row.teamId} className="size-5 text-[0.45rem]" /><span className="hidden sm:inline">{teamName(row.teamId)}</span></Link></td>}
          <td className="num px-2 py-3 text-right text-muted">{row.matches}</td>
          <td className="num px-2 py-3 text-right font-extrabold text-team">{row.goals}</td>
          <td className="num px-2 py-3 text-right text-muted">{row.sevenMetreGoals}/{row.sevenMetreAttempts}{quota !== undefined && <span className="text-faint"> ({quota}%)</span>}</td>
          <td className="num px-3 py-3 text-right text-muted">{row.twoMinutePenalties}</td>
        </tr>;
      })}</tbody>
    </table>
    </div>
  </Tile>;
}
