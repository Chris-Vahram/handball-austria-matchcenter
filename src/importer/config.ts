export const IMPORT_DEFAULTS = {
  cacheFreshnessMs: 24 * 60 * 60 * 1000,
  minimumDelayMs: 1500,
  maximumRetries: 2,
  parserVersion: "oehb-public-v1"
} as const;

export const SOURCE_ALLOWLIST = {
  "oohv-maenner-landesliga": "https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-LLM",
  "oohv-mu18-grunddurchgang": "https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-mU18",
  "elite-cup-mu18-b": "https://www.oehb.at/de/bewerbe/oems/nul-OeHB-OoeHB--Elite--Cup--MU18",
  "hla-challenge": "https://www.oehb.at/de/bewerbe/maennerbewerbe/nul-OoeHB-HLA--CHALLENGE",
  "hla-challenge-aufstiegsspiele-regionalligen": "https://www.oehb.at/de/bewerbe/maennerbewerbe/nul-OoeHB-HLA--CHALLENGE--Aufstiegsspiele--u.--Regionalligen"
} as const;

export type AllowedCompetitionId = keyof typeof SOURCE_ALLOWLIST;

export const COMPETITION_CONFIG = {
  "oohv-maenner-landesliga": { name: "OÖHV Männer Landesliga", associationId: "oohv", associationName: "Oberösterreichischer Handballverband", category: "adult" },
  "oohv-mu18-grunddurchgang": { name: "OÖHV mU18 Grunddurchgang 25/26", associationId: "oohv", associationName: "Oberösterreichischer Handballverband", category: "u18" },
  "elite-cup-mu18-b": { name: "Elite Cup MU18 B-Bewerb", associationId: "oehb", associationName: "Österreichischer Handballbund", category: "u18" },
  "hla-challenge": { name: "HLA CHALLENGE", associationId: "oehb", associationName: "Österreichischer Handballbund", category: "adult" },
  "hla-challenge-aufstiegsspiele-regionalligen": { name: "HLA CHALLENGE Aufstiegsspiele & Regionalligen", associationId: "oehb", associationName: "Österreichischer Handballbund", category: "adult" }
} as const satisfies Record<AllowedCompetitionId, { name: string; associationId: string; associationName: string; category: "adult" | "u18" }>;

export function isAllowedSourceUrl(url: string): boolean {
  return Object.values(SOURCE_ALLOWLIST).includes(url as (typeof SOURCE_ALLOWLIST)[AllowedCompetitionId]);
}

export function isAllowedPublicReportUrl(url: string): boolean {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") return false;
  if (parsed.hostname === "www.oehb.at") return true;
  return parsed.hostname === "oehb-handball.liga.nu" && parsed.pathname.endsWith("/wa/groupMeetingReport") && parsed.searchParams.has("meeting") && parsed.searchParams.has("group");
}
