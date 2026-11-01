## Why

The Team-OS rework (`rework-team-os-v2`) made the right bet — follow your teams —
but the entry was wrong: onboarding listed **every** team (doesn't scale to
national handball), and the home **gated all content behind setup**, so the app
opened as a chore, not a product. Comparing against the live nuLiga site
(oehb-handball.liga.nu — region-first Verband→Bewerb, login/admin-centric, dense
tables, and it exposes referee/contact/per-player data we forbid) clarified the
target: modern and content-first, the same familiar Verband structure, and private.

## What Changes

- **Content-first home.** The home always shows an "Aktuelle Spiele" feed across all
  Bewerbe with an **inline follow star per team** — follow by doing, no wall. A
  pinned "Finde dein Team" search. No follows → a slim welcome + a few smart
  suggestions (clubs with upcoming games), not an exhaustive list.
- **Follow on the club** (`favorites.club`) so a followed club shows its upcoming
  games **across all Bewerbe** plus its teams' table positions ("Deine Vereine").
  Active club drives the adaptive accent.
- **Hierarchical Explore.** `/entdecken` now browses **Verband → Bewerb**
  (grouped by `association` + `category`), the familiar nuLiga model, modernized.
- Team/club/search pages updated: team-page follows the club, graceful no-upcoming
  fallback, inline follow stars in search results.

## Non-Goals

- No data/fixture/privacy change; no scraping; no new player fields; U18 gate stays.
  The team-accent color remains UI-only. No backend/login/admin.

## Capabilities

### Modified Capabilities

- `team-os-matchcenter`: discovery and onboarding refined — content-first home with
  inline follow, club-level cross-Bewerb following, and Verband-hierarchical
  Explore — without an exhaustive team list or gated home.

## Impact

- `./v2/` only: new `components/home.tsx`, `follow-star.tsx`, `club-summary.tsx`,
  `verband-browse.tsx`; reworked `app/page.tsx`, `app/entdecken`, `components/ui.tsx`
  (MatchRow inline follow), `team-theme.tsx` (active club), `favorite-toggle.tsx`,
  team/search pages. Removed `team-dashboard`, `follow-onboarding`, `team-switcher`.
- Tests: e2e updated for the content-first home, club follow, and Verband Explore.
  Domain/lib unit suite unchanged. Root project untouched.
