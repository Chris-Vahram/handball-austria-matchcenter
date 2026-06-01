# Functional Specification Document

## 1. Project Overview

### Project Title

handball-austria-matchcenter

### Short Description

The project is an independent public handball match center pilot for Austria. It
shall present selected publicly visible competition data with a modern,
mobile-first German user interface. The first demo competition is the OOHV
Maenner Landesliga. The architecture shall allow additional OOHV and OEHB
competitions to be added later, including Elite Cup MU18 and HLA CHALLENGE.

### Background and Current Situation

Public handball information is available through association websites, but users
need a faster and clearer way to find schedules, standings, clubs, teams, venues,
results, and match status on mobile devices.

### Problem Statement

Players, parents, trainers, and fans need to navigate fragmented or dense public
competition views to answer simple questions: when is the next match, where is
the venue, what is the result, and what is the current table?

### Project Goals

- Build a clickable, production-like pilot with a polished UI.
- Prioritize fast mobile access to public competition information.
- Support multiple competitions without redesigning the domain model.
- Use only approved public sports data and keep data-source provenance visible.
- Prepare a clean path to an official API, export, or cooperation agreement.

## 2. Scope

### In Scope

- German-language light UI with dark blue, white, and red design tokens.
- Landing page with current and upcoming matches.
- Schedule view with competition, date, club, team, and venue filters.
- Standings view.
- Team page with match schedule and summary information.
- Club page with associated teams and matches.
- Search for competitions, clubs, teams, and venues.
- Small manually curated demo sample based on publicly visible sports data.
- Initial OOHV Maenner Landesliga demo.
- Domain model prepared for OOHV and OEHB competitions.

### Out of Scope

- Automated scraping before explicit legal and organizational approval.
- Player lists, private contacts, phone numbers, email addresses, referee data,
  and other personal detail data.
- Login, administration, editing, and official result entry.
- Live score ingestion unless an approved source is available.
- Calendar export and Apple Calendar integration in the first MVP.
- English UI and dark mode in the first MVP.

## 3. Users and Stakeholders

### Primary Users

- Fans checking scores, fixtures, and standings.
- Players checking their next match.
- Parents checking time and venue information.
- Trainers checking schedules and tables.

### Secondary Users

- Club representatives reviewing public presentation quality.
- Association representatives evaluating the pilot.

### Stakeholders

- Pilot owner and development team.
- OOHV and OEHB representatives.
- Potential approved data-source provider.

## 4. Use Cases / User Scenarios

### UC-01 Find the Next Match

A player searches for a team, opens the team page, and sees the next fixture with
date, time, competition, venue, and status.

### UC-02 Find a Venue

A parent opens a match card from the schedule and sees the hall name and location
information without navigating through unrelated data.

### UC-03 Check the Table

A fan selects OOHV Maenner Landesliga and opens the standings view to compare
rank, team, matches played, points, and goal difference.

## 5. Functional Requirements

- **FR-01:** The system shall show current and upcoming matches on the landing
  page.
- **FR-02:** The system shall allow users to select a competition and season.
- **FR-03:** The system shall show a schedule for the selected competition.
- **FR-04:** The schedule shall support filters for date, club, team, and venue
  where applicable.
- **FR-05:** A match card shall show competition, participating teams, date,
  time, venue, result when available, and match status.
- **FR-06:** The system shall show standings for a selected competition and
  season.
- **FR-07:** A standings row shall show rank, team, matches played, relevant
  scoring values, goal difference, and points where provided by source data.
- **FR-08:** The system shall provide team pages with team identity, club,
  competition context, and matches.
- **FR-09:** The system shall provide club pages with club identity, associated
  teams, and relevant matches.
- **FR-10:** The system shall provide search for competitions, clubs, teams, and
  venues.
- **FR-11:** The system shall present loading, empty, and error states.
- **FR-12:** The data layer shall validate imported or manually curated data
  before displaying it.
- **FR-13:** The domain model shall support adding further competitions without
  changing page-level contracts.
- **FR-14:** Each displayed dataset shall retain source and update metadata.

## 6. Non-Functional Requirements

### Usability

- Core paths shall be usable on narrow mobile screens.
- Main information shall be reachable with few navigation steps.
- German labels shall be understandable without association-system knowledge.

### Performance

- Static or cached pilot data shall load quickly on typical mobile connections.
- Lists shall avoid unnecessary client-side work.

### Reliability

- Invalid records shall fail validation during import or development checks.
- Missing optional values shall use explicit fallback states.

### Maintainability

- Domain schemas, data access, and presentation components shall remain separate.
- Core domain validation and filtering logic shall be covered by tests.

### Accessibility

- Semantic HTML, keyboard access, visible focus states, adequate contrast, and
  meaningful labels are required.

## 7. Data and Content

### Allowed Data

- Association, competition, season, club, team, match, date, time, venue,
  result, standings, and match status.

### Excluded Data

- Player lists, private contacts, phone numbers, email addresses, referee data,
  and personal detail data.

### Provenance

The MVP may use a small manually curated sample of publicly visible sports data.
Productive synchronization requires an approved official interface, approved
export, or written permission.

## 8. Business Rules / Logic

- A competition belongs to an association and has one or more seasons.
- A team belongs to a club.
- A match references a competition, season, home team, away team, and venue when
  known.
- A finished match may display a result.
- An upcoming match shall not display a final result.
- A standings table must identify its competition, season, and source update
  time.
- Personal detail records shall not be imported.

## 9. Error Handling / Edge Cases

- Missing venue: show a clear unavailable message.
- Postponed or cancelled match: show status instead of implying normal schedule.
- Missing result: show status or pending result state.
- Empty filters: show an empty-state message and reset action.
- Invalid curated data: fail validation before application use.
- Stale source data: show source update metadata.

## 10. Assumptions and Dependencies

- Initial implementation uses curated demo data.
- OOHV and OEHB productive data access still requires clarification.
- Public OEHB competition pages currently expose relevant sports information.
- An official nuPortalRS REST interface exists, but Austria-specific access and
  permission are open questions.

## 11. Acceptance Criteria

- OOHV Maenner Landesliga can be selected as the initial demo competition.
- Landing page, schedule, standings, team, club, and search flows are clickable.
- UI works on mobile and desktop viewports.
- Only allowed sports data appears in fixtures.
- Imported fixture data passes schema validation.
- Loading, empty, and error states exist for major list views.
- Automated tests cover core validation and filtering logic.

## 12. Open Questions

- Which official or approved data source will power the productive pilot?
- Who grants OEHB and OOHV data-use permission?
- Which exact season and curated match sample should seed the first UI demo?
- Which HLA brand assets may legally be used?
- Is venue address display approved when already publicly visible?
