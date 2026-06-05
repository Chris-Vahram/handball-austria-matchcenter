import type { MatchReport } from "../domain/schema";

const player = (teamId: string, shirtNumber: number, displayLabel: string, goals?: number, sevenMetre?: string, twoMinutePenalties = 0) => {
  const sevenMetreMatch = /^(\d+)\/(\d+)$/.exec(sevenMetre ?? "");
  return {
    teamId,
    sourcePlayerReference: `${teamId}-${shirtNumber}`,
    displayLabel,
    shirtNumber,
    goals,
    sevenMetreGoals: sevenMetreMatch ? Number(sevenMetreMatch[1]) : undefined,
    sevenMetreAttempts: sevenMetreMatch ? Number(sevenMetreMatch[2]) : undefined,
    twoMinutePenalties
  };
};

export const reviewedDemoReports: MatchReport[] = [{
  matchId: "m-2025-10-03",
  publicReportUrl: "https://www.oehb.at/de/bewerbe/lv/num-85072",
  teamStatistics: [
    { teamId: "edelweiss-traun", goals: 37, sevenMetreThrows: 4, twoMinutePenalties: 2, yellowCards: 1, redCards: 0 },
    { teamId: "hc-urfahr", goals: 20, sevenMetreThrows: 2, twoMinutePenalties: 3 }
  ],
  playerStatistics: [],
  events: [
    { minute: 30, type: "half-time", homeScore: 18, awayScore: 10 },
    { minute: 60, type: "full-time", homeScore: 37, awayScore: 20 }
  ]
}, {
  matchId: "m-2026-06-01",
  publicReportUrl: "https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupMeetingReport?meeting=85068&championship=O%C3%96HV+25%2F26&group=216574",
  teamStatistics: [
    { teamId: "hc-linz-neue-heimat", goals: 41, sevenMetreThrows: 3, twoMinutePenalties: 2 },
    { teamId: "spiders-wels", goals: 37, sevenMetreThrows: 7, twoMinutePenalties: 4 }
  ],
  playerStatistics: [
    player("hc-linz-neue-heimat", 2, "LETIC, Milos"),
    player("hc-linz-neue-heimat", 5, "STACHELBERGER, Nick", 7),
    player("hc-linz-neue-heimat", 12, "ALICKOVIC, Amar"),
    player("hc-linz-neue-heimat", 13, "Dangl, Felix"),
    player("hc-linz-neue-heimat", 17, "GRÜNBERGER, Yannick"),
    player("hc-linz-neue-heimat", 18, "HORVAT, Kristofer", 2),
    player("hc-linz-neue-heimat", 19, "Kneidinger, David", 3, undefined, 1),
    player("hc-linz-neue-heimat", 21, "Schinagl, Levin", 2),
    player("hc-linz-neue-heimat", 23, "DONNABAUER, Moritz", 1),
    player("hc-linz-neue-heimat", 33, "NANA AGYAPONG, Bryan", 3, undefined, 1),
    player("hc-linz-neue-heimat", 34, "NIEDERMÜLLER, Philipp", 4),
    player("hc-linz-neue-heimat", 45, "SEMMELMAYER, Christoph", 9, "2/3"),
    player("hc-linz-neue-heimat", 49, "SMUTNY, Philipp"),
    player("hc-linz-neue-heimat", 67, "ODRI, Istvan", 2),
    player("hc-linz-neue-heimat", 92, "PALAN, Fabian", 8),
    player("hc-linz-neue-heimat", 95, "REISINGER, Paul"),
    player("spiders-wels", 2, "WIESINGER, Johannes", 4, "2/2", 2),
    player("spiders-wels", 9, "SEIFERT, Fabian", 1),
    player("spiders-wels", 12, "Mair, Tobias"),
    player("spiders-wels", 50, "Weinmann, Lorenz", 1),
    player("spiders-wels", 66, "Bosnjak, Gabriel", 8, "3/4"),
    player("spiders-wels", 71, "Reinwein, Manuel", undefined, undefined, 1),
    player("spiders-wels", 72, "Kukla, Andreas Jr.", 11, undefined, 2),
    player("spiders-wels", 73, "PETRISIC, David", 12, "1/1"),
    player("spiders-wels", 90, "MEIRINGER, David")
  ],
  events: [
    { minute: 3, clock: "02:41", type: "goal", teamId: "hc-linz-neue-heimat", homeScore: 1, awayScore: 2 },
    { minute: 6, clock: "06:27", type: "goal", teamId: "hc-linz-neue-heimat", homeScore: 3, awayScore: 7 },
    { minute: 7, clock: "07:19", type: "seven-metre", teamId: "hc-linz-neue-heimat", homeScore: 4, awayScore: 7 },
    { minute: 15, clock: "15:02", type: "two-minute-penalty", teamId: "spiders-wels" },
    { minute: 18, clock: "18:27", type: "timeout", teamId: "hc-linz-neue-heimat" },
    { minute: 25, clock: "25:20", type: "two-minute-penalty", teamId: "hc-linz-neue-heimat" },
    { minute: 27, clock: "26:30", type: "timeout", teamId: "spiders-wels" },
    { minute: 30, clock: "29:59", type: "half-time", homeScore: 18, awayScore: 17 },
    { minute: 33, clock: "32:55", type: "two-minute-penalty", teamId: "spiders-wels" },
    { minute: 42, clock: "42:39", type: "timeout", teamId: "spiders-wels" },
    { minute: 45, clock: "45:24", type: "seven-metre", teamId: "spiders-wels", homeScore: 31, awayScore: 29 },
    { minute: 46, clock: "46:26", type: "timeout", teamId: "hc-linz-neue-heimat" },
    { minute: 47, clock: "47:17", type: "two-minute-penalty", teamId: "spiders-wels" },
    { minute: 48, clock: "47:26", type: "seven-metre-missed", teamId: "hc-linz-neue-heimat" },
    { minute: 60, clock: "59:59", type: "full-time", homeScore: 41, awayScore: 37 }
  ]
}];
