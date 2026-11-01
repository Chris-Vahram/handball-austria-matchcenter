import Link from "next/link";
import type { Match } from "@/domain/schema";
import { formatDay, formatShortDate, formatWeekdayDate, todayInVienna } from "@/lib/format";
import { roundsOf } from "@/lib/rounds";
import { Chevron, LEFT, RIGHT } from "./chevron";

export function Schedule({ id, matches, round, showcase }: { id: string; matches: Match[]; round: number; showcase: string }) {
  const rounds = roundsOf(matches);
  const inRound = matches.filter((m) => m.round === round).sort((a, b) => (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")) || a.number - b.number);
  const prev = rounds.filter((r) => r < round).at(-1);
  const next = rounds.find((r) => r > round);
  const days = [...new Set(inRound.map((m) => m.date))];
  const today = todayInVienna();
  const span = days.length ? `${formatShortDate(days[0]).slice(0, 6)} – ${formatShortDate(days.at(-1)!)}` : "";

  return (
    <>
      <div className="round-nav">
        {prev ? <Link href={`/${id}?runde=${prev}#spielplan`} aria-label={`Runde ${prev}`} scroll={false}><Chevron d={LEFT} /></Link> : <span className="off" aria-hidden="true"><Chevron d={LEFT} /></span>}
        <strong aria-live="polite">Runde {round}<small>{span}</small></strong>
        {next ? <Link href={`/${id}?runde=${next}#spielplan`} aria-label={`Runde ${next}`} scroll={false}><Chevron d={RIGHT} /></Link> : <span className="off" aria-hidden="true"><Chevron d={RIGHT} /></span>}
      </div>
      {days.map((day) => (
        <div key={day}>
          <h3 className={day === today ? "day today" : "day"}>{day === today ? <><span>Heute</span> · </> : null}{formatDay(day)}</h3>
          {inRound.filter((m) => m.date === day).map((m) => <MatchRow key={m.number} id={id} m={m} showcase={showcase} />)}
        </div>
      ))}
    </>
  );
}

/** One match in Flashscore form. `showDate` puts the date into the time column (team fixture lists). */
export function MatchRow({ id, m, showcase, showDate = false }: { id: string; m: Match; showcase: string; showDate?: boolean }) {
  const homeWin = m.score && m.score.home > m.score.away;
  const awayWin = m.score && m.score.away > m.score.home;
  const cls = (team: string, win: boolean | null) => [team === showcase ? "me" : "", win ? "win" : ""].join(" ").trim() || undefined;
  const meta = [
    `Nr. ${m.number}`,
    m.venue,
    m.note
  ].filter(Boolean).join(" · ");
  const body = (
    <>
      <time dateTime={`${m.date}${m.time ? `T${m.time}` : ""}`}>{showDate ? <>{formatWeekdayDate(m.date)}<br /></> : null}{m.time ?? "–"}</time>
      <span className={`t ${cls(m.home, homeWin) ?? ""}`}>{m.home}</span>
      {m.score ? <span className={`s ${homeWin ? "win" : ""}`}>{m.score.home}</span> : <span className="open">angesetzt</span>}
      <span className={`t ${cls(m.away, awayWin) ?? ""}`}>{m.away}</span>
      {m.score && <span className={`s ${awayWin ? "win" : ""}`}>{m.score.away}</span>}
      <span className="meta">
        {meta}
        {m.reportApproved === false && <> · <span className="pending">Bericht noch nicht genehmigt</span></>}
      </span>
    </>
  );
  return m.reportId
    ? <Link className="match" href={`/${id}/spiel/${m.reportId}`}>{body}</Link>
    : <div className="match">{body}</div>;
}
