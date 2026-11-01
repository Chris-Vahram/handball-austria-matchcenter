# Design: add-matchcenter-v3

## Context

See proposal.md for motivation.

- **Root `src/`** is the frozen pitch build. Its importer parses a synthetic embedded JSON payload, not real nuLiga HTML.
- **`v2/`** copied the data layer into its own `v2/src/`.
- **Design source of truth:**
  - `PRODUCT.md`
  - the direction contract in `.impeccable/surfaces/v3-app-liga.md`: sports-site canon, red #C8102E accents, Barlow, mobile-first, full official names, row variant A
  - the chosen sketch `.impeccable/mocks/decision/names-a.html`
- **nuLiga page structure** (verified 2026-10-31):
  - `groupPage` has a standings `<table>` and a "Spielplan (Aktuell)" `<table>`.
  - `displayTyp=vorrunde&displayDetail=meetings` gives the full season schedule.
  - Report links are `groupMeetingReport?meeting=…&group=…`.
  - Statistics are `groupMeetingStatistics?displayType=…`.
  - The score cell of unplayed games contains referee initials.

## Goals / Non-Goals

**Goals:**
- v3 builds and deploys alone (own `package.json`), sharing nothing at runtime with root or v2.
- Pages are statically rendered from committed, reviewed snapshots, so a deploy never needs the network.
- One privacy filter in the normalization step; nothing downstream can see filtered fields.

**Non-Goals:**
- Live updates, scheduled imports, search across Austria, team pages, club colours and logos.
- Desktop-only features.

## Decisions

1. **Self-contained `v3/` app, data layer copied rather than imported.**
   - v3 copies the needed parts of the domain schema (Zod) into `v3/src/domain` and extends them (Runde, approval status, report lineups, statistics).
   - Alternative rejected: importing from `../src`. That couples v3 to the frozen pitch build and its synthetic parser.

2. **Committed reviewed snapshots + gitignored raw cache.**
   - The operator CLI (`npm run import` in `v3/`) fetches the raw HTML into `v3/data/import-cache/` (gitignored) and writes normalized JSON to `v3/src/data/snapshots/<competition>.json`.
   - The operator reviews the diff and commits it. This follows ADR-002: reviewed, versioned data with provenance.
   - Alternative rejected: reading the cache at runtime. It breaks deploys and blurs the review step.

3. **HTML parsing with `node-html-parser` as a dev dependency used only by the CLI.**
   - nuLiga markup is plain tables, but regex parsing of nested cells is brittle.
   - The parser never runs in the app bundle.
   - Alternative rejected: `cheerio`, which is heavier for the same job.

4. **Privacy filter as one pure normalization function with unit tests.**
   - It applies a whitelist mapping: only allowed fields are copied, so anything unknown is dropped by default.
   - A score cell that does not match `^\d+:\d+$` produces status "scheduled" and no text.
   - Player rows are kept only when the competition category is "adult".
   - The new privacy decision is recorded as `openspec/decisions/adr-005-adult-player-names.md`, and ADR-004 gets a 2026/27 allowlist section.

5. **Runde derivation.**
   - nuLiga numbers a round-robin group contiguously in round order (HLA West: Nr. 21–24 = Runde 6). So when the numbers are exactly 1..N and N divides by games per round (⌊teams/2⌋), Runde = ⌈Nr / games per round⌉. A game moved to another date stays in its official Runde.
   - Otherwise, matches are grouped by calendar week (Mon–Sun).
   - The current Runde is the first one with an unplayed match. This is evaluated at build time from the snapshot; the URL `?runde=n` overrides it.

6. **Rendering.**
   - Next.js App Router with server components.
   - Small client components only for the competition switch and the round stepper. The round stepper keeps state in the URL so it can be shared.
   - Barlow and Barlow Condensed are self-hosted via `next/font/google`.
   - Tailwind is not used. One plain stylesheet (`v3/app/globals.css`) with tokens from the direction contract keeps the system small and exact.

7. **Table fit at 390 px.**
   - Row variant A uses a real `<table>`: S-U-N in one column, numerals tabular, and the team cell wraps to at most two lines.
   - A Playwright test asserts `scrollWidth === clientWidth` at 390 px for every page.

8. **PDF = print route, not a PDF library.**
   - `/[competition]/druck` renders an A4 print stylesheet (`@page` A4, page footer with source and Stand). The button opens it and triggers `window.print()`; the user saves it as PDF.
   - Alternative rejected: `@react-pdf/renderer`, a big dependency and a second rendering path to keep in sync.

9. **Routes.**
   - `/` redirects to `/hla-challenge-west`.
   - `/[competition]` shows Tabelle and Spielplan.
   - `/[competition]/spiel/[meeting]` shows a Spielbericht.
   - `/[competition]/torschuetzen?liste=tore|7m|zeitstrafen|gelb|rot&team=` shows player statistics.
   - `/[competition]/druck` is the print view.

## Risks / Trade-offs

- **[nuLiga markup changes]** → The parser is covered by fixture tests from saved HTML. On validation failure, no output is written (spec: nuliga-ingestion).
- **[Week-based Runde ≠ official round when games are moved]** → An explicit nuLiga value is preferred. Moved games stay in their actual week, which matches how people read the schedule.
- **[Showing adult opponents' names may include minors]** → The owner decided this (ADR-005), and it mirrors data nuLiga already publishes. Youth competitions stay off. The decision is to be reviewed before any public launch.
- **[Stale data between imports]** → Stand is always shown. It is flagged when older than 7 days.
- **[Print output differs across browsers]** → Test in Chrome and Safari. Keep the layout simple: one table, then a schedule list.

## Migration Plan

- v3 is an additive app (local port 3030) with its own Vercel project or preview. Rollback means not deploying v3; root and v2 are unaffected.
