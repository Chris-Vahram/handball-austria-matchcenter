# Spec Delta

## ADDED Requirements

### Requirement: Immediate filter
Changing the team filter SHALL update the ranking immediately; without JavaScript a submit button remains.

#### Scenario: Pick team
- **WHEN** the user selects "SK Konstant Traun / Edelweiss"
- **THEN** the list updates without pressing a button

### Requirement: Thin data explained
When fewer than a quarter of the season's games are played, ranking and statistics pages SHALL say how many games the figures are based on.

#### Scenario: Landesliga
- **WHEN** the Landesliga Ranglisten open with 5 of 40 games played
- **THEN** a note states that the figures are based on 5 of 40 games
