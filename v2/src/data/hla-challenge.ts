import type { Dataset } from "@/domain/schema";

const nuLigaGroup = (group: number) => `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=${group}`;

export const PUBLIC_NULIGA_HLA_GROUP_ALLOWLIST = {
  "hla-challenge-east-main": nuLigaGroup(216473),
  "hla-challenge-west-main": nuLigaGroup(216502),
  "hla-challenge-promotion": nuLigaGroup(216503),
  "hla-challenge-east-relegation": nuLigaGroup(216490),
  "hla-challenge-west-relegation": nuLigaGroup(216460)
} as const;

const source = (competitionId: keyof typeof PUBLIC_NULIGA_HLA_GROUP_ALLOWLIST, name: string): Dataset["metadata"] => ({
  sourceLabel: `nuLiga öffentlich: ${name}`,
  sourceReference: PUBLIC_NULIGA_HLA_GROUP_ALLOWLIST[competitionId],
  updatedAt: "2026-06-02T07:46:00.000Z",
  importMode: "manual-demo"
});

const row = (rank: number, teamId: string, played: number, wins: number, draws: number, losses: number, goalsFor: number, goalsAgainst: number, points: number) => ({
  rank, teamId, played, wins, draws, losses, goalsFor, goalsAgainst, goalDifference: goalsFor - goalsAgainst, points
});

const westMain = source("hla-challenge-west-main", "HLA CHALLENGE West Hauptrunde");
const eastMain = source("hla-challenge-east-main", "HLA CHALLENGE Ost Hauptrunde");
const promotion = source("hla-challenge-promotion", "HLA CHALLENGE Aufstiegsrunde");
const westRelegation = source("hla-challenge-west-relegation", "HLA CHALLENGE West Abstiegsrunde");
const eastRelegation = source("hla-challenge-east-relegation", "HLA CHALLENGE Ost Abstiegsrunde");

