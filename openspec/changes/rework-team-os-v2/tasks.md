## 1. Visual foundation

- [x] 1.1 Light OS tokens in `tailwind.config.ts`; `globals.css` tiles + team-accent utilities; Plus Jakarta Sans + Inter in `layout.tsx`.
- [x] 1.2 `src/lib/team-color.ts` (cosmetic per-club accent) + `components/team-theme.tsx` (`TeamThemeProvider`, active-team pointer).

## 2. Tile system & follow flow

- [x] 2.1 `tiles.tsx` (NextMatch/Form/Table/LastResult/QuickLinks), `ui.tsx` (TeamAvatar, MatchRow, states).
- [x] 2.2 `team-switcher.tsx`, `follow-onboarding.tsx`.

## 3. Home dashboard

- [x] 3.1 `team-dashboard.tsx`: empty→onboarding, switcher, widget board, cross-team next strip, manage section; `app/page.tsx` renders it.

## 4. Navigation & Explore

- [x] 4.1 `nav.tsx` → Meine Teams / Entdecken / Suche.
- [x] 4.2 `/entdecken` hub + `competitions-grid.tsx`; `/bewerbe*` kept under Explore.

## 5–8. Pages

- [x] 5. Team page reworked to tiles (tinted); club page restyle.
- [x] 6. Match page reworked to tiles (scoreboard/score-flow/comparison/timeline/gated player), tinted.
- [x] 7. tabelle / spielplan / HLA phases / suche restyled light.
- [x] 8. Pitch & demo reframed for Team-OS; legal/manifest/icon/error restyled.

## 9. Coverage & verification

- [x] 9.1 Rewrite Playwright e2e for the new IA (follow flow, dashboard, Explore, match, privacy gate).
- [x] 9.2 Refresh screenshots under `v2/output/playwright/`.
- [x] 9.3 Run v2 `npm test`, `lint`, `typecheck`, `build`, `test:e2e`; all green.
- [x] 9.4 Confirm privacy gate intact; remove unused broadcast components.
- [ ] 9.5 Commit the rework + this change when the owner asks.
