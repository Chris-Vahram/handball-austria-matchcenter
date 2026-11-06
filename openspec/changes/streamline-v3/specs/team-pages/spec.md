## ADDED Requirements

### Requirement: Follow and action order
The team page SHALL offer a ★ control next to the team name to follow or unfollow the team, and SHALL show the next match before secondary actions such as the calendar export.

#### Scenario: Follow from the team page
- **WHEN** the user taps ★ on the Traun HLA page
- **THEN** the star shows as active, its accessible name says the team is followed, and the team appears on the home page

## MODIFIED Requirements

### Requirement: Fixtures and results of the team
The team page SHALL list all of the team's matches of the season in date order with opponent, home/away, date, time, result, "angesetzt" or "Ergebnis ausständig", linking played matches to their Spielbericht and unplayed matches to their preview, and SHALL show the next match prominently: the earliest unplayed match dated today or later (Europe/Vienna). A past match without a result MUST NOT be shown as the next match.

#### Scenario: Next match
- **WHEN** the Traun HLA page is opened on 06.11.2026 with the 05.11.2026 data
- **THEN** the next match shown is Nr. 25 against SMC Innsbruck Handball Tirol on 15.11.2026

#### Scenario: Result missing
- **WHEN** a team's match dated yesterday has no result yet
- **THEN** it is listed as "Ergebnis ausständig" and the next match is the following dated match
