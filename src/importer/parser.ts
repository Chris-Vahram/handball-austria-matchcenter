import { datasetSchema, matchReportSchema, type Dataset, type MatchReport } from "../domain/schema";
import { PUBLICATION_PROFILES } from "../data/publication";
import { COMPETITION_CONFIG, SOURCE_ALLOWLIST, type AllowedCompetitionId } from "./config";

const SPORTS_PAYLOAD = /<script[^>]+id=["']matchcenter-sports-data["'][^>]*>([\s\S]*?)<\/script>/i;
const REPORT_PAYLOAD = /<script[^>]+id=["']matchcenter-report-data["'][^>]*>([\s\S]*?)<\/script>/i;
const FORBIDDEN_KEYS = /contact|phone|telephone|mobile|email|referee|private|address|playerlist/i;

function rejectForbiddenKeys(value: unknown, path = "payload"): void {
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_KEYS.test(key)) throw new Error(`Forbidden field rejected at ${path}.${key}`);
    rejectForbiddenKeys(child, `${path}.${key}`);
  }
}

const decode = (value: string) => value
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&ouml;/g, "ö")
  .replace(/&auml;/g, "ä")
  .replace(/&uuml;/g, "ü")
  .replace(/&Ouml;/g, "Ö")
  .replace(/&Auml;/g, "Ä")
  .replace(/&Uuml;/g, "Ü")
  .replace(/&szlig;/g, "ß")
  .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const slug = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cells = (row: string) => [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((match) => match[1]);
const rows = (table: string) => [...table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((match) => match[1]);
const number = (value: string) => Number.parseInt(value.replace(/[^\d-]/g, ""), 10);
const score = (value: string) => /^(\d+):(\d+)/.exec(decode(value));

function viennaIso(date: string, time: string): string {
  const [day, month, year] = date.split(".").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Vienna", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(new Date(guess)).reduce<Record<string, string>>((result, part) => ({ ...result, [part.type]: part.value }), {});
  const represented = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute));
  return new Date(guess - (represented - guess)).toISOString();
}

