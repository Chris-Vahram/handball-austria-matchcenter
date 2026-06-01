## Why

The polished matchcenter pilot answers core public sports questions, but it is
still a generic browsing demo. A sales-ready pilot needs repeat-use value for
players, trainers, parents, club officials, and fans plus a deployable public
demo that can be presented as a modern frontend for an approved nuLiga data
integration.

## What Changes

- Add browser-local favorites for teams, clubs, and competitions without
  authentication or personal-data storage.
- Add a personalized start experience focused on favorite contexts and the next
  relevant match.
- Add calendar export, share actions, and approved hall-navigation links for
  fixture workflows.
- Add installable PWA metadata and lightweight offline-ready app-shell support
  where it does not risk stale sports-data presentation.
- Add public demo essentials: legal-information routes, privacy route, metadata,
  sitemap, robots configuration, social preview metadata, and deployment
  documentation.
- Add a written migration concept for replacing controlled pilot ingestion with
  an approved `nuPortalRS` integration.
- Keep the strict sports-data allowlist, player-level publication gates, and
  prohibition on login-protected access unchanged.

## Capabilities

### New Capabilities

- `matchcenter-personalization`: Browser-local favorites and a personalized,
  privacy-preserving matchcenter start experience.
- `fixture-convenience-actions`: Calendar export, sharing, and approved
  hall-navigation actions for public fixtures.
- `sales-demo-delivery`: Installable PWA shell, legal-information routes, SEO
  metadata, deployable demo configuration, feedback path, and approved-API
  migration documentation.

### Modified Capabilities

None.

## Impact

- Extends public Next.js routes, UI components, metadata configuration, and E2E
  coverage.
- Adds small client-side favorite storage without accounts, cookies, or remote
  personal-data persistence.
- Adds server-generated calendar output and URL-safe sharing behavior.
- Adds deployment documentation for a static or cached sales demo. Productive
  data synchronization still requires approved official API/export access or
  written permission.
