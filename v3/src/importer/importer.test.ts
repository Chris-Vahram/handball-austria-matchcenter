import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { isAllowedSourceUrl, sourceUrls } from "./config";
import { createFetcher } from "./fetcher";
import { parseGroupStats, parseReport, parseSchedule, parseStandings, parseStats } from "./parse";
import { assignRounds, currentRound } from "../lib/rounds";
import { teamResolver } from "./import";

const fixture = (name: string) => readFile(path.join(__dirname, "__fixtures__", name), "utf8");
const B = "https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa";

describe("allowlist (ADR-004)", () => {
  it("accepts configured pages and subpages", () => {
    expect(isAllowedSourceUrl(sourceUrls.groupPage("hla-challenge-west"))).toBe(true);
    expect(isAllowedSourceUrl(sourceUrls.schedule("landesliga-ooe"))).toBe(true);
    expect(isAllowedSourceUrl(`${B}/groupMeetingReport?meeting=93135&championship=%C3%96HB+26%2F27&group=218583`)).toBe(true);
    expect(isAllowedSourceUrl(sourceUrls.stats("hla-challenge-west", "tore"))).toBe(true);
  });
  it("rejects unconfigured groups, foreign hosts and other pages", () => {
    expect(isAllowedSourceUrl(`${B}/groupPage?championship=%C3%96HB+26%2F27&group=218631`)).toBe(false);
    expect(isAllowedSourceUrl(`https://example.com/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+26%2F27&group=218583`)).toBe(false);
    expect(isAllowedSourceUrl(`${B}/playerPortrait?person=1&championship=%C3%96HB+26%2F27&group=218583`)).toBe(false);
    expect(isAllowedSourceUrl(`${B}/groupPage?championship=%C3%96HB+25%2F26&group=218583`)).toBe(false);
    expect(isAllowedSourceUrl(`${B}/groupMeetingReport?meeting=1&championship=%C3%96HB+26%2F27&group=218583&x=1`)).toBe(false);
  });
});

describe("fetcher", () => {
  const url = sourceUrls.groupPage("hla-challenge-west");
  const setup = async (transport: (u: string) => Promise<string>) => {
    let clock = 0;
    const sleeps: number[] = [];
    const calls: string[] = [];
    const get = createFetcher({
      cacheDir: await mkdtemp(path.join(tmpdir(), "v3-cache-")),
      now: () => clock,
      sleep: async (ms) => { sleeps.push(ms); clock += ms; },
      transport: async (u) => { calls.push(u); return transport(u); }
    });
    return { get, sleeps, calls, advance: (ms: number) => { clock += ms; } };
  };

  it("refuses unlisted URLs without a request", async () => {
    const s = await setup(async () => "x");
    await expect(s.get("https://example.com/")).rejects.toThrow(/Not allowlisted/);
    expect(s.calls).toHaveLength(0);
  });

  it("reuses a fresh cache and waits ≥1500 ms between requests", async () => {
    const s = await setup(async () => "<html></html>");
    await s.get(url);
    await s.get(url);
    expect(s.calls).toHaveLength(1);
    await s.get(sourceUrls.schedule("hla-challenge-west"));
    expect(s.sleeps).toEqual([1500]);
  });

  it("retries at most twice", async () => {
    const s = await setup(async () => { throw new Error("down"); });
    await expect(s.get(url)).rejects.toThrow(/3 attempts/);
    expect(s.calls).toHaveLength(3);
  });
});

