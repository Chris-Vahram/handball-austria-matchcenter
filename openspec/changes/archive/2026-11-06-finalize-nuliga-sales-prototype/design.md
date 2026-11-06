## Context

The current application already has a polished mobile-first matchcenter shell,
local favorites, controlled demo data, HLA CHALLENGE phase data, and an
approved adult demo match report with player-level sport statistics. It is not
yet optimized as a first-contact sales prototype because new users still need
to understand where to start and reviewers need a concise explanation of the
product value.

The FSD package from the school project emphasizes that an outside person must
understand the problem, target users, scope, non-goals, data rules, and success
criteria. The updated FSD now reflects that the project is a targeted nuLiga
sales prototype rather than only a base MVP.

## Goals / Non-Goals

**Goals:**

- Make first-time use obvious by guiding users to select a team.
- Make team pages strong enough to answer the main matchday questions.
- Add a pitch/demo route that can be sent or shown during a call.
- Reuse existing validated demo data and local favorite storage.
- Keep bundle size and runtime complexity low.

**Non-Goals:**

- No login, server-side user profile, backend, database, or analytics.
- No productive nuLiga integration or full match-report import.
- No native app, push notifications, or real live ticker.
- No U18 player-level publication in this change.
- No new scraping or data-source expansion.

## Decisions

### Decision 1: Browser-local onboarding only

Use the existing favorite storage model and add first-run guidance around it.
The onboarding shall store only public team IDs in local storage.

Alternative considered: account-based onboarding. Rejected because the sales
prototype should remain cookie-minimal, fast, and legally simpler.

### Decision 2: Derive team insights from existing validated data

Team dashboard fields shall be derived from `data.matches`, `data.standings`,
and `data.matchReports` instead of introducing new data files. The summary can
show unavailable states when data is missing.

Alternative considered: manually curated team summaries. Rejected because it
duplicates source-derived facts and raises consistency risk.

### Decision 3: Build a route-level pitch page

Use a dedicated route such as `/demo` or `/nuliga-demo` with static content and
links into real prototype flows. This is better than hiding sales messaging in
ordinary user pages.

Alternative considered: only update README/handoff docs. Rejected because a
reviewer receiving a preview URL needs in-product orientation.

### Decision 4: Treat future ideas as preview concepts, not implemented claims

The pitch page may mention later concepts such as live ticker, push reminders,
official adapter, or fuller reports only as future options. It must not imply
they are already functional.

## Risks / Trade-offs

- [Onboarding feels intrusive] -> Keep it dismissible and preserve generic
  browsing.
- [Team page has sparse demo data] -> Show honest unavailable states and
  highlight what is demo-backed.
- [Sales page overpromises] -> Use explicit pilot wording and visible data
  boundaries.
- [Local storage unavailable] -> Existing public browsing must continue and
  onboarding must not show false saved state.
- [FSD and OpenSpec drift again] -> Keep this change scoped and update handoff
  docs after implementation.

## Migration Plan

1. Add derived query helpers and tests.
2. Add onboarding UI using existing local favorites.
3. Upgrade team page layout.
4. Add pitch/demo route and link it from appropriate navigation or footer.
5. Update handoff/checklist docs.
6. Run test, lint, typecheck, build, E2E, and audit.
7. Keep current production preview path unchanged until a later deploy step.

Rollback: remove the new route/components and revert to the existing favorite
and team-page behavior. No data migration is required because storage remains
browser-local and optional.

## Open Questions

- Should the pitch route be named `/demo`, `/nuliga-demo`, or both with one
  redirect/link?
- Should the first-run onboarding appear as a landing page panel, modal-style
  card, or compact sticky prompt?
- Should the targeted preview be unlisted only or password-protected before
  sending?
