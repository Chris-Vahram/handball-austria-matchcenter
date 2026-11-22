# Tasks: declutter-v3-first-glance

## 1. Data for compact rows

- [x] 1.1 Replace `allTeamCards()` in `v3/src/lib/dashboard.ts` with `homeData()` (per team: key, team, competition, next {date, time, home, away, number}, last {opponent, home, own, other, result, reportHref}; per competition: id, name, standings [team, rank, points]); keep `venueOf`/`mapsUrl`/`resinRule` for team page and preview
- [x] 1.2 Pure helper `myLists(teams, competitions, teamKeys, competitionIds)` in `src/lib/favorites.ts` → next (soonest first, teams without next omitted), last, bewerbe (followed ∪ competitions of favorite teams, deduplicated, favorite ranks or leader fallback)
- [x] 1.3 Vitest for `myLists`: sorting, dedup, leader fallback, team without next match still in "Zuletzt" (update `dashboard.test.ts`)

## 2. Home UI

- [x] 2.1 Rewrite `FavoritesHome` in `v3/components/client/my-teams.tsx`: "Meine nächsten Spiele", "Zuletzt", "Meine Bewerbe", link "Alle Bewerbe"; rows reuse the round-list row markup, favorite rows carry `data-team`
- [x] 2.2 First visit: one big search + hint + Verband rows (`/bewerbe#slug`, Bewerb count) instead of `<Directory>`
- [x] 2.3 `v3/app/page.tsx`: pass `homeData()` + Verband summary; remove `CompetitionBlock` and `Directory` from the home
- [x] 2.4 CSS: `body:has(.entry) .app-head .search { display: none }`; date+time cell for rows; delete orphaned `.cards/.card*/.comp-block/.mini tr.extra/.dir-title` rules (`.next-card` and `.mini` stay: team page and preview use them)
- [x] 2.5 Delete `v3/components/competition-block.tsx` and any now-unused exports (grep first)

## 3. Verify

- [x] 3.1 Playwright: first visit has exactly one visible search field (390 px + desktop); with 2 favorite teams + 2 Bewerbe the home shows the three lists, no `table.mini`, no round list, no "Route planen", and stays under 1,100 px tall at 390 px
- [x] 3.2 Playwright: next-match row opens the Spielvorschau with "Route planen"; 390 px no horizontal scroll
- [x] 3.3 Gate: `npm test && npm run lint && npm run typecheck && npm run build`, `npm run start` + `npm run test:e2e`, `npm audit --omit=dev`
- [x] 3.4 Screenshots 390 px + 1440 px (with/without favorites) into `.impeccable/review/`, check them yourself, impeccable finish review (2026-11-22: fix-then-ship → 3 fixes applied: entry view server-rendered as pre-hydration/no-JS default, one-line date in a 72px column, desktop home column capped at 760px)
- [x] 3.5 Update `DESIGN.md` and `.impeccable/surfaces/v3-app-liga.md` home section; CLAUDE.md status

## Notes from implementation (2026-11-22)

- Date-dependent tests were already red before this change (snapshot 05.11., today 22.11.): `dashboard.test.ts` now passes a fixed date; `e2e/team.spec.ts` derives next match and result/upcoming counts from the snapshot like `e2e/data.ts`.
- `e2e/home.spec.ts` "client navigation and back" is flaky on mobile (1 of 8 runs), unrelated to the home (never visits it).
- `npm audit --omit=dev`: new moderate Next.js advisories (`next <=15.5.28`), not caused by this change; upgrade separately.
