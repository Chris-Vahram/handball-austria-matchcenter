## ADDED Requirements

### Requirement: Canonical club context
The system SHALL represent Edelweiß Linz / SK Traun as one canonical club or
Spielgemeinschaft context while preserving separate public team records for
competition-specific tables and schedules.

#### Scenario: Multiple team records share the club
- **WHEN** the data contains Landesliga, MU18, Elite Cup, or HLA CHALLENGE team
  records for Edelweiß/Traun
- **THEN** each record remains linked to the canonical `edelweiss-traun` club
  context
- **AND** competition-specific pages continue to display the correct team record

### Requirement: Club page aggregates linked teams
The system SHALL show all linked public team instances and matches on the
canonical Edelweiß/Traun club page.

#### Scenario: User opens the Edelweiß/Traun club page
- **WHEN** the user opens `/vereine/edelweiss-traun`
- **THEN** the page lists linked competition team instances
- **AND** it shows matches from all linked team IDs
- **AND** it preserves direct links to the individual team pages

### Requirement: Alias-aware search
The system SHALL allow common public aliases to find the canonical
Edelweiß/Traun club context.

#### Scenario: User searches for Traun aliases
- **WHEN** the user searches for `Edelweiß`, `Traun`, `SK Traun`, or
  `Konstant Traun`
- **THEN** the canonical club result is available before duplicate team-result
  noise
- **AND** competition-specific team results remain accessible
