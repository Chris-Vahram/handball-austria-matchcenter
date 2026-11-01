# Proposal: improve-v3-usability

## Why

A design pre-mortem of v3 (2026-11-01) found that the real data is there, but much of it is hard to find or read:

- Tappable things look like plain text.
- Tabs behave inconsistently.
- Sub-pages repeat big headings.
- Team pages and lineups read as long walls.
- Nothing on a page clearly leads.

The owner's team asked for this product because people complained about nuLiga's interfaces, both the new one and the old one it was switched back to. v3 has to be obviously easier than both.

The basic questions also lack a fast path:
- Wann ist unser nächstes Spiel?
- Wo ist die Halle?
- Darf man Harz verwenden?

## What Changes

- **Startseite "Mein Team":**
  - The visitor picks their team once; the choice is remembered on the device only.
  - The home page shows that team's next match (with venue address, map link and resin rule), last result and table position in each competition.
  - The competition overview is one tap away.
- **Bewerbsübersicht:** competitions grouped by association (ÖHB, OÖHV, …), built to scale to many associations and clubs. The prototype shows only the two imported competitions and says so.
- **Klare Bedienbarkeit:**
  - Every link looks tappable: chevrons on match rows, link styling on team names.
  - Tabs become four real pages with a correct active state: Tabelle, Spielplan, Ranglisten, Statistik.
  - The Spielplan gets a round picker.
  - The Ranglisten filter applies immediately.
  - Search suggests teams and players while the visitor types.
- **Weniger überladen:**
  - Sub-pages get a compact breadcrumb header instead of a second big heading.
  - Team pages split "Ergebnisse" (with a S/U/N mark per game) from "Kommende Spiele".
  - Match meta lines are shortened.
  - Lineups get a legend.
  - Statistics headers are written out.
- **Anschaulicher:** one strong focal element per page. Examples: an ink "Nächstes Spiel" card on home and team pages, and the score set as a figure in match rows.
- **Hallen:** venue page per hall with address, map link and resin rule, linked from matches. nuLiga's public court page becomes allowlisted (ADR-004 addendum).
- **Kalender:** `.ics` export of a team's fixtures.
- **Spielverlauf:** goal and penalty timeline in the Spielbericht, with minute, score and player name. This needs an ADR-005 amendment; the owner decided it on 2026-11-01.
- **Leere/dünne Daten:** ranking and statistics pages explain when few games have been played instead of looking broken.

## Non-Goals

- Login, result entry and tools for officials (Funktionäre). nuLiga covers these and they are out of the prototype's scope. The goal is a conversation about the public design.
- Adding more competitions than the two imported ones.
- Live scores.
- Deploying the app. The owner deploys it himself.

## Capabilities

### New Capabilities
- `home-my-team`: the remembered team and its home dashboard.
- `competition-overview`: competitions grouped by association.
- `venues`: venue pages with address, map link and resin rule.
- `calendar-export`: an `.ics` export of a team's fixtures.

### Modified Capabilities
- `league-standings-schedule`: link affordances, a dedicated Spielplan page with a round picker, and tabs as real pages.
- `match-report`: the Spielverlauf timeline and a lineup legend.
- `team-pages`: results split from upcoming games, a mark per result, and a compact header.
- `search`: suggestions while typing.
- `player-statistics`: the filter applies immediately and thin data is explained.
- `nuliga-ingestion`: court pages and the report timeline.

## Impact

- `v3/` only: new routes `/`, `/bewerbe`, `/[competition]/spielplan`, `/halle/[id]`, `/[competition]/team/[slug]/kalender.ics`, plus small client components (my team, search suggestions, auto-submit).
- ADR-004 addendum (court pages) and ADR-005 amendment (timeline).
- Snapshots grow by the venue and timeline data.
