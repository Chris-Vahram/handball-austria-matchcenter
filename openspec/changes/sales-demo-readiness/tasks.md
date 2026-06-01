## 1. Favorite Foundations

- [x] 1.1 Add typed browser-local favorite storage for public competition, team, and club IDs with storage-unavailable fallback.
- [x] 1.2 Add reusable favorite toggle client component with accessible pressed state and German labels.
- [x] 1.3 Add favorite actions to competition, team, and club pages without sending remote profile requests.
- [x] 1.4 Add unit tests proving favorite storage contains only public IDs and fails gracefully when storage is unavailable.

## 2. Personalized Start Experience

- [x] 2.1 Add a progressively enhanced landing-page module for favorite contexts and the next matching validated fixture.
- [x] 2.2 Keep the generic first-visit landing page and add a clear favorite-discovery path for users without saved favorites.
- [x] 2.3 Add mobile-first empty states for favorites with direct navigation to competitions and search.
- [x] 2.4 Add Playwright coverage for saving a favorite, reopening the landing page, and seeing the next relevant fixture.

## 3. Fixture Convenience Actions

- [x] 3.1 Add deterministic `.ics` generation for a public match including source and generation metadata.
- [x] 3.2 Add deterministic `.ics` generation for a selected team's validated public schedule.
- [x] 3.3 Add calendar-download routes and accessible actions on match-report and team pages.
- [x] 3.4 Add a small share client component using Web Share API with canonical-URL copy fallback.
- [x] 3.5 Add Google Maps search links derived only from allowed hall names and omit navigation when hall name is missing.
- [x] 3.6 Add unit and Playwright coverage for calendar exports, share fallback, approved navigation URLs, and missing-navigation states.

## 4. Installable Sales Demo Shell

- [x] 4.1 Add web app manifest, installability metadata, theme colors, and neutral original app icons.
- [x] 4.2 Decide whether a service worker is necessary for the demo; if added, cache shell assets only and document stale-data behavior.
- [x] 4.3 Add footer with independent-pilot label, legal links, source transparency, and configurable feedback action.
- [x] 4.4 Add German-language imprint and privacy routes with explicit reviewed placeholders for missing owner details.
- [x] 4.5 Add page metadata, social preview metadata, sitemap, and robots configuration for public demo routes.
- [x] 4.6 Add Playwright coverage for manifest, footer, legal routes, feedback path, sitemap, and robots output.

## 5. Deployment and Official Integration Boundary

- [x] 5.1 Add sales-demo deployment guide for managed Next.js hosting, preview deploys, custom domain, reviewed fixtures, rollback, and environment boundaries.
- [x] 5.2 Add pre-launch checklist blocking public launch until owner details, privacy text, domain, feedback destination, and venue-navigation fields are reviewed.
- [x] 5.3 Document productive adapter migration to approved `nuPortalRS`, approved export, or written permission without adding new scraping behavior.
- [x] 5.4 Verify ignored raw snapshots and local cache artifacts cannot enter deployment output or Git.

## 6. Accessibility, Performance, and Verification

- [x] 6.1 Review keyboard access, pressed states, labels, contrast, reduced-motion behavior, and 360px layouts for all new interactions.
- [x] 6.2 Verify new client components stay narrowly scoped and record production build bundle impact.
- [x] 6.3 Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, and `npm audit --omit=dev` and fix failures.
- [x] 6.4 Perform browser QA for first visit, saved favorite, fixture sharing fallback, calendar download, legal routes, and mobile navigation.
