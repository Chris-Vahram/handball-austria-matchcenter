## ADDED Requirements

### Requirement: Controlled public-page ingestion

The system SHALL import sports data only from configured public ÖHB URLs without
authentication and SHALL NOT access protected areas.

#### Scenario: Import configured public competition

- **WHEN** an operator runs the importer for a configured competition
- **THEN** the importer retrieves only configured public ÖHB pages
- **AND** the importer stores source URL and retrieval timestamp

### Requirement: Respectful source access

The importer SHALL cache source snapshots, reuse fresh cache entries, pace
requests, and bound retries.

#### Scenario: Fresh snapshot exists

- **WHEN** an import is requested while a fresh cached snapshot exists
- **THEN** the importer reuses the cached snapshot without requesting the public
  ÖHB page again

### Requirement: Sports-data allowlist

The importer SHALL extract only configured sports fields and SHALL reject
contact details, phone numbers, email addresses, referee data, private data, and
unrelated personal fields.

#### Scenario: Source page contains forbidden field

- **WHEN** a source snapshot contains a contact or referee field
- **THEN** the normalized dataset excludes that field
- **AND** schema validation prevents accidental display

### Requirement: Reproducible import provenance

The system SHALL retain parser version, source reference, retrieval timestamp,
and normalized dataset validation status.

#### Scenario: Operator reviews imported dataset

- **WHEN** an import completes
- **THEN** the operator can identify its source, retrieval time, parser version,
  and validation result
