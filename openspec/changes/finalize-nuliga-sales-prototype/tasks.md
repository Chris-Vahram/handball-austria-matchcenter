## 1. Data and Query Helpers

- [ ] 1.1 Add derived helpers for team next match, latest result, table row, form curve, and report availability.
- [ ] 1.2 Add unit tests for team insight helpers, including missing standings and no finished matches.
- [ ] 1.3 Keep all helpers based on validated in-repo demo data; do not add new scraping or network behavior.

## 2. First-Run Team Onboarding

- [ ] 2.1 Add a German first-run team-selection prompt to the landing page for users without favorites.
- [ ] 2.2 Reuse existing browser-local favorite storage and store only public team IDs.
- [ ] 2.3 Add unavailable-storage fallback behavior without blocking public browsing.
- [ ] 2.4 Add Playwright coverage for first-run onboarding and personalized landing behavior.

## 3. Team Insights Dashboard

- [ ] 3.1 Upgrade team pages with next match, latest result, table position, and form curve sections.
- [ ] 3.2 Add relevant internal match-report links where reports exist.
- [ ] 3.3 Add German empty states for missing next match, standings, form, or reports.
- [ ] 3.4 Add mobile-first visual polish without adding heavy client-side dependencies.
- [ ] 3.5 Add Playwright coverage for a team page with populated insights.

## 4. nuLiga Pitch Demo

- [ ] 4.1 Add a dedicated pitch/demo route with problem, solution, target users, pilot status, and data boundaries.
- [ ] 4.2 Link to the strongest implemented flows: start page, favorite/team context, competition/table, and demo match report.
- [ ] 4.3 Include neutral feedback/contact action using the reviewed destination.
- [ ] 4.4 Update sales handoff and prelaunch checklist to reference the pitch route.
- [ ] 4.5 Add Playwright coverage for pitch route content and links.

## 5. Verification

- [ ] 5.1 Run `npm test`.
- [ ] 5.2 Run `npm run lint`.
- [ ] 5.3 Run `npm run typecheck`.
- [ ] 5.4 Run `npm run build`.
- [ ] 5.5 Run `npm run test:e2e`.
- [ ] 5.6 Run `npm audit --omit=dev`.
- [ ] 5.7 Commit the implementation when checks are clean.
