# Design: streamline-v3

## Context

See proposal.md (Why). v3 is a statically rendered Next.js 15 app (`revalidate = 3600`) over two committed snapshots; there is no backend and no user state beyond `localStorage` key `matchcenter:my-teams` (team keys `competitionId|team`, `v3/src/lib/dashboard.ts:22`). The showcase team is read from `COMPETITIONS[id].showcaseTeam` on the server and baked into the HTML. Score misalignment comes from `v3/app/globals.css:449-450`: `time` spans two grid rows and scores are forced into column 1, so auto-placement pushes the home score to row 2 and the away score to row 3.

## Goals / Non-Goals

**Goals:**
- First viewport answers "what is this and where is my stuff" without a form.
- Every structure (navigation, home, search) works unchanged with 2 or 200 competitions.
- Keep static rendering; favorites stay device-only.

**Non-Goals:**
- No new competitions, no importer or snapshot schema change, no ADR-004 change.
- No accounts, sync or push for favorites.
- No visual-language change (tokens, fonts, red usage stay per DESIGN.md).

## Decisions

1. **Favorites in localStorage, two keys.** Keep `matchcenter:my-teams` (existing visitors keep their teams), add `matchcenter:my-competitions` (competition ids). Generalize `useMyTeams` into one small hook taking the key. *Alternative:* one combined key with typed entries — needs a migration for no gain.

2. **Favorite highlighting client-side via data attributes.** Server renders rows with `data-team="<teamKey>"`; one client component in the layout reads favorites and toggles a `fav` class on matching elements. It re-runs on the `my-teams` event **and on every route change** (effect keyed on `usePathname()` + `useSearchParams()`), because the layout survives client navigation and new rows would otherwise stay unmarked (Codex adversarial review). Keeps pages static and avoids hydration mismatch. *Alternative:* render rows client-side — loses static HTML and costs bundle size. Print view never highlights.

3. **Home is client-composed from server-prepared data.** The server passes compact cards for all teams (as today, `allTeamCards()`) plus per-competition compact standings and current round; the client shows only favorites. Without favorites the server-rendered entry (search + Verband browse from `competitionsByAssociation()`) is shown. Payload grows with competitions; acceptable at prototype scale (see Risks).

4. **Score fix in markup, not only CSS.** Render each team line as one grid row containing name and score (`.line > .t + .s`), time in its own column spanning both lines. Removes reliance on auto-placement. A Playwright check compares the bounding-box `top` of each score with its team name.

5. **Preview route by match number:** `/[competition]/vorschau/[nummer]`. Matches without a report have no `reportId`, but every match has a Spielnummer. If the match has a report, `redirect()` to `/[competition]/spiel/[reportId]`. Pure data helper `matchPreview(data, number)` in `v3/src/lib/preview.ts` returns standings rows, form (reuse `src/lib/form.ts`), earlier meetings and top scorers; unit-tested.

6. **Three tabs; rankings become a sub-page.** Keep the `/[competition]/torschuetzen` URL as the "Alle Ranglisten" page (sub-page header, no active tab) so links don't break; Statistik gets the top-10 block at the top.

7. **Verband › Bewerb line replaces the switch.** The Verband links to `/bewerbe#<verband-slug>` — an anchor, not a filter, so the overview always lists every Verband and switching across Verbände stays possible (an exclusive filter broke ÖHB → Landesliga OÖ, Codex adversarial review). The line is static, so it scales without layout changes.

8. **"Today" is the reference date, not the import Stand.** One helper `todayVienna(now = Date.now())` (ISO date in Europe/Vienna) feeds `currentRound`, `nextMatch`, team cards and the "Ergebnis ausständig" check; all take `now` as a parameter so tests are deterministic. Upcoming = unplayed and `date >= today`; overdue = unplayed and `date < today`. Pages already revalidate hourly, so "today" stays current. *Alternative:* import Stand as reference — wrong when the snapshot ages (a stale import would call yesterday's game "upcoming").

9. **Verein aliases from imported statistics.** `src/lib/search.ts` builds an alias map from ranking rows (`row.club` → resolved `row.team`) already in the snapshot; normalization also folds hyphens. No new data, no hand-maintained list.

10. **E2E against stable facts.** Tests that assert live data (default Runde, approval footnote, played-match counts) read expected values from the snapshot via a small helper or assert structure instead of numbers; the "noch nicht genehmigt" state is covered by a unit test with a fixture match. Update them before committing the 05.11.2026 snapshot.

11. **Legends → `abbr` + one legend.** Column headers already use `abbr`; drop duplicate per-table sentences, keep at most one legend line per page and the required "noch nicht genehmigt" footnote.

12. **Drop the category gate.** Importer (`import.ts` youth branch), `/torschuetzen` static params and the team player table stop checking `category === "adult"`; the `category` field stays in the config as data. Simplest way to make youth behave like adult, and less code.

## Risks / Trade-offs

- [Highlight flashes in after hydration] → Short, no layout shift (only color/background); acceptable for device-only state.
- [Home payload scales with all teams of all competitions] → Fine for 2–10 competitions; at national scale move to per-competition JSON fetched for favorites only (`ponytail:` note in code).
- [Losing the always-on Traun red weakens the pitch demo] → Owner chose "Nur Favoriten"; the outreach link can tell the reader to tap ★ on their club.
- [Existing e2e tests assume the picker, the switch and four tabs] → Update them in the same task group as each change.

- [Suggestions navigated only on mousedown] → Navigate on `click`, keep `mousedown.preventDefault()` only to hold focus.

## Migration Plan

Static deploy; no data migration. Existing `matchcenter:my-teams` entries keep working. Rollback = revert the branch.

## Not done

- Youth Spielverlauf hardening (Codex adversarial review suggested stripping player names from youth timelines): rejected by the owner, 2026-11-06: "das mit dem jugend spielverlauf ist egal … die jugend spieler werden ja auch nuliga verwenden, die wollen das, das passt so für die". Superseded the same day: the owner relaxed youth handling completely (ADR-005 amendment 2026-11-06), see decision 12.

## Later (not in this change)

Ideas from a colleague's discarded `betterNuAPI` stub (2026-11-06): a **season archive** (pick an earlier season) and browsing by nuLiga's top-level areas **International / ÖMS / ÖHB**. Both need an ADR-004 allowlist decision first; the Verband › Bewerb structure of this change is the place they would plug in.
