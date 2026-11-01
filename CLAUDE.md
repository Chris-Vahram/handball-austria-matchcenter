# CLAUDE.md – nuLiga / Handball Austria Matchcenter

This merges the existing `AGENTS.md` (Codex-style rules) with the project's FSD/OpenSpec state so a Claude Code session has the same baseline. `AGENTS.md` stays — many tools read it.

## Project owner
Chris (HTL Leonding, 4CHITM). Repo: `handball-austria-matchcenter`.

## What this is
Independent, German-language, mobile-first public handball match-center pilot for Austria, currently positioned as a **targeted nuLiga/OEHB sales prototype** (not an official nuLiga product, not a production launch). Full FSD: `openspec/docs/fsd.md`.

## Tech stack
Next.js, React, TypeScript, Tailwind CSS, Zod, Vitest, Playwright (ADR-001). Commands: `npm run dev`, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm audit --omit=dev`, `npm run playwright:install`.

## Working method (from AGENTS.md)
- Before implementing: ask up to 8 targeted clarifying questions, then write spec, plan, and Definition of Done.
- Production-like code: clear structure, small functions, minimal dependencies.
- Core logic needs tests (Vitest unit + Playwright e2e). Before finishing: run `npm test`, lint, typecheck — report results.
- Handle errors and edge cases cleanly.

## Security & privacy (from AGENTS.md + privacy-legal-review)
- Never print secrets, `.env` contents, tokens, or keys.
- Validate all request bodies/params with Zod.
- (No auth/DB in this project currently — Argon2/bcrypt/JWT/Prisma rules in AGENTS.md are template boilerplate, not yet applicable.)
- **Project-specific privacy rules (binding, status: partially-approved as of 2026-06-05)**:
  - Adult player-level stats OK only from allowlisted public match reports, fields limited to: display name, shirt number, team, goals, 7m summary, card counts, 2-min penalties.
  - U18 player-level publication: **disabled**, do not enable without a new documented/approved privacy decision.
  - **v3 exception (ADR-005, owner decision 2026-10-31):** in adult competitions v3 shows player names of all teams as nuLiga publishes them; youth competitions stay off. Allowlist: ADR-004 "2026/27" section.
  - Never include contacts, phone numbers, emails, referee data, source-person IDs, or player portrait links.

## Data strategy (ADR-002, ADR-004 — do not change without explicit request)
- MVP = small manually curated demo fixtures in `src/data/`, validated via Zod, with source/update provenance.
- OEHB ingestion only via operator CLI (`src/importer/`), never during request handling. Allowlisted pages only (5 OEHB competition pages + nuLiga group pages for HLA CHALLENGE phases — see ADR-004 table). 24h cache, 1500ms min delay between requests, max 2 retries, no auth/login/crawling of unconfigured URLs.
- Raw/normalized import cache lives in `data/import-cache/`, gitignored.
- Productive integration preference order: official OEHB/OOHV API > official export/widget > authorized nuPortalRS REST > written permission for an alternative import.

## Full-access boundaries (from AGENTS.md)
- Stop and ask before any command outside the project folder.
- Before `rm`, `mv`, recursive operations, or glob patterns: explain what's affected and wait for approval.

## OpenSpec workflow
`openspec/` is set up (`specs/`, `changes/`, `decisions/` for ADRs, `docs/` for FSD/SDD/risk/handoff docs). 6 changes (`bootstrap-pilot-spec`, `expand-oehb-competitions-and-reports`, `sales-demo-readiness`, `finalize-nuliga-sales-prototype`, `sales-preview-polish`, `unify-edelweiss-traun-club-context`) are fully implemented and committed but not yet archived — Chris approved archiving these (2026-06-11), see `continuations/sales-outreach-next-steps-2026-06-11.md`.

## Current status / what's left
- **v3 (2026-11-01, archived change `2026-11-01-add-matchcenter-v3`):** mobile-first sports-site matchcenter in `v3/` (port 3030) with real nuLiga 26/27 data for HLA Challenge West + OÖ Landesliga: Tabelle, Spielplan, Spielbericht, Ranglisten, Statistik, team pages, search (teams + players), print/PDF. Data update: `cd v3 && npm run import -- all`, review snapshot diff, commit. Design record: `DESIGN.md`, contract `.impeccable/surfaces/v3-app-liga.md`.
- **v3 usability pass (2026-11-01, archived `improve-v3-usability`):** home "Meine Teams", Bewerbe by association, Spielplan page with round picker, venue pages (address/route/resin), .ics export, Spielverlauf (ADR-005 amendment), search suggestions. Out of scope by design: officials' tools/result entry.
- Sales prototype is feature-complete and deployed to a Vercel preview (`/pitch`, `/demo` routes). See `openspec/docs/sales-demo-handoff.md` for live URLs and outreach template (contains real contact info — keep local, don't post publicly).
- Outreach: email to ÖHB sent (2026-06-11), awaiting response — no further outreach action without Chris.
- Public-launch checklist remains intentionally open (placeholders, legal/privacy review, public domain) — do not treat as a coding TODO without Chris explicitly asking.

## Out of scope (do not add without explicit request)
Automated/broad scraping, login-protected access, U18 player-level publication, login/admin/result-entry, live score ingestion, English UI/dark mode, native app, push notifications, analytics, backend/database, productive nuLiga integration.

## Cold-restart entry point
See `continuations/sales-outreach-next-steps-2026-06-11.md` for current state and likely next steps (OpenSpec archiving of the 6 changes is ready-to-execute).
