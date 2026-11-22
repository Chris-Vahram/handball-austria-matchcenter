# Spec Delta

## MODIFIED Requirements

### Requirement: Team results
The search SHALL match full official team names of all imported Bewerbe, ignoring case and diacritics, and link each hit to the team page, showing its Bewerb and Verband.

#### Scenario: Team in two competitions
- **WHEN** the user searches "traun"
- **THEN** "SK Konstant Traun / Edelweiss" (HLA Challenge West) and "Sportunion EDELWEISS Linz / SK Traun" (Landesliga OÖ) are listed with their competition

#### Scenario: Team in many Bewerbe
- **WHEN** a club has teams in Männer, Cup and several youth Bewerbe
- **THEN** each team is listed once per Bewerb with Bewerb and Verband, Erwachsene before Jugend

### Requirement: Player results
The search SHALL match player names from the nuLiga player rankings of all imported Bewerbe, ignoring case and diacritics, showing team and competition and linking to the team page. Only ADR-005 fields MUST appear.

#### Scenario: Player by surname
- **WHEN** the user searches "strauch"
- **THEN** "STRAUCH, Tore" is listed with "SK Konstant Traun / Edelweiss" and HLA Challenge West

### Requirement: Suggestions while typing
The header search SHALL suggest at most 8 matching Bewerbe, teams and players after two characters without submitting, filtered on the server so the page never downloads the full index; selecting a suggestion by pointer, touch, keyboard or an assistive technology's click activation opens its target; submitting still opens the results page.

#### Scenario: Type a surname
- **WHEN** the user types "hali"
- **THEN** "HALILOVIC, Maid" appears as a suggestion before submitting

#### Scenario: Click activation only
- **WHEN** a suggestion receives a click event without a preceding mousedown
- **THEN** its target opens

#### Scenario: National index stays small
- **WHEN** the user types "wi" with all Austrian Bewerbe imported
- **THEN** at most 8 suggestions arrive and the response is a small filtered list, not the full index

## ADDED Requirements

### Requirement: Paged results
The results page SHALL show at most 20 hits per kind (Bewerbe, teams, players) with a way to see more.

#### Scenario: Common surname
- **WHEN** the user searches a surname with more than 20 player hits
- **THEN** 20 players are shown with a "Weitere anzeigen" link
