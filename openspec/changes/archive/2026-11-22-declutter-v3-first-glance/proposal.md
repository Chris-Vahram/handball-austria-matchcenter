# Proposal: declutter-v3-first-glance

## Why

A friend of the owner opened the v3 start page (local, port 3030) for the first time and found it "a bit overwhelming and bloated at first glance" (owner, 2026-11-21). Screens taken 2026-11-21 (`.playwright-mcp/home-*.png`) show why: with two favorite teams and two favorite Bewerbe the home is ~2,150 px tall on a 390 px phone — per team a large black next-match box with address and route button, per Bewerb a top-3 table **plus** the full current round, and below that the complete "Bewerbe nach Verband" list again. Without favorites the page shows two search fields on top of each other. At national scale (change `expand-v3-austria`) every followed Bewerb would add another ~700 px block, so the layout has to shrink before the data grows.

Owner decision 2026-11-21 (picked from three layout options): **"Eine Spieleliste"** — one list of my next matches, my last results, my Bewerbe as short rows, the directory only as a link.

## What Changes

- **Home with favorites = three short lists** (**BREAKING (UX)**):
  - "Meine nächsten Spiele": one row per favorite team with its next match (date, time, both full team names, favorite highlighted), soonest first, linking to the Spielvorschau.
  - "Zuletzt": one row per favorite team with its last result (S/U/N chip, score), linking to the Spielbericht.
  - "Meine Bewerbe": one row per followed Bewerb and per Bewerb of a favorite team, showing the favorite team's rank and points (or the leader when no favorite team plays there), linking to the Tabelle.
  - One link "Alle Bewerbe" to `/bewerbe`.
- **Removed from the home:** the large next-match box (address, route button — they stay on the team page and Spielvorschau), the per-Bewerb mini table and current round block, and the full Verband directory below the favorites.
- **Home without favorites:** exactly one search field (the header search is not shown on the home while the big "Finde dein Team" search is), followed by the Verbände as short rows linking to `/bewerbe#<verband>`.
- No change to team page, Bewerb pages, Spielbericht or data.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `home-my-team`: the dashboard becomes three compact lists (next matches, last results, Bewerbe); first visit shows one search and Verband rows instead of the full directory.
- `search`: the header search is not shown on the home page while the "Finde dein Team" search is visible (one search field per screen).

## Impact

- Code: `v3/app/page.tsx`, `v3/components/client/my-teams.tsx`, `v3/components/shell.tsx` (TopBar search optional), `v3/src/lib/dashboard.ts` (compact row data instead of cards), `v3/app/globals.css`; `v3/components/competition-block.tsx` becomes unused and is deleted.
- Data/importer/privacy: none. Uses only already imported fields.
- Tests: Vitest for the row derivation (sorting, Bewerbe of favorite teams deduplicated, leader fallback); Playwright for the home with and without favorites at 390 px and desktop (one search field, three lists, page height budget).
- Design docs: `DESIGN.md` and `.impeccable/surfaces/v3-app-liga.md` home section.
- Data limitation unchanged: data comes from the operator import of allowlisted nuLiga pages (ADR-004); the home shows nothing that is not already in the snapshots.
