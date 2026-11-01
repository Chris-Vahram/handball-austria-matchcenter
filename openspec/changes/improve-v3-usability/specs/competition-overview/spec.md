# Spec Delta

## Purpose

A clear entry to all competitions grouped by association, designed so it scales from the two prototype competitions to every ÖHB and Landesverband competition.

## ADDED Requirements

### Requirement: Competitions grouped by association
The overview SHALL list competitions grouped by association (ÖHB, then Landesverbände), each with its phase, current round and leader, linking to the competition.

#### Scenario: Prototype data
- **WHEN** the overview opens
- **THEN** "HLA Challenge West" appears under ÖHB and "Landesliga OÖ" under OÖHV, each with current round and leader

### Requirement: Honest prototype scope
The overview MUST state that the prototype contains only the listed competitions.

#### Scenario: Scope note
- **WHEN** the overview renders
- **THEN** a note says the prototype shows two competitions as an example
