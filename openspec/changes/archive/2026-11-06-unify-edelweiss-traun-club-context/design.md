## Context

The dataset currently keeps multiple team records for the same
Edelweiß/Traun playing group because public competition pages use
competition-specific team labels. That is correct for standings and schedules,
but confusing for users who think in clubs or Spielgemeinschaften.

The existing model already supports this through `clubId`. This change makes
that relationship first-class in search, favorites, and the club page without
changing source data, imports, or privacy boundaries.

## Goals / Non-Goals

**Goals:**

- Use `edelweiss-traun` as the canonical club context.
- Keep separate team IDs for competition-specific tables and match cards.
- Let a club favorite include all linked teams for personalized next-match
  lookup.
- Make search terms and aliases lead to the club context first.
- Make the club page show all linked teams and competitions clearly.

**Non-Goals:**

- No merge of source team IDs in standings, schedules, or match reports.
- No scraping, no new external data, and no login-protected access.
- No player-level or U18 personal data publication changes.
- No account or remote favorite storage.

## Decisions

1. Canonicalize in query/UI, not in raw data.
   - Decision: add query helpers around `clubId` and display aliases.
   - Alternative: collapse all teams into one ID. Rejected because standings
     and competition pages need their source-specific team IDs.

2. Store club favorites for first-run club contexts.
   - Decision: onboarding saves `kind: "club"` for deduplicated club entries.
   - Alternative: save the first visible team ID. Rejected because it only
     covers one competition instance and misses HLA/MU18 matches.

3. Prefer club search result for known aliases.
   - Decision: searchable public aliases map to the canonical club result while
     team results remain available.
   - Alternative: hide team results entirely. Rejected because advanced users
     may need direct competition-team pages.

## Risks / Trade-offs

- [Users expect one team page] -> Use the club page as the landing context and
  link to competition-specific team pages from there.
- [Wrong favorite scope] -> Club favorites include only teams with the same
  validated `clubId`.
- [Search becomes noisy] -> Rank exact club/alias matches before team entries.
- [Future imported data adds another alias] -> Alias helper can be extended
  without changing route contracts.
