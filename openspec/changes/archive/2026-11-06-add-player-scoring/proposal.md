## Why

The v2 matchcenter shows player stats only inside one match report. Owner wants a
real player-stats layer. The data reality: only adult, publication-approved matches
expose player data today (one OÖHV Landesliga match, 25 players); everything else is
U18/pending and gated. The right move is to build the feature **through the existing
publication gate** (`visiblePlayerStatistics`) so it is adult-only and **expands
automatically** as more approved match reports arrive — no privacy change, no new
fields, no fabricated data.

## What Changes

- Add a gate-aware **player-scoring aggregation** (`v2/src/data/player-stats.ts`):
  `topScorersForCompetition`, `topScorersForTeam`, plus `sevenMetreQuota` /
  `goalShare` helpers. All aggregation runs over `visiblePlayerStatistics`, so it
  only ever sums adult, approved data.
- Add a **competition Torschützenliste** route
  (`/bewerbe/[slug]/torschuetzen`) with a ranked table, linked from a new
  "Torschützen" tile on the competition page. When a competition's player data is
  not released, the page shows the same gated explanation as the report.
- Add a **Top-Torschützen card** on the team page (top 5, links to the full list).
- **Enrich the match report** player section: 7m quota %, per-player goal-share bar,
  and the existing top-scorer highlight.
- Sitemap gains the `/torschuetzen` routes.

## Non-Goals

- No data/fixture change, no scraping, no new player fields, no U18 publication.
  U18 and pending competitions stay gated by construction.

## Capabilities

### Modified Capabilities

- `team-os-matchcenter`: adds competition- and team-level player scoring lists and
  richer report scoring detail, all enforced by the existing adult-approved
  publication gate and expanding automatically as approved data grows.

## Impact

- `./v2/` only: new `src/data/player-stats.ts`, `app/bewerbe/[competitionSlug]/
  torschuetzen/page.tsx`, `components/scorer-table.tsx`; edits to the competition,
  team, and match-report pages and `sitemap.ts`. e2e adds released-list and gated
  cases. Domain fixtures, schemas, and privacy posture unchanged. Root untouched.
