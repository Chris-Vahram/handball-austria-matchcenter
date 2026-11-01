# Spec Delta

## Purpose

Imports the public 2026/27 nuLiga pages of the configured competitions into validated, privacy-filtered normalized data that the v3 app renders, without fetching anything during request handling.

## ADDED Requirements

### Requirement: Allowlisted sources only
The importer SHALL fetch only configured nuLiga URLs on host `oehb-handball.liga.nu`: the group page and Spielplan (Gesamt) of group 218583 (ÖHB 26/27) and group 218721 (OÖHV 26/27), match report pages of those groups, their player statistics pages and their group/team statistics page (`displayType=groupAndTeams`). Any other URL MUST be rejected before a request is made.

#### Scenario: Unconfigured group rejected
- **WHEN** an import is requested for a groupPage URL with a group not in the allowlist
- **THEN** the importer refuses without a network request and reports the URL as not allowed

#### Scenario: Report of a configured group allowed
- **WHEN** a match report URL references `meeting=93135` and `group=218583`
- **THEN** the importer accepts it as an allowlisted source

### Requirement: Operator-only, rate-limited fetching
Fetching SHALL happen only through the operator CLI, never while serving a page. Cached responses younger than 24 hours MUST be reused; requests MUST be at least 1500 ms apart; a failed request MUST be retried at most 2 times.

#### Scenario: Fresh cache reused
- **WHEN** a source was fetched less than 24 hours ago
- **THEN** the importer uses the cached response and makes no request

#### Scenario: Bounded retries
- **WHEN** a request fails three times in a row
- **THEN** the import of that source stops and the last validated output stays in place

### Requirement: Ranking values by column name
Each player ranking SHALL be read by its own value column header (Tore, 7m-Tore, Zeitstrafen, Gelbe Karten, Rote Karten), because nuLiga orders the columns differently per list.

#### Scenario: Suspensions list
- **WHEN** the suspensions ranking lists DILYS, Devanas with 2 Zeitstrafen in 1 game
- **THEN** the normalized row has value 2 and games 1, not 0

### Requirement: Validated normalized output
Imported data SHALL be validated against the domain schema before it is written. Invalid data MUST NOT replace the last valid output.

#### Scenario: Parser yields invalid data
- **WHEN** a parsed standings table fails schema validation
- **THEN** no new output is written and the operator sees a validation error

### Requirement: Privacy filter
The importer SHALL drop referee, Zeitnehmer and Mannschaftsoffizielle data, contacts, addresses, birthdates, pass numbers, source-person IDs and portrait links. Referee initials that nuLiga prints in the score field of unplayed games MUST be discarded so that the match has no result.

#### Scenario: Referee initials in score column
- **WHEN** an unplayed match row shows `BÖSC./SZÜC.` in the score column
- **THEN** the normalized match has status "scheduled", no score, and no referee text anywhere in the output

#### Scenario: Officials in a match report
- **WHEN** a match report lists team officials and referees
- **THEN** none of their names appear in the normalized report

### Requirement: Adult-only player names
Player-level fields (display name, shirt number, team, goals, 7m, cards, 2-min, disqualification) SHALL be kept only for competitions configured as adult. For youth competitions, player-level data MUST be dropped.

#### Scenario: Adult competition report
- **WHEN** a report from group 218583 is imported
- **THEN** player names of both teams are kept, limited to the allowed fields

#### Scenario: Youth competition
- **WHEN** a competition is configured with category youth
- **THEN** no player-level rows are written for it

### Requirement: Provenance
Every normalized dataset SHALL record its source URLs and the import timestamp, so pages can show "Quelle: nuLiga" and "Stand".

#### Scenario: Stand available
- **WHEN** the Liga page loads data for group 218583
- **THEN** the dataset provides the source URL and the time of the last successful import
