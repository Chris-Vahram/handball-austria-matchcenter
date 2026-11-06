export const IMPORT_LIMITS = {
  cacheFreshnessMs: 24 * 60 * 60 * 1000,
  minimumDelayMs: 1500,
  maximumRetries: 2
} as const;

const HOST = "oehb-handball.liga.nu";
const BASE = `https://${HOST}/cgi-bin/WebObjects/nuLigaHBAT.woa/wa`;

export const STAT_KINDS = {
  tore: "playerGoals",
  "7m": "playerSevenMeterGoals",
  zeitstrafen: "playerSuspensions",
  gelb: "playerYellowCards",
  rot: "playerRedCards"
} as const;
export type StatKind = keyof typeof STAT_KINDS;

export const COMPETITIONS = {
  "hla-challenge-west": {
    championship: "ÖHB 26/27",
    group: "218583",
    name: "HLA Challenge West",
    fullName: "MEHRLEBEN HLA CHALLENGE West",
    association: "ÖHB – Österreichischer Handballbund",
    phase: "Hauptrunde",
    season: "2026/27",
    category: "adult",
    showcaseTeam: "SK Konstant Traun / Edelweiss"
  },
  "landesliga-ooe": {
    championship: "OÖHV 26/27",
    group: "218721",
    name: "Landesliga OÖ",
    fullName: "OÖHV Landesliga Männer",
    association: "OÖHV – Oberösterreichischer Handballverband",
    phase: "Grunddurchgang",
    season: "2026/27",
    category: "adult",
    showcaseTeam: "Sportunion EDELWEISS Linz / SK Traun"
  }
} as const satisfies Record<string, {
  championship: string; group: string; name: string; fullName: string; association: string; phase: string;
  season: string; category: "adult" | "youth"; showcaseTeam: string;
}>;

export type CompetitionId = keyof typeof COMPETITIONS;
export const COMPETITION_IDS = Object.keys(COMPETITIONS) as CompetitionId[];

/** nuLiga federation of each championship (courtInfo is addressed per federation, not per group). */
const FEDERATION: Record<CompetitionId, string> = { "hla-challenge-west": "ÖHB", "landesliga-ooe": "OÖHV" };

const query = (id: CompetitionId) => {
  const c = COMPETITIONS[id];
  return `championship=${encodeURIComponent(c.championship).replace(/%20/g, "+")}&group=${c.group}`;
};

export const sourceUrls = {
  groupPage: (id: CompetitionId) => `${BASE}/groupPage?${query(id)}`,
  schedule: (id: CompetitionId) => `${BASE}/groupPage?displayTyp=vorrunde&displayDetail=meetings&${query(id)}`,
  report: (id: CompetitionId, meeting: string) => `${BASE}/groupMeetingReport?meeting=${meeting}&${query(id)}`,
  stats: (id: CompetitionId, kind: StatKind) => `${BASE}/groupMeetingStatistics?displayType=${STAT_KINDS[kind]}&${query(id)}`,
  groupStats: (id: CompetitionId) => `${BASE}/groupMeetingStatistics?displayType=groupAndTeams&${query(id)}`,
  venue: (id: CompetitionId, location: string) => `${BASE}/courtInfo?federation=${encodeURIComponent(FEDERATION[id])}&roundTyp=0&${query(id).replace(/&group=\d+$/, "")}&location=${location}`
};

/** ADR-004 (2026/27 section): only configured groups and their listed subpages. */
export function isAllowedSourceUrl(raw: string): boolean {
  let url: URL;
  try { url = new URL(raw); } catch { return false; }
  if (url.protocol !== "https:" || url.hostname !== HOST) return false;
  const page = url.pathname.replace("/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/", "");
  const p = url.searchParams;
  if (page === "courtInfo") {
    // Venue facts (ADR-004 addendum 2026-11-01): one location of a configured championship.
    const keys = [...p.keys()].sort().join(",");
    return keys === "championship,federation,location,roundTyp" && p.get("roundTyp") === "0" && /^\d+$/.test(p.get("location") ?? "") &&
      COMPETITION_IDS.some((id) => COMPETITIONS[id].championship === p.get("championship") && FEDERATION[id] === p.get("federation"));
  }
  const competition = COMPETITION_IDS.find((id) =>
    COMPETITIONS[id].group === p.get("group") && COMPETITIONS[id].championship === p.get("championship"));
  if (!competition) return false;
  const keys = [...p.keys()].sort().join(",");
  switch (page) {
    case "groupPage":
      return keys === "championship,group" ||
        (keys === "championship,displayDetail,displayTyp,group" && p.get("displayTyp") === "vorrunde" && p.get("displayDetail") === "meetings");
    case "groupMeetingReport":
      return keys === "championship,group,meeting" && /^\d+$/.test(p.get("meeting") ?? "");
    case "groupMeetingStatistics":
      return keys === "championship,displayType,group" &&
        (p.get("displayType") === "groupAndTeams" || Object.values(STAT_KINDS).includes(p.get("displayType") as never));
    default:
      return false;
  }
}
