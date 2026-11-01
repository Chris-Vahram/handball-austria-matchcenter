# table-schedule-print Specification

## Purpose
Our own printable "Tabelle & Spielplan" document per competition, generated from the same imported data as the Liga page, replacing the link to nuLiga's PDF.

## Requirements

### Requirement: Printable table and schedule
For each competition the app SHALL provide a "Tabelle & Spielplan (PDF)" action that produces an A4 document with the full table and the whole season schedule, the same data as the Liga page.

#### Scenario: Download from Liga page
- **WHEN** the user taps "Tabelle & Spielplan als PDF" on the HLA West page
- **THEN** an A4 document opens containing all 8 table rows and every match of the season

### Requirement: Source on the document
The document SHALL show competition, season, "Quelle: nuLiga", the Stand timestamp and the independence note.

#### Scenario: Footer on every page
- **WHEN** the document spans more than one page
- **THEN** each page shows source and Stand

### Requirement: Privacy parity
The document MUST NOT contain data the Liga page does not show, in particular no referee initials.

#### Scenario: Unplayed matches
- **WHEN** the schedule includes unplayed matches
- **THEN** they show date, time and teams, and no referee text
