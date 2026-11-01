## ADDED Requirements

### Requirement: Content-first home
The system SHALL show match content on the home page without requiring the user to
follow anything first, and SHALL let the user follow a team inline from that
content.

#### Scenario: Home with no followed clubs
- **WHEN** a user with no followed clubs opens the home page
- **THEN** the system shows a current-matches feed across competitions
- **AND** a search to find a team and an inline follow control are available
- **AND** no exhaustive list of all teams is shown

#### Scenario: Following from the feed
- **WHEN** the user follows a club via an inline follow control
- **THEN** a personal "Deine Vereine" area appears for that club

### Requirement: Club-level cross-Bewerb following
The system SHALL treat a followed club as the unit of personalization and SHALL
show that club's upcoming games across all of its competitions plus its teams'
table positions.

#### Scenario: Followed club overview
- **WHEN** a user follows a club
- **THEN** the home shows that club's next games across all Bewerbe
- **AND** lists the club's teams with their table position where available

#### Scenario: Switching the active club
- **WHEN** the user follows more than one club and selects another
- **THEN** the personal area and chrome accent update to that club

### Requirement: Verband-hierarchical Explore
The system SHALL let users browse competitions grouped by Verband (association) and
category, mirroring the familiar handball structure.

#### Scenario: Browsing by association
- **WHEN** the user opens Entdecken
- **THEN** competitions are grouped under their association with a category label
- **AND** selecting a competition leads to its table and schedule

### Requirement: Onboarding does not enumerate all teams
The system SHALL NOT present an exhaustive list of every team as the onboarding
step, and SHALL instead rely on search, inline follow, and a small suggestion set.

#### Scenario: A first-time user looks for their team
- **WHEN** a first-time user wants to follow a team
- **THEN** the system offers search and a small set of suggested clubs
- **AND** does not require scrolling a full national team list
