## Why

The pilot currently demonstrates one competition with a small curated sample.
Users need broader competition coverage, full schedules, and useful match detail
without manually copying every public sports record.

## What Changes

- Keep OÖHV Männer Landesliga and add OÖHV mU18 Grunddurchgang 25/26, Elite Cup
  MU18 B-Bewerb, and HLA CHALLENGE.
- Show complete schedules per competition with optional club, team, venue, and
  date filters.
- Add internal match-report pages with result, source link, team statistics,
  player statistics, and public sports events where available.
- Add a controlled ÖHB public-page importer with caching, slow request pacing,
  provenance, retrieval timestamps, validation, and a strict sports-data
  allowlist.
- Preserve official team naming per competition. Do not merge aliases
  automatically.
- Exclude unnecessary contact details, phone numbers, email addresses, private
  data, login-protected data, and referee data.
- Gate player-level publication, especially for U18 competitions, behind an
  explicit privacy and legal review before release.

## Capabilities

### New Capabilities

- `oehb-public-import`: Controlled ingestion of allowlisted sports data from
  public ÖHB pages with caching, pacing, provenance, and validation.
- `match-reports-and-statistics`: Internal match-report pages with allowlisted
  team, player, and event statistics where public source data exists.

### Modified Capabilities

- `matchcenter-pilot`: Expand navigation, competition selection, full schedules,
  filters, and domain boundaries for multiple competitions.

## Impact

- Extends domain schemas, adapters, fixture storage, query helpers, and public
  routes.
- Adds importer tooling and cached source snapshots without accessing protected
  ÖHB areas.
- Requires privacy and legal review for player-level publication, with special
  care for minors.
- Productive operation depends on respectful request limits and source-page
  compatibility monitoring.
