# Tasks: expand-v3-austria

Prerequisite: `declutter-v3-first-glance` merged.

## 1. Decisions and docs first

- [ ] 1.1 ADR-004 amendment "National 26/27 allowlist + scheduled import" with owner quotes of 2026-11-21 ("Alles voll", "Viele Dateien im Git", "Automatisch (GitHub Action)"), robots.txt check, kill switch; ADR-002 note on scheduled ingestion
- [ ] 1.2 Update CLAUDE.md "Out of scope" (automated scraping now allowed only as ADR-004 describes) and `openspec/docs/oehb-importer-operations.md`
- [ ] 1.3 Resolve open questions (User-Agent, ÖMS 2026, curated names) with the owner

## 2. Discovery and allowlist

- [ ] 2.1 Config: 12 championships + federation codes; remove per-group `COMPETITIONS`
- [ ] 2.2 Parser `parseLeaguePage` (headings, groupPage + groupsGroupingPage links, order, skip empty headings) and `parseGroupingPage`; fixtures from OÖHV, WHV, ÖHB leaguePages + one grouping page
- [ ] 2.3 `isAllowedSourceUrl` driven by discovery result; tests: unconfigured championship, unknown group, login/club/person URLs, `regionMeetingFilter` rejected
- [ ] 2.4 Registry (append-only slugs, collision suffix, seeds `hla-challenge-west`/`landesliga-ooe`) + `names.json` overrides; unit tests for rename and collision

## 3. Incremental import and storage

- [ ] 3.1 New layout (`index.json`, `venues.json`, `snapshots/<slug>/group.json`, `reports/<meeting>.json`) + Zod schemas; tolerate missing standings/stats (`hasTable`, `hasStats`)
- [ ] 3.2 Incremental rules: approved reports/venues never refetched, stats only on schedule/standings change, byte-identical output for quiet groups; per-group error isolation with summary
- [ ] 3.3 Write `index.json` and `search.json` at the end of every run
- [ ] 3.4 One-time migration of the two existing snapshots; delete old files after migration
- [ ] 3.5 Suppression list `removals.json` (hashes only) applied to reports, rankings, timelines, search index; operations doc: removal steps incl. optional history rewrite
- [ ] 3.6 Unit tests: removed player not restored by re-import, quiet group no diff, approved report skipped, unapproved refetched, Minis group without table imports, youth report keeps allowed player fields only

## 4. App at scale

- [ ] 4.1 `src/data/index.ts`: fs-based loader with React `cache`; `outputFileTracingIncludes` for `src/data/**`
- [ ] 4.2 Replace full `generateStaticParams` with index-level + curated pages; `dynamicParams = true`, `revalidate = 3600`
- [ ] 4.3 `/bewerbe` Verband rows + `/bewerbe/[verband]` with headings; `/bewerbe#slug` ids kept; coverage/freshness line; update declutter Verband links
- [ ] 4.4 Tabs from `hasTable`/`hasStats`; `/<slug>` → Spielplan redirect without table; title from curated name or nuLiga name
- [ ] 4.5 Search: server-filtered `/suche/vorschlaege?q=` (max 8), results capped at 20 per kind with "Weitere anzeigen", Erwachsene before Jugend; remove `/suche/index.json`
- [ ] 4.6 Home: `/<slug>/home.json` per followed Bewerb/team; team rows from match participants when no standings; Bewerb row → Spielplan without rank/leader; e2e with a followed tournament team + Bewerb; remove ponytail "ships everything" note
- [ ] 4.7 Venue pages from `venues.json` + match index instead of scanning all competitions

## 5. Automation

- [ ] 5.1 `.github/workflows/import.yml`: nightly cron + manual dispatch, kill switch as job-level `if: vars.IMPORT_ENABLED == 'true'` (skipped job → no request, commit or issue), concurrency group, import → test → typecheck → commit `v3/src/data/**` only
- [ ] 5.2 Failure path: no commit, create/update one issue listing failed groups
- [ ] 5.3 Dry run via `workflow_dispatch` on the branch with `IMPORT_ENABLED=true` set only for that run (owner present)

## 6. Verify

- [ ] 6.1 First full local import (~3.5 h); add fixtures for every new HTML format met; record request count and duration
- [ ] 6.2 Measure repo growth, `next build` time, server function size against estimates in design.md
- [ ] 6.3 e2e: directory → Verband → Bewerb, tournament group opens Spielplan without Tabelle tab, search suggestions ≤ 8, results paging, 390 px no horizontal scroll on Verband pages
- [ ] 6.4 Gate: `npm test && npm run lint && npm run typecheck && npm run build`, `npm run start` + `npm run test:e2e`, `npm audit --omit=dev`
- [ ] 6.5 Screenshots (Verband page, tournament group, search) into `.impeccable/review/`, impeccable finish review
- [ ] 6.6 Codex review + adversarial review of the diff (high-stakes: automation + legal + scale)
