# league-statistics Specification

## Purpose
The league's group and team statistics from nuLiga ("Gruppen- und Mannschaftsstatistik") as one comparable table, so coaches can compare scoring, 7m efficiency, discipline and attendance across teams.

## Requirements

### Requirement: Group statistics
The Statistik view SHALL show the group totals and per-game averages for goals, 7m attempts and goals, 7m rate, suspensions, yellow and red cards, spectators and the home/away/draw split, with the number of games played.

#### Scenario: HLA West group totals
- **WHEN** the Statistik view of HLA West opens with the 31.10.2026 data
- **THEN** it shows 23 of 56 games, 1351 goals and 17 home wins / 6 away wins / 0 draws

### Requirement: Team comparison
The Statistik view SHALL list every team with its per-game values in one table that fits 390 px without horizontal scrolling, highlighting the showcase team.

#### Scenario: Phone
- **WHEN** the Statistik view renders at 390 px
- **THEN** the document scroll width equals the viewport width

### Requirement: Statistik tab order
The Statistik tab SHALL show, in this order, the Torschützen top 10, the team comparison and the group totals, so the most asked figure comes first.

#### Scenario: Open Statistik
- **WHEN** the Statistik tab of HLA West opens on a 390 px phone
- **THEN** the Torschützen top 10 heading is the first section below the tabs
