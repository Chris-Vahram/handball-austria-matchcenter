# Sales Demo Quality Review

Reviewed: 2026-06-09

## Accessibility

- Favorite toggles use semantic buttons, visible focus styles, German labels,
  and `aria-pressed`.
- Calendar, share, Maps, feedback, legal, and navigation actions use semantic
  links or buttons.
- Share fallback exposes a selectable canonical URL.
- Legal placeholders remain visible and are not presented as finalized text.
- Existing reduced-motion CSS disables non-essential animation and transition
  duration for users who request reduced motion.
- New layouts remain mobile-first and are verified at 360px during browser QA.
- Pitch page headline was visually checked on mobile and adjusted to avoid
  clipping at narrow widths.

## Performance

- Server rendering remains default.
- New client boundaries are limited to favorite toggles, personalized landing
  enhancement, existing navigation, and share fallback.
- No animation library, PWA service worker, map embed, analytics script, or
  remote profile request was added.
- Production build shared JavaScript remains about `102 kB`.
- Route-specific output remains small: pitch page about `179 B`, landing about
  `2.19 kB`, favorite pages about `900 B`, match report about `497 B`.

## Deployment Boundary

- Public app build reads committed reviewed demo fixtures only.
- Operator importer cache remains outside app runtime and outside Git.
- Recursive build-trace review found no `data/import-cache` reference under
  `.next/server`.
- Current Vercel preview is fixture-backed and READY:
  `https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app`.

## Sales Readiness

- Pitch page exists at `/pitch`.
- Guided demo exists at `/demo`.
- Pitch document exists in `docs/sales-pitch.md`.
- Email template exists in `docs/nuliga-email-template.md`.
- Recommended screenshots exist under ignored `output/playwright/`.
- First outreach should use at most three screenshots: pitch mobile, home
  mobile, and report mobile.
