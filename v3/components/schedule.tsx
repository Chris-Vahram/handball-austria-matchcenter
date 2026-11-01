import Link from "next/link";
import type { Dataset, Match } from "@/domain/schema";
import { formatDay, formatShortDate, formatWeekdayDate, todayInVienna } from "@/lib/format";
import { roundsOf } from "@/lib/rounds";
import { Chevron, LEFT, RIGHT } from "./chevron";
import { AutoSubmitSelect } from "./client/auto-submit";

const byTime = (a: Match, b: Match) => (a.date + (a.time ?? "")).localeCompare(b.date + (b.time ?? "")) || a.number - b.number;

const span = (matches: Match[]) => {
  const days = [...new Set(matches.map((m) => m.date))].sort();
  return days.length ? `${formatShortDate(days[0]).slice(0, 6)} – ${formatShortDate(days.at(-1)!)}` : "";
};

/** Matches of one round, grouped by day ("Heute" in red on match day). */
export function RoundMatches({ id, data, round, showcase }: { id: string; data: Dataset; round: number; showcase: string }) {
  const inRound = data.matches.filter((m) => m.round === round).sort(byTime);
  const days = [...new Set(inRound.map((m) => m.date))];
  const today = todayInVienna();
  return (
    <>
      {days.map((day) => (
        <div key={day}>
          <h3 className={day === today ? "day today" : "day"}>{day === today ? <><span>Heute</span> · </> : null}{formatDay(day)}</h3>
          {inRound.filter((m) => m.date === day).map((m) => <MatchRow key={m.number} id={id} m={m} data={data} showcase={showcase} />)}
        </div>
      ))}
    </>
  );
}

/** Stepper plus a direct round picker (GET form; submits on change, button for no-JS). */
export function RoundPicker({ id, data, round }: { id: string; data: Dataset; round: number }) {
  const rounds = roundsOf(data.matches);
  const prev = rounds.filter((r) => r < round).at(-1);
  const next = rounds.find((r) => r > round);
  const href = (r: number) => `/${id}/spielplan?runde=${r}`;
  return (
    <div className="round-nav">
      {prev ? <Link href={href(prev)} aria-label={`Runde ${prev}`} scroll={false}><Chevron d={LEFT} /></Link> : <span className="off" aria-hidden="true"><Chevron d={LEFT} /></span>}
      <form method="get" action={`/${id}/spielplan`} className="round-pick">
        <label htmlFor="runde" className="sr-only">Runde wählen</label>
        <AutoSubmitSelect id="runde" name="runde" defaultValue={String(round)} key={round}>
          {rounds.map((r) => (
            <option key={r} value={r}>Runde {r} · {span(data.matches.filter((m) => m.round === r))}</option>
          ))}
        </AutoSubmitSelect>
        <noscript><button type="submit">Anzeigen</button></noscript>
      </form>
      {next ? <Link href={href(next)} aria-label={`Runde ${next}`} scroll={false}><Chevron d={RIGHT} /></Link> : <span className="off" aria-hidden="true"><Chevron d={RIGHT} /></span>}
    </div>
  );
}

/**
 * One match in Flashscore form. The report link stretches over the whole row (visible chevron);
 * the venue link sits above it so both stay tappable. `showDate` puts the date in the time column.
 */
export function MatchRow({ id, m, data, showcase, showDate = false }: { id: string; m: Match; data: Dataset; showcase: string; showDate?: boolean }) {
  const homeWin = !!m.score && m.score.home > m.score.away;
  const awayWin = !!m.score && m.score.away > m.score.home;
  const cls = (team: string, win: boolean) => ["t", team === showcase ? "me" : "", win ? "win" : ""].filter(Boolean).join(" ");
  const venue = m.venueId ? data.venues[m.venueId] : undefined;
  const label = `${m.home} gegen ${m.away}${m.score ? `, ${m.score.home}:${m.score.away}` : ", angesetzt"} – Spielbericht`;
  return (
    <div className={m.reportId ? "match linked" : "match"}>
      <time dateTime={`${m.date}${m.time ? `T${m.time}` : ""}`}>{showDate ? <>{formatWeekdayDate(m.date)}<br /></> : null}{m.time ?? "–"}</time>
      <span className={cls(m.home, homeWin)}>{m.home}</span>
      {m.score ? <span className={`s${homeWin ? " win" : ""}`}>{m.score.home}</span> : <span className="open">angesetzt</span>}
      <span className={cls(m.away, awayWin)}>{m.away}</span>
      {m.score && <span className={`s${awayWin ? " win" : ""}`}>{m.score.away}</span>}
      <span className="meta">
        Nr. {m.number}
        {venue ? <> · <Link href={`/halle/${venue.id}`} className="venue">{venue.name}</Link></> : m.venue ? <> · {m.venue}</> : null}
        {m.note && <> · {m.note}</>}
        {m.reportApproved === false && <> · <span className="pending">Bericht noch nicht genehmigt</span></>}
      </span>
      {m.reportId && (
        <Link className="stretch" href={`/${id}/spiel/${m.reportId}`} aria-label={label}>
          <Chevron d={RIGHT} size={16} />
        </Link>
      )}
    </div>
  );
}
