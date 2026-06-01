# Software Design Document

## 1. Architecture Overview

Build a Next.js web application with a typed domain layer and replaceable data
adapter. MVP reads validated curated fixtures. Later official integration shall
replace adapter implementation without changing UI contracts.

```text
UI routes and features
        |
query and filtering services
        |
domain schemas and normalized models
        |
data-source adapter interface
        |
curated fixtures | future approved API/export
```

## 2. Proposed Stack

- Next.js with App Router for routing, rendering, and deployability.
- React and TypeScript for typed UI implementation.
- Tailwind CSS for fast, consistent design-token use.
- Zod for runtime validation at data boundaries.
- Vitest for core unit tests.
- Playwright for mobile and desktop end-to-end checks.
- Optional shadcn/ui components only where they save implementation effort.

## 3. Frontend Structure

```text
src/
  app/
  components/
  features/
    competition-browser/
    schedule/
    standings/
    search/
  entities/
    association/
    competition/
    club/
    team/
    venue/
    match/
    standings/
  shared/
    config/
    data/
    lib/
    ui/
```

The structure follows feature-oriented separation while keeping domain entities
reusable across routes.

## 4. Routing Structure

```text
/
/bewerbe
/bewerbe/[competitionSlug]
/bewerbe/[competitionSlug]/spielplan
/bewerbe/[competitionSlug]/tabelle
/teams/[teamSlug]
/vereine/[clubSlug]
/suche
```

## 5. Domain Model

- `Association`: governing association identity.
- `Competition`: competition identity and association relation.
- `Season`: season label and active period.
- `Club`: public club identity.
- `Team`: public team identity and club relation.
- `Venue`: public hall identity and optional approved location fields.
- `Match`: fixture identity, teams, schedule, venue, status, and optional result.
- `Standing`: table identity and update metadata.
- `RankingRow`: rank and source-supported table values.
- `DataSourceMetadata`: source label, reference URL, update timestamp, and import
  mode.

No player, referee, or private contact entities belong to MVP model.

## 6. Data Flow

1. Adapter reads curated fixture file.
2. Zod validates complete payload.
3. Adapter normalizes records.
4. Query helpers filter and sort typed records.
5. Routes consume typed view data.
6. UI displays source update metadata where relevant.

Future approved integration shall implement same adapter contract.

## 7. State Management

- Prefer URL query parameters for schedule filters.
- Prefer server-rendered or statically generated read views.
- Use local React state for transient UI state.
- Add global state library only if actual shared mutable state requires it.

## 8. UI System

- Light theme first.
- Palette: dark blue base, white surfaces, red accent, accessible neutral scale.
- Mobile-first responsive layout.
- Primary components: `AppShell`, `Header`, `MobileBottomNav`,
  `CompetitionSelector`, `MatchCard`, `MatchStatusBadge`, `StandingsTable`,
  `ScheduleFilter`, `SearchCommand`, `EmptyState`, `ErrorState`,
  `LoadingSkeleton`, and `VenueInfo`.
- Dark mode is deferred.
- Use original neutral assets until brand-asset permissions are clarified.

## 9. Validation and Error Handling

- Validate every fixture payload with Zod before use.
- Treat missing optional fields explicitly.
- Reject invalid IDs, broken references, unsupported status values, and standings
  rows without required fields.
- Display clear German loading, empty, and error states.

## 10. Testing

- Unit-test schema validation, sorting, filtering, and status formatting.
- Add component tests where interaction logic warrants them.
- Use Playwright for landing page, schedule filtering, standings, search, team
  navigation, club navigation, and mobile layout smoke tests.
- Run `npm test`, lint, and TypeScript checks before implementation completion.

## 11. Security and Privacy

- Keep MVP read-only.
- Do not store excluded personal detail data.
- Do not ship secrets or `.env` values.
- Validate future API inputs and responses.
- Review CORS, rate limiting, and headers if a custom backend becomes necessary.

## 12. Deployment

Local first. Later deployment target can be selected after pilot review. Use
environment-specific configuration only when productive integration starts.

## 13. Future Integration

- Preferred: approved OEHB/OOHV API or export.
- Possible: authorized nuPortalRS integration if available for Austrian tenant.
- Avoid scraping unless explicitly reviewed and approved.
- Add calendar export as a separate OpenSpec change.
