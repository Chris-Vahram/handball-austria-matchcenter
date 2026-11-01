## 1. Profile data

- [ ] 1.1 `v2/src/data/player-stats.ts`: `playerSlug(label, shirt)`, `releasedPlayers()`, `getPlayerProfile(slug)` — all gated by `visiblePlayerStatistics`; no `sourcePlayerReference` exposed.

## 2. Route + links

- [ ] 2.1 `app/spieler/[playerSlug]/page.tsx`: hero, stat tiles (Tore, 7m+quote, 2-Min, Spiele), per-match list linking to reports; `notFound()` when empty; tinted to the player's club.
- [ ] 2.2 Link player names → `/spieler/[slug]` in `components/scorer-table.tsx`, `app/spiele/[matchId]/page.tsx`, `app/teams/[teamSlug]/page.tsx`.
- [ ] 2.3 `app/sitemap.ts`: add `/spieler/[slug]` for released players.

## 3. Coverage & verification

- [ ] 3.1 e2e: profile shows player goals + per-match line; unknown slug 404s; name link from Torschützenliste navigates to the profile.
- [ ] 3.2 Refresh screenshot.
- [ ] 3.3 Run v2 `npm test`, `lint`, `typecheck`, `build`, `test:e2e`; all green.
- [ ] 3.4 Commit/push when the owner asks.
