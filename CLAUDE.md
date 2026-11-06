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
  - **v3 (ADR-005, owner decisions 2026-10-31 + amendment 2026-11-06):** v3 shows player names of all teams as nuLiga publishes them, in adult **and youth** competitions alike (same allowed fields). Allowlist: ADR-004 "2026/27" section. (Root `src/`/v2 rule "U18 player-level disabled" is historical.)
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
`openspec/` is set up (`specs/`, `changes/`, `decisions/` for ADRs, `docs/` for FSD/SDD/risk/handoff docs). v3 changes `add-matchcenter-v3` and `improve-v3-usability` are archived (2026-11-01); their capabilities live in `openspec/specs/`. ADR-005 (adult player names + amendments for player search and Spielverlauf) and the ADR-004 2026/27 section govern v3 data. 6 older changes (`bootstrap-pilot-spec`, `expand-oehb-competitions-and-reports`, `sales-demo-readiness`, `finalize-nuliga-sales-prototype`, `sales-preview-polish`, `unify-edelweiss-traun-club-context`) are fully implemented and committed but not yet archived — Chris approved archiving these (2026-06-11), see `continuations/sales-outreach-next-steps-2026-06-11.md`.

## Current status / what's left
- **v3 (2026-11-01, archived change `2026-11-01-add-matchcenter-v3`):** mobile-first sports-site matchcenter in `v3/` (port 3030) with real nuLiga 26/27 data for HLA Challenge West + OÖ Landesliga: Tabelle, Spielplan, Spielbericht, Ranglisten, Statistik, team pages, search (teams + players), print/PDF. Data update: `cd v3 && npm run import -- all`, review snapshot diff, commit. Design record: `DESIGN.md`, contract `.impeccable/surfaces/v3-app-liga.md`.
- **v3 usability pass (2026-11-01, archived `improve-v3-usability`):** home "Meine Teams", Bewerbe by association, Spielplan page with round picker, venue pages (address/route/resin), .ics export, Spielverlauf (ADR-005 amendment), search suggestions. Out of scope by design: officials' tools/result entry.
- **streamline-v3 (2026-11-06, open change `streamline-v3`, branch `streamline-v3`, not committed yet):** roast/pre-mortem fixes + Codex reviews: score-alignment bug fixed, date-based next match/current Runde ("Ergebnis ausständig"), ★ favorites for teams + Bewerbe (red = favorites only, no showcase team), favorites home / "Finde dein Team", Verband › Bewerb line (switch removed), 3 tabs (Ranglisten → Statistik top 10 + "Alle Ranglisten"), search finds Bewerbe + Verein aliases, Spielbericht Kurzfazit, Spielvorschau `/[bewerb]/vorschau/[nr]`, PDF link only on Tabelle/Spielplan, youth like adult (ADR-005 amendment). Later ideas (season archive, International/ÖMS/ÖHB entry) in the change's design.md.
- Sales prototype is feature-complete and deployed to a Vercel preview (`/pitch`, `/demo` routes). See `openspec/docs/sales-demo-handoff.md` for live URLs and outreach template (contains real contact info — keep local, don't post publicly).
- Git: `main` has v2 + v3 first batch (PR #1). Branch `improve-v3-usability` is pushed but **not merged** — merge only on Chris's go. Branch `streamline-v3` (local, from `improve-v3-usability`) holds the streamline work + refreshed 05.11.2026 snapshots, uncommitted.
- Outreach: wave 1 email to ÖHB sent (2026-06-11), no documented answer. Wave 2 draft to nu Datenautomaten (CC ÖHB) in `continuations/email-nu-datenautomaten-2026-11-05.md` — **not sent**; Chris deploys v3 himself and sends. No outreach action without Chris.
- Public-launch checklist remains intentionally open (placeholders, legal/privacy review, public domain) — do not treat as a coding TODO without Chris explicitly asking.

## Out of scope (do not add without explicit request)
Automated/broad scraping, login-protected access, login/admin/result-entry, live score ingestion, English UI/dark mode, native app, push notifications, analytics, backend/database, productive nuLiga integration.

## Cold-restart entry point
See `continuations/v3-handoff-2026-11-05.md` for the current v3 state and next options. Older context: `continuations/sales-outreach-next-steps-2026-06-11.md` (archiving of the 6 older changes is still ready-to-execute).
