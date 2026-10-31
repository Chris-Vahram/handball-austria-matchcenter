import { parse, type HTMLElement } from "node-html-parser";
import type { Match, Report, ReportTeam, StandingRow, StatRow } from "../domain/schema";

/*
 * Privacy by construction (ADR-005): every parser copies only whitelisted fields.
 * Referees, Zeitnehmer, Sekretär, team officials, birthdates, pass numbers,
 * person IDs, portrait links and event timelines are never read.
 */

const clean = (s: string) => s.replace(/&nbsp;| /g, " ").replace(/\s+/g, " ").trim();
const text = (el: HTMLElement | null | undefined) => clean(el?.text ?? "");
const int = (s: string) => (/^-?\d+$/.test(s) ? Number(s) : 0);
const isoDate = (d: string) => {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(d);
  if (!m) throw new Error(`Unexpected date: ${d}`);
  return `${m[3]}-${m[2]}-${m[1]}`;
};
const pair = (s: string) => {
  const m = /^(\d+):(\d+)$/.exec(s);
  return m ? { home: Number(m[1]), away: Number(m[2]) } : null;
};

function resultTables(html: string) {
  return parse(html).querySelectorAll("table.result-set");
}

function headerIndex(table: HTMLElement) {
  const headers = table.querySelectorAll("th").map((th) => text(th));
  return (name: string) => {
    let i = headers.indexOf(name);
    if (i < 0) i = headers.findIndex((h) => h.startsWith(name));
    if (i < 0) throw new Error(`Column "${name}" not found in [${headers.join(", ")}]`);
    return i;
  };
}

/** Standings from a groupPage (first result-set table). */
export function parseStandings(html: string): StandingRow[] {
  const table = resultTables(html)[0];
  if (!table) throw new Error("Standings table not found");
  const col = headerIndex(table);
  const [rank, team, played, won, drawn, lost, goals, diff, points] =
    ["Rang", "Mannschaft", "Begegnungen", "S", "U", "N", "Tore", "+/-", "Punkte"].map(col);
  const rows = table.querySelectorAll("tr").filter((tr) => tr.querySelectorAll("td").length > points);
  if (rows.length < 2) throw new Error("Standings table has fewer than 2 teams");
  return rows.map((tr) => {
    const cells = tr.querySelectorAll("td").map((td) => text(td));
    const g = pair(cells[goals].replace(/\s/g, ""));
    if (!g) throw new Error(`Bad goals cell: ${cells[goals]}`);
    return {
      rank: int(cells[rank]), team: cells[team],
      played: int(cells[played]), won: int(cells[won]), drawn: int(cells[drawn]), lost: int(cells[lost]),
      goalsFor: g.home, goalsAgainst: g.away, goalDiff: int(cells[diff].replace("+", "")), points: int(cells[points])
    };
  });
}

type RawMatch = Omit<Match, "round">;

/** Full-season schedule from groupPage?displayTyp=vorrunde&displayDetail=meetings. */
export function parseSchedule(html: string): RawMatch[] {
  const table = resultTables(html)[0];
  if (!table) throw new Error("Schedule table not found");
  const col = headerIndex(table);
  const [dateCol, timeCol, venueCol, nrCol, homeCol, awayCol, scoreCol] =
    ["Datum", "Zeit", "Ort", "Nr.", "Heimmannschaft", "Gastmannschaft", "Tore"].map(col);
  let date = "";
  const out: RawMatch[] = [];
  for (const tr of table.querySelectorAll("tr")) {
    const tds = tr.querySelectorAll("td");
    if (tds.length <= scoreCol) continue;
    const d = text(tds[dateCol]);
    if (d) date = isoDate(d);
    const scoreCell = tds[scoreCol];
    const score = pair(text(scoreCell).replace(/\s/g, ""));
    const link = scoreCell.querySelector("a[href*=groupMeetingReport]")?.getAttribute("href") ?? null;
    const halftimeTitle = scoreCell.querySelector("span[title]")?.getAttribute("title") ?? "";
    const rowAlts = tr.querySelectorAll("img[alt], span[alt]").map((el) => el.getAttribute("alt") ?? "");
    const time = /\d{2}:\d{2}/.exec(text(tds[timeCol]))?.[0] ?? null;
    out.push({
      number: int(text(tds[nrCol])),
      date,
      time,
      venue: tds[venueCol].querySelector("span[title]")?.getAttribute("title") ?? null,
      home: text(tds[homeCol]),
      away: text(tds[awayCol]),
      // Any non-score text (e.g. referee initials "BÖSC./SZÜC.") is discarded: no result.
      status: score ? "played" : "scheduled",
      score,
      halftime: score ? pair(halftimeTitle.replace(" zur Halbzeit", "").trim()) : null,
      reportId: score && link ? /meeting=(\d+)/.exec(link)?.[1] ?? null : null,
      reportApproved: score && link ? rowAlts.includes("Spielbericht genehmigt") : null,
      note: rowAlts.some((a) => a.startsWith("verlegt")) ? "verlegt" : rowAlts.includes("Heimrecht getauscht") ? "Heimrecht getauscht" : null
    });
  }
  if (!out.length) throw new Error("Schedule table has no matches");
  return out;
}

