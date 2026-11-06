# Spec Delta

## ADDED Requirements

### Requirement: Visible link affordance
Every element that navigates SHALL look interactive without hover: match rows carry a chevron, team names in tables are styled as links.

#### Scenario: Phone
- **WHEN** the Tabelle renders at 390 px
- **THEN** team names are visibly marked as links and each played match row shows a chevron

### Requirement: Tabs are real pages
The competition tabs SHALL be Tabelle, Spielplan, Ranglisten and Statistik, each a separate page with exactly one active tab; sub-pages (team, report) show a compact breadcrumb instead of a second large competition heading.

#### Scenario: Active tab
- **WHEN** the user opens the Spielplan tab
- **THEN** the Spielplan tab is marked active and the page shows the schedule

### Requirement: Round picker
The Spielplan page SHALL let the user jump to any Runde directly (with its date span), besides stepping, and works without JavaScript.

#### Scenario: Jump
- **WHEN** the user picks Runde 10
- **THEN** Runde 10 is shown

### Requirement: Compact match rows
Match rows SHALL show the score in the figure style and keep the meta line to match number and venue name (linking to the venue); approval and rescheduling notes appear only when they apply.

#### Scenario: Played match
- **WHEN** match 23 is listed
- **THEN** the score 37:35 is the most prominent figure in the row and the venue links to its venue page
