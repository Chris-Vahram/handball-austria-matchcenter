## MODIFIED Requirements

### Requirement: Competition switch
Every Bewerb page SHALL show a "Verband › Bewerb" line above its title, where the Verband links to the competition overview scrolled to that Verband's section; the overview MUST always list all Verbände and their Bewerbe (no exclusive filter), and the navigation MUST NOT depend on the number of configured competitions.

#### Scenario: Switch competition
- **WHEN** the user on the HLA West page taps "ÖHB", then "Landesliga OÖ" in the OÖHV section of the overview
- **THEN** the Landesliga Liga page is shown with its own table and schedule

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

### Requirement: Tabs are real pages
The competition tabs SHALL be Tabelle, Spielplan and Statistik, each a separate page with exactly one active tab; sub-pages (team, report, preview, full ranking lists) show a compact breadcrumb instead of a second large competition heading.

#### Scenario: Active tab
- **WHEN** the user opens the Spielplan tab
- **THEN** the Spielplan tab is marked active and the page shows the schedule

### Requirement: Compact match rows
Match rows SHALL show home and away team on separate lines, each score on the same line as its team in the figure style, and keep the meta line to match number and venue name (linking to the venue); approval and rescheduling notes appear only when they apply. A match dated before today (Europe/Vienna) without a result SHALL show "Ergebnis ausständig". Rows of played matches with a report link to the report; rows of matches without a result link to the preview.

#### Scenario: Played match
- **WHEN** match 23 is listed
- **THEN** 37 is on the line of Bregenz Handball FT, 35 on the line of SK Konstant Traun / Edelweiss, the score is the most prominent figure in the row and the venue links to its venue page

#### Scenario: Result missing
- **WHEN** a match dated before today has no result
- **THEN** its row shows "Ergebnis ausständig" instead of an empty score

## REMOVED Requirements

### Requirement: Showcase team highlighted
**Reason**: Replaced by favorites: highlighting a hard-coded showcase team does not scale to all of Austria.
**Migration**: Rows of favorite teams are highlighted (see Favorite teams highlighted).

## ADDED Requirements

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
