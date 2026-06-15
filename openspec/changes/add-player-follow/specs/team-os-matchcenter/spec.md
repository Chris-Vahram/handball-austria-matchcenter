## ADDED Requirements

### Requirement: Follow individual players
The system SHALL let users follow individual released players using only the
player's public name+shirt slug stored in browser-local favorites, and SHALL surface
followed players on the home page.

#### Scenario: Following a player
- **WHEN** a user activates the follow control on a player profile
- **THEN** the player's public slug is added to local favorites
- **AND** no source-player reference is stored

#### Scenario: Followed players on the home
- **WHEN** a user has followed one or more players
- **THEN** the home shows a "Deine Spieler" section listing each with their team,
  next game, and season goals, linking to the player's profile

#### Scenario: Unfollowing
- **WHEN** the user removes a followed player
- **THEN** that player no longer appears on the home

#### Scenario: Only released players resolve
- **WHEN** a followed slug has no released (adult, approved) data
- **THEN** it is not shown on the home
