## ADDED Requirements

### Requirement: Follow-first information architecture
The system SHALL center the app on the user's followed teams, with competition
browsing available as a secondary mode rather than the primary entry point.

#### Scenario: First run with no followed teams
- **WHEN** a user with no followed teams opens the home page
- **THEN** the system presents a German onboarding to follow one or more teams
- **AND** stores only public team IDs in browser-local storage

#### Scenario: Primary navigation
- **WHEN** any page renders the primary navigation
- **THEN** it exposes "Meine Teams", "Entdecken", and "Suche"
- **AND** competition/table/schedule browsing lives under "Entdecken"

### Requirement: Personal team dashboard
The system SHALL render a personal dashboard for the active followed team using
widget tiles for the next match, form, table position, and last result, and SHALL
let the user switch the active team.

#### Scenario: Dashboard after following a team
- **WHEN** the user follows at least one team
- **THEN** the home page shows that team's widget board (next match, form, table, last result, quick links)
- **AND** a switcher lets the user change the active team

#### Scenario: Cross-team upcoming fixtures
- **WHEN** the user follows multiple teams
- **THEN** the dashboard shows the next fixture across all followed teams

### Requirement: Adaptive team theming
The system SHALL tint the interface to the active team's cosmetic accent color, and
SHALL tint team and match pages to the relevant team. The accent is UI-only and not
personal data.

#### Scenario: Switching the active team
- **WHEN** the user selects a different followed team
- **THEN** the chrome and tiles re-tint to that team's accent color

#### Scenario: Team and match pages
- **WHEN** a team page or match report renders
- **THEN** it is tinted to the relevant team's accent color

### Requirement: Explore mode
The system SHALL provide an Explore section for browsing competitions, standings,
schedules, and HLA phases, without making it the home page.

#### Scenario: Browsing from Explore
- **WHEN** the user opens Entdecken and selects a competition
- **THEN** the system offers its schedule and standings
- **AND** mobile standings render as scannable rows distinct from the desktop table

### Requirement: Preserved data and privacy boundaries
The system SHALL reuse the existing domain layer and preserve all data and privacy
boundaries while presenting the new IA.

#### Scenario: Player statistics remain gated
- **WHEN** a match's player statistics are not publicly releasable
- **THEN** the report shows the existing German privacy-gate explanation unchanged
- **AND** no contacts, referee data, source-person IDs, or portrait links are rendered

### Requirement: Motion is reduced-motion safe
The system SHALL apply entrance and switch motion that is disabled when the user
requests reduced motion, and SHALL never leave content hidden when motion is off.

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** dashboard tiles and transitions render without animation
- **AND** all content remains visible and usable
