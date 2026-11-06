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

### Requirement: Spielverlauf
The report SHALL show the match timeline as published (minute, score after the event, event type, team side, shirt number and player name for goals, 7m, warnings, suspensions and disqualifications); events of team officials MUST be shown without name.

#### Scenario: First goal
- **WHEN** the report of match 23 is opened
- **THEN** the timeline starts with 02:12, 0:1, Tor, Gast, 15 HALILOVIC, Maid

### Requirement: Lineup legend
The lineup SHALL explain its abbreviations (Tore, 7m Tore/Versuche, Gelbe Karte, 2-Minuten, Disqualifikation) on the page.

#### Scenario: Legend visible
- **WHEN** a report renders
- **THEN** a legend for G, 2′ and D is visible near the lineups

### Requirement: Report summary
Above the lineups the report SHALL show a short summary per team: its top three scorers with goals, its 7m goals/attempts and its 2-minute suspensions. The full lineups below MUST stay unchanged.

#### Scenario: Match 23 summary
- **WHEN** the report of match 23 opens
- **THEN** the summary lists STRAUCH, Tore with 12 goals first for SK Konstant Traun / Edelweiss and SINZ, Georg with 9 goals first for Bregenz Handball FT, above both full lineups