export const hlaChallengeDemo = {
  competitions: [
    { id: "hla-challenge-east-main", slug: "hla-challenge-ost-hauptrunde", name: "HLA CHALLENGE Ost Hauptrunde", associationId: "oehb", seasonId: "2025-26", category: "adult" as const },
    { id: "hla-challenge-west-main", slug: "hla-challenge-west-hauptrunde", name: "HLA CHALLENGE West Hauptrunde", associationId: "oehb", seasonId: "2025-26", category: "adult" as const },
    { id: "hla-challenge-promotion", slug: "hla-challenge-aufstiegsrunde", name: "HLA CHALLENGE Aufstiegsrunde", associationId: "oehb", seasonId: "2025-26", category: "adult" as const },
    { id: "hla-challenge-east-relegation", slug: "hla-challenge-ost-abstiegsrunde", name: "HLA CHALLENGE Ost Abstiegsrunde", associationId: "oehb", seasonId: "2025-26", category: "adult" as const },
    { id: "hla-challenge-west-relegation", slug: "hla-challenge-west-abstiegsrunde", name: "HLA CHALLENGE West Abstiegsrunde", associationId: "oehb", seasonId: "2025-26", category: "adult" as const }
  ],
  clubs: [
    { id: "medalp-tirol", slug: "medalp-tirol", name: "medalp Handball Tirol" },
    { id: "alpla-hard", slug: "alpla-hard", name: "Alpla HC Hard" },
    { id: "fivers", slug: "fivers", name: "HC FIVERS WAT Margareten" },
    { id: "atzgersdorf", slug: "atzgersdorf", name: "MADx WAT Atzgersdorf" },
    { id: "krems-langenlois", slug: "krems-langenlois", name: "Brixton Fire Krems Langenlois" },
    { id: "west-wien", slug: "west-wien", name: "Handball WEST WIEN" },
    { id: "eggenburg", slug: "eggenburg", name: "UHC busta Eggenburg" },
    { id: "leoben", slug: "leoben", name: "Sportunion Leoben" },
    { id: "perchtoldsdorf", slug: "perchtoldsdorf", name: "Perchtoldsdorf Devils/JAGS" },
    { id: "fuenfhaus", slug: "fuenfhaus", name: "Koppensteiner WAT Fünfhaus" },
    { id: "korneuburg", slug: "korneuburg", name: "Union Sparkasse Korneuburg" }
  ],
  teams: [
    { id: "hla-medalp-tirol", slug: "hla-medalp-tirol", name: "medalp Handball Tirol", clubId: "medalp-tirol" },
    { id: "hla-hard-ft", slug: "hla-hard-ft", name: "Alpla HC Hard FT", clubId: "alpla-hard" },
    { id: "hla-linz-ft", slug: "hla-linz-ft", name: "SG HC LINZ AG/Neue Heimat FT", clubId: "hc-linz-neue-heimat" },
    { id: "hla-traun-edelweiss", slug: "hla-traun-edelweiss", name: "SK Konstant Traun / Edelweiss", clubId: "edelweiss-traun" },
    { id: "hla-fivers-2", slug: "hla-fivers-2", name: "HC FIVERS WAT Margareten 2", clubId: "fivers" },
    { id: "hla-atzgersdorf", slug: "hla-atzgersdorf", name: "MADx WAT Atzgersdorf", clubId: "atzgersdorf" },
    { id: "hla-krems-langenlois", slug: "hla-krems-langenlois", name: "Brixton Fire Krems Langenlois", clubId: "krems-langenlois" },
    { id: "hla-west-wien", slug: "hla-west-wien", name: "Handball WEST WIEN", clubId: "west-wien" },
    { id: "hla-eggenburg", slug: "hla-eggenburg", name: "UHC busta Eggenburg", clubId: "eggenburg" },
    { id: "hla-leoben", slug: "hla-leoben", name: "Sportunion Leoben", clubId: "leoben" },
    { id: "hla-perchtoldsdorf", slug: "hla-perchtoldsdorf", name: "Perchtoldsdorf Devils/JAGS", clubId: "perchtoldsdorf" },
    { id: "hla-fuenfhaus", slug: "hla-fuenfhaus", name: "Koppensteiner WAT Fünfhaus", clubId: "fuenfhaus" },
    { id: "hla-korneuburg", slug: "hla-korneuburg", name: "Union Sparkasse Korneuburg", clubId: "korneuburg" }
  ],
  venues: [
    { id: "sportzentrum-traun", slug: "sportzentrum-traun", name: "Sportzentrum Traun" },
    { id: "sportzentrum-salzburg-nord", slug: "sportzentrum-salzburg-nord", name: "Sportzentrum Salzburg Nord" }
  ],
  matches: [
    { id: "hla-west-relegation-2026-03-07-1", competitionId: "hla-challenge-west-relegation", seasonId: "2025-26", homeTeamId: "hla-schwaz-ft", awayTeamId: "hla-linz-ft", venueId: "sporthalle-schwaz-ost", startsAt: "2026-03-07T14:30:00.000Z", status: "finished" as const, homeScore: 22, awayScore: 32 },
    { id: "hla-west-relegation-2026-03-07-2", competitionId: "hla-challenge-west-relegation", seasonId: "2025-26", homeTeamId: "hla-bregenz-ft", awayTeamId: "hla-traun-edelweiss", venueId: "handball-arena-bregenz", startsAt: "2026-03-07T18:20:00.000Z", status: "finished" as const, homeScore: 34, awayScore: 20 },
    { id: "hla-west-relegation-2026-03-08-1", competitionId: "hla-challenge-west-relegation", seasonId: "2025-26", homeTeamId: "hla-uhc-salzburg", awayTeamId: "hla-spiders-wels", venueId: "sportzentrum-salzburg-nord", startsAt: "2026-03-08T15:00:00.000Z", status: "finished" as const, homeScore: 32, awayScore: 27 }
  ],
  standings: [
    { competitionId: "hla-challenge-west-main", seasonId: "2025-26", metadata: westMain, rows: [row(1, "hla-medalp-tirol", 14, 11, 1, 2, 427, 364, 23), row(2, "hla-hard-ft", 14, 10, 1, 3, 458, 401, 21), row(3, "hla-spiders-wels", 14, 10, 0, 4, 458, 393, 20), row(4, "hla-bregenz-ft", 14, 6, 2, 6, 417, 415, 14), row(5, "hla-linz-ft", 14, 6, 0, 8, 398, 369, 12), row(6, "hla-uhc-salzburg", 14, 5, 2, 7, 369, 408, 12), row(7, "hla-traun-edelweiss", 14, 4, 0, 10, 384, 440, 8), row(8, "hla-schwaz-ft", 14, 1, 0, 13, 334, 455, 2)] },
    { competitionId: "hla-challenge-west-relegation", seasonId: "2025-26", metadata: westRelegation, rows: [row(1, "hla-spiders-wels", 10, 6, 2, 2, 342, 280, 24), row(2, "hla-uhc-salzburg", 10, 7, 1, 2, 326, 293, 21), row(3, "hla-bregenz-ft", 10, 6, 0, 4, 309, 278, 19), row(4, "hla-linz-ft", 10, 4, 2, 4, 275, 271, 16), row(5, "hla-traun-edelweiss", 10, 3, 1, 6, 281, 334, 11), row(6, "hla-schwaz-ft", 10, 0, 2, 8, 268, 345, 3)] },
    { competitionId: "hla-challenge-promotion", seasonId: "2025-26", metadata: promotion, rows: [row(1, "hla-fivers-2", 10, 9, 0, 1, 321, 268, 18), row(2, "hla-atzgersdorf", 10, 6, 1, 3, 325, 283, 13), row(3, "elite-falken-st-poelten", 10, 6, 1, 3, 324, 269, 13), row(4, "hla-krems-langenlois", 10, 4, 0, 6, 306, 313, 8), row(5, "hla-hard-ft", 10, 2, 0, 8, 239, 336, 4), row(6, "hla-medalp-tirol", 10, 2, 0, 8, 281, 327, 4)] },
    { competitionId: "hla-challenge-east-relegation", seasonId: "2025-26", metadata: eastRelegation, rows: [row(1, "hla-west-wien", 10, 9, 0, 1, 308, 266, 27), row(2, "hla-eggenburg", 10, 6, 0, 4, 322, 307, 22), row(3, "hla-leoben", 10, 3, 1, 6, 295, 327, 16), row(4, "hla-perchtoldsdorf", 10, 4, 0, 6, 288, 296, 14), row(5, "hla-fuenfhaus", 10, 4, 0, 6, 294, 307, 14), row(6, "hla-korneuburg", 10, 3, 1, 6, 279, 283, 13)] },
    { competitionId: "hla-challenge-east-main", seasonId: "2025-26", metadata: eastMain, rows: [row(1, "elite-falken-st-poelten", 18, 12, 1, 5, 589, 542, 25), row(2, "hla-atzgersdorf", 18, 12, 0, 6, 530, 495, 24), row(3, "hla-krems-langenlois", 18, 11, 0, 7, 571, 540, 22), row(4, "hla-fivers-2", 18, 11, 0, 7, 582, 572, 22), row(5, "hla-eggenburg", 18, 9, 1, 8, 543, 542, 19), row(6, "hla-west-wien", 18, 8, 1, 9, 524, 527, 17), row(7, "hla-leoben", 18, 7, 3, 8, 558, 560, 17), row(8, "hla-korneuburg", 18, 5, 2, 11, 499, 560, 12), row(9, "hla-fuenfhaus", 18, 4, 3, 11, 480, 514, 11), row(10, "hla-perchtoldsdorf", 18, 5, 1, 12, 511, 535, 11)] }
  ],
  metadataByCompetition: { "hla-challenge-west-main": westMain, "hla-challenge-east-main": eastMain, "hla-challenge-promotion": promotion, "hla-challenge-west-relegation": westRelegation, "hla-challenge-east-relegation": eastRelegation }
};
