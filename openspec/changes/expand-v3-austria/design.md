# Design: expand-v3-austria

## Context

Today: `v3/src/importer/config.ts` hard-codes two groups; `v3/src/data/index.ts` statically imports two snapshot JSONs (0.7 MB + 0.17 MB) into the bundle; every route prebuilds all params (`generateStaticParams`); search ships the full index (`/suche/index.json`); the home ships every team card (ponytail note in `my-teams.tsx`). The operator runs `npm run import -- all` by hand.

Who uses nuLiga AT (checked 2026-11-21): public pages serve players, parents, coaches, fans and journalists; the login area serves clubs (Spielberechtigungen, transfers) and individuals (seminars, profile) — the login side stays out of scope. Championships on the site: ÖHB, WHV, NÖHV, HVB, OÖHV, SHV, StHV, KHV, THV, VHV (26/27), ÖMS 2026 (finished season), ÖMS 2027, International 2026/27. Sample sizes: OÖHV 41 groups (many youth tournament days: Minis S1–S8, U10/U11 Spieltage), WHV 29, ÖHB 11 groups + 22 `groupsGroupingPage` groupings (HLA/HLA2/RLM, WHA, school cups). `robots.txt` disallows only `*.inc` and `*.csi`.

## Goals / Non-Goals

**Goals**
- All groups of the 12 current championships with full data, refreshed nightly without manual work.
- Same pages and privacy rules as today; no runtime calls to nuLiga.
- Repo, build and request cost stay bounded at ~400 groups / ~5,000 reports.

**Non-Goals**
- Season archive (ÖMS 2026, earlier seasons) — separate change, needs its own allowlist decision.
- Login areas, club admin, Spielberechtigungen, result entry, live scores.
- Backend/database (project rule); Vercel Blob (owner chose files in Git).
- Redesign of Bewerb pages beyond "tabs follow available data".

## Decisions

1. **Discovery from `leaguePage`.** Config shrinks to a list of 12 championship strings + federation code. Discovery parses headings and `groupPage`/`groupsGroupingPage` links in order. Groupings are expanded one level. Output: `discovered.json` (championship, group, name, heading, order). Alternative (hand-maintained list of 400 groups) rejected: breaks every season.
2. **Allowlist by discovery, not by pattern.** `isAllowedSourceUrl` accepts a group URL only if the group id is in the current discovery result for that championship; parameters stay exact-key-checked as today. Unknown championships, `regionMeetingFilter`, login (`hbat-id.liga.nu`), club and person pages stay rejected.
3. **Registry for slugs.** `v3/src/data/registry.json`: `{ "<championship>|<group>": "<slug>" }`, append-only, committed. Slug = `<federation-slug>-<slugified curated or nuLiga name>`, suffix `-2…` on collision. Seeded with `hla-challenge-west` (218583) and `landesliga-ooe` (218721). Curated display names/ordering in `v3/src/data/names.json` (optional per group).
4. **File layout.**
   ```
   v3/src/data/
     index.json                 # all Bewerbe: slug, verband, heading, name, fullName, phase, round, rounds, leader, teams[], hasTable, hasStats, importedAt
     registry.json, names.json
     venues.json                # id → name, address, resin
     snapshots/<slug>/group.json        # standings, matches, stats, groupStats, source
     snapshots/<slug>/reports/<meeting>.json
   ```
   Approved reports are immutable files → nightly diff = new reports + changed group files. Estimate: ~15 KB/report × 5,000 + ~400 × 50 KB ≈ 95 MB/season (owner accepted ~50–100 MB).
