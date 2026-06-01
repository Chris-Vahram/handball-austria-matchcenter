## ADDED Requirements

### Requirement: Internal match-report page

The system SHALL provide an internal detail page for each imported match report
and SHALL link to the public ÖHB source report.

#### Scenario: User opens finished match

- **WHEN** a user selects a finished match with a public report
- **THEN** the system shows result, available half-time result, status, venue,
  competition context, and public ÖHB report link

### Requirement: Team sports statistics

The system SHALL display available team totals for goals, seven-metre throws,
two-minute penalties, yellow cards, and red cards.

#### Scenario: Team statistic is unavailable

- **WHEN** the source report does not provide a supported team statistic
- **THEN** the match-report page shows an explicit unavailable state instead of
  inventing a value

### Requirement: Player statistics publication profile

The system SHALL store player-level sports statistics separately from displayed
records and SHALL expose them only when an explicit reviewed publication profile
allows the competition category.

#### Scenario: U18 player publication is not approved

- **WHEN** a U18 match report contains player statistics and its publication
  profile is not approved
- **THEN** the public match-report page omits player names and player-level
  statistics

#### Scenario: Player publication is approved

- **WHEN** a reviewed publication profile allows player statistics for a
  competition category
- **THEN** the match-report page may show source-supported player statistics

### Requirement: Match event timeline

The system SHALL display allowlisted public sports events when available,
subject to the competition publication profile.

#### Scenario: Event timeline exists

- **WHEN** an approved match report contains allowlisted sports events
- **THEN** the system shows the event timeline in chronological order
