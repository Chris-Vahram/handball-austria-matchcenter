## ADDED Requirements

### Requirement: Gate-aware player scoring lists
The system SHALL provide competition- and team-level player scoring lists derived
only from publication-approved adult match reports, aggregating across all such
reports and expanding automatically as more approved reports are added.

#### Scenario: Released competition scoring list
- **WHEN** a competition has publication-approved player data
- **THEN** the Torschützen list ranks players by total goals across its reports
- **AND** shows 7-metre quota and 2-minute penalties per player

#### Scenario: Gated competition
- **WHEN** a competition's player data is not released (U18 or pending)
- **THEN** the Torschützen view shows the German privacy-gate explanation
- **AND** no player rows are rendered

#### Scenario: Team top scorers
- **WHEN** a team has released player data
- **THEN** its page shows a Top-Torschützen card with the team's leading scorers
- **AND** links to the competition's full Torschützen list

### Requirement: Report scoring detail
The system SHALL show, in the match report's released player section, each player's
goals, 7-metre quota, and goal share, with the top scorer highlighted — without
introducing any new personal fields.

#### Scenario: Released match report
- **WHEN** a match report's player statistics are released
- **THEN** each player row shows goals, a goal-share indicator, and 7-metre quota
- **AND** the top scorer is visually highlighted
