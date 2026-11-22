# Spec Delta

## MODIFIED Requirements

### Requirement: Allowlisted sources only
The importer SHALL fetch only URLs on host `oehb-handball.liga.nu` that belong to the configured championships of season 26/27 (ÖHB, WHV, NÖHV, HVB, OÖHV, SHV, StHV, KHV, THV, VHV, ÖMS 2027, International 2026/27): their `leaguePage`, `groupsGroupingPage`, and for every discovered group its group page, Spielplan (Gesamt), reports, player and group statistics, and `courtInfo`. Any other URL MUST be rejected before a request is made.

#### Scenario: Unconfigured group rejected
- **WHEN** an import is requested for a groupPage URL whose group was not discovered from a configured championship
- **THEN** the importer refuses without a network request and reports the URL as not allowed

#### Scenario: Report of a configured group allowed
- **WHEN** a match report URL references `meeting=93135` and `group=218583`
- **THEN** the importer accepts it as an allowlisted source

#### Scenario: Unconfigured championship rejected
- **WHEN** a leaguePage URL for championship "ÖMS 2026" or any page with a login, club or person parameter is requested
- **THEN** the importer refuses without a network request

### Requirement: Operator-only, rate-limited fetching
Fetching SHALL happen only through the import command (run by the operator or by the scheduled job), never while serving a page. Cached responses younger than 24 hours MUST be reused; requests MUST be at least 1500 ms apart and sequential; a failed request MUST be retried at most 2 times.

#### Scenario: Fresh cache reused
- **WHEN** a source was fetched less than 24 hours ago
- **THEN** the importer uses the cached response and makes no request

#### Scenario: Bounded retries
- **WHEN** a request fails three times in a row
- **THEN** the import of that source stops and the last validated output stays in place

#### Scenario: No fetch at request time
- **WHEN** a visitor opens any page of a Bewerb that has never been imported
- **THEN** the page shows the empty state and no request to nuLiga is made

## REMOVED Requirements

### Requirement: Adult-only player names
**Reason**: ADR-005 amendment 2026-11-06 (owner: "so wie normal bei den erwachsenen") — youth competitions are treated like adult ones; the living spec was not updated when `streamline-v3` was archived.
**Migration**: Replaced by "Player fields for all categories" below. No data migration; the importer already stopped gating on category.

## ADDED Requirements

### Requirement: Player fields for all categories
Player-level fields (display name, shirt number, team, goals, 7m, cards, 2-min, disqualification) SHALL be kept for every competition regardless of category, limited to these fields.

#### Scenario: Youth report
- **WHEN** a report of an OÖHV "männliche Jugend U16" group is imported
- **THEN** player names and shirt numbers of both teams are kept with only the allowed fields

### Requirement: Competition discovery
The importer SHALL discover all groups of each configured championship from its leaguePage and ÖHB's league groupings, recording per group: championship, group id, nuLiga group name, category heading and position in nuLiga's order. Headings without groups MUST be ignored.

#### Scenario: OÖHV discovery
- **WHEN** the OÖHV 26/27 leaguePage lists "Männer" with group 218721 and an empty "männliche Jugend U18" heading
- **THEN** group 218721 is discovered under category "Männer" and no group is created for the empty heading

#### Scenario: League grouping
- **WHEN** the ÖHB leaguePage links a groupsGroupingPage for "HLA, HLA2, RLM"
- **THEN** each group listed on that grouping page is discovered under that heading

### Requirement: Stable Bewerb identifiers
Each discovered group SHALL receive a URL slug derived from Verband and group name once; the slug MUST be stored and reused on later imports even if nuLiga renames the group, and slugs MUST be unique. Existing slugs `hla-challenge-west` and `landesliga-ooe` MUST be kept.

#### Scenario: Rename at source
- **WHEN** nuLiga renames group 218721 after its slug was assigned
- **THEN** the slug stays `landesliga-ooe` and the displayed name follows nuLiga

#### Scenario: Name collision
- **WHEN** two groups of one Verband produce the same slug
- **THEN** the later one gets a distinguishing suffix and both URLs work

### Requirement: Incremental import
An approved match report and a venue page SHALL be fetched only once; an unapproved report MUST be re-fetched until approved; statistics pages of a group SHALL be fetched only when its schedule shows a new or changed result; a group without changes MUST produce no file change.

#### Scenario: Approved report kept
- **WHEN** report 93135 is stored as approved
- **THEN** later imports make no request for it

#### Scenario: Quiet group
- **WHEN** a group's standings and schedule are unchanged since the last import
- **THEN** no statistics request is made and its files are byte-identical

### Requirement: Groups without standings or statistics
Groups whose source has no table or no statistics (tournament days, knockout cups) SHALL be imported with what exists (schedule, results, reports) and MUST NOT fail validation for the missing parts.

#### Scenario: Minis tournament day
- **WHEN** an OÖHV "gemischte Jugend Minis" group has a schedule but no table
- **THEN** it is imported with matches only and the import succeeds

### Requirement: Scheduled automated import
A scheduled job SHALL run the import nightly, then schema validation, privacy checks and unit tests, and commit the changed data to `main` only if all pass. On failure it MUST keep the last valid data and report the failure in one open issue. A repository setting MUST be able to disable the job without a code change.

#### Scenario: Failed validation
- **WHEN** a parser change at nuLiga makes a group's standings invalid
- **THEN** no data commit is made, the site keeps the previous data and the failure issue names the group

#### Scenario: Kill switch
- **WHEN** the operator sets the import switch to off
- **THEN** the next scheduled or manual run is skipped as a whole: no request to nuLiga, no commit and no failure issue

### Requirement: Search-ready index
The import SHALL write a compact index of all Bewerbe (slug, Verband, category, name, season, phase, current round, leader, team names) so directory, search and home do not need to load every group.

#### Scenario: Index after import
- **WHEN** an import finishes
- **THEN** the index lists every imported Bewerb with its Verband and category heading

### Requirement: Durable player removal
A player removed on request (ADR-005) SHALL be recorded in a committed suppression list holding only a one-way hash of normalized name and team, and every import MUST apply it to reports, rankings, team player tables, timelines and the search index, so a later import cannot restore the player.

#### Scenario: Re-import after removal
- **WHEN** a player was removed on request and nuLiga still lists them in the Tore ranking and a stored report
- **THEN** after the next import the player appears in no data file, page or search result

#### Scenario: Suppression list holds no name
- **WHEN** the suppression list is read
- **THEN** it contains hashes only, no player names
