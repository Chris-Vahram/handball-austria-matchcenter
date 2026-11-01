# match-report Specification

## Purpose
The Spielbericht page shows one match's public report data from nuLiga in a readable form, limited to the fields the privacy rules allow.

## Requirements

### Requirement: Match information
The report page SHALL show Spielnummer, date, time, venue name, home and away team (full names), final score, halftime score when published, and the approval status.

#### Scenario: Approved report
- **WHEN** the report of match 23 (Bregenz Handball FT vs SK Konstant Traun / Edelweiss) is opened
- **THEN** match number, date 31.10.2026, venue, 37:35 and its approval status are shown

### Requirement: Lineups with allowed fields only
For each team the page SHALL list players with Trikotnummer, name, Tore, 7m (Tore/Versuche), gelbe Karte, 2-Minuten and Disqualifikation. No other person data MUST appear.

#### Scenario: No officials or referees
- **WHEN** any report page renders
- **THEN** no referee, Zeitnehmer or Mannschaftsoffizielle names are present in the page

### Requirement: Team totals
The page SHALL show per-team totals for Tore, 7-Meter (Versuche/Tore), 2-Minuten and Timeouts as published.

#### Scenario: Totals match lineup
- **WHEN** the lineup goals of a team are summed
- **THEN** the sum equals the team's goals in the final score

### Requirement: Phone layout
At 390 px width the lineup SHALL be readable without horizontal scrolling.

#### Scenario: 390 px report
- **WHEN** a report renders at 390 px
- **THEN** the document scroll width equals the viewport width
