## 1. Content-first home

- [x] 1.1 `components/home.tsx`: greeting + "Finde dein Team" search, "Aktuelle Spiele" feed with inline follow, no-follow welcome with ≤6 smart suggestions (no exhaustive list); `app/page.tsx` renders it.
- [x] 1.2 `components/follow-star.tsx` (club follow) reused on match rows, search, welcome.
- [x] 1.3 `MatchRow` (ui.tsx) optional inline follow star; `MatchList` passthrough.

## 2. Club-level cross-Bewerb follow

- [x] 2.1 `team-theme.tsx` active **club** pointer; `favorite-toggle.tsx` follows the club and sets active.
- [x] 2.2 `components/club-summary.tsx`: upcoming games across all Bewerbe + team table positions; used on home (Deine Vereine).
- [x] 2.3 Team page follows the club; graceful no-upcoming fallback.

## 3. Hierarchical Explore

- [x] 3.1 `components/verband-browse.tsx` (Verband → Bewerb by association + category); `app/entdecken` renders it.

## 4. Polish & coverage

- [x] 4.1 Search results inline follow stars.
- [x] 4.2 Rewrite e2e for content-first home, club follow, Verband Explore; refresh screenshots.
- [x] 4.3 Remove unused `team-dashboard`/`follow-onboarding`/`team-switcher`.
- [x] 4.4 Run v2 `npm test`, `lint`, `typecheck`, `build`, `test:e2e`; all green.
- [ ] 4.5 Commit when the owner asks.
