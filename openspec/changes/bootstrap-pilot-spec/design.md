## Context

The repository starts empty. The goal is a real pilot, but first implementation
must focus on UI/UX using a small curated sample of publicly visible OOHV
Maenner Landesliga sports data. Productive synchronization is not yet approved.

## Goals / Non-Goals

**Goals:**

- Create a polished German mobile-first match center.
- Keep domain model ready for multiple competitions.
- Validate all curated data at the data boundary.
- Keep future official integration replaceable.

**Non-Goals:**

- Automated scraping.
- Personal detail records.
- Administration, authentication, or official result entry.
- Calendar integration in first MVP.

## Decisions

### Next.js Frontend

Use Next.js App Router with TypeScript. It supports public routes and flexible
rendering. Angular and a plain SPA were considered but add cost or lose useful
defaults for this pilot.

### Typed Data Adapter

Create a source adapter contract returning normalized domain data. Start with a
curated fixture adapter. Replace it later with an approved API or export adapter.

### Zod Validation

Validate datasets before use. Reject unsupported status values, missing required
IDs, and broken references.

### URL-Based Filters

Represent schedule filters in URL query parameters so filtered views remain
shareable and easy to test.

### Neutral Assets

Use original neutral assets until OEHB, OOHV, or HLA visual-asset permission is
clear.

## Risks / Trade-offs

- [Curated data becomes stale] -> Label pilot sample and show update metadata.
- [Source formats vary by competition] -> Normalize through adapter and allow
  source-supported optional table fields.
- [Productive integration permission remains open] -> Keep integration out of
  MVP until approved.
- [Mobile tables become hard to read] -> Define responsive table treatment and
  test narrow screens.

## Migration Plan

1. Build MVP with curated fixture adapter.
2. Review pilot UX with stakeholders.
3. Obtain approved source and permissions.
4. Implement official adapter behind same contract.
5. Validate output parity and switch configuration.

Rollback: return to curated adapter if productive source fails.

## Open Questions

- Which exact season and sample records seed the MVP?
- Which approved productive source will be available?
- Are publicly visible venue address fields permitted?
