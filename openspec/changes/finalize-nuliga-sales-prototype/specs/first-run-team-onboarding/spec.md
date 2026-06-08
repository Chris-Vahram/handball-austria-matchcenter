## ADDED Requirements

### Requirement: First-run team selection
The system SHALL provide a clear first-run path for users to select a public
team as their local favorite without requiring an account.

#### Scenario: New user opens the landing page
- **WHEN** a user with no saved favorites opens the landing page
- **THEN** the system presents a visible German prompt to select a team
- **AND** the prompt explains that the selection personalizes the current device

#### Scenario: User selects a team
- **WHEN** the user selects a team from the onboarding prompt
- **THEN** the system stores only that public team ID in browser-local storage
- **AND** the landing page can show that team's next relevant fixture when one
  exists

### Requirement: Onboarding remains optional
The system SHALL keep ordinary matchcenter browsing available when the user does
not select a team.

#### Scenario: User dismisses or ignores onboarding
- **WHEN** the user does not complete the onboarding prompt
- **THEN** competition, schedule, table, search, team, club, and match-report
  routes remain usable
- **AND** the system does not create a remote profile

### Requirement: Favorite storage failure fallback
The system SHALL handle unavailable browser storage without blocking public
content.

#### Scenario: Browser storage is unavailable
- **WHEN** local storage cannot be read or written
- **THEN** the system shows public content normally
- **AND** it does not show a false favorite state
