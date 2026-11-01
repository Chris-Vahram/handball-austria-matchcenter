# Spec Delta

## Purpose

Per-competition player rankings (Tore, 7m-Tore, Zeitstrafen, Karten) taken from nuLiga's public statistics pages, for adult competitions only.

## ADDED Requirements

### Requirement: Ranking lists
For each configured adult competition the app SHALL show ranking lists for Tore, 7m-Tore, Zeitstrafen, Gelbe Karten and Rote Karten with rank, player name, the full official team name as in the table (resolved from the player's match-report lineups, since nuLiga's statistics only name the "Verein"), games and value, in the source's order.

#### Scenario: Torschützen HLA West
- **WHEN** the user opens Torschützen for HLA West
- **THEN** the goals ranking is shown with the import's Stand

### Requirement: Filter by team
The user SHALL be able to filter a ranking to one team; without a filter the showcase team's players are marked.

#### Scenario: Only Traun
- **WHEN** the user filters Torschützen to "SK Konstant Traun / Edelweiss"
- **THEN** only Traun players are listed, keeping their league rank

### Requirement: Youth competitions excluded
Player rankings MUST NOT be shown for youth competitions.

#### Scenario: Youth competition
- **WHEN** a competition is configured as youth
- **THEN** no player statistics view exists for it
