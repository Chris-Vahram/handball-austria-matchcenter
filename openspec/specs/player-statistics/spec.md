# player-statistics Specification

## Purpose
Per-competition player rankings (Tore, 7m-Tore, Zeitstrafen, Karten) taken from nuLiga's public statistics pages, for adult competitions only.

## Requirements

### Requirement: Ranking lists
For each configured adult competition the app SHALL show ranking lists for Tore, 7m-Tore, Zeitstrafen, Gelbe Karten and Rote Karten with rank, player name, the full official team name as in the table (resolved from the player's match-report lineups, since nuLiga's statistics only name the "Verein"), games and value, in the source's order. The Statistik tab SHALL show the top 10 of the Tore list with a link "Alle Ranglisten"; the full lists with all five categories and the team filter SHALL be a sub-page of the competition.

#### Scenario: Torschützen HLA West
- **WHEN** the user opens the Statistik tab of HLA West
- **THEN** the ten best scorers are shown with the import's Stand and a link to all ranking lists

#### Scenario: Full lists
- **WHEN** the user follows "Alle Ranglisten"
- **THEN** all five categories with every ranked player and the team filter are shown

### Requirement: Filter by team
The user SHALL be able to filter a ranking to one team; without a filter the showcase team's players are marked.

#### Scenario: Only Traun
- **WHEN** the user filters Torschützen to "SK Konstant Traun / Edelweiss"
- **THEN** only Traun players are listed, keeping their league rank

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
