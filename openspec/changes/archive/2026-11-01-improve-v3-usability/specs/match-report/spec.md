# Spec Delta

## ADDED Requirements

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
