# PWA Shell Decision

## Status

Reviewed for sales demo: no service worker

## Decision

Provide web app manifest, neutral app icon, standalone display metadata, theme
color, and mobile installability metadata. Do not register a service worker in
the sales demo.

## Rationale

The matchcenter must not imply that cached sports records are current after a
schedule change. A manifest provides an installable app-like shell without
adding stale-data behavior. Revisit shell-only caching after an approved
productive API integration and explicit offline UX design.
