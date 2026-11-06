# Proposal: streamline-v3

## Why

A design roast + pre-mortem of v3 (2026-11-05, screens in `.playwright-mcp/roast/`) found the first visit overwhelming and partly misleading: the home opens as a 13-checkbox form with no results, the round lists place each score on the wrong team line, the Ranglisten tab is a 6,200 px wall of ~130 players, and every page repeats legends and a large PDF button. The structure also assumes two leagues (two-segment switch, all-teams picker), while the owner's target is a complete public nuLiga-handball replacement for all of Austria (owner, 2026-11-06: "die app sollte später ein kompletter nuliga handball österreich ersatz sein, für alle bundesländer und alle bewerbe und ligen … ich würde schon gern eine übersicht haben, aber über das team und bewerb was man halt favoritisiert hat").

## What Changes

- **Fix:** match rows show each score on the same line as its team (today the home score sits next to the away team on Liga, Spielplan and home).
- **Favorites for teams and Bewerbe**, set with a ★ on the team page and the Bewerb page; stored only on the device. **BREAKING (UX):** the all-teams checkbox picker on the home is removed.
- **Home = personal overview** of favorites: per team a card (next match, last result, rank); per Bewerb a compact table (top rows + favorite teams) and the current round's results. Without favorites: a prominent search for team, club or Bewerb and the Verband → Bewerb browse; no team list.
- **Red marks favorites, not Traun:** the hard-coded showcase highlight is replaced by highlighting the visitor's favorite teams; without favorites nothing is red (owner, 2026-11-06: "Nur Favoriten"). **BREAKING (UX).**
- **Scalable Bewerb navigation:** the two-segment competition switch is replaced by a "Verband › Bewerb" line linking to the overview. **BREAKING (UX).**
- **Three tabs:** Tabelle / Spielplan / Statistik (owner, 2026-11-06: "Zusammenlegen, 3 Tabs"). Statistik shows the Torschützen top 10 and the team comparison; the full ranking lists stay reachable via "Alle Ranglisten".
- **Spielbericht summary:** a short block above the lineups (top scorers per team, team totals); full lineups stay unchanged (owner, 2026-11-06: "Alle zeigen + Kurzfazit oben").
- **New Spielvorschau** for scheduled matches (owner, 2026-11-06: "ich find die spiel ausbau seite ganz gut"): date, time, venue with route and resin rule, both teams' table position and form, earlier meetings this season, top scorers of both teams.
- **Youth like adult (ADR-005 amendment 2026-11-06):** player rankings, team player tables, lineups and Spielverlauf are shown for youth competitions exactly like adult ones (owner: "ja ich will das mit den jugend ding lockern, so wie normal bei den erwachsenen"). Not visible today (both competitions are adult), but the importer and pages stop gating on category.
- **Date-based "next" and current Runde:** the next match and the opening Runde come from the earliest match dated today or later; past matches without a result are marked "Ergebnis ausständig" and no longer block the overview (a postponed Landesliga match kept the overview on an old Runde).
- **Search by Verein:** official club names from the nuLiga statistics (e.g. "SK-Handball Traun") find their team; suggestions also open on click-only activation (assistive tech).
- **Stable tests:** e2e tests no longer hard-code live snapshot facts; the refreshed 05.11.2026 snapshot gets its expectations updated before it is committed.
- Review input: Codex review + Codex adversarial review (2026-11-06), all findings accepted except the youth Spielverlauf hardening (owner declined, see design.md).
- **Less noise:** repeated explanation sentences become `abbr` titles or one legend per page; the PDF action appears only on Tabelle and Spielplan, as a secondary link; search also finds Bewerbe.

## Capabilities

### New Capabilities
- `match-preview`: preview page for a scheduled match, built only from imported nuLiga data.

### Modified Capabilities
- `home-my-team`: favorites for teams and Bewerbe, follow via ★, home overview of favorites, entry without favorites; the picker is removed.
- `league-standings-schedule`: competition switch replaced by Verband › Bewerb navigation; date-based current Runde; three tabs; score on its team's line; "Ergebnis ausständig"; scheduled rows link to the preview; favorites highlighted instead of the showcase team.
- `player-statistics`: ranking lists move under the Statistik tab as a top 10 with a link to the full lists; the youth exclusion is removed.
- `league-statistics`: Statistik tab hosts the Torschützen top 10 above the team comparison.
- `match-report`: summary block above the lineups.
- `team-pages`: ★ follow replaces the "Als Mein Team merken" button; the next match comes before secondary actions and is chosen by date.
- `search`: Bewerbe and Verein aliases appear as results and suggestions; click-only activation works.
- `table-schedule-print`: the PDF action appears only on Tabelle and Spielplan.

## Impact

- Code: `v3/app/page.tsx`, `v3/app/[competition]/*` (Liga, Spielplan, Statistik, Torschützen, Spielbericht, Team), new `v3/app/[competition]/vorschau/[nummer]/page.tsx`, `v3/components/{shell,schedule}.tsx`, `v3/components/client/my-teams.tsx`, `v3/src/lib/{dashboard,search,overview}.ts`, `v3/app/globals.css`.
- Data/importer: the youth branch stops dropping player data; no new fields, no new sources, no ADR-004 change. A colleague's `betterNuAPI` stub (2026-11-06, deleted) had no endpoints; its ideas are kept for later (see design.md).
- Privacy: ADR-005 amended 2026-11-06 (youth like adult). Never-stored list unchanged.
- Tests: Vitest for favorites, preview data and round logic; Playwright for the home without favorites, the home with favorites, score alignment, three tabs and the preview at 390 px and desktop.
- Docs: `DESIGN.md`, `.impeccable/surfaces/v3-app-liga.md` (first viewport and switch change), CLAUDE.md status.
