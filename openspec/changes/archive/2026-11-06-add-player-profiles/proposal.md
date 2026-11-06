## Why

The scoring layer surfaces players in lists and the match report, but there's no
place to see one player on their own. Owner wants "single player scores." A
per-player profile is the natural next layer: tap a name in the Torschützenliste,
report, or team card → that player's page (goals, 7m quota, 2-min, matches, per-game
lines). Like the rest of the player layer, it reads only through the existing
publication gate, so it is adult- and approval-only and fills out automatically as
more reports arrive.

## What Changes

- Extend `v2/src/data/player-stats.ts` with `playerSlug(label, shirt)`,
  `releasedPlayers()`, and `getPlayerProfile(slug)` — all over
  `visiblePlayerStatistics`.
- Add a **player profile route** `v2/app/spieler/[playerSlug]/page.tsx`: hero
  (name, shirt, team, competition), stat tiles (Tore, 7m + quota, 2-Min, Spiele), and
  a per-match list linking back to each report. `notFound()` when the player has no
  released data.
- **Link player names** to their profile from the Torschützenliste
  (`components/scorer-table.tsx`), the match report (`app/spiele/[matchId]`), and the
  team Top-Torschützen card (`app/teams/[teamSlug]`).
- Add `/spieler/[slug]` to the sitemap for released players.

## Non-Goals

- No data/fixture change, no scraping, no new player fields, no U18 publication.
- The URL slug is derived from display name + shirt; the internal
  `sourcePlayerReference` is never rendered or routed (no source-person IDs).

## Capabilities

### Modified Capabilities

- `team-os-matchcenter`: adds per-player profile pages aggregated from approved adult
  match reports, reachable from scoring lists and reports, gated by the existing
  publication profile and expanding automatically as approved data grows.

## Impact

- `./v2/` only: `src/data/player-stats.ts` (3 new functions), new
  `app/spieler/[playerSlug]/page.tsx`, link edits in `scorer-table.tsx`, the report
  and team pages, and `sitemap.ts`. e2e adds a profile + 404 + link-through case.
  Shared `query.ts`, fixtures, schemas, and privacy posture unchanged. Root untouched.
