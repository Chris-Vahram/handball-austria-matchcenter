## Why

Earlier passes restyled the same information architecture (home = stacked match
cards → `/bewerbe` → `/tabelle` → `/spiele`), so even the dark "broadcast" build
still felt like the old product reskinned. The owner asked for a genuine rework:
rethink the navigation model, the page set, what lives where, and the whole
layout — not the visuals alone. This change reworks the `./v2/` app into a
**Team-OS** product with an **adaptive team-color** visual language.

Supersedes the visual+structural direction of `redesign-broadcast-stadium-v2`
(kept as history). Domain facts (fixtures, scores, schemas) are reused; the
information architecture is new.

## What Changes

- **Follow-first information architecture.** Your followed teams ARE the app.
  Primary nav becomes `Meine Teams` · `Entdecken` · `Suche` (the competition tree
  is demoted to a secondary mode).
- **`/` is now a personal dashboard**, not a generic match list: empty state →
  full-screen follow onboarding; once following, a team switcher + a widget board
  (Next Match, Form, Tabelle, Last Result, Quick links) for the active team, plus a
  cross-team "Als Nächstes" strip.
- **New `/entdecken` Explore hub** holds the competitions grid → competition →
  tabelle / spielplan / HLA phases. The old `/bewerbe*` routes remain and live
  under Explore.
- **Team and match pages rebuilt as tile/widget layouts** tinted to the relevant
  team; club, search, pitch, demo, legal pages restyled to the new system.
- **Adaptive team-color visual language (light).** Off-white canvas, rounded
  widget tiles; the whole chrome tints to the active team's accent color via a
  cosmetic per-club palette (`v2/src/lib/team-color.ts`) and a `TeamThemeProvider`.
  New typography (Plus Jakarta Sans + Inter). Replaces broadcast-dark.
- **Reframed pitch/demo** around the Team-OS story ("folge deinen Teams"), keeping
  required sales claims and privacy lines.
- **e2e rewritten** for the new IA (follow flow, dashboard, Explore, match, privacy
  gate); screenshots refreshed.

## Non-Goals

- No changes to the root project or earlier v2 history beyond reworking `./v2/`.
- No data, fixture, or privacy-posture change; no scraping; no new player-data
  fields; U18 gate stays. The team-accent color is UI-only, not personal data.
- No backend/DB, analytics, login, or productive nuLiga integration.

## Capabilities

### New Capabilities

- `team-os-matchcenter`: a follow-first handball matchcenter — personal widget
  dashboard, adaptive team theming, and a secondary Explore mode — reusing the
  existing domain layer and preserving all data and privacy boundaries.

## Impact

- `./v2/` reworked: new `app/page.tsx` (dashboard), new `app/entdecken`, reworked
  team/match/competition/club/search/pitch/demo/legal pages; new components
  (`team-theme`, `team-dashboard`, `tiles`, `team-switcher`, `follow-onboarding`,
  `competitions-grid`, reworked `nav`/`ui`); new `src/lib/team-color.ts`. Removed
  the broadcast-only components (`scoreboard`, `results-ticker`, `nav-dock`,
  `personalized-start`).
- Dependencies: unchanged (framer-motion already present; fonts self-hosted).
- Tests: v2 unit suite unchanged (domain/lib); Playwright e2e rewritten for the new
  IA. Root project, data strategy, and privacy posture unchanged.
