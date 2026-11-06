## 1. Privacy and Source Contract

- [x] 1.1 Add reviewed ADR for controlled public ÖHB ingestion, request pacing, cache freshness, and rollback behavior.
- [x] 1.2 Define source URL allowlist for Männer Landesliga, mU18 Grunddurchgang, Elite Cup MU18 B-Bewerb, and HLA CHALLENGE.
- [x] 1.3 Define publication profiles with player-level display disabled by default and explicit U18 review gate.

## 2. Domain and Validation

- [x] 2.1 Extend strict Zod schemas for rounds, half-time results, report URLs, team statistics, player statistics, events, parser provenance, and publication profiles.
- [x] 2.2 Generalize queries and standings lookup to require competition context instead of using first dataset entry.
- [x] 2.3 Preserve official team labels per competition and add tests proving aliases are not automatically merged.
- [x] 2.4 Add schema tests that reject contacts, phone numbers, email addresses, referee data, and unrelated personal fields.
- [x] 2.5 Add publication-profile tests proving unapproved player and U18 data remains hidden.

## 3. Controlled ÖHB Importer

- [x] 3.1 Add importer interface and explicit CLI command separate from web-request rendering.
- [x] 3.2 Add paced public-page fetcher with configured delay, bounded retries, source URL allowlist, cache reuse, and retrieval timestamps.
- [x] 3.3 Add raw snapshot cache and normalized output storage with parser version and validation result.
- [x] 3.4 Add parser fixtures for selected ÖHB competition pages and match reports.
- [x] 3.5 Implement allowlisted competition, schedule, standings, match-report, statistics, and event parsing.
- [x] 3.6 Add importer tests for cache hits, pacing, failed validation, parser changes, and forbidden-field exclusion.

## 4. Multiple Competitions

- [x] 4.1 Add Männer Landesliga, OÖHV mU18 Grunddurchgang 25/26, Elite Cup MU18 B-Bewerb, and HLA CHALLENGE configuration.
- [x] 4.2 Replace hardcoded landing, team, schedule, and standings competition assumptions with selected competition context.
- [x] 4.3 Show full selected-competition schedule and retain URL-based date, club, team, and venue filters.
- [x] 4.4 Add competition-switching UI and responsive frontend treatment using the frontend-design workflow.
- [x] 4.5 Add unit and Playwright coverage for switching competitions and filtering complete schedules.

## 5. Match Reports and Statistics

- [x] 5.1 Add internal `/spiele/[matchId]` report route with result, half-time result, status, venue, competition context, and public ÖHB link.
- [x] 5.2 Add team-statistics UI for goals, seven-metre throws, two-minute penalties, yellow cards, and red cards with unavailable states.
- [x] 5.3 Add player-statistics and event-timeline UI behind publication profiles.
- [x] 5.4 Link report-enabled match cards to internal report pages.
- [x] 5.5 Add unit and Playwright coverage for report details, missing statistics, source links, and gated player-level output.

## 6. Review and Verification

- [x] 6.1 Document importer operation, cache behavior, source limitations, privacy boundary, and rollback procedure.
- [x] 6.2 Record privacy and legal review decision before enabling player-level publication, especially for U18 competitions.
- [x] 6.3 Review normalized and displayed fields against sports-data allowlist.
- [x] 6.4 Run npm test, npm run lint, npm run typecheck, npm run build, npm run test:e2e, and npm audit --omit=dev and fix failures.
