## ADDED Requirements

### Requirement: Team matchday summary
The system SHALL show a concise team summary on team pages using validated demo
data.

#### Scenario: User opens a team page with available matches
- **WHEN** the user opens a team page for a team with validated fixtures
- **THEN** the page shows the next match when available
- **AND** shows the latest result when available
- **AND** shows venue, date, time, and status with German labels

### Requirement: Team table context
The system SHALL show table position for the selected team when standings data
exists for the team's competition context.

#### Scenario: Team has standings row
- **WHEN** the selected team appears in a standings table
- **THEN** the team page shows rank, points, goal difference, and competition
  context

#### Scenario: Team has no standings row
- **WHEN** no standings row exists for the selected team
- **THEN** the team page shows an explicit German unavailable state

### Requirement: Team form curve
The system SHALL derive a simple recent-form indicator from finished validated
matches involving the selected team.

#### Scenario: Finished matches exist
- **WHEN** the team has recent finished matches
- **THEN** the page shows wins, draws, and losses in chronological form order

#### Scenario: No finished matches exist
- **WHEN** the team has no finished matches
- **THEN** the page shows a useful empty state instead of inventing form

### Requirement: Team report links
The system SHALL expose relevant internal match-report links from the team page
when reports exist.

#### Scenario: Team match has internal report
- **WHEN** a listed team match has an imported or curated internal match report
- **THEN** the team page provides a link to that report
