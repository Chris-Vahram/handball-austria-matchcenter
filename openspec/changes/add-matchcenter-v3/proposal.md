# Proposal: add-matchcenter-v3

## Why

Players, coaches and fans of SK Konstant Traun / Edelweiss check standings, results, match reports and scorer stats on nuLiga, mostly on the phone, and find it hard to read. The owner rejected the v2 redesign as generic "AI slop". The 2026/27 season is running now. v3 is a clean redesign in the sports-site convention that shows the same official nuLiga data (HBL, laola1 and Flashscore set the quality bar). It uses red accents and is built mobile-first.

## What Changes

- New standalone Next.js app in `v3/`. Root `src/` (the version emailed to ÖHB) and `v2/` stay untouched.
- **Phase 1, Liga page:** full Tabelle plus the season Spielplan grouped by Runden, with the current Runde in focus. It covers two 2026/27 competitions, with Traun as the showcase:
  - MEHRLEBEN HLA CHALLENGE West Hauptrunde (`group=218583`)
  - OÖHV Landesliga LLM-Grunddurchgang (`group=218721`)

  On a 390px phone the Tabelle shows every required column and full official team names, with no horizontal scrolling.
- **Phase 2, Spielbericht:** match info, both lineups (Trikot, Name, Tore, 7m, Karten, 2-Min, Disqualifikation), team totals and approval status.
- **Phase 3, Spielerstatistik:** Tore, 7m-Tore, Zeitstrafen, Gelbe and Rote Karten per player, per competition.
- **Phase 4, PDF:** our own generated "Tabelle & Spielplan" PDF/print view. It does not link to nuLiga's PDF.
- **v3 operator importer:** reads the allowlisted 2026/27 nuLiga pages (group page, Spielplan Gesamt, match reports, player statistics). It runs only from the CLI, with a 24h cache, ≥1500ms between requests and at most 2 retries.
- **ADR-004 update:** adds the 2026/27 allowlist.
- **New privacy decision (supersedes "U18 player-level off" for adult competitions):** player names are shown for all teams in adult competitions, as in the public nuLiga reports. Youth competitions stay off.
- **Always stripped:** referee, Zeitnehmer and Mannschaftsoffizielle data, contacts, birthdates, pass numbers and person IDs. This includes the referee initials nuLiga prints in the score column of unplayed games (e.g. `CVIT./SCHN.`).

Data-source limitations:
- Data is only as fresh as the last operator import. Every page shows "Quelle: nuLiga" and a "Stand" timestamp.
- Only fields nuLiga publishes are shown. Club colours and logos are not sourced and are not used.

## Capabilities

### New Capabilities
- `nuliga-ingestion`: allowlisted, CLI-only import of 2026/27 nuLiga pages into validated normalized data, including privacy filtering.
- `league-standings-schedule`: the Liga page (Tabelle plus Spielplan by Runden) for the configured competitions.
- `match-report`: the public Spielbericht view, restricted by the privacy rules.
- `player-statistics`: per-competition player rankings derived from nuLiga statistics pages.
- `table-schedule-print`: our own PDF/print export of Tabelle and Spielplan.
- `search`: header search for teams and players across the configured competitions (owner request 2026-10-31).

### Modified Capabilities
- None. `openspec/specs/` is empty; earlier changes are not archived yet.

## Impact

- New: `v3/` (app, components, data, importer, tests); `openspec/decisions/adr-004-controlled-oehb-public-ingestion.md` (2026/27 section); `openspec/decisions/adr-005-adult-player-names.md`.
- Gitignored cache: `v3/data/import-cache/`.
- No change to root `src/`, `v2/` or their deployments. Dependencies are the same as v2 (Next 15, React, Zod, Vitest, Playwright); a PDF library is decided in design.
