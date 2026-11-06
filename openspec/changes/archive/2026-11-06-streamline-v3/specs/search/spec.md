## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Suggestions while typing
The header search SHALL suggest matching Bewerbe, teams and players after two characters without submitting; selecting a suggestion by pointer, touch, keyboard or an assistive technology's click activation opens its target; submitting still opens the results page.

#### Scenario: Type a surname
- **WHEN** the user types "hali"
- **THEN** "HALILOVIC, Maid" appears as a suggestion before submitting

#### Scenario: Click activation only
- **WHEN** a suggestion receives a click event without a preceding mousedown
- **THEN** its target opens