function parseLiveCompetitionPage(html: string, competitionId: AllowedCompetitionId): Dataset {
  const tables = [...html.matchAll(/<table([^>]*)>([\s\S]*?)<\/table>/gi)];
  const standingsTable = tables.find((table) => !/class=/.test(table[1]))?.[2] ?? "";
  const scheduleTable = tables.find((table) => /class=["']cugro["']/.test(table[1]))?.[2] ?? "";
  if (!scheduleTable) throw new Error("No supported OEHB schedule table found");

  const config = COMPETITION_CONFIG[competitionId];
  const teamNames = new Set<string>();
  const scheduleRows = rows(scheduleTable).slice(1);
  const parsedMatches = scheduleRows.flatMap((row, index) => {
    const rowCells = cells(row);
    if (rowCells.length < 3) return [];
    const date = /class=["']gdate["'][^>]*>([^<]+)/i.exec(rowCells[0])?.[1];
    const time = /class=["']gtime["'][^>]*>(\d{1,2}:\d{2})/i.exec(rowCells[0])?.[1];
    const teamsBlock = /class=["']cgtab["'][^>]*>([\s\S]*?)<\/div>/i.exec(rowCells[1])?.[1] ?? "";
    const cleanedTeams = teamsBlock.replace(/<span[^>]*class=["']logo["'][^>]*>[\s\S]*?<\/span>/gi, "");
    const names = [...cleanedTeams.matchAll(/<span(?![^>]*class=["']cent["'])[^>]*>([^<]+)<\/span>/gi)].map((match) => decode(match[1])).filter(Boolean);
    if (!date || !time || names.length < 2 || names[0] === "spielfrei*" || names[1] === "spielfrei*") return [];
    const [homeName, awayName] = names;
    teamNames.add(homeName);
    teamNames.add(awayName);
    const venueName = decode(/class=["']court["'][^>]*>([\s\S]*?)<\/span>/i.exec(rowCells[1])?.[1] ?? "");
    const result = score(rowCells[2]);
    const reportHref = /<a[^>]*href=["']([^"']*\/num-[^"']+)["']/i.exec(rowCells[2])?.[1];
    return [{
      id: `${competitionId}-${date.split(".").reverse().join("-")}-${index + 1}`,
      competitionId,
      seasonId: "2025-26",
      homeTeamId: `${competitionId}-${slug(homeName)}`,
      awayTeamId: `${competitionId}-${slug(awayName)}`,
      venueId: venueName ? slug(venueName) : undefined,
      startsAt: viennaIso(date, time),
      status: result ? "finished" as const : "scheduled" as const,
      homeScore: result ? Number(result[1]) : undefined,
      awayScore: result ? Number(result[2]) : undefined,
      publicReportUrl: reportHref ? new URL(reportHref, "https://www.oehb.at/").toString() : undefined
    }];
  });

  const standingRows = rows(standingsTable).slice(1).flatMap((row) => {
    const rowCells = cells(row).map(decode);
    if (rowCells.length < 8 || !/^\d+$/.test(rowCells[0])) return [];
    const teamName = rowCells[1];
    teamNames.add(teamName);
    const goals = /^(\d+):(\d+)/.exec(rowCells[6]);
    if (!goals) return [];
    return [{ rank: number(rowCells[0]), teamId: `${competitionId}-${slug(teamName)}`, played: number(rowCells[2]), wins: number(rowCells[3]), draws: number(rowCells[4]), losses: number(rowCells[5]), goalsFor: Number(goals[1]), goalsAgainst: Number(goals[2]), goalDifference: number(rowCells[7]), points: number(rowCells[8]) }];
  });
  const venues = [...new Set(parsedMatches.map((match) => match.venueId).filter(Boolean))].map((id) => {
    const match = parsedMatches.find((item) => item.venueId === id);
    const scheduleRow = scheduleRows[parsedMatches.indexOf(match!)];
    return { id: id!, slug: id!, name: decode(/class=["']court["'][^>]*>([\s\S]*?)<\/span>/i.exec(cells(scheduleRow)[1])?.[1] ?? id!) };
  });
  const metadata = { sourceLabel: `ÖHB public page: ${config.name}`, sourceReference: SOURCE_ALLOWLIST[competitionId], updatedAt: new Date().toISOString(), importMode: "public-page" as const };
  return datasetSchema.parse({
    metadata,
    associations: [{ id: config.associationId, name: config.associationName }],
    seasons: [{ id: "2025-26", label: "2025/26" }],
    competitions: [{ id: competitionId, slug: competitionId, name: config.name, associationId: config.associationId, seasonId: "2025-26", category: config.category }],
    clubs: [...teamNames].map((name) => ({ id: `${competitionId}-${slug(name)}`, slug: `${competitionId}-${slug(name)}`, name })),
    teams: [...teamNames].map((name) => ({ id: `${competitionId}-${slug(name)}`, slug: `${competitionId}-${slug(name)}`, name, clubId: `${competitionId}-${slug(name)}` })),
    venues,
    matches: parsedMatches,
    standings: standingRows.length ? [{ competitionId, seasonId: "2025-26", metadata, rows: standingRows }] : [],
    matchReports: [],
    parserProvenance: [],
    publicationProfiles: PUBLICATION_PROFILES.filter((profile) => profile.competitionId === competitionId)
  });
}

export function parsePublicSportsSnapshot(html: string, competitionId?: AllowedCompetitionId): Dataset {
  const match = SPORTS_PAYLOAD.exec(html);
  if (match) {
    const payload: unknown = JSON.parse(match[1]);
    rejectForbiddenKeys(payload);
    return datasetSchema.parse(payload);
  }
  if (!competitionId) throw new Error("No validated matchcenter sports payload found");
  return parseLiveCompetitionPage(html, competitionId);
}

export function parsePublicMatchReportSnapshot(html: string): MatchReport {
  const match = REPORT_PAYLOAD.exec(html);
  if (!match) throw new Error("No validated matchcenter report payload found");
  const payload: unknown = JSON.parse(match[1]);
  rejectForbiddenKeys(payload);
  return matchReportSchema.parse(payload);
}
