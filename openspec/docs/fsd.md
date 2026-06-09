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

The current product direction is a targeted nuLiga sales prototype. The
prototype shall demonstrate a clearer alternative to dense existing competition
views by focusing on the main user questions: which team am I looking at, when
is the next match, where is the hall, what was the result, where are we in the
table, and what happened in the match report.

Current sales-preview status:

- Private GitHub repository and Vercel preview deployment exist.
- Pitch route: `/pitch`.
- Guided demo route: `/demo`.
- Sales documents exist in `docs/sales-pitch.md` and
  `docs/nuliga-email-template.md`.
- Reviewed screenshots are generated locally under ignored `output/playwright/`.
- The preview remains a targeted unlisted demo, not a public launch.

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
- Make the prototype understandable for players, parents, trainers, fans, and
  club officials without requiring nuLiga system knowledge.
- Provide a focused pitch/demo path for a targeted preview to nuLiga or nu GmbH.
- Provide a concise outreach package for OEHB and nuLiga stakeholders.

## 2. Scope

### In Scope

- German-language light UI with dark blue, white, and red design tokens.
- Landing page with current and upcoming matches.
- Schedule view with competition, date, club, team, and venue filters.
- Standings view.
- Team page with match schedule and summary information.
- Club page with associated teams and matches.
- Search for competitions, clubs, teams, and venues.
- Browser-local favorite selection and personalized next-match entry point.
- First-visit team-selection onboarding for a stronger aha moment.
- Team insight page with next match, last result, table position, form curve,
  and links to relevant match reports.
- Internal match report demo with approved adult player statistics, team
  totals, and event timeline.
- Dedicated pitch/demo page explaining problem, solution, target users,
  privacy boundaries, and demo flow before sending a targeted preview.
- Sales handoff material with pitch document, email template, and recommended
  screenshots.
- Small manually curated demo sample based on publicly visible sports data.
- Initial OOHV Maenner Landesliga demo.
- Domain model prepared for OOHV and OEHB competitions.

### Out of Scope

- Automated scraping before explicit legal and organizational approval.
- U18 player-level publication unless separately approved.
- Private contacts, phone numbers, email addresses, referee data, source person
  IDs, player portrait links, and unrelated personal detail data.
- Login, administration, editing, and official result entry.
- Live score ingestion unless an approved source is available.
- English UI and dark mode in the first MVP.
- Native app distribution, push notifications, productive result entry, and full
  report import for every public match before the first targeted sales preview.

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
- OEHB contact path for content and competition ownership.
- nu Datenautomaten GmbH contact path for nuLiga software/product ownership.

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

### UC-04 Save a Favorite Team

A parent or player opens the prototype for the first time, selects a team as a
local favorite, and later lands directly on the next relevant match and team
context.

### UC-05 Review a Match Report

A user opens a highlighted demo match report and sees result, venue, team
statistics, approved adult player statistics, seven-metre information,
two-minute penalties, and a chronological event timeline.

### UC-06 Evaluate the Sales Demo

A nuLiga or association representative opens a dedicated demo page and quickly
understands the problem, proposed solution, target audiences, data boundaries,
and suggested next discussion step.

### UC-07 Send a Targeted Outreach Package

The pilot owner sends a short email with the pitch link, guided demo link, and
selected screenshots to the verified OEHB contact path and requests a
20-minute feedback discussion.

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
- **FR-15:** The system shall provide a first-visit team selection prompt that
  helps users personalize the landing page without creating an account.
- **FR-16:** The system shall store favorites only as browser-local public entity
  IDs and shall keep browsing usable when local storage is unavailable.
- **FR-17:** The landing page shall prominently link to a complete demo match
  report that demonstrates the prototype's strongest matchcenter experience.
- **FR-18:** Team pages shall summarize next match, latest result, table
  position, form curve, and relevant match-report links when data is available.
- **FR-19:** The system shall display approved adult player-level match-report
  statistics only for competitions with an approved publication profile.
- **FR-20:** The system shall keep U18 player-level statistics hidden unless a
  separate documented approval exists.
- **FR-21:** The system shall provide a dedicated pitch/demo page for targeted
  preview recipients.
- **FR-22:** The pitch/demo page shall explain pilot status, data source
  boundaries, privacy decisions, and the recommended demo flow.
- **FR-23:** The repository shall include a concise sales pitch document and
  outreach email template for the targeted preview.
- **FR-24:** The sales handoff documentation shall state that the prototype is
  independent, unlisted, fixture-backed, and not an official nuLiga or OEHB
  product.

## 6. Non-Functional Requirements

### Usability

- Core paths shall be usable on narrow mobile screens.
- Main information shall be reachable with few navigation steps.
- German labels shall be understandable without association-system knowledge.
- The first-time experience shall guide non-technical users toward their team
  before exposing dense competition structures.

### Performance

- Static or cached pilot data shall load quickly on typical mobile connections.
- Lists shall avoid unnecessary client-side work.
- Personalization shall remain lightweight and not introduce a remote user
  account or analytics dependency.

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

- U18 player-level statistics unless separately approved.
- Private contacts, phone numbers, email addresses, referee data, source person
  IDs, player portrait links, and unrelated personal detail data.

### Conditionally Allowed Data

- Adult player-level sports statistics from reviewed public match reports when
  a publication profile explicitly approves display.

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
- Adult player statistics may be displayed only from reviewed public source
  records and only for approved competitions.
- U18 player statistics shall remain hidden without a separate approval.
- Local favorites shall not be sent to a remote service.

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
- The first verified OEHB outreach path is the public OEHB office contact.
- A direct nu Datenautomaten product email is not yet verified; use the nuLiga
  imprint contact path or phone route before sending product material directly.

## 11. Acceptance Criteria

- OOHV Maenner Landesliga can be selected as the initial demo competition.
- Landing page, schedule, standings, team, club, and search flows are clickable.
- UI works on mobile and desktop viewports.
- Only allowed sports data appears in fixtures.
- Imported fixture data passes schema validation.
- Loading, empty, and error states exist for major list views.
- Automated tests cover core validation and filtering logic.
- First-visit users can select a team favorite and return to a personalized
  landing experience.
- A team page shows next match, latest result, table position, and form curve
  using validated demo data.
- A dedicated pitch/demo page is reachable and explains the prototype value and
  boundaries.
- The highlighted demo match report remains reachable from the landing page.
- A dedicated `/pitch` page is reachable from the preview deployment and footer.
- Sales pitch and email template files exist in `docs/`.
- The Vercel preview can be shared as an unlisted targeted preview.

## 12. Open Questions

- Which official or approved data source will power the productive pilot?
- Who grants OEHB and OOHV data-use permission?
- Which exact season and curated match sample should seed the first UI demo?
- Which HLA brand assets may legally be used?
- Is venue address display approved when already publicly visible?
- Which named person at OEHB or nu Datenautomaten should receive the targeted
  preview after the first contact?
- Should the first targeted preview be unlisted, password-protected, or shared
  only inside a private call?
- Should the pitch package be converted into a one-page PDF before first send?
