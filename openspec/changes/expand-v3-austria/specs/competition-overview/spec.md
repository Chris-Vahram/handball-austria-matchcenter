# Spec Delta

## MODIFIED Requirements

### Requirement: Competitions grouped by association
The overview SHALL list the Verbände and areas (ÖHB first, then the Landesverbände in nuLiga's order, then ÖMS and International), each with its number of Bewerbe and linking to its own page. Each Verband page SHALL list its Bewerbe under nuLiga's category headings in nuLiga's order, each with phase, current round and leader where available, linking to the Bewerb.

#### Scenario: Prototype data
- **WHEN** the overview opens
- **THEN** "ÖHB" and "OÖHV" appear among the Verbände, and the OÖHV page lists "Landesliga OÖ" under "Männer" with current round and leader

#### Scenario: Youth headings
- **WHEN** the WHV page opens
- **THEN** Bewerbe are grouped under headings such as "Männliche Jugend U16" with each group listed, and headings without Bewerbe are not shown

#### Scenario: Old anchor link
- **WHEN** a visitor opens `/bewerbe#ooehv`
- **THEN** the OÖHV entry is reachable on that page with one tap

## REMOVED Requirements

### Requirement: Honest prototype scope
**Reason**: The app now covers all groups of all configured championships; the "two competitions as an example" note would be false.
**Migration**: Replaced by "Coverage and freshness line".

## ADDED Requirements

### Requirement: Coverage and freshness line
The overview SHALL state which season and how many Bewerbe are covered and when the data was last imported, and that the app is an independent project, not an offer of ÖHB or nuLiga.

#### Scenario: Coverage line
- **WHEN** the overview renders after an import
- **THEN** a line shows the season 2026/27, the number of Bewerbe and the time of the last import
