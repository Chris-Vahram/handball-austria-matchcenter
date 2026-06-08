## Why

The prototype is now close to a sendable nuLiga preview, but the final preview
needs a tighter guided flow, clearer mobile reassurance, and less risk of
reviewers missing the strongest implemented features. This change prepares the
next polish phase without changing the data strategy or adding scraping.

## What Changes

- Keep the personalized landing experience visible after a user saves a team
  favorite, so users can still see and change their team context.
- Add final preview polish around the strongest demo paths: pitch page,
  personalized start, team dashboard, competition/table, venue route links, and
  demo match report.
- Add a small German preview-readiness checklist inside the product/docs so the
  owner knows what to verify before sharing a link.
- Improve empty/help states where a non-technical player, parent, trainer, or
  official could otherwise get stuck.
- Keep the strict data boundary: reviewed demo data only, no login-protected
  pages, no scraping, no contacts, no phone numbers, no emails, no referee
  data, no source person IDs, and no U18 player-level publication.

## Capabilities

### New Capabilities

- `sales-preview-guided-flow`: Guided, sendable preview path for targeted
  nuLiga recipients and non-technical handball users.

### Modified Capabilities

- `first-run-team-onboarding`: Saved team selection remains visible and editable
  after the user adds a favorite.

## Impact

- Frontend: landing personalization, pitch/demo route, German empty/help copy,
  and possible small UI polish to cards/navigation.
- Tests: Playwright coverage for the persistent favorite area and guided preview
  flow.
- Documentation: sales handoff and prelaunch checklist updates.
- Data/import: no new sources, no scraping, no changed privacy posture.
