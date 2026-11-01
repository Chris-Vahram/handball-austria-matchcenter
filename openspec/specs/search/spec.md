# search Specification

## Purpose
Lets users find a team or player across the configured competitions from any page, without knowing which competition or list they appear in.

## Requirements

### Requirement: Search field on every page
Every app page SHALL show a search field in the header that submits to a results page and works without JavaScript.

#### Scenario: Search from the Liga page
- **WHEN** the user types "Traun" in the header search on the HLA West page and submits
- **THEN** the results page for "Traun" opens

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
