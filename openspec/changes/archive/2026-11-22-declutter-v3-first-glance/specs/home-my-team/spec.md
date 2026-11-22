# Spec Delta

## MODIFIED Requirements

### Requirement: Remember my team on the device
The visitor SHALL be able to follow teams and Bewerbe as favorites with a ★ control on the team page and on the Bewerb pages; following and unfollowing MUST take one tap, the choice MUST be stored only in the visitor's browser, and the home page MUST NOT list all teams for selection.

#### Scenario: First visit
- **WHEN** a visitor opens the home page without stored favorites
- **THEN** exactly one search field for team, Verein or Bewerb is shown, with a one-line hint that ★ on a team or Bewerb adds it here, followed by one short row per Verband linking to that Verband on the Bewerbe page, and no team checklist and no list of all Bewerbe

#### Scenario: Pick a team
- **WHEN** the visitor taps ★ on the team page of "SK Konstant Traun / Edelweiss" (HLA) and on "Sportunion EDELWEISS Linz / SK Traun" (Landesliga)
- **THEN** the home page shows both teams in its lists on this and later visits

#### Scenario: Follow a Bewerb
- **WHEN** the visitor taps ★ on the HLA Challenge West Tabelle
- **THEN** the home page lists HLA Challenge West under "Meine Bewerbe" on this and later visits

### Requirement: My team dashboard
With favorites, the home page SHALL show three compact lists: "Meine nächsten Spiele" (one row per favorite team: its next match, i.e. the earliest unplayed match dated today or later, with date, time and both full team names, soonest first, linking to the preview), "Zuletzt" (one row per favorite team: last result with S/U/N mark, linking to the report) and "Meine Bewerbe" (one row per followed Bewerb and per Bewerb of a favorite team, deduplicated). It MUST NOT repeat the full Bewerbe directory.

#### Scenario: Traun dashboard
- **WHEN** Traun is a favorite and the 05.11.2026 data is loaded on 06.11.2026
- **THEN** "Meine nächsten Spiele" has one row for 15.11.2026 with "SK Konstant Traun / Edelweiss" and "SMC Innsbruck Handball Tirol", Traun highlighted, linking to the preview of that match

#### Scenario: Last result row
- **WHEN** Traun is a favorite and its last played match was 35:37 in Bregenz
- **THEN** "Zuletzt" shows a row marked N with 35:37 against Bregenz Handball FT linking to its Spielbericht

#### Scenario: Bewerb overview
- **WHEN** Traun is a favorite team and HLA Challenge West is not followed
- **THEN** "Meine Bewerbe" still lists HLA Challenge West once, showing Traun's rank and points, linking to the Tabelle

#### Scenario: Bewerb row without favorite team
- **WHEN** only Landesliga OÖ is followed and no favorite team plays in it
- **THEN** its row shows the leader with rank 1 and points

#### Scenario: Team without further matches
- **WHEN** a favorite team has no unplayed match dated today or later
- **THEN** it has no row in "Meine nächsten Spiele" and still appears under "Zuletzt"

#### Scenario: Compact on a phone
- **WHEN** two favorite teams and two followed Bewerbe are stored and the home is opened at 390 px width
- **THEN** the page shows no mini table, no round list, no address or route button, and a single "Alle Bewerbe" link instead of the directory

## ADDED Requirements

### Requirement: Match details stay one tap away
Venue address, route link and resin rule of a favorite team's next match SHALL remain available on the team page and the Spielvorschau that the home row links to.

#### Scenario: Route from the home
- **WHEN** the visitor taps the next-match row of a favorite team
- **THEN** the Spielvorschau opens and shows the venue with address and "Route planen"
