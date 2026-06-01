## ADDED Requirements

### Requirement: Match calendar export
The system SHALL provide a standards-based iCalendar export for a public match.

#### Scenario: User exports a fixture
- **WHEN** a user activates the calendar action for a public match
- **THEN** the system returns an `.ics` calendar file
- **AND** includes teams, schedule timestamp, competition, venue when available,
  source reference, and generation timestamp

### Requirement: Team schedule calendar export
The system SHALL provide a calendar export for the validated public fixtures of
a selected team.

#### Scenario: User exports a team schedule
- **WHEN** a user activates calendar export on a public team page
- **THEN** the system returns an `.ics` file containing that team's validated
  public fixtures
- **AND** excludes personal data

### Requirement: Fixture sharing
The system SHALL provide a share action for a public fixture using a canonical
internal fixture URL and SHALL provide a fallback when native sharing is not
available.

#### Scenario: Browser supports native sharing
- **WHEN** a user activates the share action in a browser with Web Share API
  support
- **THEN** the system opens the native share dialog with fixture summary and
  canonical URL

#### Scenario: Browser lacks native sharing
- **WHEN** a user activates the share action without Web Share API support
- **THEN** the system exposes a copyable canonical fixture URL

### Requirement: Approved hall navigation
The system SHALL show a hall-navigation action only when an allowed public hall
name exists and SHALL generate an external Google Maps search URL only from that
hall name.

#### Scenario: Venue has allowed hall name
- **WHEN** a public fixture references a venue with an allowed hall name
- **THEN** the fixture detail page shows an external route-planning action

#### Scenario: Venue lacks hall name
- **WHEN** a fixture has no allowed hall name
- **THEN** the system omits the route-planning action
- **AND** still shows the available hall name
