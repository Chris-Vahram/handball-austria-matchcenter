# home-my-team Specification

## Purpose
Answers the most common question, "Wann und wo spielt mein Team als Nächstes?", on the first screen, for any team in the configured competitions.

## Requirements

### Requirement: Remember my team on the device
The visitor SHALL be able to remember one or more teams as "Meine Teams" (e.g. the same club in two competitions); the choice MUST be stored only in the visitor's browser and MUST be changeable at any time.

#### Scenario: First visit
- **WHEN** a visitor opens the home page without a stored team
- **THEN** a team picker grouped by competition is shown and the competition overview is reachable with one tap

#### Scenario: Pick a team
- **WHEN** the visitor picks "SK Konstant Traun / Edelweiss" (HLA) and "Sportunion EDELWEISS Linz / SK Traun" (Landesliga)
- **THEN** the home page shows a dashboard card for each on this and later visits

### Requirement: My team dashboard
For each remembered team the home page SHALL show the next match (date, time, opponent, venue with address and map link), the last result and the table position.

#### Scenario: Traun dashboard
- **WHEN** Traun is remembered and the 01.11.2026 data is loaded
- **THEN** the next HLA match on 15.11.2026 against SMC Innsbruck Handball Tirol in Sportzentrum Traun is shown, plus the last result 35:37 in Bregenz and 7th place
