# team-pages Specification

## Purpose
One page per team and competition that gathers what a player, coach or fan of that team looks up: standing, form, next match, all fixtures and results, team statistics and the team's players in the rankings.

## Requirements

### Requirement: Team page per competition
The app SHALL provide a page for every team in every configured competition, reachable from the team's name in the table and from search, titled with the full official team name.

#### Scenario: Open Traun from the table
- **WHEN** the user taps "SK Konstant Traun / Edelweiss" in the HLA West table
- **THEN** the Traun team page opens showing rank 7, 6 points, 3-0-3 and 170:191

### Requirement: Fixtures and results of the team
The team page SHALL list all of the team's matches of the season in date order with opponent, home/away, date, time, result or "angesetzt", linking played matches to their Spielbericht, and SHALL show the next unplayed match prominently.

#### Scenario: Next match
- **WHEN** the Traun HLA page is opened with the 31.10.2026 data
- **THEN** the next match shown is Nr. 25 against SMC Innsbruck Handball Tirol on 15.11.2026

### Requirement: Form and home/away record
The team page SHALL show the last five results and the record split into home and away games, derived from the schedule.

#### Scenario: Record split
- **WHEN** the team page is shown
- **THEN** home and away wins, draws and losses add up to the team's S-U-N in the table

### Requirement: Team statistics and players
The team page SHALL show the team's statistics from nuLiga's team statistics (goals, 7m, suspensions, cards, spectators per game) and a player table merged from the five rankings (goals, 7m goals/attempts, suspensions, yellow, red) for adult competitions.

#### Scenario: Traun players
- **WHEN** the Traun HLA page is shown
- **THEN** HALILOVIC, Maid is listed with 35 goals and the table contains no personal data beyond ADR-005 fields

### Requirement: No contact data
Team pages MUST NOT show team officials, contact persons or phone numbers, even though nuLiga's team portrait publishes them.

#### Scenario: Officials
- **WHEN** any team page renders
- **THEN** no "Mannschaftsverantwortlicher", phone number or e-mail appears

### Requirement: Results and upcoming split
The team page SHALL list played matches under "Ergebnisse" (newest first, each with a Sieg/Unentschieden/Niederlage mark) separately from "Kommende Spiele" (soonest first), and offer "Als Mein Team merken" and the calendar export.

#### Scenario: Traun after round 6
- **WHEN** the Traun HLA page is opened with the 01.11.2026 data
- **THEN** Ergebnisse lists 6 matches starting with 35:37 in Bregenz marked as Niederlage, and Kommende Spiele lists 8 matches starting with 15.11.2026
