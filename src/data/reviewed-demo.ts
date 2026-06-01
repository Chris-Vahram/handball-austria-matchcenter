import type { Dataset } from "../domain/schema";
import { curatedDataset } from "./curated";
import { PUBLICATION_PROFILES } from "./publication";

const metadata = curatedDataset.metadata;

export const reviewedDemoDataset = {
  ...curatedDataset,
  associations: [...curatedDataset.associations, { id: "oehb", name: "Österreichischer Handballbund" }],
  competitions: [
    ...curatedDataset.competitions,
    { id: "oohv-mu18-grunddurchgang", slug: "oohv-mu18-grunddurchgang", name: "OÖHV mU18 Grunddurchgang 25/26", associationId: "oohv", seasonId: "2025-26", category: "u18" as const },
    { id: "elite-cup-mu18-b", slug: "elite-cup-mu18-b", name: "Elite Cup MU18 B-Bewerb", associationId: "oehb", seasonId: "2025-26", category: "u18" as const },
    { id: "hla-challenge", slug: "hla-challenge", name: "HLA CHALLENGE", associationId: "oehb", seasonId: "2025-26", category: "adult" as const }
  ],
  clubs: [
    ...curatedDataset.clubs,
    { id: "falken-st-poelten", slug: "falken-st-poelten", name: "Sportunion DIE FALKEN St. Pölten" },
    { id: "schwaz", slug: "schwaz", name: "Sparkasse Schwaz Handball Tirol" },
    { id: "bregenz", slug: "bregenz", name: "Bregenz Handball" },
    { id: "uhc-salzburg", slug: "uhc-salzburg", name: "UHC Salzburg" }
  ],
  teams: [
    ...curatedDataset.teams,
    { id: "mu18-hc-linz-neue-heimat", slug: "mu18-hc-linz-neue-heimat", name: "SG HC LINZ AG/Neue Heimat", clubId: "hc-linz-neue-heimat" },
    { id: "mu18-spiders-wels", slug: "mu18-spiders-wels", name: "Spiders Wels", clubId: "spiders-wels" },
    { id: "elite-spiders-wels", slug: "elite-spiders-wels", name: "Spiders Wels", clubId: "spiders-wels" },
    { id: "elite-falken-st-poelten", slug: "elite-falken-st-poelten", name: "Sportunion DIE FALKEN St. Pölten", clubId: "falken-st-poelten" },
    { id: "hla-schwaz-ft", slug: "hla-schwaz-ft", name: "Sparkasse Schwaz Handball Tirol FT", clubId: "schwaz" },
    { id: "hla-bregenz-ft", slug: "hla-bregenz-ft", name: "Bregenz Handball FT", clubId: "bregenz" },
    { id: "hla-uhc-salzburg", slug: "hla-uhc-salzburg", name: "UHC Salzburg", clubId: "uhc-salzburg" },
    { id: "hla-spiders-wels", slug: "hla-spiders-wels", name: "Spiders Wels", clubId: "spiders-wels" }
  ],
  venues: [
    ...curatedDataset.venues,
    { id: "sportzentrum-noe", slug: "sportzentrum-noe", name: "Sportzentrum Niederösterreich" },
    { id: "sporthalle-schwaz-ost", slug: "sporthalle-schwaz-ost", name: "Sporthalle Schwaz Ost" },
    { id: "handball-arena-bregenz", slug: "handball-arena-bregenz", name: "Handball-Arena Bregenz" }
  ],
  matches: [
    ...curatedDataset.matches,
    { id: "mu18-2026-06-08", competitionId: "oohv-mu18-grunddurchgang", seasonId: "2025-26", homeTeamId: "mu18-hc-linz-neue-heimat", awayTeamId: "mu18-spiders-wels", venueId: "sh-huettner", startsAt: "2026-06-08T16:00:00.000Z", status: "scheduled" as const },
    { id: "elite-2026-06-10", competitionId: "elite-cup-mu18-b", seasonId: "2025-26", homeTeamId: "elite-spiders-wels", awayTeamId: "elite-falken-st-poelten", venueId: "sh-pernau", startsAt: "2026-06-10T17:00:00.000Z", status: "scheduled" as const },
    { id: "hla-2026-06-03", competitionId: "hla-challenge", seasonId: "2025-26", homeTeamId: "hla-schwaz-ft", awayTeamId: "hla-bregenz-ft", venueId: "sporthalle-schwaz-ost", startsAt: "2026-06-03T18:00:00.000Z", status: "scheduled" as const },
    { id: "hla-2026-06-06", competitionId: "hla-challenge", seasonId: "2025-26", homeTeamId: "hla-uhc-salzburg", awayTeamId: "hla-spiders-wels", venueId: "sh-pernau", startsAt: "2026-06-06T18:00:00.000Z", status: "scheduled" as const }
  ],
  standings: [
    ...curatedDataset.standings,
    { competitionId: "oohv-mu18-grunddurchgang", seasonId: "2025-26", metadata, rows: [{ rank: 1, teamId: "mu18-hc-linz-neue-heimat", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 30, goalsAgainst: 25, goalDifference: 5, points: 2 }, { rank: 2, teamId: "mu18-spiders-wels", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 25, goalsAgainst: 30, goalDifference: -5, points: 0 }] },
    { competitionId: "elite-cup-mu18-b", seasonId: "2025-26", metadata, rows: [{ rank: 1, teamId: "elite-spiders-wels", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 28, goalsAgainst: 24, goalDifference: 4, points: 2 }, { rank: 2, teamId: "elite-falken-st-poelten", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 24, goalsAgainst: 28, goalDifference: -4, points: 0 }] },
    { competitionId: "hla-challenge", seasonId: "2025-26", metadata, rows: [{ rank: 1, teamId: "hla-schwaz-ft", played: 1, wins: 1, draws: 0, losses: 0, goalsFor: 31, goalsAgainst: 27, goalDifference: 4, points: 2 }, { rank: 2, teamId: "hla-bregenz-ft", played: 1, wins: 0, draws: 0, losses: 1, goalsFor: 27, goalsAgainst: 31, goalDifference: -4, points: 0 }] }
  ],
  publicationProfiles: [...PUBLICATION_PROFILES]
} satisfies Dataset;
