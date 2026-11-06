# venues Specification

## Purpose
Answers "Wo ist die Halle?" and "Darf man Harz verwenden?" for every venue used by the configured competitions.

## Requirements

### Requirement: Venue page
Every venue used in an imported match SHALL have a page with its name, address, a map link and the published resin rule (Haftmittelverwendung), linked from match rows, the next-match cards and the Spielbericht.

#### Scenario: Bregenz arena
- **WHEN** the user opens the venue of match 2
- **THEN** "Handball-Arena Bregenz", "Untere Burggräflergasse 11, 6900 Bregenz", a map link and "Haftmittel: nicht erlaubt" are shown

### Requirement: Only venue facts
Venue data MUST be limited to name, address and resin rule; the court schedule on nuLiga's venue page (which includes referee initials and other competitions) MUST NOT be imported.

#### Scenario: No court schedule
- **WHEN** a venue page renders
- **THEN** it shows no matches from other competitions and no referee text