/** Public match report. Reads only match info, player rows (allowed columns), team totals. */
export function parseReport(html: string, id: string): Report {
  const root = parse(html);
  const rows = root.querySelectorAll("tr").map((tr) => tr.querySelectorAll("td").map((td) => text(td)));
  const after = (label: string) => {
    for (const r of rows) {
      const i = r.indexOf(label);
      if (i >= 0 && i + 1 < r.length) return r[i + 1];
    }
    return "";
  };
  const teamNames = [after("Heimmannschaft"), after("Gastmannschaft")];
  if (!teamNames[0] || !teamNames[1]) throw new Error(`Report ${id}: team names not found`);

  const teams: ReportTeam[] = teamNames.map((name) => ({
    name, players: [], totals: { sevenMAttempts: 0, sevenMGoals: 0, twoMin: 0, yellow: 0, timeouts: 0, disqualifications: 0 }
  }));
  let t = 0;
  for (const r of rows) {
    if (t > 1) break;
    if (r.length === 12 && /^\d{1,3}$/.test(r[0])) {
      const [g7, a7] = r[5].split("/").map(int);
      teams[t].players.push({
        shirt: r[0], name: r[1], goals: int(r[4]), sevenMGoals: g7 ?? 0, sevenMAttempts: a7 ?? 0,
        yellow: r[6] ? 1 : 0, twoMin: [r[7], r[8], r[9]].filter(Boolean).length, disqualified: Boolean(r[10] || r[11])
      });
    } else if (r[0] === "7-Meter") {
      teams[t].totals.sevenMAttempts = int(r[1]);
      if (r[4]) teams[t].totals.timeouts++;
    } else if (r[0] === "7-Meter-Tore") {
      teams[t].totals.sevenMGoals = int(r[1]);
      if (r[4]) teams[t].totals.timeouts++;
    } else if (r[0] === "2-Minuten") {
      teams[t].totals.twoMin = int(r[1]);
      if (r[4]) teams[t].totals.timeouts++;
    } else if (r[0] === "gelbe Karten") {
      teams[t].totals.yellow = int(r[1]);
      teams[t].totals.disqualifications = int(r[4]);
      t++;
    }
  }

  const result = /^(\d+:\d+)(?:\s*\((\d+:\d+)\))?/.exec(after("Ergebnis"));
  const score = result ? pair(result[1]) : null;
  if (!score) throw new Error(`Report ${id}: no result`);
  for (const [team, goals] of [[teams[0], score.home], [teams[1], score.away]] as const) {
    const sum = team.players.reduce((s, p) => s + p.goals, 0);
    if (sum !== goals) throw new Error(`Report ${id}: ${team.name} lineup goals ${sum} ≠ score ${goals} (malformed lineup?)`);
  }
  const dateCell = after("Datum");
  return {
    id,
    number: int(after("Spielnummer")),
    date: isoDate(dateCell.slice(0, 10)),
    time: /\d{2}:\d{2}/.exec(dateCell)?.[0] ?? null,
    venue: after("Spielort") || null,
    approved: !/noch nicht genehmigt/.test(root.text),
    score,
    halftime: result?.[2] ? pair(result[2]) : null,
    home: teams[0],
    away: teams[1]
  };
}

/** Player ranking from groupMeetingStatistics. Portrait links and person IDs are dropped. */
export function parseStats(html: string): Omit<StatRow, "team">[] {
  const table = resultTables(html)[0];
  if (!table) throw new Error("Statistics table not found");
  const col = headerIndex(table);
  const [rank, name, club, games] = ["Rang", "Spieler", "Verein", "Spiele"].map(col);
  const value = 3; // the kind-specific value column (Tore, 7m-Tore, Zeitstrafen, Karten) follows "Verein"
  return table.querySelectorAll("tr").filter((tr) => tr.querySelectorAll("td").length > games).map((tr) => {
    const c = tr.querySelectorAll("td").map((td) => text(td));
    return { rank: int(c[rank].replace(".", "")), name: c[name], club: c[club], value: int(c[value]), games: int(c[games]) };
  });
}
