## Context

The current Next.js pilot reads one strict curated dataset and exposes routes for
schedule, standings, teams, clubs, and search. The next iteration expands public
ÖHB coverage and introduces public-page ingestion. This is an explicitly
reviewed change to the original no-scraping boundary.

Public ÖHB pages can mix useful sports records with unnecessary personal and
contact data. U18 competitions add privacy sensitivity. Import and publication
must therefore be separate decisions.

## Goals / Non-Goals

**Goals:**

- Add four competition contexts without hardcoded route behavior.
- Store full public competition schedules and optional standings.
- Add match detail pages with source links and available sports statistics.
- Import public ÖHB pages slowly, predictably, and reproducibly.
- Validate an explicit allowlist before normalized data reaches the UI.
- Keep official team labels separate unless a later reviewed mapping says
  otherwise.

**Non-Goals:**

- Login-protected access, bypassing controls, or aggressive crawling.
- Contact, phone, email, referee, or unrelated personal-data ingestion.
- Automatic team-alias merging.
- Live score polling.
- Publishing player-level U18 data before explicit privacy and legal review.

## Decisions

### Separate importer from web requests

Implement an explicit CLI or scheduled import job. The Next.js app reads
validated cached normalized data only. This avoids request-time pressure on ÖHB
pages and keeps failures isolated.

Alternative: scrape during page rendering. Rejected because it is slow,
fragile, and can create uncontrolled source traffic.

### Cache raw snapshots and normalized output

Store retrieval timestamp, source URL, parser version, and cached snapshot
reference for each imported dataset. Reuse fresh cache entries and pace network
requests with a conservative delay and bounded retries.

Alternative: retain normalized output only. Rejected because parser failures
would be harder to diagnose and reproduce.

### Strict allowlist at extraction and schema boundaries

Parse only sport-relevant fields: competition, round, schedule, venue, teams,
result, half-time result, status, report URL, standings, team statistics,
player statistics, and events where available. Explicitly reject contact,
phone, email, referee, and unrelated personal fields.

### Publication profiles

Keep imported records separate from displayed records. Team-level sports data
can be displayed after schema validation. Player-level records, particularly
for U18, require an explicit reviewed publication profile before UI exposure.
This allows ingestion architecture to be built without assuming that a public
source automatically establishes the legal basis for republication.

### Competition-aware normalized models

Replace single-competition assumptions with competition IDs throughout queries
and routes. Add match-report entities and optional statistics. Preserve source
labels exactly; do not merge team aliases automatically.

### Frontend direction

Use the installed `frontend-design` skill during implementation. Keep current
dark-blue, white, and red identity, but improve competition switching,
information hierarchy, mobile report readability, and progressive disclosure
for detailed statistics.

## Risks / Trade-offs

- [ÖHB markup changes] → Keep parsers isolated, fixture-test cached snapshots,
  and fail closed on schema mismatch.
- [Importer overloads public pages] → Add pacing, cache reuse, bounded retries,
  and explicit source URL allowlist.
- [Public pages contain unnecessary personal data] → Extract through allowlist,
  reject forbidden fields, and add fixture tests.
- [Minor player data publication is inappropriate] → Default player-level
  publication off until explicit privacy and legal review is recorded.
- [Competition formats differ] → Make standings and statistics optional,
  source-supported fields.
- [Official names look duplicated] → Preserve exact source identity now; add a
  reviewed alias-display layer later if needed.

## Migration Plan

1. Generalize existing in-memory models and routes for multiple competitions.
2. Add importer interfaces, cache handling, parser fixtures, and normalized
   output validation.
3. Add competitions and full schedules.
4. Add match-report pages with team-level data and source links.
5. Add player-level models and publication profile, leaving U18 display gated
   until privacy and legal review is recorded.
6. Roll back to last validated cached normalized dataset if import fails.

## Open Questions

- Which deployment environment will run scheduled imports?
- What cache freshness interval and request delay will be approved?
- Who records the privacy and legal review outcome for player-level U18
  publication?
- Are event timelines consistently available across all selected competitions?
