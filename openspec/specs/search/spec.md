# search Specification

## Purpose
Lets users find a team or player across the configured competitions from any page, without knowing which competition or list they appear in.

## Requirements

### Requirement: Search field on every page
Every app page SHALL show a search field in the header that submits to a results page and works without JavaScript. On the home page without favorites, where the "Finde dein Team" search is the page's main content, the header search MUST NOT be shown, so that exactly one search field is visible.

#### Scenario: Search from the Liga page
- **WHEN** the user types "Traun" in the header search on the HLA West page and submits
- **THEN** the results page for "Traun" opens

#### Scenario: One search field on first visit
- **WHEN** a visitor without favorites opens the home page
- **THEN** exactly one search field is visible and it submits to the results page

#### Scenario: Header search on the home with favorites
- **WHEN** a visitor with favorites opens the home page
- **THEN** the header search is shown

### Requirement: Team results
The search SHALL match full official team names of all configured competitions, ignoring case and diacritics, and link each hit to the team page.

#### Scenario: Team in two competitions
- **WHEN** the user searches "traun"
- **THEN** "SK Konstant Traun / Edelweiss" (HLA Challenge West) and "Sportunion EDELWEISS Linz / SK Traun" (Landesliga OÖ) are listed with their competition

### Requirement: Player results
The search SHALL match player names from the nuLiga player rankings (handball statistics) of adult competitions, ignoring case and diacritics, showing team and competition and linking to the team page. Only ADR-005 fields MUST appear.

#### Scenario: Player by surname
- **WHEN** the user searches "strauch"
- **THEN** "STRAUCH, Tore" is listed with "SK Konstant Traun / Edelweiss" and HLA Challenge West

### Requirement: Repeated query parameters
A request with several `q` parameters SHALL use the first one and MUST NOT fail.

#### Scenario: Two q parameters
- **WHEN** the user opens `/suche?q=traun&q=linz`
- **THEN** the results for "traun" are shown

### Requirement: Minimum query and empty result
Queries shorter than 2 characters SHALL show a hint instead of results; a query without hits MUST say so.

#### Scenario: No hits
- **WHEN** the user searches "xyzq"
- **THEN** the page states that nothing was found for "xyzq"

### Requirement: Suggestions while typing
The header search SHALL suggest matching Bewerbe, teams and players after two characters without submitting; selecting a suggestion by pointer, touch, keyboard or an assistive technology's click activation opens its target; submitting still opens the results page.

#### Scenario: Type a surname
- **WHEN** the user types "hali"
- **THEN** "HALILOVIC, Maid" appears as a suggestion before submitting

#### Scenario: Click activation only
- **WHEN** a suggestion receives a click event without a preceding mousedown
- **THEN** its target opens

### Requirement: Competition results
The search SHALL match competition names, short names and Verband names, ignoring case and diacritics, and list matching Bewerbe before teams and players, in results and in suggestions.

#### Scenario: Search a league
- **WHEN** the user types "landes"
- **THEN** "Landesliga OÖ" appears as a suggestion and opens its Tabelle

### Requirement: Club name aliases
The search SHALL also match the official club ("Verein") names that the imported nuLiga statistics attribute to a team, ignoring case, diacritics and hyphens, and list the team as the hit.

#### Scenario: Search by club name
- **WHEN** the user searches "SK-Handball Traun"
- **THEN** "SK Konstant Traun / Edelweiss" (HLA Challenge West) is listed