describe("parsers on 31.10.2026 fixtures", () => {
  it("reads the HLA West table", async () => {
    const rows = parseStandings(await fixture("group-page.html"));
    expect(rows).toHaveLength(8);
    expect(rows[6]).toEqual({ rank: 7, team: "SK Konstant Traun / Edelweiss", played: 6, won: 3, drawn: 0, lost: 3, goalsFor: 170, goalsAgainst: 191, goalDiff: -21, points: 6 });
    expect(rows[1].team).toBe("SMC Innsbruck Handball Tirol");
  });

  it("reads the season schedule and drops referee initials", async () => {
    const html = await fixture("schedule.html");
    const matches = assignRounds(parseSchedule(html), 8);
    expect(matches).toHaveLength(56);
    const m23 = matches.find((m) => m.number === 23)!;
    expect(m23).toMatchObject({ round: 6, date: "2026-10-31", home: "Bregenz Handball FT", away: "SK Konstant Traun / Edelweiss", score: { home: 37, away: 35 }, status: "played", reportId: "93135" });
    const m24 = matches.find((m) => m.number === 24)!;
    expect(m24).toMatchObject({ round: 6, status: "scheduled", score: null, reportId: null });
    expect(JSON.stringify(matches)).not.toMatch(/SRAA|SRBB|SCHIRI/);
    expect(currentRound(matches)).toBe(6);
  });

  it("marks unapproved reports and keeps halftime", async () => {
    const matches = parseSchedule(await fixture("schedule.html"));
    const approved = matches.filter((m) => m.reportApproved === true).length;
    const pending = matches.filter((m) => m.reportApproved === false).length;
    expect(approved).toBe(20);
    expect(pending).toBe(3);
    expect(matches.find((m) => m.number === 2)!.halftime).toEqual({ home: 10, away: 13 });
  });

  it("reads a report with allowed fields only", async () => {
    const html = await fixture("report-93135.html");
    const r = parseReport(html, "93135");
    expect(r).toMatchObject({ number: 23, date: "2026-10-31", time: "18:00", venue: "Schendlingerhalle", approved: false, score: { home: 37, away: 35 }, halftime: { home: 16, away: 16 } });
    expect(r.home.name).toBe("Bregenz Handball FT");
    expect(r.away.name).toBe("SK Konstant Traun / Edelweiss");
    for (const [team, goals] of [[r.home, 37], [r.away, 35]] as const) {
      expect(team.players.reduce((s, p) => s + p.goals, 0)).toBe(goals);
    }
    expect(r.away.players.find((p) => p.shirt === "3")).toEqual({ shirt: "3", name: "STRAUCH, Tore", goals: 12, sevenMGoals: 6, sevenMAttempts: 6, yellow: 0, twoMin: 1, disqualified: false });
    expect(r.away.players.find((p) => p.shirt === "7")).toMatchObject({ twoMin: 2, disqualified: true });
    expect(r.home.totals).toEqual({ sevenMAttempts: 6, sevenMGoals: 3, twoMin: 4, yellow: 1, timeouts: 1, disqualifications: 0 });
    expect(r.away.totals.timeouts).toBe(2);
    const json = JSON.stringify(r);
    for (const forbidden of ["SCHIRI", "ZEITNEHMER", "SEKRETAER", "OFFIZIELL", "person=", "Portrait"]) {
      expect(json).not.toContain(forbidden);
    }
  });

  it("reads the scorer list without person IDs", async () => {
    const rows = parseStats(await fixture("stats-goals.html"), "Tore");
    expect(rows[0]).toEqual({ rank: 1, name: "ARNDT, Arvid", club: "Sparkasse Schwaz Handball Tirol", value: 42, games: 5, attempts: null, perGame: 8.4 });
    expect(rows.every((r) => r.rank >= 1)).toBe(true);
    expect(JSON.stringify(rows)).not.toContain("person=");
  });
});

describe("stat team resolution", () => {
  it("maps nuLiga Verein to the table team via report lineups", async () => {
    const r = parseReport(await fixture("report-93135.html"), "93135");
    const rows = parseStats(await fixture("stats-goals.html"), "Tore");
    const teamOf = teamResolver([r]);
    expect(teamOf(rows.find((x) => x.name === "STRAUCH, Tore")!, rows)).toBe("SK Konstant Traun / Edelweiss");
    const traunNotInReport = rows.find((x) => x.club === "SK-Handball Traun" && !r.away.players.some((p) => p.name === x.name));
    if (traunNotInReport) expect(teamOf(traunNotInReport, rows)).toBe("SK Konstant Traun / Edelweiss");
    expect(teamOf({ name: "Unbekannt", club: "Irgendwo" }, rows)).toBe("Irgendwo");
  });
});

