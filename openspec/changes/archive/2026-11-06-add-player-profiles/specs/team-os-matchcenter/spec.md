## ADDED Requirements

### Requirement: Player profile pages
The system SHALL provide a per-player profile page for players from
publication-approved adult match reports, aggregating that player's statistics across
all such reports, and SHALL identify the player in the URL by a slug derived from
display name and shirt number rather than any internal source reference.

#### Scenario: Released player profile
- **WHEN** a user opens the profile of a player with approved report data
- **THEN** the page shows the player's name, shirt number, team, total goals,
  7-metre quota, 2-minute penalties, and number of matches
- **AND** lists each match with the player's line, linking to that match report

#### Scenario: No released data for the slug
- **WHEN** a profile slug has no approved player data (unknown or gated player)
- **THEN** the system returns a not-found response and renders no player data

#### Scenario: Reachable from scoring surfaces
- **WHEN** a player name is shown in the Torschützen list, a match report, or a team
  top-scorers card
- **THEN** the name links to that player's profile

#### Scenario: No source identifiers exposed
- **WHEN** a player profile is rendered or routed
- **THEN** the internal source-player reference is not present in the URL or markup
