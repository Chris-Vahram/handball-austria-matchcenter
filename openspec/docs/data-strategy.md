# Data Strategy

## Objective

Use real public sports data responsibly while keeping pilot replaceable,
traceable, and independent from an unapproved extraction mechanism.

## MVP Data Mode

- Use a small manually curated OOHV Maenner Landesliga sample.
- Record source page reference and manual update timestamp.
- Include only allowed sports data.
- Validate fixture payload with Zod before display.
- Mark data as pilot sample, not live data.

## Allowed Data Fields

- Association, competition, season, club, team, match, date, time, venue,
  result, standings, and match status.

## Excluded Data Fields

- U18 player-level statistics unless separately approved.
- Player lists, private contacts, phone numbers, email addresses, referee data,
  source person IDs, player portrait links, and unrelated personal details.

## Conditionally Allowed Fields

- Approved adult player-level public match-report sports statistics may be used
  only for reviewed adult report demo records and only within the documented
  publication profile.
- Allowed adult player fields are limited to display name, shirt number, team
  context, goals, seven-metre summary, card counts, and two-minute penalty
  count.
- Public match-flow events may show clock, action type, team context, and score;
  they must not expose player identity in the timeline.

## Productive Integration Preference

1. Official OEHB or OOHV API.
2. Official export or widget.
3. Authorized nuPortalRS REST access.
4. Written permission for a defined alternative import process.

Automated scraping is not part of MVP and requires separate review.

## Provenance Requirements

Every dataset shall include source label, source URL or identifier, update
timestamp, and import mode such as `manual-demo`, `official-export`, or
`official-api`.

## Research Notes

- Public OEHB competition pages expose schedules, tables, venues, results, and
  match status information.
- Public OOHV competition information is represented within OEHB competition
  pages.
- Public nuLiga group pages expose reviewed HLA CHALLENGE 2025/26 tables and
  schedules. The demo commits normalized sports records only, never raw pages
  or adjacent contact and personal fields.
- nuPortalRS documentation describes a REST interface. Austria-specific access,
  contract terms, and authorization remain open.

## Current Sales Preview

- The public Vercel preview reads committed reviewed demo fixtures only.
- `data/import-cache/` remains ignored and is not a runtime dependency.
- The preview is not live data and must not be presented as official nuLiga,
  OEHB, OOHV, or HLA output.
