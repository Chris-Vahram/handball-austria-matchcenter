# Tasks: streamline-v3

## 0. Stable tests for the refreshed snapshot

- [x] 0.1 Make snapshot-dependent e2e assertions stable (`v3/e2e/liga.spec.ts` default Runde + approval footnote, `report.spec.ts` 93135 approval, `team.spec.ts` played count): derive expectations from the snapshot or assert structure; cover "noch nicht genehmigt" with a unit fixture. Verify: `npm run build && npm run test:e2e` green on the 05.11.2026 snapshot; then hand Chris the snapshot diff for a separate data commit.

## 1. Score alignment fix

- [x] 1.1 Restructure `MatchRow` (`v3/components/schedule.tsx`) so each team line holds name + score; drop the column-1 score override in `globals.css`. Verify: new Playwright check at 390 px and 1440 px asserts each score's `top` equals its team name's `top` on Liga, Spielplan and team page.
- [x] 1.2 Add `todayVienna(now)` and make `currentRound`, `nextMatch` and `allTeamCards` date-based (upcoming = unplayed and date ≥ today; overdue = unplayed and date < today, shown as "Ergebnis ausständig"). Verify: Vitest with injected `now` — postponed match does not hold back the Runde, yesterday's unplayed match is not "next", season end → last Runde; existing team test (Nr. 25) still passes.

## 2. Favorites (teams + Bewerbe) and highlighting

- [x] 2.1 Generalize `useMyTeams` into a keyed favorites hook; add `matchcenter:my-competitions`. Verify: Vitest for read/write/toggle incl. broken JSON and unavailable storage.
- [x] 2.2 ★ follow control on the team page (replaces "Als Mein Team merken"; next match before the calendar action) and on Bewerb pages. Verify: e2e follow/unfollow, `aria-pressed` and accessible name.
- [x] 2.3 Replace the showcase highlight with favorite highlighting: `data-team` on table, match, ranking and comparison rows + one client highlighter in the layout that re-applies on route/query change; remove `showcaseTeam` usage from rendering (print never highlights). Verify: e2e — no favorites → no `.fav`; Traun followed → Traun row tinted after client navigation Tabelle → Statistik → Spielplan, round picker change and browser back, without reload.

## 3. Home = favorites overview

- [x] 3.1 Remove the team picker; render the entry without favorites: search "Team, Verein oder Bewerb", Verband → Bewerb list, one-line ★ hint. Verify: e2e first visit shows no checkbox and a search field in the first viewport at 390 px.
- [x] 3.2 Favorites view: team cards (next match linking to preview, last result, rank) first, then per favorite Bewerb a compact table (top 3 + favorite teams' rows) and the current round. Verify: Vitest for compact-table selection; e2e with Traun + HLA followed.

## 4. Navigation and tabs

- [x] 4.1 Replace the two-segment switch with the "Verband › Bewerb" line linking to `/bewerbe#<verband>` (anchor, all Verbände always listed). Verify: e2e HLA → "ÖHB" → Landesliga OÖ in the OÖHV section.
- [x] 4.2 Reduce tabs to Tabelle / Spielplan / Statistik; `/torschuetzen` becomes the "Alle Ranglisten" sub-page with breadcrumb. Verify: e2e exactly three tabs, one active; old URL still 200.
- [x] 4.3 Statistik order: Torschützen top 10 + "Alle Ranglisten", team comparison, group totals. Verify: e2e first section heading; 390 px no horizontal scroll.

## 5. Search: Bewerbe, Verein aliases, activation

- [x] 5.1 Add competitions (name, short name, Verband) to `src/lib/search.ts`, listed before teams in results and suggestions. Verify: Vitest "landes" → Landesliga OÖ first; e2e suggestion opens Tabelle.
- [x] 5.2 Verein aliases from ranking rows (club → team), normalization folds hyphens. Verify: Vitest `search("SK-Handball Traun")` → SK Konstant Traun / Edelweiss.
- [x] 5.3 Suggestions navigate on `click` (mousedown only keeps focus). Verify: e2e dispatches a bare `click` on a suggestion and lands on the target; keyboard path still passes.

## 6. Spielbericht summary

- [x] 6.1 Summary block above the lineups: top 3 scorers, 7m, 2-min per team. Verify: Vitest summary from match 23 fixture (STRAUCH 12, SINZ 9); e2e block above the first lineup.


- [x] 6.2 Youth like adult (ADR-005 amendment 2026-11-06): remove the `category === "adult"` gates in `import.ts`, `torschuetzen/page.tsx` static params and the team player table. Verify: no code path reads `category` any more (only config data), so youth takes the adult path; typecheck green. (No separate youth fixture test: there is no branch left to test.)

## 7. Spielvorschau

- [x] 7.1 `v3/src/lib/preview.ts` `matchPreview(data, number)`: standings rows, form, earlier meetings this season, top 3 scorers (adult only). Verify: Vitest incl. no earlier meeting.
- [x] 7.2 Route `/[competition]/vorschau/[nummer]` with redirect to the report when one exists; link unplayed rows (Liga, Spielplan, team, home) to it. Verify: e2e for match 25 at 390 px (venue in first viewport, no horizontal scroll) and redirect for a reported match; unknown number → 404.

## 8. Noise reduction

- [x] 8.1 Remove duplicate legend sentences (one legend line per page max, keep "noch nicht genehmigt"); PDF action only on Tabelle and Spielplan as a secondary link. Verify: e2e no PDF action on report/team/home; impeccable detector 0.

## 9. Verification and docs

- [x] 9.1 Full gate: `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm audit --omit=dev` in `v3/` — all green, results reported.
- [x] 9.2 Render and inspect screenshots (390 px + 1440 px: home without/with favorites, Liga, Statistik, Spielbericht, Vorschau); run the impeccable finish review and fix material findings.
- [x] 9.3 Update `DESIGN.md`, `.impeccable/surfaces/v3-app-liga.md` (first viewport, switch, red = favorites), CLAUDE.md status and the v3 handoff. Verify: docs mention three tabs, favorites and preview.

## Workflow follow-up

- Validate with `openspec validate streamline-v3`, archive via `openspec-archive-change` after Chris approves.
- Commit the refreshed snapshots (import 2026-11-05) separately after Chris reviews the diff.
