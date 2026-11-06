## 1. Aggregation core

- [x] 1.1 `v2/src/data/player-stats.ts`: gate-aware `topScorersForCompetition`, `topScorersForTeam`, `competitionPlayerReleased`, `sevenMetreQuota`, `goalShare` (all over `visiblePlayerStatistics`).

## 2. UI

- [x] 2.1 `components/scorer-table.tsx` ranked table (Rang/Spieler/Team/Sp/Tore/7m-Quote/2′).
- [x] 2.2 `/bewerbe/[slug]/torschuetzen` route with released list or gated state; "Torschützen" tile on the competition page.
- [x] 2.3 Team page "Top-Torschützen" card (top 5 + link to full list).
- [x] 2.4 Match report enrichment: 7m quota %, goal-share bar, top-scorer highlight.
- [x] 2.5 Sitemap adds `/torschuetzen` routes.

## 3. Coverage & verification

- [x] 3.1 e2e: released list shows ranked goals; U18/pending shows gated state; team top-scorers card present.
- [x] 3.2 Refresh screenshots.
- [x] 3.3 Run v2 `npm test`, `lint`, `typecheck`, `build`, `test:e2e`; all green.
- [x] 3.4 Commit/push when the owner asks. (committed: see git log)
