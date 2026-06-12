# Design — Team-OS rework (v2)

## Context

A real structural rework of `./v2/`: follow-first IA + adaptive team-color light
visuals. Domain logic reused; layout, navigation, and page set reinvented.
German-first, mobile-first, privacy gates intact.

## Information architecture

- Nav: `Meine Teams` (`/`) · `Entdecken` (`/entdecken`) · `Suche` (`/suche`).
- `/` (`TeamDashboard`, client): reads followed teams from `favorites.ts` + an
  active-team pointer; no follows → `FollowOnboarding`; else `TeamSwitcher` +
  widget board for the active team + cross-team next strip + manage-teams section.
- `/teams/[teamSlug]`: the team's own widget board (Next/Table/Form/Last/Quick) +
  reports + full schedule, tinted to the team.
- `/spiele/[matchId]`: tile layout (scoreboard tile, score-flow SVG, comparison
  bars, timeline, gated player table), tinted to the home team.
- `/entdecken`: competitions grid + search/dashboard shortcuts; competition →
  `/bewerbe/[slug]` → tabelle / spielplan / HLA phases (kept routes).

## Adaptive team-color system

- `v2/src/lib/team-color.ts` — cosmetic per-club accent: curated palette + a couple
  explicit identities (Edelweiss=emerald, HC Linz=blue) + deterministic hash
  fallback. Exposes `teamColorByClub` and `teamVars` (CSS-var object). Not personal
  data.
- `components/team-theme.tsx` — `TeamThemeProvider` sets `--team/--team-soft/
  --team-on` on `:root` from the active followed team (localStorage pointer +
  `mc:team` event); `setActiveTeam` switches instantly. Server pages tint locally
  via `style={teamVars(clubId)}`.
- Tokens: `tailwind.config.ts` (canvas/surface/ink/muted/line, win/loss/draw,
  `team` color from vars, soft shadows, big radii) + `globals.css` (`.tile`,
  `.team-bg/.team-text/.team-soft-bg/.team-ring`, `.btn-team/.btn-soft`, `.chip`,
  `.avatar`, skeleton). Light theme.
- Typography: Plus Jakarta Sans (display) + Inter (body) via `next/font`; tabular
  numerals for scores/standings.

## Components

`tiles.tsx` (NextMatch/Form/Table/LastResult/QuickLinks), `team-dashboard.tsx`,
`team-switcher.tsx`, `follow-onboarding.tsx`, `competitions-grid.tsx`, `nav.tsx`
(sliding team-colored pill via Framer `layoutId`), `ui.tsx` (TeamAvatar, MatchRow,
states), `motion.tsx` (mount-based Reveal/Stagger/CountUp — animate on mount, not
`whileInView`, so content is never stuck hidden; reduced-motion safe).

Reuse: `favorites.ts` (followed teams), `query.ts#teamInsights` (next/last/form/
standings/reports = the widget data), `standingsForCompetition`, `search`,
`filterMatches`, calendar/venue libs. Removed broadcast-only components.

## Accessibility

Light palette tuned for contrast; team accent for emphasis (not body text). Visible
focus rings (team-colored), ≥44px targets, `aria-current`, semantic landmarks.
Motion animates on mount and is disabled under `prefers-reduced-motion`.

## Verification

`cd v2 && npm run dev` (3001): no follows → onboarding; follow teams → dashboard
tints + switches per team; widgets correct; Entdecken → competition → table/
schedule; team & match pages tinted; privacy gate hides non-public player stats.
Suite: `npm test` (31), `lint`, `typecheck`, `build`, `test:e2e` (42 + 2 skipped) —
all green.

## Decision record

Stands in for an ADR. `redesign-broadcast-stadium-v2` is superseded. Dark→light and
broadcast→Team-OS are intentional; the FSD "light only" line is honored again.
