# league-standings-schedule Specification

## Purpose
The Liga page shows the full Tabelle and the season Spielplan of one competition, readable on a phone first, with the user's showcase team marked.

## Requirements

### Requirement: Competition switch
Every Bewerb page SHALL show a "Verband › Bewerb" line above its title, where the Verband links to the competition overview scrolled to that Verband's section; the overview MUST always list all Verbände and their Bewerbe (no exclusive filter), and the navigation MUST NOT depend on the number of configured competitions.

#### Scenario: Switch competition
- **WHEN** the user on the HLA West page taps "ÖHB", then "Landesliga OÖ" in the OÖHV section of the overview
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

### Requirement: Season schedule by Runde
The page SHALL show the whole season's Spielplan grouped by Runde, opening on the current Runde: the Runde of the earliest match dated today or later (Europe/Vienna), or the last Runde when no such match exists. Matches dated before today without a result MUST NOT hold back the current Runde. Controls step to earlier and later Runden. Each match shows date, time, Spielnummer, home, away and result, "angesetzt" or "Ergebnis ausständig".

#### Scenario: Current round on open
- **WHEN** the HLA West page opens on 06.11.2026 with the 05.11.2026 data
- **THEN** Runde 7 is shown

#### Scenario: Postponed match
- **WHEN** a Runde-6 match was moved to February and the page opens in January
- **THEN** the Runde of the next dated match is shown, and the moved match appears in its Runde with its new date

#### Scenario: Step rounds
- **WHEN** the user steps forward from Runde 7
- **THEN** Runde 8 is shown

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

### Requirement: Visible link affordance
Every element that navigates SHALL look interactive without hover: match rows carry a chevron, team names in tables are styled as links.

#### Scenario: Phone
- **WHEN** the Tabelle renders at 390 px
- **THEN** team names are visibly marked as links and each played match row shows a chevron

### Requirement: Tabs are real pages
The competition tabs SHALL be Tabelle, Spielplan and Statistik, each a separate page with exactly one active tab; sub-pages (team, report, preview, full ranking lists) show a compact breadcrumb instead of a second large competition heading.

#### Scenario: Active tab
- **WHEN** the user opens the Spielplan tab
- **THEN** the Spielplan tab is marked active and the page shows the schedule

### Requirement: Round picker
The Spielplan page SHALL let the user jump to any Runde directly (with its date span), besides stepping, and works without JavaScript.

#### Scenario: Jump
- **WHEN** the user picks Runde 10
- **THEN** Runde 10 is shown

### Requirement: Compact match rows
Match rows SHALL show home and away team on separate lines, each score on the same line as its team in the figure style, and keep the meta line to match number and venue name (linking to the venue); approval and rescheduling notes appear only when they apply. A match dated before today (Europe/Vienna) without a result SHALL show "Ergebnis ausständig". Rows of played matches with a report link to the report; rows of matches without a result link to the preview.

#### Scenario: Played match
- **WHEN** match 23 is listed
- **THEN** 37 is on the line of Bregenz Handball FT, 35 on the line of SK Konstant Traun / Edelweiss, the score is the most prominent figure in the row and the venue links to its venue page

#### Scenario: Result missing
- **WHEN** a match dated before today has no result
- **THEN** its row shows "Ergebnis ausständig" instead of an empty score

### Requirement: Favorite teams highlighted
Tables, match rows and ranking lists SHALL highlight the visitor's favorite teams; without favorites no row is highlighted.

#### Scenario: Traun is a favorite
- **WHEN** Traun is a favorite and the HLA West Tabelle opens
- **THEN** the Traun row is tinted and its name is red

#### Scenario: Internal navigation
- **WHEN** Traun is a favorite and the user moves Tabelle → Statistik → Spielplan via links, the round picker and browser back, without a reload
- **THEN** Traun's rows are highlighted on every page

#### Scenario: No favorites
- **WHEN** a visitor without favorites opens the HLA West Tabelle
- **THEN** no row is highlighted
