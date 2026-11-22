# Proposal: expand-v3-austria

## Why

The goal of v3 is to be used by everyone who uses public nuLiga Handball Austria today — players, parents, coaches, fans, club volunteers and journalists in all nine Bundesländer — instead of two hand-configured groups (HLA Challenge West, Landesliga OÖ). nuLiga AT (`oehb-handball.liga.nu`) publishes 12 current championships: ÖHB, the nine Landesverbände (WHV, NÖHV, HVB, OÖHV, SHV, StHV, KHV, THV, VHV), ÖMS 2027 and International 2026/27. Sampled 2026-11-21: OÖHV 41 groups, WHV 29, ÖHB 11 groups + 22 league groupings → roughly 350–450 groups and ~5,000 match reports per season.

Owner decisions 2026-11-21:
- Scope: **"Alles voll"** — every group of every championship with full data (Tabelle, Spielplan, Spielberichte, Statistik), knowingly changing ADR-004's "no broad scraping" rule.
- Storage: **"Viele Dateien im Git"** — one JSON per group and per report; approved reports never change, so each import is a small diff.
- Import: **"Automatisch (GitHub Action)"** — scheduled, self-committing import instead of the manual operator CLI, accepting the higher legal risk without written permission from ÖHB/nu.

## What Changes

- **Discovery instead of hand config:** the importer reads each championship's `leaguePage` (and ÖHB's `groupsGroupingPage` league groupings) to find all groups with their category heading (Männer, Frauen, männliche/weibliche/gemischte Jugend Uxx, Cup …). **BREAKING (ops):** `COMPETITIONS` in `importer/config.ts` is replaced by discovered groups plus a small curated name/order override file.
- **ADR-004 amendment:** allowlist becomes "the 12 configured championships of season 26/27, their `leaguePage`, `groupsGroupingPage` and every group linked from them, with the existing sub-pages (Spielplan, report, statistics, courtInfo)". Rate limits stay (≥1.5 s, max 2 retries, 24 h cache); automated scheduled runs become allowed. Owner quotes recorded.
- **Incremental import:** approved reports and venue pages are fetched once and never again; statistics pages only for groups with new results; unchanged groups write no diff. Nightly run estimated ~30–40 min, first full run ~3–4 h.
- **Scheduled GitHub Action** (nightly, Europe/Vienna) runs the import, schema validation, privacy tests and unit tests, then commits `data(v3): nuLiga import <date>` to `main` only when all pass; on failure it keeps the last valid data and opens/updates one GitHub issue. A kill switch (repository variable) stops it.
- **Storage split:** `v3/src/data/snapshots/<competition>/group.json` + `reports/<meeting>.json`, shared `venues.json`, and a small `index.json` (all Bewerbe with Verband, category, name, round, leader) used by directory, search and home.
- **Stable Bewerb URLs:** each group gets a permanent slug (`<verband>-<name>`, e.g. `ooehv-landesliga-maenner`), stored in a registry so re-imports never change URLs; `hla-challenge-west` and `landesliga-ooe` keep theirs.
- **Directory at national scale** (**BREAKING (UX)**): `/bewerbe` lists the 12 Verbände/areas; `/bewerbe/<verband>` lists its Bewerbe grouped by category heading in nuLiga order. Replaces the `/bewerbe#verband` anchors.
- **Groups without a table** (youth tournaments like Minis/U10 Spieltage, cups in knockout format): Spielplan and reports only; Tabelle/Statistik tabs appear only when the source has the data.
- **Rendering at scale:** pages are rendered on demand and cached (ISR) instead of prebuilding every team/report page; search suggestions are filtered on the server (no full index download); the home loads only the visitor's favorites.
- **Youth like adult everywhere** (ADR-005 amendment 2026-11-06 applied to the living ingestion/search/player specs, which still say "adult only").

## Capabilities

### New Capabilities
- None (discovery, incremental and scheduled import are behaviors of `nuliga-ingestion`).

### Modified Capabilities
- `nuliga-ingestion`: discovery from leaguePage/groupings, national allowlist, incremental fetching, scheduled automated runs with validation gate and kill switch, groups without standings, stable slugs, youth like adult.
- `competition-overview`: Verband list → Verband page with category headings; prototype scope note replaced by coverage line.
- `league-standings-schedule`: Bewerbe without a table or statistics show only what the source has.
- `search`: teams, players and Bewerbe of all imported championships; suggestions limited and filtered on the server; player results no longer adult-only.

## Impact

- Code: `v3/src/importer/*` (discovery, incremental, registry), `v3/src/data/index.ts` (file-per-group loading instead of static JSON imports), `v3/src/lib/{overview,search,dashboard}.ts`, `v3/app/bewerbe/**`, all `generateStaticParams`, `v3/app/suche/**`, `v3/next.config.mjs` (file tracing of snapshot dirs), new `.github/workflows/import.yml`.
- Data: repo grows ~50–100 MB per season (owner accepted). Old two-file snapshots migrate once.
- Docs/decisions: ADR-004 amendment (national allowlist + automation), ADR-002 note, CLAUDE.md "Out of scope: automated/broad scraping" line updated, `openspec/docs/oehb-importer-operations.md`.
- Privacy: never-stored list unchanged (referees, officials, contacts, birthdates, IDs, portraits). Exposure grows from ~30 teams to all Austrian teams incl. children's competitions — see design.md risks.
- **Data-source limitation:** still scraping public HTML without an agreement. ADR-002 preference order (official API > export > nuPortalRS > written permission) still applies; the scheduled job must be stoppable within minutes if ÖHB or nu object.
- Depends on `declutter-v3-first-glance` (compact home) being implemented first.
