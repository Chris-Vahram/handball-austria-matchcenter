# Design: declutter-v3-first-glance

## Context

The home (`v3/app/page.tsx`) renders `FavoritesHome` (client, reads favorites from localStorage) with one `TeamCard` per team of every competition and one server-rendered `CompetitionBlock` per competition (hidden unless followed), then always the full `Directory`. Measured 2026-11-21 at 390 px: ~2,150 px with 2 teams + 2 Bewerbe; ~650 px of that is the two current-round lists, ~420 px the black next-match box, ~350 px the repeated directory. First visit: header search + "Finde dein Team" search stacked.

Design direction stays the contract in `.impeccable/surfaces/v3-app-liga.md`: conventional sports site (HBL, laola1, Flashscore), red = favorites only, full official team names, 390 px without horizontal scroll.

## Goals / Non-Goals

**Goals**
- Home with favorites fits "scan in one glance": one row per fact, no repeated content.
- One search field per screen.
- Layout that stays short when the visitor follows many Bewerbe (national scale).

**Non-Goals**
- No change to team page, Bewerb tabs, Spielbericht density (owner's friend judged the start page; separate roast if wanted).
- No data, importer or privacy change.
- No per-favorite fetching (belongs to `expand-v3-austria`; the row payload here is small enough for two competitions).

## Decisions

1. **Rows reuse the existing match-row pattern.** "Meine nächsten Spiele" rows use the same markup/CSS as the round lists (time column, two team lines, chevron) with the date added to the left column (`Sa 15.11.` / `18:00`). Reason: one row style across the app, full team names wrap instead of being abbreviated. Alternative (one-line "Traun – Innsbruck") rejected: violates the full-name rule.
2. **"Meine Bewerbe" = followed Bewerbe ∪ Bewerbe of favorite teams.** Without this, following only a team would lose its table position, which the old card showed. Row text: Bewerb name, then `<favorite team> · <rank>. · <pts> Pkt` per favorite team in it (several favorite teams → several lines), else `Erster: <leader> · <pts> Pkt`.
3. **Server prepares compact rows, client filters.** `allTeamCards()` is replaced by `homeData()` (server, `src/lib/dashboard.ts`) returning per team `{ key, team, competitionId, competition, next, last }` and per competition `{ id, name, standings }`. The client picks favorites with the pure `myLists()` in `src/lib/favorites.ts` (client-safe: no snapshot import). Rank/points come from standings, so a group without standings simply yields no rows (see expand-v3-austria decision 13). `CompetitionBlock` and its hidden-DOM trick are removed (the favorite highlighter still marks `[data-team]` on the new rows).
4. **Hide the header search with CSS, not state.** `body:has(.entry) .app-head .search { display: none }`. Favorites live in localStorage, so the server cannot decide; `:has` needs no JS and no flash. Without JS, `.entry` is not rendered (FavoritesHome waits for `ready`), so the header search stays — no page without a search. Supported in all current evergreen browsers; on older browsers both fields show (today's state).
5. **Verband rows on first visit** link to `/bewerbe#<verbandSlug>` (existing anchors). Row: Verband short + long name, count of Bewerbe. Scales to 13 nuLiga areas without listing hundreds of Bewerbe on the home.
6. **Delete orphans:** `components/competition-block.tsx`, `.cards`/`.card*`/`.comp-block` CSS (`.next-card` and `.mini` stay for team page and preview), `TeamCard` type if unused elsewhere (check team page / preview first).

## Risks / Trade-offs

- [Visitors used the route button on the home] → Row opens the Spielvorschau, which has address, route and resin (spec "Match details stay one tap away").
- [Fewer facts visible may look "empty" with one favorite] → Accept; the owner chose the list layout. Revisit after real use.
- [`:has()` unsupported in very old browsers] → Degrades to today's two fields, no breakage.

## Migration Plan

Pure UI change on a branch `declutter-v3-first-glance`. Stored favorites keep their keys (`matchcenter:my-teams`, `matchcenter:my-competitions`); nothing to migrate. Rollback = revert the branch.

## Open Questions

- None blocking. Optional later: date label "Heute"/"Morgen" in rows (round lists already do "Heute").
