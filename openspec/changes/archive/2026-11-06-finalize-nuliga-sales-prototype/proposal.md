## Why

The prototype is close to being sendable, but the first-contact experience still
needs a clearer product story for non-technical users and nuLiga reviewers.
The FSD package review also showed that the main FSD must explicitly describe
the sales-prototype scope, user groups, data boundaries, and success criteria.

## What Changes

- Add first-visit team onboarding so players, parents, trainers, and officials
  can immediately select the team context they care about.
- Upgrade team pages into concise team dashboards with next match, latest
  result, table position, form curve, and match-report links where data exists.
- Add a dedicated nuLiga pitch/demo page that explains the problem, solution,
  target users, privacy/data boundaries, and recommended demo flow.
- Keep data strategy unchanged: reviewed demo fixtures only, strict public
  sports-data allowlist, no broad scraping, no login, no contacts, no referee
  data, no source person IDs, and no player portrait links.
- Keep U18 player-level publication disabled unless separately documented and
  approved.

## Capabilities

### New Capabilities

- `first-run-team-onboarding`: Browser-local first-run team selection and
  favorite setup without an account.
- `team-insights-dashboard`: Team page summary for next match, last result,
  table position, form curve, and relevant report links.
- `nuliga-pitch-demo`: Dedicated sales-preview route and content for nuLiga or
  nu GmbH recipients.

### Modified Capabilities

- None.

## Impact

- Frontend routes and components: landing page, team pages, and a new pitch/demo
  route.
- Data/query layer: derived team summaries and form-curve helpers based on
  already validated demo data.
- Tests: unit coverage for derived team insights and Playwright coverage for
  onboarding, team dashboard, and pitch route.
- Documentation: sales handoff and prelaunch checklist may need small updates
  after implementation.
