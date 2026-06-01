import type { MatchReport } from "../domain/schema";

export const reviewedDemoReports: MatchReport[] = [{
  matchId: "oohv-maenner-landesliga-2025-10-03-1",
  publicReportUrl: "https://www.oehb.at/de/bewerbe/lv/num-85072",
  teamStatistics: [
    { teamId: "oohv-maenner-landesliga-sportunion-edelweiss-linz-sk-traun", goals: 37, sevenMetreThrows: 4, twoMinutePenalties: 2, yellowCards: 1, redCards: 0 },
    { teamId: "oohv-maenner-landesliga-asko-hc-urfahr", goals: 20, sevenMetreThrows: 2, twoMinutePenalties: 3 }
  ],
  playerStatistics: [],
  events: [
    { minute: 30, type: "half-time", homeScore: 18, awayScore: 10 },
    { minute: 60, type: "full-time", homeScore: 37, awayScore: 20 }
  ]
}];

