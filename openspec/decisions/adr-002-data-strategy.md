# ADR-002: Data Integration Strategy

## Status

Proposed

## Decision

Use manually curated, validated public sports data for MVP. Introduce a
replaceable adapter interface. Require an approved official source or written
permission before productive synchronization.

## Rationale

This enables UI/UX progress without creating an unapproved scraping dependency.
Source provenance stays visible and future integration remains isolated.

## Alternatives Considered

- Immediate scraping: rejected until legal and organizational review.
- Pure synthetic fixtures: rejected because a small real sample improves pilot
  credibility and has been explicitly allowed.
