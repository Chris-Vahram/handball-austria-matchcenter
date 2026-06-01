import type { Dataset } from "../domain/schema";
import { PUBLICATION_PROFILES } from "./publication";

const sourceReference = "https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-LLM";
const metadata = {
  sourceLabel: "ÖHB: OÖHV Männer Landesliga 25/26",
  sourceReference,
  updatedAt: "2026-06-01T00:00:00.000Z",
  importMode: "manual-demo" as const
};

export const curatedDataset = {
  metadata,
  associations: [{ id: "oohv", name: "Oberösterreichischer Handballverband" }],
  seasons: [{ id: "2025-26", label: "2025/26" }],
  competitions: [{
    id: "oohv-maenner-landesliga",
    slug: "oohv-maenner-landesliga",
    name: "OÖHV Männer Landesliga",
    associationId: "oohv",
    seasonId: "2025-26",
    category: "adult"
  }],
  clubs: [
    { id: "edelweiss-traun", slug: "edelweiss-traun", name: "Sportunion EDELWEISS Linz / SK Traun" },
    { id: "hc-linz-neue-heimat", slug: "hc-linz-neue-heimat", name: "SG HC LINZ AG/Neue Heimat" },
    { id: "hc-urfahr", slug: "hc-urfahr", name: "ASKÖ HC Urfahr" },
    { id: "spiders-wels", slug: "spiders-wels", name: "Spiders Wels" },
    { id: "hc-eferding", slug: "hc-eferding", name: "HC Eferding" }
  ],
  teams: [
    { id: "edelweiss-traun", slug: "edelweiss-traun", name: "Sportunion EDELWEISS Linz / SK Traun", clubId: "edelweiss-traun" },
    { id: "hc-linz-neue-heimat", slug: "hc-linz-neue-heimat", name: "SG HC LINZ AG/Neue Heimat", clubId: "hc-linz-neue-heimat" },
    { id: "hc-urfahr", slug: "hc-urfahr", name: "ASKÖ HC Urfahr", clubId: "hc-urfahr" },
    { id: "spiders-wels", slug: "spiders-wels", name: "Spiders Wels", clubId: "spiders-wels" },
    { id: "hc-eferding", slug: "hc-eferding", name: "HC Eferding", clubId: "hc-eferding" }
  ],
  venues: [
    { id: "sms-kleinmuenchen", slug: "sms-kleinmuenchen", name: "SMS Kleinmünchen, Linz" },
    { id: "sh-pernau", slug: "sh-pernau", name: "SH Pernau, Wels - Sterner Arena" },
    { id: "sh-huettner", slug: "sh-huettner", name: "SH Hüttnerschule, Linz" },
    { id: "sh-harbach", slug: "sh-harbach", name: "SH Harbach, Linz" },
    { id: "bsh-eferding", slug: "bsh-eferding", name: "BSH Eferding" }
  ],
  matches: [
    { id: "m-2025-10-03", competitionId: "oohv-maenner-landesliga", seasonId: "2025-26", homeTeamId: "edelweiss-traun", awayTeamId: "hc-urfahr", venueId: "sms-kleinmuenchen", startsAt: "2025-10-03T18:15:00.000Z", status: "finished", homeScore: 37, awayScore: 20 },
    { id: "m-2026-04-24", competitionId: "oohv-maenner-landesliga", seasonId: "2025-26", homeTeamId: "hc-eferding", awayTeamId: "edelweiss-traun", venueId: "bsh-eferding", startsAt: "2026-04-24T18:15:00.000Z", status: "finished", homeScore: 37, awayScore: 36 },
    { id: "m-2026-05-21", competitionId: "oohv-maenner-landesliga", seasonId: "2025-26", homeTeamId: "hc-linz-neue-heimat", awayTeamId: "hc-urfahr", venueId: "sms-kleinmuenchen", startsAt: "2026-05-21T18:00:00.000Z", status: "finished", homeScore: 31, awayScore: 27 },
    { id: "m-2026-06-01", competitionId: "oohv-maenner-landesliga", seasonId: "2025-26", homeTeamId: "hc-linz-neue-heimat", awayTeamId: "spiders-wels", venueId: "sms-kleinmuenchen", startsAt: "2026-06-01T18:00:00.000Z", status: "scheduled" }
  ],
  standings: [{
    competitionId: "oohv-maenner-landesliga",
    seasonId: "2025-26",
    metadata,
    rows: [
      { rank: 1, teamId: "edelweiss-traun", played: 16, wins: 10, draws: 1, losses: 5, goalsFor: 504, goalsAgainst: 418, goalDifference: 86, points: 21 },
      { rank: 2, teamId: "hc-linz-neue-heimat", played: 15, wins: 10, draws: 1, losses: 4, goalsFor: 413, goalsAgainst: 374, goalDifference: 39, points: 21 },
      { rank: 3, teamId: "hc-urfahr", played: 16, wins: 6, draws: 2, losses: 8, goalsFor: 387, goalsAgainst: 404, goalDifference: -17, points: 14 },
      { rank: 4, teamId: "spiders-wels", played: 15, wins: 5, draws: 2, losses: 8, goalsFor: 412, goalsAgainst: 466, goalDifference: -54, points: 12 },
      { rank: 5, teamId: "hc-eferding", played: 16, wins: 5, draws: 0, losses: 11, goalsFor: 440, goalsAgainst: 494, goalDifference: -54, points: 10 }
    ]
  }],
  matchReports: [],
  parserProvenance: [],
  publicationProfiles: [...PUBLICATION_PROFILES].filter((profile) => profile.competitionId === "oohv-maenner-landesliga")
} satisfies Dataset;
