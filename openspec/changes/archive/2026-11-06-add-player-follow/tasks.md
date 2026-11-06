## 1. Follow plumbing

- [x] 1.1 Add `"player"` to `favoriteKinds` in `v2/src/lib/favorites.ts`; update `favorites.test.ts` expected shapes to include `player: []`.

## 2. UI

- [x] 2.1 `components/player-follow-button.tsx` (client): ★ toggle for `favorites.player[slug]`, dispatches `notifyFollowChange()`.
- [x] 2.2 Profile hero (`app/spieler/[playerSlug]/page.tsx`) renders the follow button.
- [x] 2.3 Home `components/home.tsx`: "Deine Spieler" section (followed players → team, next game, season goals, profile link); live-updates via `mc:team`.

## 3. Coverage & verification

- [x] 3.1 e2e: follow a player on the profile → home shows "Deine Spieler" with them; unfollow removes it.
- [ ] 3.2 Refresh screenshot. (Not redone at archive 2026-11-06; v2 superseded by v3.)
- [x] 3.3 Run v2 `npm test`, `lint`, `typecheck`, `build`, `test:e2e`; all green.
- [x] 3.4 Commit/push when the owner asks.
