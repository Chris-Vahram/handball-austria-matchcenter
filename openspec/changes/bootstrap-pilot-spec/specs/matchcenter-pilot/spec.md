## ADDED Requirements

### Requirement: Public Match Center Navigation

The system SHALL provide German-language access to landing page, schedule,
standings, team pages, club pages, and search.

#### Scenario: User opens pilot

- **WHEN** a user opens the root route
- **THEN** the system shows current or upcoming match information
- **AND** exposes navigation to schedule, standings, and search

### Requirement: Competition Selection

The system SHALL support selecting a competition and season without changing
page-level contracts when more competitions are added.

#### Scenario: User selects initial demo competition

- **WHEN** a user selects OOHV Maenner Landesliga
- **THEN** schedule and standings use that competition context

### Requirement: Schedule Filtering

The system SHALL show match cards and support applicable date, club, team, and
venue filters.

#### Scenario: Filter has no matching fixtures

- **WHEN** selected filters produce no matches
- **THEN** the system shows a German empty state
- **AND** provides a way to reset filters

### Requirement: Match Information

The system SHALL show teams, date, time, venue when known, result when available,
competition, and match status.

#### Scenario: Venue is missing

- **WHEN** a match does not contain venue information
- **THEN** the system shows an explicit unavailable state

### Requirement: Standings

The system SHALL show competition standings with rank, team, played matches,
source-supported scoring values, goal difference, and points.

#### Scenario: User checks table

- **WHEN** a user opens standings for a selected competition
- **THEN** the system shows ranking rows
- **AND** shows dataset update metadata

### Requirement: Team and Club Pages

The system SHALL provide team pages and club pages linked from public sports
records.

#### Scenario: User opens team

- **WHEN** a user selects a team
- **THEN** the system shows its club, competition context, and matches

#### Scenario: User opens club

- **WHEN** a user selects a club
- **THEN** the system shows associated teams and relevant matches

### Requirement: Search

The system SHALL search competitions, clubs, teams, and venues.

#### Scenario: Search yields no results

- **WHEN** a query matches no allowed records
- **THEN** the system shows a German empty state

### Requirement: Validated Allowed Data

The system SHALL validate all imported or curated data and SHALL exclude player
lists, private contacts, phone numbers, email addresses, referee data, and
personal detail data.

#### Scenario: Fixture contains unsupported personal detail data

- **WHEN** a fixture payload includes a non-allowlisted field
- **THEN** validation rejects the payload before display

### Requirement: Source Provenance

The system SHALL retain source label, source reference, update timestamp, and
import mode for displayed datasets.

#### Scenario: User views sample data

- **WHEN** curated demo data is displayed
- **THEN** the system identifies it as pilot sample data
- **AND** shows its update timestamp where relevant

### Requirement: Responsive and Accessible UI

The system SHALL support narrow mobile screens, keyboard access, visible focus
states, semantic markup, and adequate contrast.

#### Scenario: User navigates on mobile

- **WHEN** viewport is narrow
- **THEN** primary match information remains readable
- **AND** primary navigation remains usable
