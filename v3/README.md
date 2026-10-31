# Matchcenter v3

Independent prototype: nuLiga data for HLA Challenge West and the OÖ Landesliga (2026/27), rebuilt as a mobile-first sports site. Not affiliated with ÖHB or nuLiga.

```bash
npm install
npm run dev            # http://localhost:3030
npm test               # unit tests (parsers, privacy, rounds)
npm run build && npm run test:e2e   # e2e incl. 390 px no-horizontal-scroll check
```

## Updating data (operator only, ADR-004 / ADR-005)

```bash
npm run import -- all            # or: hla-challenge-west | landesliga-ooe
git diff src/data/snapshots/     # review, then commit
```

- Fetches only allowlisted nuLiga pages (`src/importer/config.ts`), 24 h cache in `data/import-cache/` (gitignored), ≥1.5 s between requests, max 2 retries.
- Pages never fetch at runtime; they render the committed snapshots.
- Referees, Zeitnehmer, officials, birthdates, pass numbers and person IDs are never parsed.
