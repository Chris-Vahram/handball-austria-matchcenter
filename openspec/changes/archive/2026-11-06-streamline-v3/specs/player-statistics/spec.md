## MODIFIED Requirements

### Requirement: Ranking lists
For each configured adult competition the app SHALL show ranking lists for Tore, 7m-Tore, Zeitstrafen, Gelbe Karten and Rote Karten with rank, player name, the full official team name as in the table (resolved from the player's match-report lineups, since nuLiga's statistics only name the "Verein"), games and value, in the source's order. The Statistik tab SHALL show the top 10 of the Tore list with a link "Alle Ranglisten"; the full lists with all five categories and the team filter SHALL be a sub-page of the competition.

#### Scenario: Torschützen HLA West
- **WHEN** the user opens the Statistik tab of HLA West
- **THEN** the ten best scorers are shown with the import's Stand and a link to all ranking lists

#### Scenario: Full lists
- **WHEN** the user follows "Alle Ranglisten"
- **THEN** all five categories with every ranked player and the team filter are shown

## REMOVED Requirements

### Requirement: Youth competitions excluded
**Reason**: ADR-005 amendment 2026-11-06 — youth competitions are treated like adult competitions (owner: "so wie normal bei den erwachsenen").
**Migration**: Ranking lists, team player tables and lineups are shown for every configured competition, with the same ADR-005 fields.
