## Why

Public Austrian handball data needs a clearer, faster mobile presentation. This
change defines a safe pilot foundation before application code is written.

## What Changes

- Define pilot scope for OOHV and OEHB public competition views.
- Start with OOHV Maenner Landesliga as curated real-data demo.
- Specify landing page, schedule, standings, team, club, and search flows.
- Define privacy allowlist and excluded personal data.
- Define replaceable data adapter and provenance requirements.
- Defer calendar export, English UI, dark mode, and productive synchronization.

## Capabilities

### New Capabilities

- `matchcenter-pilot`: Public match center MVP, UI flows, data boundaries, and
  quality requirements.

### Modified Capabilities

None.

## Impact

This is a specification-only change. Future implementation will create a new
Next.js frontend and curated data fixtures. Productive integration depends on an
approved OEHB or OOHV data source.
