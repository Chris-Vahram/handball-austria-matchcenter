# home-my-team Specification

## Purpose
Answers the most common question, "Wann und wo spielt mein Team als Nächstes?", on the first screen, for any team in the configured competitions.

## Requirements

### Requirement: Remember my team on the device
The visitor SHALL be able to follow teams and Bewerbe as favorites with a ★ control on the team page and on the Bewerb pages; following and unfollowing MUST take one tap, the choice MUST be stored only in the visitor's browser, and the home page MUST NOT list all teams for selection.

#### Scenario: First visit
- **WHEN** a visitor opens the home page without stored favorites
- **THEN** a search for team, Verein or Bewerb and the competitions grouped by Verband are shown, with a one-line hint that ★ on a team or Bewerb adds it here, and no team checklist

#### Scenario: Pick a team
- **WHEN** the visitor taps ★ on the team page of "SK Konstant Traun / Edelweiss" (HLA) and on "Sportunion EDELWEISS Linz / SK Traun" (Landesliga)
- **THEN** the home page shows a card for each on this and later visits

#### Scenario: Follow a Bewerb
- **WHEN** the visitor taps ★ on the HLA Challenge West Tabelle
- **THEN** the home page shows the HLA Challenge West overview on this and later visits

### Requirement: My team dashboard
For each favorite team the home page SHALL show the next match, meaning the earliest unplayed match dated today or later (date, time, opponent, venue with address and map link, linking to its preview), the last result, the table position, and any earlier match still without a result as "Ergebnis ausständig". For each favorite Bewerb it SHALL show a compact table (the top three rows plus every favorite team's row, with rank, team and points) linking to the full Tabelle, and the current round's matches. Favorite teams come first.

#### Scenario: Traun dashboard
- **WHEN** Traun is a favorite and the 05.11.2026 data is loaded
- **THEN** the next HLA match on 15.11.2026 against SMC Innsbruck Handball Tirol in Sportzentrum Traun is shown, plus the last result 35:37 in Bregenz and 7th place

#### Scenario: Bewerb overview
- **WHEN** HLA Challenge West is a favorite and Traun is a favorite team
- **THEN** the compact table shows ranks 1–3 and Traun's row highlighted, followed by the current round
