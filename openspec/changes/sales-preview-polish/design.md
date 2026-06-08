## Context

The prototype already has a pitch page, local favorites, team dashboards, a demo
match report, legal placeholders, and deployment documentation. The remaining
gap is sales-preview clarity: a reviewer should not need prior context to know
what to click, what data is intentionally excluded, or why the product is easier
than dense legacy views.

The landing page currently personalizes after a favorite is saved. The next
phase keeps that personalization, but avoids hiding the favorite-selection
context after the first save.

## Goals / Non-Goals

**Goals:**

- Keep first-run team selection visible after a favorite is saved.
- Make the pitch/demo flow harder to miss and easier to follow.
- Improve German guidance for players, parents, trainers, and officials.
- Keep the preview static, fast, mobile-first, and privacy-preserving.
- Add tests for the sendable sales-preview path.

**Non-Goals:**

- No new scraping, crawler, or login-protected OEHB/nuLiga access.
- No new source data model, database, accounts, analytics, or feedback storage.
- No publication of U18 player-level data.
- No legal text invention beyond explicit placeholders.

## Decisions

1. Keep personalization local and visible.
   - Decision: reuse existing `localStorage` favorite IDs and render a compact
     editable favorite area above the personalized next-match card.
   - Alternative: hide onboarding after save. Rejected because users lose the
     visible team context and cannot easily understand or change the favorite.

2. Treat next phase as preview polish, not data expansion.
   - Decision: add only guided-flow, copy, QA, and small UI improvements.
   - Alternative: import more competitions now. Rejected because the sales
     prototype first needs a clean sendable narrative and review flow.

3. Keep route-level pages static and mostly server-rendered.
   - Decision: only the favorite area remains a client component.
   - Alternative: client-side wizard or full app shell. Rejected to keep bundle
     size and complexity low.

4. Document preview readiness in OpenSpec/docs.
   - Decision: keep the owner-facing checklist in Markdown so it can be reviewed
     before deployment.
   - Alternative: build an admin checklist UI. Rejected because there is no auth
     or admin scope in this prototype.

## Risks / Trade-offs

- [Reviewer expects live official data] -> Clearly label demo data and approved
  data-source boundary on `/demo` and handoff docs.
- [Favorite storage unavailable] -> Keep public browsing usable and show no
  false saved state.
- [Landing page becomes too busy] -> Keep favorite management compact and show
  the next match as the main visual element.
- [Sales recipient misses the best flow] -> Provide a short guided path from
  `/demo` to home, team, table, and demo match report.
