# Implementation Plan

## 1. Project Summary

Build a mobile-first German handball match center pilot. Start with OOHV
Maenner Landesliga curated public sports data. Keep architecture ready for
additional competitions and an approved future data source.

## 2. Implementation Strategy

Start with typed domain schemas and a replaceable adapter. Build reusable UI
primitives next. Add user flows route by route. Finish with accessibility,
responsive checks, and automated tests.

## 3. Work Packages

### WP-01 Foundation

- Create Next.js TypeScript project.
- Configure Tailwind, linting, tests, and Playwright.
- Add design tokens and app shell.

### WP-02 Domain and Demo Data

- Define Zod schemas and inferred TypeScript types.
- Create curated OOHV Maenner Landesliga sample.
- Add adapter, provenance metadata, validation, filters, and sorting.

### WP-03 Main Views

- Build landing page, schedule, standings, team page, club page, and search.
- Add loading, empty, and error states.

### WP-04 Quality

- Add unit tests and E2E smoke flows.
- Verify accessibility basics, mobile layout, linting, and type safety.

### WP-05 Sales Package

- Add a dedicated `/pitch` route for the targeted nuLiga/OEHB preview.
- Add a guided `/demo` route and keep it linked from the footer.
- Add `docs/sales-pitch.md` and `docs/nuliga-email-template.md`.
- Generate local ignored screenshots for pitch, home, team, HLA, table, and
  match report views.
- Deploy a reviewed unlisted Vercel preview and keep public launch blocked until
  legal text, data permission, and owner details are finalized.

## 4. Dependencies

- Productive synchronization remains blocked until approved data path exists.
- Brand asset use remains blocked until permission exists.

## 5. Optional Enhancements

- Calendar export and Apple Calendar integration.
- More competitions including Elite Cup MU18 and HLA CHALLENGE.
- English UI and dark mode.
- One-page PDF pitch export.
- Custom domain after legal review.
