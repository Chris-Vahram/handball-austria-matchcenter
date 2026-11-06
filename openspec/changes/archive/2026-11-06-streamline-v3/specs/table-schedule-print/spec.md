## MODIFIED Requirements

### Requirement: Printable table and schedule
For each competition the app SHALL provide a "Tabelle & Spielplan (PDF)" action that produces an A4 document with the full table and the whole season schedule, the same data as the Liga page. The action SHALL appear as a secondary link on the Tabelle and Spielplan pages only.

#### Scenario: Download from Liga page
- **WHEN** the user taps "Tabelle & Spielplan als PDF" on the HLA West page
- **THEN** an A4 document opens containing all 8 table rows and every match of the season

#### Scenario: Not on other pages
- **WHEN** a Spielbericht, team page or the home page is shown
- **THEN** no PDF action is shown
