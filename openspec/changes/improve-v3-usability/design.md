# Design: improve-v3-usability

## Context

See proposal.md. Builds on the archived `add-matchcenter-v3` (specs in `openspec/specs/`), the direction contract `.impeccable/surfaces/v3-app-liga.md` and DESIGN.md. The world stays the same; this is an extension that adds surfaces and clarity.

## Decisions

1. **"Meine Teams" in `localStorage`.**
   - Several teams can be remembered (team key `competition|team`). This avoids a hand-maintained club mapping across competitions, where Traun appears under different team names.
   - A small client component reads the stored team key (`competition|team`). With a stored team it renders the dashboard; without one, the picker.
   - The server renders the picker plus overview. The dashboard data for every team is passed as compact props: about 13 teams, so the payload stays small.
   - Alternative rejected: a cookie with server rendering. It adds personalization state to the server for no gain.
2. **Tabs as pages.**
   - Liga = Tabelle plus a "Aktuelle Runde" preview with a link to the Spielplan.
   - `/[competition]/spielplan` holds the full round view with a native `<select>` round picker in a GET form. A client component submits on change; the button remains for no-JS.
3. **Compact sub-page header.** Team, report and venue pages replace the competition block with a breadcrumb line ("HLA Challenge West › Team"). The tabs stay so the visitor keeps orientation.
4. **Search suggestions.**
   - The server embeds a small index (teams and ranked players, about 350 entries) in the search component.
   - The client filters it with the same `normalize()`. The list is accessible (combobox pattern with `aria-activedescendant`) and keyboard-operable.
   - The GET form remains the fallback.
5. **Venues.**
   - Import `courtInfo?federation=…&roundTyp=0&championship=…&location=<id>` for location ids found in the schedules.
   - Parse h1 name, "Hallenadresse" lines and "Haftmittelverwendung". Matches gain `venueId`.
   - The map link is built from the address: Google Maps directions URL, which also opens Apple/Google apps on phones.
6. **Calendar.** A static route handler returns `text/calendar`. It is generated per team at build time (`generateStaticParams`).
7. **Timeline.**
   - Parse the "Spielverlauf" table rows (Team, Zeit, Stand, Ereignis, Person).
   - "Person" is split into shirt and name. Non-numeric shirts (officials) drop the name.
   - Stored per report; rendered as a compact two-sided list, home events left and away events right, with the score in the middle.
8. **Focal element.** The "Nächstes Spiel" card is an ink-ground panel with white type, the only dark surface. It is used on home and team pages and gives each page one clear lead without adding red.

## Risks / Trade-offs

- **[Client JS grows]** → Only three small client components; all core content still renders on the server.
- **[Venue pages and timeline add data]** → They contain public facts and a decision is recorded in ADR-004 and ADR-005. Tests assert that no referee or official names appear.
- **[localStorage unavailable]** → The picker still works for the session. Every read and write is wrapped in try/catch.
