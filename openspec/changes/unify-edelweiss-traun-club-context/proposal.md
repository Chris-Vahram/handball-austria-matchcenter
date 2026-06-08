## Why

Edelweiß Linz / SK Traun appears under several public nuLiga/OEHB team labels
because the same playing group competes in multiple competitions and phases.
Users should experience this as one club context, while tables and schedules
must remain competition-specific.

## What Changes

- Treat `edelweiss-traun` as the canonical club/Spielgemeinschaft context.
- Keep separate team records for Landesliga, MU18 Grunddurchgang, Elite Cup
  MU18, and HLA CHALLENGE phases where the source data uses separate teams.
- Make the first-run favorite selection store the club context for
  Edelweiß/Traun instead of a single team instance.
- Improve the Edelweiß/Traun club page so it shows all linked team instances,
  competitions, and matches together.
- Improve search so `Edelweiß`, `Traun`, `SK Traun`, and `Konstant Traun`
  lead users to the shared club context without hiding competition-specific
  team pages.
- Keep data strategy unchanged: reviewed demo data only, no scraping, no login,
  no contacts, no referee data, no source person IDs, and no U18 player-level
  publication.

## Capabilities

### New Capabilities

- `club-context-unification`: Canonical club/Spielgemeinschaft context across
  multiple public team records and competition phases.

### Modified Capabilities

- `matchcenter-personalization`: Favorites can use a club context so one saved
  club covers all linked team instances.

## Impact

- Data/query layer: club-context helpers and search ranking.
- Frontend: landing personalization, club page, search results.
- Tests: unit coverage for canonical club context and Playwright coverage for
  search/favorite behavior.
- No API, dependency, scraping, or privacy posture changes.
