# Spec Delta

## ADDED Requirements

### Requirement: Tabs follow available data
A Bewerb SHALL show the Tabelle and Statistik tabs only when the source provides a table or statistics for it; a Bewerb without a table MUST open on its Spielplan.

#### Scenario: Tournament without table
- **WHEN** a visitor opens an OÖHV "gemischte Jugend U10" tournament group that has matches but no table
- **THEN** the Bewerb opens on the Spielplan, and no Tabelle or Statistik tab is shown

#### Scenario: League with table
- **WHEN** a visitor opens Landesliga OÖ
- **THEN** Tabelle, Spielplan and Statistik tabs are shown as before

### Requirement: Bewerb name from the source
Every imported Bewerb SHALL be titled with its nuLiga group name and Verband, unless a curated display name exists for it, and the full nuLiga name MUST remain visible in the source line.

#### Scenario: Curated name
- **WHEN** the HLA Challenge West page renders
- **THEN** the title reads "HLA Challenge West" and the source line names "MEHRLEBEN HLA CHALLENGE West"

#### Scenario: Uncurated group
- **WHEN** a WHV group "WHV-U10 - Gr.1" without curated name renders
- **THEN** its title is the nuLiga name with "WHV" in the Verband line
