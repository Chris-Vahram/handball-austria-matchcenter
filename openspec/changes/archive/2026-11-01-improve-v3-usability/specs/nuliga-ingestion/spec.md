# Spec Delta

## ADDED Requirements

### Requirement: Venue facts import
The importer SHALL fetch the public court page (`courtInfo`) of every venue referenced in the configured schedules, under the same limits, and keep only name, address and resin rule.

#### Scenario: Court page
- **WHEN** the Bregenz arena page is imported
- **THEN** the venue record holds name, address and "nicht erlaubt", and nothing from the court schedule

### Requirement: Report timeline import
The importer SHALL read the report timeline (Spielverlauf) into minute, score, event type, side, shirt and name, dropping names of team officials.

#### Scenario: Official warning
- **WHEN** a timeline event belongs to a team official
- **THEN** the event is kept without a name
