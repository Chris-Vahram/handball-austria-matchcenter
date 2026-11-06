## 1. Club Context Helpers

- [x] 1.1 Add query helpers for canonical club context, linked team IDs, and alias matching.
- [x] 1.2 Add unit tests proving Edelweiß/Traun team records share one canonical club context.

## 2. Favorite And Search UX

- [x] 2.1 Change first-run onboarding to save deduplicated club favorites instead of one team instance.
- [x] 2.2 Keep the personalized next match lookup working across all teams linked to the saved club.
- [x] 2.3 Rank the canonical club result before duplicate team results for Edelweiß/Traun aliases.

## 3. Club Page Aggregation

- [x] 3.1 Improve the Edelweiß/Traun club page with linked team instances and competition labels.
- [x] 3.2 Show all linked matches from Landesliga, MU18, and HLA contexts without merging source team IDs.

## 4. Verification

- [x] 4.1 Add Playwright coverage for club favorite, search, and club aggregation behavior.
- [x] 4.2 Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`.
- [x] 4.3 Commit the completed change when checks are clean.
