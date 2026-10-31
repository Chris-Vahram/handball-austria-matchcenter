# Tasks

## 1. Decisions and scaffolding

- [x] 1.1 Add a "2026/27 nuLiga allowlist" section to ADR-004 (groups 218583, 218721; groupPage, Spielplan Gesamt, groupMeetingReport, groupMeetingStatistics; same limits) and verify every URL in it matches the importer config
- [x] 1.2 Write `openspec/decisions/adr-005-adult-player-names.md` (owner decision 2026-10-31, scope adult competitions, exclusions, youth stays off, review before public launch) and update the privacy line in `CLAUDE.md`; verify both reference each other
- [x] 1.3 Scaffold `v3/` (Next.js, TypeScript, Zod, Vitest, Playwright, ESLint; own package.json, port 3002; `data/import-cache/` gitignored) and verify `npm run typecheck`, `npm run lint`, `npm run build` pass on an empty page

## 2. Ingestion (nuliga-ingestion)

- [x] 2.1 Save one raw HTML fixture each for HLA West groupPage, Spielplan Gesamt, one match report and one statistics page under `v3/src/importer/__fixtures__/` and verify they contain no data beyond what the public page shows
- [x] 2.2 Implement allowlist config + URL guard and verify unit tests: unconfigured group rejected, configured report accepted, foreign host rejected
- [x] 2.3 Implement cached, rate-limited fetcher (24h, ≥1500 ms, ≤2 retries) and verify unit tests with a fake clock and fake transport
- [x] 2.4 Implement domain schema (standings, matches with Runde/status/approval, provenance) and the groupPage + Spielplan parsers; verify fixture tests reproduce the 31.10.2026 HLA West table (Traun row 7, 3-0-3, 170:191, 6 Pkt) and match 24 as scheduled with no referee text
- [x] 2.5 Implement the privacy normalization (whitelist mapping, referee-initials drop, adult-only player rows) and verify unit tests from the spec scenarios
- [x] 2.6 Add the CLI (`npm run import -- <competition>`), run it for both competitions and verify the snapshot JSON validates, carries source URLs + Stand, and `grep` finds no referee initials

## 3. Liga page (league-standings-schedule)

- [x] 3.1 Implement tokens, fonts and app shell (red rule, wordmark, competition switch, tabs, footer with Quelle/Stand/independence note) per the direction contract and verify against `names-a.html` at 390 px
- [x] 3.2 Implement the standings table (row variant A, full names, Traun marked, semantic headers) and verify a Playwright test at 390 px: scroll width = viewport width, all 8 names untruncated
- [x] 3.3 Implement Runde derivation, current-round selection and the round stepper (`?runde=`) and verify unit tests (current round = first with unplayed match) plus an e2e step forward/back
- [x] 3.4 Implement match rows (home/away, winner bold, angesetzt, "noch nicht genehmigt", link to report) and verify e2e on Runde 6
- [x] 3.5 Implement empty and stale states and verify unit/e2e tests (stale: unit test; "no data" branch has no test because both snapshots exist)
- [x] 3.6 Implement the desktop layout (table + round column) and verify screenshots at 1440 px

## 4. Spielbericht (match-report)

- [x] 4.1 Extend the parser/normalizer for reports (match info, lineups with allowed fields, team totals, approval) and verify fixture tests: no official/referee names, lineup goals sum to the score
- [x] 4.2 Build `/[competition]/spiel/[meeting]` and verify e2e at 390 px (no horizontal scroll) for match 23

## 5. Spielerstatistik (player-statistics)

- [x] 5.1 Parse the five statistics lists into the snapshot and verify fixture tests
- [x] 5.2 Build `/[competition]/torschuetzen` with list switch and team filter and verify e2e filtering to Traun

## 6. Tabelle & Spielplan PDF (table-schedule-print)

- [x] 6.1 Build `/[competition]/druck` with an A4 print stylesheet and source/Stand footer and verify a Playwright PDF render contains all table rows, every match and no referee text

## 7. Integration and finish

- [x] 7.1 Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm audit --omit=dev` in `v3/` and verify all pass
- [x] 7.2 Run the impeccable detector and finish review on desktop and mobile captures, apply its fixes, and verify the reviewer's ship verdict
- [x] 7.3 Generate DESIGN.md + `.impeccable/design.json` via the documenter and verify both exist with tokens


## 8. Suche (search, owner request 2026-10-31)

- [x] 8.1 Implement the team search (standings of all competitions, diacritic-insensitive; no person search per ADR-005) and verify unit tests from the spec scenarios
- [x] 8.2 Add the header search field (GET form) and `/suche` results page and verify e2e at 390 px (no horizontal scroll) for "traun", repeated `q`, and "strauch" (no person hits)

## Workflow follow-up

- Archive the change after Chris reviews the v3 preview.