describe("rounds", () => {
  const base = { time: null, venue: null, status: "played" as const, score: null, halftime: null, reportId: null, reportApproved: null, note: null };
  it("falls back to calendar weeks when numbering is not contiguous", () => {
    const out = assignRounds([
      { ...base, number: 3, date: "2026-10-17", home: "A", away: "B" },
      { ...base, number: 40, date: "2026-10-24", home: "C", away: "D" },
      { ...base, number: 6, date: "2026-11-06", home: "E", away: "A" },
      { ...base, number: 5, date: "2026-11-07", home: "B", away: "C" }
    ], 5);
    expect(out.map((m) => m.round)).toEqual([1, 2, 3, 3]);
  });
});

describe("all five rankings read their own value column", () => {
  it.each([
    ["stats-suspensions.html", "Zeitstrafen", { name: "DILYS, Devanas", value: 2, games: 1, perGame: 2 }],
    ["stats-yellow.html", "Gelbe Karten", {}],
    ["stats-red.html", "Rote Karten", {}],
    ["stats-7m.html", "7m-Tore", { name: "PIRINGER, Jannik", value: 20, games: null }]
  ] as const)("%s", async (file, header, first) => {
    const rows = parseStats(await fixture(file), header);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((r) => r.value >= 1 && r.rank >= 1)).toBe(true); // regression: values were all 0
    expect(rows[0]).toMatchObject(first);
  });

  it("7m keeps attempts", async () => {
    const rows = parseStats(await fixture("stats-7m.html"), "7m-Tore");
    expect(rows.every((r) => r.attempts !== null && r.attempts >= r.value)).toBe(true);
  });
});

describe("group and team statistics", () => {
  it("reads group totals and one block per team", async () => {
    const { group, teams } = parseGroupStats(await fixture("group-stats.html"));
    expect(group).toMatchObject({ games: 23, scheduled: 56, goals: 1351, sevenMAttempts: 219, sevenMGoals: 158, twoMin: 200, yellow: 12, red: 12, spectators: 1836, homeWins: 17, awayWins: 6, draws: 0 });
    expect(teams).toHaveLength(8);
    expect(teams.find((t) => t.name === "Bregenz Handball FT")).toMatchObject({ games: 6, goals: 180, spectators: 621, homeWins: 2, awayWins: 1 });
  });
  it("is allowlisted", () => {
    expect(isAllowedSourceUrl(sourceUrls.groupStats("hla-challenge-west"))).toBe(true);
  });
});

describe("hardening", () => {
  it("rejects a report whose lineup lost a row", async () => {
    const html = (await fixture("report-93135.html")).replace(/(<td>9<\/td>[\s\S]*?)<\/tr>/, "$1");
    expect(() => parseReport(html, "93135")).toThrow(/lineup goals/);
  });

  it("rejects an empty schedule and a missing statistics table", async () => {
    const schedule = await fixture("schedule.html");
    const headerOnly = schedule.replace(/(<table class="result-set"[\s\S]*?<\/tr>)[\s\S]*?<\/table>/, "$1</table>");
    expect(() => parseSchedule(headerOnly)).toThrow(/no matches/);
    expect(() => parseStats("<html><body>Keine Daten</body></html>", "Tore")).toThrow(/not found/);
  });

  it("refuses redirects", async () => {
    const { createFetcher } = await import("./fetcher");
    const get = createFetcher({ cacheDir: await mkdtemp(path.join(tmpdir(), "v3-redir-")), now: () => 0, sleep: async () => {},
      transport: async () => { throw new Error("Redirect refused (302)"); } });
    await expect(get(sourceUrls.groupPage("hla-challenge-west"))).rejects.toThrow(/3 attempts/);
  });

  it("does not resolve ambiguous names by iteration order", async () => {
    const r = parseReport(await fixture("report-93135.html"), "93135");
    const clone = structuredClone(r);
    clone.home.players.push({ ...r.away.players[0] }); // STRAUCH, Tore now in both teams
    const teamOf = teamResolver([r, clone]);
    expect(teamOf({ name: "STRAUCH, Tore", club: "Irgendwo" }, [])).toBe("Irgendwo");
  });
});
