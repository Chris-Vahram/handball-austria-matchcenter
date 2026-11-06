## 1. Data and Query Helpers

- [x] 1.1 Add derived helpers for team next match, latest result, table row, form curve, and report availability.
- [x] 1.2 Add unit tests for team insight helpers, including missing standings and no finished matches.
- [x] 1.3 Keep all helpers based on validated in-repo demo data; do not add new scraping or network behavior.

## 2. First-Run Team Onboarding

- [x] 2.1 Add a German first-run team-selection prompt to the landing page for users without favorites.
- [x] 2.2 Reuse existing browser-local favorite storage and store only public team IDs.
- [x] 2.3 Add unavailable-storage fallback behavior without blocking public browsing.
- [x] 2.4 Add Playwright coverage for first-run onboarding and personalized landing behavior.

## 3. Team Insights Dashboard

- [x] 3.1 Upgrade team pages with next match, latest result, table position, and form curve sections.
- [x] 3.2 Add relevant internal match-report links where reports exist.
- [x] 3.3 Add German empty states for missing next match, standings, form, or reports.
- [x] 3.4 Add mobile-first visual polish without adding heavy client-side dependencies.
- [x] 3.5 Add Playwright coverage for a team page with populated insights.

## 4. nuLiga Pitch Demo

- [x] 4.1 Add a dedicated pitch/demo route with problem, solution, target users, pilot status, and data boundaries.
- [x] 4.2 Link to the strongest implemented flows: start page, favorite/team context, competition/table, and demo match report.
- [x] 4.3 Include neutral feedback/contact action using the reviewed destination.
- [x] 4.4 Update sales handoff and prelaunch checklist to reference the pitch route.
- [x] 4.5 Add Playwright coverage for pitch route content and links.

## 5. Verification

- [x] 5.1 Run `npm test`.
- [x] 5.2 Run `npm run lint`.
- [x] 5.3 Run `npm run typecheck`.
- [x] 5.4 Run `npm run build`.
- [x] 5.5 Run `npm run test:e2e`.
- [x] 5.6 Run `npm audit --omit=dev`.
- [x] 5.7 Commit the implementation when checks are clean.
