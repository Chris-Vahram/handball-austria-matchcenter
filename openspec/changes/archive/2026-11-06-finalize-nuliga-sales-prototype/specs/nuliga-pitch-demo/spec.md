## ADDED Requirements

### Requirement: Dedicated pitch route
The system SHALL provide a dedicated German-language pitch/demo route for
targeted nuLiga or nu GmbH preview recipients.

#### Scenario: Preview recipient opens pitch route
- **WHEN** the recipient opens the pitch route
- **THEN** the page explains the current problem, proposed matchcenter solution,
  target user groups, and pilot status

### Requirement: Demo flow links
The pitch route SHALL link to the strongest implemented prototype flows.

#### Scenario: Recipient reviews demo flow
- **WHEN** the recipient follows demo-flow links
- **THEN** the route offers links to the landing page, team page, competition
  page, table, and highlighted match report

### Requirement: Data and privacy boundaries
The pitch route SHALL clearly state data-source and privacy boundaries.

#### Scenario: Recipient reads data boundaries
- **WHEN** the pitch route is displayed
- **THEN** it states that the prototype uses reviewed demo fixtures
- **AND** productive synchronization requires approved API/export access or
  written permission
- **AND** U18 player-level publication remains disabled without separate
  approval

### Requirement: Contact and next step
The pitch route SHALL provide a neutral next-step action for feedback or a
product discussion.

#### Scenario: Recipient wants to respond
- **WHEN** the recipient activates the feedback or contact action
- **THEN** the system opens the configured reviewed feedback destination
