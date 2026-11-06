# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Players and coaches** of Austrian adult handball teams (v3 scope: Traun's two 2026/27 competitions, MEHRLEBEN HLA CHALLENGE West and OÖHV Männer Landesliga; no season archive) checking standings, results, match reports and scorer stats, mostly on the phone, also on laptop (in the hall, on the bus, at home doing analysis).
- **Fans and families** following a club across its competitions.
- **ÖHB / nuLiga decision makers** evaluating the product as a pitch for replacing the public nuLiga handball pages.

Showcase club: **SK Konstant Traun / Edelweiss** (OÖHV Männer Landesliga + MEHRLEBEN HLA CHALLENGE, season 2026/27). The product owner plays there; the coach requested this work and granted use of Traun's match data.

## Product Purpose

A German-language public handball matchcenter for Austria that presents the same official data as nuLiga (oehb-handball.liga.nu) in a form people actually want to read. Success: a player or coach finds the current table, a match report, or scorer stats faster and more clearly than on nuLiga, and ÖHB sees it as a credible replacement.

## Positioning

Independent sales prototype (not an official ÖHB or nuLiga product). Same data, same completeness as nuLiga, far better readability. It does not invent features nuLiga data cannot back.

## Operating Context

- Priority 1: **Tabelle**: all teams visible at once with Rang, Spiele, S/U/N, Tore, +/−, Punkte; season and phase (e.g. HLA Challenge West Hauptrunde).
- Priority 2: **Spielberichte**: match info (Spielnummer, Datum, Spielort, Heim/Gast), per-team lineup with Trikot, Name, Tore, 7m, gelbe Karte, 2-Minuten, Disqualifikation; team totals (7-Meter, 7m-Tore, 2-Min, Timeouts); report approval status ("noch nicht genehmigt").
- Priority 3: **Spielerstatistik**: Tore pro Spieler, 7m-Tore, Zeitstrafen, Karten.
- **Spielplan** with dates, times, venues, results and links to reports.
- **"Tabelle und Spielplan (PDF)"**: our own generated PDF/print view of the same table and schedule (not a link to nuLiga's PDF).

## Capabilities and Constraints

- Stack: Next.js, React, TypeScript, Tailwind, Zod, Vitest, Playwright (ADR-001).
- Redesign lives in a new app **v3**, reusing the existing domain/data layer. Root `src/` (version emailed to ÖHB) and `v2/` stay untouched.
- Data: 2026/27 nuLiga pages added to the importer allowlist; operator CLI only, 24h cache, ≥1500ms delay, max 2 retries, no fetching during request handling (ADR-002/004; allowlist extension needs an ADR update).
- Privacy (binding): adult-competition player stats only from public match reports, limited to display name, shirt number, team, goals, 7m, cards, 2-min. No referee, Zeitnehmer or Mannschaftsoffizielle data, contacts, birthdates, pass numbers, source-person IDs or portrait links. Traun squad 26/27 is all adult (owner, 2026-10-31).
- Player names: shown for all teams in all league games, as in the public nuLiga reports (owner decision 2026-10-31). Because opponents may field U18 players in adult competitions and age cannot be detected without birthdates, this supersedes the blanket "U18 player-level off" rule (ADR-005). Since 2026-11-06 youth competitions are treated like adult ones (ADR-005 amendment).
- Every page shows data source (nuLiga) and "Stand" date.
- Out of scope: login/admin, result entry, live scoring, push, analytics, English UI, native app.

## Brand Commitments

- German UI, handball terminology as used by nuLiga/ÖHB (Tabelle, Spielplan, Spielbericht, Torschützen, 7m, 2-Min).
- Teams always appear under their full official nuLiga name (e.g. "SK Konstant Traun / Edelweiss"), never abbreviated (owner, 2026-10-31).
- Owner rejects the v2 look as "AI slop": generic template look (pill tabs, initial circles, letter-spaced caps labels, soft shadows), marketing copy and hero taglines, identity-less colors/fonts, cards instead of a real table. Treat v2 as anti-reference.
- Not affiliated with ÖHB or nuLiga; must not imitate their branding.
- Standing visual preference (owner, 2026-10-31, after three rejected concept rounds as "too abstract"): a real sports site in the category's convention, executed at full craft. Quality bar: HBL (German Handball-Bundesliga), laola1.at, Flashscore. Red accents (Austria) on a light ground; red marks navigation state, own team, today/live. Red is national, not ÖHB's logo or marks.

## Evidence on Hand

- Live nuLiga 26/27 HLA Challenge West Hauptrunde table and schedule (8 teams; Traun 7th, 6 Sp, 3-0-3, 170:191, 6 Pkt as of 2026-10-31).
- Real match report structure (e.g. Schwaz vs. SG HC Linz, 31.10.2026, Spielnr. 22).
- Existing domain layer and 2025/26 fixtures in `src/data/`, `v2/src/`.
- No testimonials, user numbers or ÖHB endorsement exist; do not fabricate.

## Product Principles

1. The table is the product: dense, complete, scannable, never fragmented into cards.
2. Data over decoration: every element shows real nuLiga-backed data; no taglines or filler.
3. Same truth as nuLiga, better form: never omit a field people rely on, never add one we can't source.
4. Privacy is fixed, not a setting.
5. Mobile-first: most use is on the phone. The Tabelle fits a 390px screen with every required column and no horizontal scrolling; desktop gets its own layout, not a stretched phone.

## Accessibility & Inclusion

WCAG 2.2 AA; tabular numerals for stats; tables remain real `<table>` semantics for screen readers.
