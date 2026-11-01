# league-standings-schedule Specification

## Purpose
The Liga page shows the full Tabelle and the season Spielplan of one competition, readable on a phone first, with the user's showcase team marked.

## Requirements

### Requirement: Competition switch
The app SHALL offer the configured competitions (HLA Challenge West Hauptrunde 26/27, OÖHV Landesliga LLM-Grunddurchgang 26/27) and show one Liga page per competition, titled with competition, phase and season.

#### Scenario: Switch competition
- **WHEN** the user selects "Landesliga OÖ" on the HLA West page
- **THEN** the Landesliga Liga page is shown with its own table and schedule

### Requirement: Complete standings table
The Liga page SHALL show all teams of the group with Rang, full official team name, Spiele, Siege-Unentschieden-Niederlagen, Tore, Tordifferenz and Punkte, in nuLiga's order, as a semantic data table.

#### Scenario: HLA West table
- **WHEN** the HLA West page is opened with the 31.10.2026 data
- **THEN** 8 rows are shown, row 7 reads "SK Konstant Traun / Edelweiss", 6 Spiele, 3-0-3, 170:191, −21, 6 Punkte

#### Scenario: Screen reader
- **WHEN** a screen reader reads the table
- **THEN** column headers are announced for each cell

### Requirement: Phone fit without horizontal scrolling
At a viewport width of 390 px the page SHALL show every table column and the full team names without horizontal scrolling; long names MAY wrap to a second line.

#### Scenario: 390 px viewport
- **WHEN** the Liga page renders at 390 px width
- **THEN** the document scroll width equals the viewport width and no team name is truncated

### Requirement: Showcase team highlighted
The showcase team (SK Konstant Traun / Edelweiss and its Landesliga entry) SHALL be visually marked in the table and in the schedule.

#### Scenario: Traun row
- **WHEN** the HLA West table is shown
- **THEN** the Traun row is marked distinctly from other rows, not by colour alone

### Requirement: Season schedule by Runde
The page SHALL show the whole season's Spielplan grouped by Runde, opening on the current Runde (the first Runde with an unplayed match, or the last Runde when all are played), with controls to step to earlier and later Runden. Each match shows date, time, Spielnummer, home, away and result or "angesetzt".

#### Scenario: Current round on open
- **WHEN** the HLA West page opens on 31.10.2026
- **THEN** Runde 6 is shown with matches 21–24 and match 24 marked as not yet played

#### Scenario: Step rounds
- **WHEN** the user steps forward from Runde 6
- **THEN** Runde 7 is shown

### Requirement: Today marker
Matches on the current day (Europe/Vienna) SHALL be marked "Heute" in red in the schedule; red is otherwise reserved for the showcase team and navigation state.

#### Scenario: Match day
- **WHEN** the schedule shows a round with a match dated today
- **THEN** that day's heading reads "Heute" in red

### Requirement: Link to report
A played match with an imported report SHALL link to its Spielbericht; a report not yet approved by nuLiga MUST be labeled "noch nicht genehmigt".

#### Scenario: Unapproved report
- **WHEN** a played match's report is marked unapproved in the source
- **THEN** the match shows the label "noch nicht genehmigt" and still links to the report

### Requirement: Source and freshness
Every Liga page SHALL show "Quelle: nuLiga", the import time ("Stand"), and that this is an independent prototype not affiliated with ÖHB or nuLiga.

#### Scenario: Footer
- **WHEN** any Liga page renders
- **THEN** the source, Stand timestamp and independence note are visible

### Requirement: Empty and stale states
If no import exists for a competition the page SHALL say so instead of showing an empty table; if the newest import is older than 7 days the Stand MUST be marked as outdated.

#### Scenario: No data yet
- **WHEN** a configured competition has no imported dataset
- **THEN** the page states that no data has been imported yet
