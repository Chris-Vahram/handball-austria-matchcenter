## ADDED Requirements

### Requirement: Club-context favorite
The system SHALL allow the first-run favorite prompt to save a deduplicated club
context when multiple team records belong to the same public club or
Spielgemeinschaft.

#### Scenario: User favorites Edelweiß/Traun from first-run prompt
- **WHEN** the user selects Edelweiß/Traun from the first-run prompt
- **THEN** the system stores the canonical club ID in browser-local favorites
- **AND** the personalized landing page considers all teams linked to that club
  when choosing the next relevant match

### Requirement: Favorite storage remains local and public
The system SHALL keep club-context favorites local to the browser and store only
public entity IDs.

#### Scenario: Club favorite is saved
- **WHEN** the system saves a club-context favorite
- **THEN** it stores only the public club ID
- **AND** it does not create an account, send a profile request, or store private
  personal data
