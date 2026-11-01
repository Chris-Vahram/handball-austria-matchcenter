## Why

The Team-OS follow loop lets users follow clubs; the new player profiles can be
reached but not kept. Owner wants to **follow individual players** so the home
surfaces them (next game + last line + link). It completes the follow story and
makes the player profiles sticky, reusing the existing favorites plumbing.

## What Changes

- Add a `player` favorite kind in `v2/src/lib/favorites.ts` (kind-generic
  read/toggle already handle it; the player **slug** — name+shirt — is the stored
  public id, never the source reference).
- Add a follow ★ control on the player profile
  (`v2/components/player-follow-button.tsx`, used in `app/spieler/[playerSlug]`).
- Add a **"Deine Spieler"** section on the home (`v2/components/home.tsx`): for each
  followed player, a card with the player's team, next game, and season goals,
  linking to the profile; updates live via the existing follow event.

## Non-Goals

- No data/fixture change, no scraping, no new player fields, no U18 publication.
- Only the public name+shirt slug is stored locally; no source-person reference.

## Capabilities

### Modified Capabilities

- `team-os-matchcenter`: extends following to individual players (public slug only)
  and surfaces followed players on the home, alongside followed clubs, reusing the
  existing local-favorites model and publication gate.

## Impact

- `./v2/` only: `src/lib/favorites.ts` (+ its unit test shape), new
  `components/player-follow-button.tsx`, edits to `app/spieler/[playerSlug]/page.tsx`
  and `components/home.tsx`. e2e adds a follow→home→unfollow case. Fixtures, schemas,
  and privacy posture unchanged. Root untouched.
