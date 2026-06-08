## ADDED Requirements

### Requirement: Guided sales-preview entry
The system SHALL provide a clear German entry path for targeted preview
recipients to understand and open the strongest prototype flows.

#### Scenario: Recipient opens the demo page
- **WHEN** a targeted preview recipient opens the demo page
- **THEN** the system presents the prototype purpose, target users, and pilot
  status in plain German
- **AND** it provides visible links to the start page, team context,
  competition/table context, and demo match report

### Requirement: Preview data boundary
The guided preview SHALL state the current data and privacy boundary before
productive use.

#### Scenario: Recipient reviews preview constraints
- **WHEN** the guided preview is displayed
- **THEN** it states that productive synchronization requires approved
  API/export access or written permission
- **AND** it does not imply scraping, login access, or complete official data
  coverage
- **AND** it does not expose contacts, phone numbers, email addresses, referee
  data, source person IDs, or U18 player-level publication

### Requirement: Non-technical user orientation
The preview SHALL help players, parents, trainers, and officials answer the main
matchcenter questions without requiring association-system knowledge.

#### Scenario: User follows the preview flow
- **WHEN** a user follows the guided preview flow
- **THEN** the user can identify team context, next match, venue, result, table
  position, and demo match-report detail from the linked pages
