## Purpose

Gives a scheduled match its own page so players, coaches and fans can prepare for it (where, when, how both teams stand) using only imported nuLiga data.

## ADDED Requirements

### Requirement: Preview for every scheduled match
The app SHALL provide a preview page for every match of a configured competition that has no result yet, reachable from the match row in Liga, Spielplan, the team page and the home. When a match has a Spielbericht, its row SHALL link to the report instead, and the preview address SHALL forward to the report.

#### Scenario: Open the next Traun match
- **WHEN** the user taps match Nr. 25 (SK Konstant Traun / Edelweiss vs SMC Innsbruck Handball Tirol, 15.11.2026) in Runde 7
- **THEN** the preview of match 25 opens

#### Scenario: Match already reported
- **WHEN** the preview address of a match with a Spielbericht is opened
- **THEN** the user lands on that match's Spielbericht

### Requirement: Preview content
The preview SHALL show Spielnummer, Runde, date, time, both full official team names, the venue with address, route link and resin rule when known, both teams' table position, points and S-U-N, both teams' last five results, all earlier meetings of the two teams in the same competition this season with score and report link, and each team's top three scorers from the rankings. It MUST NOT show any field outside ADR-005.

#### Scenario: Earlier meeting exists
- **WHEN** the preview of a second-leg match is opened and the first leg was played
- **THEN** the first-leg score is listed and links to its Spielbericht

#### Scenario: No earlier meeting
- **WHEN** the two teams have not met this season
- **THEN** the section says "Erstes Duell in dieser Saison"

### Requirement: Preview phone layout
The preview SHALL fit 390 px without horizontal scrolling and show date, teams and venue in the first viewport.

#### Scenario: 390 px preview
- **WHEN** a preview renders at 390 × 844
- **THEN** the document scroll width equals the viewport width and the venue is visible without scrolling
