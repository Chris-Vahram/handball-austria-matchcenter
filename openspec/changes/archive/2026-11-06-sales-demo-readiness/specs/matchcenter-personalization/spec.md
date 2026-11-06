## ADDED Requirements

### Requirement: Browser-local favorites
The system SHALL allow users to favorite public competitions, teams, and clubs
without creating an account and SHALL store only public entity IDs on the
current device.

#### Scenario: User favorites a team
- **WHEN** a user activates the favorite action on a public team page
- **THEN** the system stores the team ID in browser-local storage
- **AND** the team page shows that the team is a favorite

#### Scenario: Browser storage is unavailable
- **WHEN** local browser storage cannot be read or written
- **THEN** public matchcenter browsing remains usable
- **AND** the system does not show a false saved state

### Requirement: Personalized next match
The system SHALL show the next relevant fixture for locally favorited entities
when such a fixture exists and SHALL keep a useful generic landing page for
first-time visitors.

#### Scenario: Favorite team has upcoming match
- **WHEN** a user with a locally favorited team opens the landing page
- **THEN** the system shows the next fixture involving that team
- **AND** shows date, time, venue, competition, and status

#### Scenario: User has no favorites
- **WHEN** a user without local favorites opens the landing page
- **THEN** the system shows the generic public landing experience
- **AND** offers a clear path to select a competition or team

### Requirement: Privacy-preserving favorite storage
The system SHALL NOT send local favorites to a remote service and SHALL NOT
store contacts, player records, or unrelated personal data for personalization.

#### Scenario: User saves favorites
- **WHEN** a favorite is added or removed
- **THEN** only public entity IDs are changed on the current device
- **AND** no remote profile request is made
