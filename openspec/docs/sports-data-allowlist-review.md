# Sports Data Allowlist Review

Reviewed: 2026-06-11

## Normalized and Displayed Fields

- Association, season, competition, category
- Official team labels without automatic alias merging
- Venue name
- Schedule timestamp, round when available, status
- Final result and half-time result when available
- Public OEHB or nuLiga match-report URL
- Standings
- Team totals: goals, seven-metre throws, two-minute penalties, yellow cards,
  red cards
- Approved adult player-level public report fields: display name, shirt number,
  team context, goals, seven-metre summary, two-minute penalty count, card
  counts
- Allowlisted sports events without player identity: clock, action type, team
  context, and score only
- Source URL, retrieval timestamp, parser version, validation status, raw-cache
  reference
- Publication profile decision and category

## Excluded Fields

- Contacts, phone numbers, email addresses
- Referee data
- Private data and unrelated personal fields
- Player lists and player personal data
- Player portrait links and source person IDs
- Login-protected data

## Runtime Boundary

- The sales preview displays committed reviewed fixture data.
- Ignored raw snapshots and normalized importer cache files under
  `data/import-cache/` are not shipped as app runtime data.
- Public match-report URLs may be linked as provenance, but login-protected
  pages and broader scraping remain out of scope.
