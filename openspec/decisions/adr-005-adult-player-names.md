# ADR-005: Player Names in Adult Competitions (v3)

## Status

Accepted by project owner (Chris), 2026-10-31. Applies to `v3/` only. To be
reviewed again before any public launch.

## Context

The earlier rule (privacy-legal-review, partially approved 2026-06-05) allowed
adult player stats from public match reports and kept U18 player-level
publication disabled. Opponents in adult competitions (HLA CHALLENGE,
Landesliga) can field players under 18. Without birthdates, which we must not
store, age cannot be detected, so the old rule cannot be enforced per player.

## Decision

- In competitions configured as **adult**, v3 shows player names of all teams
  as nuLiga publishes them in public match reports and statistics pages.
- Allowed player fields: display name, shirt number, team, goals, 7m
  (attempts/goals), yellow card, 2-minute suspensions, disqualification (red/blue
  card counts).
- Never stored or shown: referees, Zeitnehmer/Sekretär, Mannschaftsoffizielle,
  contacts, addresses, birthdates, pass numbers, source-person IDs, portrait
  links, and the referee initials nuLiga prints in the score column of
  unplayed games.
- **Youth competitions** (U18 and younger): player-level data stays off.

This supersedes "U18 player-level publication disabled" for adult competitions
only. Allowlisted sources are defined in ADR-004.

## Consequences

- Names of minors playing in adult competitions may appear, exactly as on the
  public nuLiga pages. Mitigation: no extra fields, no person profiles, removal
  on request by deleting the player from the snapshot.

## Amendment 2026-10-31: player search

Owner decision (Chris, 2026-10-31): "ja die suche kann auch spieler finden
 benutze als quelle handball stats". The v3 search may match player names,
 using only the nuLiga player rankings ("Statistiken und Ranglisten") of adult
 competitions as source. Hits show name, team and competition and link to the
 team page; no person profile pages are created.
