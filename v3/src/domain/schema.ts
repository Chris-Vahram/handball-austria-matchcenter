import { z } from "zod";

const count = z.number().int().min(0);
const score = z.object({ home: count, away: count }).strict();

export const standingRowSchema = z.object({
  rank: z.number().int().min(1),
  team: z.string().min(1),
  played: count, won: count, drawn: count, lost: count,
  goalsFor: count, goalsAgainst: count, goalDiff: z.number().int(),
  points: count
}).strict();

export const matchSchema = z.object({
  number: z.number().int().min(1),
  round: z.number().int().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  venue: z.string().nullable(),
  home: z.string().min(1),
  away: z.string().min(1),
  status: z.enum(["played", "scheduled"]),
  score: score.nullable(),
  halftime: score.nullable(),
  reportId: z.string().regex(/^\d+$/).nullable(),
  reportApproved: z.boolean().nullable(),
  note: z.enum(["verlegt", "Heimrecht getauscht"]).nullable()
}).strict();

export const reportPlayerSchema = z.object({
  shirt: z.string().min(1).max(3),
  name: z.string().min(1),
  goals: count,
  sevenMGoals: count,
  sevenMAttempts: count,
  yellow: count,
  twoMin: count,
  disqualified: z.boolean()
}).strict();

export const reportTeamSchema = z.object({
  name: z.string().min(1),
  players: z.array(reportPlayerSchema),
  totals: z.object({ sevenMAttempts: count, sevenMGoals: count, twoMin: count, yellow: count, timeouts: count, disqualifications: count }).strict()
}).strict();

export const reportSchema = z.object({
  id: z.string().regex(/^\d+$/),
  number: z.number().int().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  venue: z.string().nullable(),
  approved: z.boolean(),
  score: score,
  halftime: score.nullable(),
  home: reportTeamSchema,
  away: reportTeamSchema
}).strict();

export const statRowSchema = z.object({
  rank: z.number().int().min(1),
  name: z.string().min(1),
  club: z.string().min(1),
  team: z.string().min(1),
  value: count,
  games: count.nullable(),
  attempts: count.nullable(),
  perGame: z.number().min(0).nullable()
}).strict();

export const teamStatsSchema = z.object({
  name: z.string().min(1),
  games: count,
  scheduled: count,
  goals: count,
  sevenMAttempts: count,
  sevenMGoals: count,
  twoMin: count,
  yellow: count,
  red: count,
  spectators: count.nullable(),
  homeWins: count,
  awayWins: count,
  draws: count
}).strict();

export const datasetSchema = z.object({
  competitionId: z.string().min(1),
  source: z.object({ urls: z.array(z.url()).min(1), importedAt: z.iso.datetime() }).strict(),
  standings: z.array(standingRowSchema).min(2),
  matches: z.array(matchSchema),
  reports: z.record(z.string(), reportSchema),
  stats: z.record(z.string(), z.array(statRowSchema)),
  groupStats: z.object({ group: teamStatsSchema, teams: z.array(teamStatsSchema) }).strict().nullable()
}).strict();

export type StandingRow = z.infer<typeof standingRowSchema>;
export type Match = z.infer<typeof matchSchema>;
export type Report = z.infer<typeof reportSchema>;
export type ReportTeam = z.infer<typeof reportTeamSchema>;
export type StatRow = z.infer<typeof statRowSchema>;
export type Dataset = z.infer<typeof datasetSchema>;
export type TeamStats = z.infer<typeof teamStatsSchema>;
