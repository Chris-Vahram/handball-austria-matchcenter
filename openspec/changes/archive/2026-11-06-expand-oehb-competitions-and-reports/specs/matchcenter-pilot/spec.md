## MODIFIED Requirements

### Requirement: Competition Selection

The system SHALL support selecting a competition and season without changing
page-level contracts when more competitions are added.

#### Scenario: User selects expanded demo competition

- **WHEN** a user selects OÖHV Männer Landesliga, OÖHV mU18 Grunddurchgang
  25/26, Elite Cup MU18 B-Bewerb, or HLA CHALLENGE
- **THEN** schedule and standings use that competition context

### Requirement: Schedule Filtering

The system SHALL show the complete imported schedule for the selected
competition and support applicable date, club, team, and venue filters.

#### Scenario: User opens full competition schedule

- **WHEN** a user opens a competition schedule without filters
- **THEN** the system shows all imported fixtures for that competition

#### Scenario: Filter has no matching fixtures

- **WHEN** selected filters produce no matches
- **THEN** the system shows a German empty state
- **AND** provides a way to reset filters

### Requirement: Match Information

The system SHALL show teams, date, time, venue when known, result when available,
competition, match status, and a match-report link when available.

#### Scenario: Venue is missing

- **WHEN** a match does not contain venue information
- **THEN** the system shows an explicit unavailable state

#### Scenario: Match report exists

- **WHEN** a match references an imported public report
- **THEN** the system provides navigation to its internal match-report page

### Requirement: Validated Allowed Data

The system SHALL validate all imported or curated data and SHALL exclude private
contacts, phone numbers, email addresses, referee data, and unrelated personal
details. The system SHALL expose player-level sports records only through an
explicit reviewed publication profile.

#### Scenario: Fixture contains unsupported personal detail data

- **WHEN** an imported payload includes a non-allowlisted field
- **THEN** validation rejects the field before display

#### Scenario: Player-level display is not approved

- **WHEN** imported sports records include player-level fields without an
  approved publication profile
- **THEN** public views omit those fields
