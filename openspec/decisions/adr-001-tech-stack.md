# ADR-001: Frontend Technology Stack

## Status

Proposed

## Decision

Use Next.js, React, TypeScript, Tailwind CSS, Zod, Vitest, and Playwright.

## Rationale

Next.js supports route-based public pages, good deployment options, and
server-rendered or static read views. TypeScript and Zod protect domain
boundaries. Tailwind enables consistent mobile-first UI work. Vitest and
Playwright cover core logic and user flows.

## Alternatives Considered

- Angular: valid for large enterprise teams, but heavier than required for this
  focused public pilot.
- Plain React SPA: workable, but gives up useful routing and rendering defaults.
