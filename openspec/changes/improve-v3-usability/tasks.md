# Tasks

## 1. Decisions and data

- [x] 1.1 ADR-004 addendum (courtInfo venue facts) and ADR-005 amendment (Spielverlauf with names, owner 2026-11-01); verify both reference the change
- [x] 1.2 Parse venues (courtInfo) and match `venueId`; verify fixture tests (Bregenz address + resin rule, no schedule/referee text)
- [x] 1.3 Parse the report timeline; verify fixture tests (first event 02:12 0:1 Tor Gast 15 HALILOVIC, officials without name)
- [x] 1.4 Re-import both competitions and verify snapshots validate and contain no referee/official names

## 2. Navigation and clarity

- [x] 2.1 Tabs as four pages (Liga with current-round preview, new Spielplan page with round picker) and breadcrumb header on sub-pages; verify e2e active tab + round jump
- [x] 2.2 Link affordances (chevrons on match rows, link-styled team names) and compact match rows with figure score and venue link; verify e2e at 390
- [x] 2.3 Ranglisten auto-apply filter and thin-data note; statistics headers written out; verify e2e
- [x] 2.4 Search suggestions combobox; verify e2e typing "hali" shows HALILOVIC and keyboard selection works

## 3. New surfaces

- [x] 3.1 Venue pages `/halle/[id]`; verify e2e Bregenz
- [x] 3.2 Team page: Ergebnisse/Kommende split with marks, ink next-match card, "Als Mein Team merken", calendar link; verify e2e Traun
- [x] 3.3 Calendar route `.ics`; verify unit test (14 events, 15.11. event)
- [x] 3.4 Home "Mein Team" (picker, remembered dashboard) and `/bewerbe` overview grouped by association; verify e2e pick → dashboard persists after reload
- [x] 3.5 Spielverlauf section in the report plus lineup legend; verify e2e match 23

## 4. Finish

- [ ] 4.1 Full checks (unit, e2e, lint, typecheck, build, audit), detector, finish review to ship, DESIGN.md + design.json update
