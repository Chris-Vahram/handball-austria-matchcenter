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

- Player lists, private contacts, phone numbers, email addresses, referee data,
  and personal details.

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
- nuPortalRS documentation describes a REST interface. Austria-specific access,
  contract terms, and authorization remain open.
