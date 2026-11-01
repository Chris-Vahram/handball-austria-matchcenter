import { z } from "zod";

const id = z.string().min(1).regex(/^[a-z0-9-]+$/);
const strict = <T extends z.ZodRawShape>(shape: T) => z.object(shape).strict();
const publicReportUrl = z.string().url().refine((url) => {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:") return false;
  if (parsed.hostname === "www.oehb.at") return true;
  return parsed.hostname === "oehb-handball.liga.nu" && parsed.pathname.endsWith("/wa/groupMeetingReport");
}, "Report URL must use an allowlisted public report host");

export const metadataSchema = strict({
  sourceLabel: z.string().min(1),
  sourceReference: z.string().url(),
  updatedAt: z.string().datetime(),
  importMode: z.enum(["manual-demo", "official-export", "official-api", "public-page"])
});
export const associationSchema = strict({ id, name: z.string().min(1) });
export const seasonSchema = strict({ id, label: z.string().min(1) });
export const competitionSchema = strict({
  id,
  slug: id,
  name: z.string().min(1),
  associationId: id,
  seasonId: id,
  category: z.enum(["adult", "u18"])
});
export const clubSchema = strict({ id, slug: id, name: z.string().min(1) });
export const teamSchema = strict({ id, slug: id, name: z.string().min(1), clubId: id });
export const venueSchema = strict({ id, slug: id, name: z.string().min(1) });
export const matchSchema = strict({
  id,
  competitionId: id,
  seasonId: id,
  homeTeamId: id,
  awayTeamId: id,
  venueId: id.optional(),
  roundLabel: z.string().min(1).optional(),
  startsAt: z.string().datetime(),
  status: z.enum(["scheduled", "finished", "postponed", "cancelled"]),
  homeScore: z.number().int().nonnegative().optional(),
  awayScore: z.number().int().nonnegative().optional(),
  halfTimeHomeScore: z.number().int().nonnegative().optional(),
  halfTimeAwayScore: z.number().int().nonnegative().optional(),
  publicReportUrl: publicReportUrl.optional()
}).superRefine((match, ctx) => {
  const scoreCount = Number(match.homeScore !== undefined) + Number(match.awayScore !== undefined);
  const halfTimeScoreCount = Number(match.halfTimeHomeScore !== undefined) + Number(match.halfTimeAwayScore !== undefined);
  if (match.status === "finished" && scoreCount !== 2) {
    ctx.addIssue({ code: "custom", message: "Finished match requires complete score" });
  }
  if (match.status !== "finished" && scoreCount !== 0) {
    ctx.addIssue({ code: "custom", message: "Only finished match may contain score" });
  }
  if (halfTimeScoreCount === 1) {
    ctx.addIssue({ code: "custom", message: "Half-time result must be complete" });
  }
});
export const teamStatisticsSchema = strict({
  teamId: id,
  goals: z.number().int().nonnegative().optional(),
  sevenMetreThrows: z.number().int().nonnegative().optional(),
  twoMinutePenalties: z.number().int().nonnegative().optional(),
  yellowCards: z.number().int().nonnegative().optional(),
  redCards: z.number().int().nonnegative().optional()
});
export const playerStatisticsSchema = strict({
  teamId: id,
  sourcePlayerReference: z.string().min(1),
  displayLabel: z.string().min(1),
  shirtNumber: z.number().int().nonnegative().optional(),
  goals: z.number().int().nonnegative().optional(),
  sevenMetreGoals: z.number().int().nonnegative().optional(),
  sevenMetreAttempts: z.number().int().nonnegative().optional(),
  twoMinutePenalties: z.number().int().nonnegative().optional(),
  yellowCards: z.number().int().nonnegative().optional(),
  redCards: z.number().int().nonnegative().optional()
});
export const matchEventSchema = strict({
  minute: z.number().int().nonnegative(),
  clock: z.string().regex(/^\d{1,2}:\d{2}$/).optional(),
  type: z.enum(["goal", "seven-metre", "seven-metre-missed", "two-minute-penalty", "yellow-card", "red-card", "timeout", "half-time", "full-time"]),
  teamId: id.optional(),
  homeScore: z.number().int().nonnegative().optional(),
  awayScore: z.number().int().nonnegative().optional()
});
export const matchReportSchema = strict({
  matchId: id,
  publicReportUrl,
  teamStatistics: z.array(teamStatisticsSchema),
  playerStatistics: z.array(playerStatisticsSchema),
  events: z.array(matchEventSchema)
});
export const parserProvenanceSchema = strict({
  competitionId: id,
  sourceReference: z.string().url(),
  retrievedAt: z.string().datetime(),
  parserVersion: z.string().min(1),
  validationStatus: z.literal("valid"),
  rawSnapshotReference: z.string().min(1)
});
export const publicationProfileSchema = strict({
  competitionId: id,
  category: z.enum(["adult", "u18"]),
  playerLevelDisplay: z.boolean(),
  reviewDecision: z.enum(["pending", "approved", "rejected"])
}).superRefine((profile, ctx) => {
  if (profile.playerLevelDisplay && profile.reviewDecision !== "approved") {
    ctx.addIssue({ code: "custom", message: "Player display requires approved review" });
  }
});
export const rankingRowSchema = strict({
  rank: z.number().int().positive(),
  teamId: id,
  played: z.number().int().nonnegative(),
  wins: z.number().int().nonnegative(),
  draws: z.number().int().nonnegative(),
  losses: z.number().int().nonnegative(),
  goalsFor: z.number().int().nonnegative(),
  goalsAgainst: z.number().int().nonnegative(),
  goalDifference: z.number().int(),
  points: z.number().int().nonnegative()
});
export const standingsSchema = strict({
  competitionId: id,
  seasonId: id,
  metadata: metadataSchema,
  rows: z.array(rankingRowSchema)
});
export const datasetSchema = strict({
  metadata: metadataSchema,
  associations: z.array(associationSchema),
  seasons: z.array(seasonSchema),
  competitions: z.array(competitionSchema),
  clubs: z.array(clubSchema),
  teams: z.array(teamSchema),
  venues: z.array(venueSchema),
  matches: z.array(matchSchema),
  standings: z.array(standingsSchema),
  matchReports: z.array(matchReportSchema),
  parserProvenance: z.array(parserProvenanceSchema),
  publicationProfiles: z.array(publicationProfileSchema)
});

export type Dataset = z.infer<typeof datasetSchema>;
export type Match = z.infer<typeof matchSchema>;
export type MatchReport = z.infer<typeof matchReportSchema>;