5. **Incremental rules.** Per group per run: `groupPage` + Spielplan (2 requests). If the normalized schedule/standings differ from the stored file → 5 ranking pages + `groupAndTeams`. Reports: fetch if no file or stored `approved: false`. Venues: fetch if not in `venues.json`; refresh one venue per 30 days. Estimate nightly: 13 leaguePages + ~22 groupings + 400 × 2 + ~60 changed × 6 + ~150 reports ≈ 1,350 requests × 1.5 s ≈ 35 min; first full run ≈ 3.5 h (fits a 6 h Actions job; resumable because finished files are skipped).
6. **Loading at runtime.** `getDataset(slug)` reads `snapshots/<slug>/group.json` via `fs` (server-only, React `cache`), reports lazily per page. `next.config.mjs` `outputFileTracingIncludes` adds `src/data/**` to the server functions. `generateStaticParams` returns only index-level pages (`/bewerbe`, `/bewerbe/[verband]`) and curated top Bewerbe; everything else `dynamicParams = true` + `revalidate = 3600` (ISR). Avoids building ~60k pages per deploy.
7. **Search on the server.** Importer writes `search.json` (Bewerbe, teams, club aliases, players: name, team, slug). `/suche` (results) and a new `/suche/vorschlaege?q=` route filter it server-side (max 8 suggestions, 20 results per kind). `/suche/index.json` is removed.
8. **Home per favorite.** Building on `declutter-v3-first-glance`: the client requests `/<slug>/home.json` (ISR route, compact rows for that Bewerb) for each followed Bewerb and each favorite team's Bewerb. Removes the ponytail "ships everything" ceiling.
9. **Directory.** `/bewerbe` = Verbände rows (name, count); `/bewerbe/<verband>` = headings + Bewerbe rows. `/bewerbe#<slug>` keeps working by rendering the Verband rows with matching ids (spec "Old anchor link"). Declutter's first-visit Verband rows switch their links to `/bewerbe/<verband>`.
10. **Tabs follow data.** `index.json` carries `hasTable`/`hasStats`; `Header` renders only available tabs; `/<slug>` redirects to `/<slug>/spielplan` when `hasTable` is false.
11. **GitHub Action.** `.github/workflows/import.yml`: `schedule: cron "15 2 * * *"` (UTC ≈ 03:15/04:15 Vienna) + `workflow_dispatch`; job-level `if: vars.IMPORT_ENABLED == 'true'` on the import job (kill switch: the whole job is skipped, so no request, commit or failure issue; a step-level early exit would let later steps run — Codex adversarial review 2026-11-22); `npm ci`, `npm run import -- all`, `npm test`, `npm run typecheck`; commit only `v3/src/data/**` with `GITHUB_TOKEN` (`contents: write`, `issues: write`); on failure create/update one issue "nuLiga-Import fehlgeschlagen". Concurrency group prevents overlapping runs. User-Agent identifies the project without personal contact data (privacy rule) — generic project name + repo URL only if owner agrees (open question).
12. **Removal on request (ADR-005) survives imports.** `v3/src/data/removals.json` holds `sha256(normalize(name) + "|" + normalize(team))` entries only. The importer drops matching players from reports, rankings, timelines (event kept without name) and the search index on every run; a unit test re-imports a fixture containing a removed player. Git history keeps earlier copies: removal requests are answered by also rewriting history of the affected files only if the requester insists (manual operator step, documented in the operations doc), otherwise the site no longer shows the name. (Codex adversarial review 2026-11-22.)
13. **Favorites in groups without a table.** Home rows for a team come from match participants when standings are absent; its Bewerb row links to the Spielplan and omits rank/leader. Requires the declutter `myLists` helper to treat rank/points as optional. (Codex adversarial review 2026-11-22.)
14. **Migration.** One-time script converts the two existing snapshots into the new layout under their existing slugs; e2e `data.ts` reads from the new loader.

## Risks / Trade-offs

- **[Legal / relationship risk]** Nightly automated mirroring of all public nuLiga data without permission; ÖHB or nu may object or block. → ADR-004 amendment records the owner's decision; kill switch stops it without deploy; rate limits unchanged; recommended (not required): enable the schedule only after wave-2 outreach is sent, so nu/ÖHB hear about it from the owner first.
- **[Privacy exposure]** Searchable player names grow from ~30 adult teams to all Austrian teams incl. youth (owner decision ADR-005 amendment 2026-11-06 stands; no youth gate proposed). Minis/U10 tournament reports usually carry no player rows. Never-stored list unchanged. → Keep the public-launch legal/privacy review on the checklist; this change does not make the site public.
- **[nuLiga HTML variance]** 400 groups will expose formats the two fixtures never had (cups, tournament days, groupings). → Parser tolerates missing tables/stats (spec), per-group failures do not block other groups, failure issue lists the groups; add fixtures for each new format met during the first full run.
- **[Repo size]** ~95 MB/season, more per season. → Accepted by owner; revisit (season folders, `git lfs`, or Blob) when the second season starts.
- **[Vercel function size]** Traced data ~100 MB inside the 250 MB limit. → Measure after first full import; fallback: trace only `group.json` into page functions and load reports per route.
- **[Build time]** ISR keeps builds short; first visit of a cold page renders on demand (~100–300 ms).
- **[Removal undone by re-import]** → Decision 12 (suppression list applied on every run).
- **[Unattended commits to main]** → Only `v3/src/data/**` touched, gated by validation + tests; Vercel deploys preview per commit as today.

## Migration Plan

1. Implement on branch `expand-v3-austria` after `declutter-v3-first-glance` is merged.
2. Run first full import locally (≈3.5 h), review a sample of new formats, commit data separately.
3. Merge on owner's go; set `IMPORT_ENABLED=true` only when the owner decides (see legal risk).
4. Rollback: set `IMPORT_ENABLED=false`; revert to the last good data commit if needed.

## Open Questions

- User-Agent string: generic project name only, or include the public repo URL? (No personal e-mail per privacy rule.)
- Include ÖMS 2026 (finished season) now or with the season-archive change? Default here: later.
- Curated display names: which Bewerbe beyond HLA Challenge West and Landesliga OÖ get nicer names than nuLiga's codes (e.g. "LLM-GD")? Default: top league per Verband, owner reviews list after first import.
