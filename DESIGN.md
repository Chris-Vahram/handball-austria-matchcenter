---
name: Matchcenter v3
description: Austrian handball results site in the category convention; table first, red only where it means something.
colors:
  austrian-red: "#c8102e"
  red-ink: "#a50d26"
  red-soft: "#fce8eb"
  ink: "#15171a"
  mute: "#5e636b"
  line: "#e4e6ea"
  field: "#f3f4f6"
  white: "#ffffff"
  card-yellow: "#f2c200"
  control-line: "#c9ccd1"
  near-white: "#fafafa"
typography:
  display:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1
  score:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 800
    lineHeight: 1
  headline:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
  figure:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
  title:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
    fontFeature: "tnum"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "tnum"
  meta:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  chip: "3px"
  status: "4px"
  control: "6px"
  panel: "8px"
  round: "50%"
spacing:
  gutter: "16px"
  gutter-wide: "24px"
  panel-gap: "8px"
  panel-gap-wide: "16px"
components:
  segmented-control:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "9px 8px"
    typography: "{typography.title}"
  segmented-control-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 12px"
    typography: "{typography.title}"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "9px 14px"
  button-on-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0 14px"
  button-on-dark-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  round-flipper:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.round}"
    size: "44px"
  round-picker:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 32px 0 12px"
    height: "44px"
  tab:
    textColor: "{colors.mute}"
    padding: "10px 0 11px"
    typography: "{typography.title}"
  tab-active:
    textColor: "{colors.ink}"
  breadcrumb:
    textColor: "{colors.ink}"
    height: "44px"
  table-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    height: "46px"
  table-row-own-team:
    backgroundColor: "{colors.red-soft}"
    textColor: "{colors.red-ink}"
  fixture-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    padding: "10px 16px"
    height: "56px"
  panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
  next-match-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "14px 16px"
  team-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    padding: "14px 16px 16px"
  status-tag:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.status}"
    padding: "4px 8px"
  thin-data-note:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
  search-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 10px 0 32px"
    height: "44px"
  search-field-focus:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  search-suggestions:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "4px 0"
  search-suggestion-active:
    backgroundColor: "{colors.field}"
    height: "44px"
  team-pick-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    height: "48px"
    typography: "{typography.title}"
  team-pick-row-selected:
    backgroundColor: "{colors.red-soft}"
  form-chip-win:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.chip}"
    size: "18px"
  form-chip-draw:
    backgroundColor: "{colors.control-line}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    size: "18px"
  form-chip-loss:
    backgroundColor: "{colors.white}"
    textColor: "{colors.mute}"
    rounded: "{rounded.chip}"
    size: "18px"
  result-chip:
    rounded: "{rounded.chip}"
    size: "22px"
  day-header:
    backgroundColor: "{colors.field}"
    textColor: "{colors.mute}"
    typography: "{typography.label}"
    padding: "6px 16px"
  day-header-today:
    backgroundColor: "{colors.field}"
    textColor: "{colors.red-ink}"
  stat-band:
    backgroundColor: "{colors.near-white}"
    textColor: "{colors.ink}"
    padding: "12px 16px 16px"
---

# Design System: Matchcenter v3

Scope: this system governs the `v3/` app only. The root `src/` app and `v2/` are separate, older apps with their own styling and do not follow it.

## Overview

> **streamline-v3 (2026-11-06) overrides older text below where they disagree:** red "own team" = the visitor's ★ favorites (no hard-coded showcase team; nothing red without favorites); the two-segment competition switch is gone (a "Verband › Bewerb" line above the H1 links to `/bewerbe#<verband>`); three tabs (Tabelle, Spielplan, Statistik; full Ranglisten are a sub-page); home = favorites overview (team cards, followed Bewerb blocks with top-3 mini table) or, without favorites, "Finde dein Team" search + Bewerbe nach Verband; match rows place each score on its team's line; new Spielvorschau (`/[bewerb]/vorschau/[nr]`) and Spielbericht Kurzfazit; PDF link only on Tabelle and Spielplan.

**Creative North Star: "The Results Desk"**

A real sports results site, built properly. The full standings table is the first thing on a league page, as a true table with full official club names, and the round's matches sit directly below it. The home page is "Meine Teams": the visitor's remembered teams as dashboard cards, then the list of Bewerbe. The look follows the category convention set by HBL, laola1.at and Flashscore: a white page, dark ink, hairline rules, a condensed uppercase face for headings and the numbers that matter. Craft goes into density, alignment and tabular figures, not decoration.

Red is Austrian, not ornamental. It marks a fixed set of things: the 4px rule across the top, the active tab underline, the second half of the wordmark, focus and selection, today's day heading in the schedule, and the own team wherever it appears (standings, schedule, report, rankings, team page, Statistik). Everything else is ink, grey and white, with one deliberate exception in weight rather than hue: the next match is the single dark (ink) surface in its context. The confirmed rejection is the v2 look: pill tabs, initial circles, letter-spaced caps labels, soft shadows, card mosaics standing in for a table.

On phones (390px) every section runs edge to edge, separated by 8px strips of the grey field. From 900px up the same sections become white panels with 8px corners floating on that grey field, so standings and the round column read as two separate work areas. Everything that can be tapped looks tappable: links carry a soft underline or a chevron.

**Key Characteristics:**
- Table first, with real `<table>` semantics and full club names that wrap to at most two lines, never abbreviated or scrolled sideways.
- Two typefaces from one family: Barlow for text and figures, Barlow Condensed 800 uppercase for headings, the score and the deciding figures.
- Tabular numerals everywhere (set on `body`).
- Red has a closed list of jobs; the own team is the signature use.
- Flat: no drop shadows. Depth comes from white surfaces on a grey field, and the one ink card for the next match.
- Visible link affordances: soft underlines on names and venues, a chevron on every row that opens a report.

## Colors

A neutral ink-and-grey palette with one national red and a red tint.

### Primary
- **Austrian Red** (austrian-red): the 4px top rule on the header and the print head, the active tab underline, the wordmark's "center", the focus outline, text selection, the browser theme color, the disqualification card marker, and the 8px dot on a remembered team's "Gemerkt als Mein Team" toggle.
- **Deep Red Ink** (red-ink): red used as text. Own-team names in standings, schedule, report, rankings and the Statistik comparison, the own-team lineup heading, the showcase team's page title, today's day heading, and the "veraltet" warning. It is darker than Austrian Red so text stays legible on white and on the tint.
- **Own-Team Blush** (red-soft): the background tint on the own team's row in standings, rankings, the Statistik comparison and the printed schedule, the selected rows in the Mein-Team picker, and the 2px focus halo around the search field. Printing is forced (`print-color-adjust: exact`) so the tint survives on paper.

### Neutral
- **Scoreboard Ink** (ink): body text, borders on segmented controls and buttons, the filled active segment, solid buttons, the rule under printed table headers, and the fill of the next-match card (the only dark surface).
- **Slate Mute** (mute): secondary text. Column headers, games-played and W-D-L columns, match times, meta lines, H/A markers, report-row chevrons, legends, footnotes, the footer.
- **Hairline** (line): 1px row separators and the tab bar's bottom border.
- **Field Grey** (field): the page ground, the gap strips between sections, day headers and picker group legends, round-flipper buttons, status tags, the thin-data note, and the active search suggestion.
- **White** (white): every working surface. Header, panels, tables, team cards, the suggestion list, the print page. On the dark card it is the text and the outline of "Route planen".
- **Control Line** (control-line): the 1px border on selects, the search field and the suggestion list; the soft underline under team-name and venue links; the draw chip; the rule above each printed matchday group.
- **Near-White** (near-white): the hover fill on Bewerbe rows, "more" rows and search hits, and the band behind label-over-value stat grids (report totals, Teamstatistik, Liga gesamt).

### Functional
- **Card Yellow** (card-yellow): only for the yellow-card marker in report lineups. It represents the referee's card and has no other use.

### Named Rules
**The Red Has a Job Rule.** Red appears only on the top rule, the active tab, the wordmark half, focus and selection (including picked and remembered Mein-Team state), the disqualification card, today's day heading, and the own team. If an element isn't on that list, it isn't red.

**The Pending Stays Neutral Rule.** States like "Bericht noch nicht genehmigt" use ink or mute, never red, even on the own team's match: a mute superscript asterisk after the score, one mute footnote per list, a dashed neutral status tag on the report.

**The One Dark Surface Rule.** Ink is used as a fill for exactly one card per team context: the next match (on the team page, and inside each Meine-Teams card). Nothing else goes dark.

## Typography

**Display Font:** Barlow Condensed (with system-ui, sans-serif), weights 700/800, loaded via next/font as `--font-display`
**Body Font:** Barlow (with system-ui, sans-serif), weights 400–800, loaded via next/font as `--font-text`

**Character:** One sporty grotesque family in two widths. The condensed cut does the shouting (league name, scores, section titles, the points column) and the regular cut carries the data at reading size.

### Hierarchy
- **Display** (Condensed 800, 30px on mobile / 40px from 900px, line-height 1, uppercase): the league name H1, the "Meine Teams" and "Bewerbe" page titles. Team and venue H1s use 28px (line-height 1.05) on mobile, the team H1 40px from 900px, so long official names wrap cleanly.
- **Score** (Condensed 800, 44px / 64px from 900px, line-height 1): the Spielbericht result. The colon uses mute.
- **Headline** (Condensed 800, 22px, uppercase): section titles (Spielplan, Ergebnisse, Danach, Spielverlauf, lineup team names) and the wordmark; the next-match card heading at 20px (22px on the team page), line-height 1.15. Section titles may carry a 13px/500 mute count in sentence case ("6 Spiele"). Print uses 26px for its H1 and 18px for its H2.
- **Figure** (Condensed 800, 20px): the deciding figure. Pkt in standings, the value in the Ranglisten, and the scores in match and fixture rows. In match rows the losing score drops to Condensed 700 in a lighter ink (#3d4249). 18px for the lead column (Tore/Sp.) in the Statistik comparison, 16px for goal scores in the Spielverlauf, 15px in print.
- **Title** (Barlow 600, 14–15px): team names in tables, opponents in fixture rows, tab and segment labels, button labels, picker rows. Own-team names step up to 800 in standings; team-card names are 18px/800.
- **Body** (Barlow 400, 15px, line-height 1.4): match-row team names, table cells.
- **Meta** (Barlow 400, 12–13px): match times, the "Stand" line, report facts, venue sublines, the thin-data note.
- **Label** (Barlow 600, 12px, sentence case, no tracking): table column headers, day headers and picker legends (700), H/A markers and suggestion kinds (700, 11–12px), legends, footnotes and the footer (400).

### Named Rules
**The Condensed Means Weight Rule.** Barlow Condensed 800 is reserved for headings, the score, the single deciding column per table and the score in a result row. Never use it for running text or secondary figures.

**The Tabular Figures Rule.** Tabular numerals are on globally. Numeric columns align right, and names align left.

**The Title Case Names Rule.** Player surnames published in all caps by nuLiga are shown in title case ("KRITZINGER, Maurice" reads "Kritzinger, Maurice") at render time; the stored data stays unchanged. Mixed-case names are left alone.

## Layout

Mobile-first, single column at 390px with a 16px gutter (`--gutter`) that widens to 24px from 900px. Content is capped at 1200px. The print view is capped at 900px; on desktop the Ranglisten and search pages are capped at 760px and Statistik at 860px; home, Bewerbe and venue pages use the full 1200px.

- **Mobile:** sections are full-width white blocks separated by 8px of field grey. Competition pages: the wordmark-and-search bar (52px), the competition switch (max 420px) wrapping below it, the title block, and sticky underline tabs. Sub-pages (team, report): the bar, a one-line breadcrumb, then the tabs with none active. Home, Bewerbe, venue and search: the bar alone.
- **Desktop (≥900px):** the Liga page splits into a 1.6fr / 1fr grid (standings left, round right) with a 16px gap. The report puts its scoreboard over two lineups side by side. The team page puts results and fixtures left, statistics and players right. Meine-Teams cards flow in an auto-fill grid (min 380px, 16px gap). Sections become rounded panels. The footer splits into source text and a right-aligned PDF button.
- **Home heading:** "Meine Teams" sits on the field, not in a panel, aligned with the wordmark on desktop.
- **Rows:** standings rows are 46px tall (48px on desktop), roster rows 40px, fixture rows at least 56px, Bewerbe rows 56px, picker rows 48px, timeline rows 36px. Match rows use a 52px time column, then names, then scores, then an 18px chevron column. Desktop widens the numeric columns instead of adding new ones.
- **No horizontal scrolling at 390px.** Long official names wrap to a second line instead of being truncated. Below 600px the Statistik comparison moves Zuschauer/Sp. into the team subline.
- **Print:** A4, margins of 14mm 12mm 18mm. Tighter rows (5px padding, 13px text), each matchday group kept together on a page, and a fixed source footer.

## Elevation & Depth

Flat. There are no drop shadows in the system. Depth is tonal: white working surfaces sit on the Field Grey ground, on desktop they get 8px corners to read as panels, and the next match is a flat ink card. The build uses `box-shadow` only for lines, never elevation: the inset 3px red underline on the active tab, the 2px blush focus halo on the search field, and the 1px grey inset outline on the loss chip. (The search suggestion list currently carries a soft drop shadow; that is a divergence in the build, not part of this system.)

### Named Rules
**The Flat Field Rule.** Separate surfaces with white on grey and with hairlines, never with shadows.

## Shapes

Mostly square, with small and purposeful corners: 3px on form and result chips, 4px on status tags, 6px on controls (segmented switch, list switch, buttons, selects, the search field and its suggestion list, the thin-data note), 8px on desktop panels, team cards and the next-match card (mobile sections stay square; the team page's next-match card is full-bleed and square on phones), and a full circle only on the 44px round-flipper buttons. Switches and buttons use a 1.5px ink border (white on the dark card), fields a 1px Control Line border, while tables use 1px hairlines between rows and have no outer border. Report card markers are small solid rectangles in the card's color. Icons are inline SVG chevrons (stroke 2.4, round caps), 16px inside rows.

## Components

### Links
- **Team names** in standings: 1px Control Line underline at a 3px offset, turning ink on hover. Venue links in rows and sublines use the same soft underline at a 2px offset. On the dark card, links underline in white at 45% opacity, full white on hover.
- **Row links:** a row that opens a report (match row, fixture row) is covered by one stretched link that ends in a 16px mute chevron at the right; hover adds a 3% ink tint. A venue link inside the row sits above the stretched link so both stay tappable. Bewerbe rows, venue game rows and "more" rows ("Ganzer Spielplan", "Alle Bewerbe nach Verband") are full-row links with a right chevron.
- **Text actions** ("Ändern", "Fertig", "Anzeigen"/"Ausblenden", "Spiele, Form und Spieler"): 14px/700 ink, underlined or bold, at least 44px tall.

### Buttons
- **Shape:** gently squared (6px), 1.5px ink border.
- **Outline (e.g. "Tabelle & Spielplan als PDF", "Drucken", "Spiele in Kalender", "Als Mein Team merken"):** white fill, ink text, 15px/600, 11px 12px padding, full width on mobile; in the team-action row 14px, 44px tall, 0 14px padding.
- **Hover:** fills ink with white text.
- **Solid ("Filtern", "Fertig", "Route planen" on the venue page):** ink fill with white text.
- **Remembered toggle:** "Gemerkt als Mein Team" turns solid ink with an 8px Austrian Red dot before the label (`aria-pressed`).
- **On dark ("Route planen" on the next-match card):** 1.5px white border, white 700 text, no fill; hover fills white with ink text.
- **Focus:** global 2px Austrian Red outline with a 2px offset.

### Segmented Controls
- **Style:** a grid of equal segments inside a 1.5px ink border with 6px corners. The Ranglisten list switch has five (Tore, 7m, 2′, Gelb, Rot), divided by hairlines.
- **State:** the active segment (`aria-current="page"`) fills ink with white text. Inactive segments show ink on white.

### Tabs
- Three underline tabs, each a real page (Tabelle, Spielplan, Statistik), in a row with 18px gaps, 15px/600 mute text, 44px tall, sticky at the top over a hairline bottom border. On sub-pages none is active.
- **Active:** ink text with an inset 3px Austrian Red underline. There is no pill or background.

### Breadcrumb (sub-pages)
- One line under the bar: a 16px left chevron plus the competition name (14px/700, 44px tall) linking back, then the current page ("Team", "Spielbericht") in mute, then the phase and Stand line in 12px mute below. The page owns its own h1; the breadcrumb replaces a second big heading.

### Inputs / Fields
- **Select:** 1px Control Line border, 6px corners, white fill, 16px text, 44px minimum height. Below 600px the label sits above a full-width select and the button sits underneath, so long official team names are never cut; from 600px label, select and button share one row.
- **Search field (header bar, every page):** field-grey fill, 1px Control Line border, 6px corners, 44px height, 16px text, a drawn 16px magnifier in mute inside on the left, placeholder "Team oder Spieler". The native clear control is redrawn as a 14px mute cross. On focus it turns white with an ink border and a 2px blush halo instead of the red outline. It stays a plain GET form to /suche; teams come from the standings, players from the nuLiga rankings (ADR-005 amendment).
- **Search suggestions:** an ARIA combobox listbox 4px below the field, white with a 1px Control Line border and 6px corners, up to eight 44px rows: a 56px kind column ("Team", "Spieler", 11px/700 mute) then the name in 15px/600 with a 12px mute subline. The active or hovered row turns field grey. On phones the list spans the viewport minus the gutters.
- **Search results page:** "Teams" and "Spieler" group headings use the day-header style; each hit is a 15px/600 row with a 13px mute subline, hairline-separated, near-white on hover.
- **Focus:** the global red outline, except the search field (above).
- **Touch targets:** every control (switch, tabs, list switch, search, suggestions, filter, breadcrumb, back links, text actions) is at least 44px tall.

### Standings Table (signature)
- A real table: # | Team | Sp | S-U-N | Tore | +/− | Pkt. Rank is bold, the team is left-aligned 600 with a soft-underlined link to the team page, numbers sit right, and Sp and S-U-N are in mute. Pkt uses the Figure style.
- **Own team:** the whole row gets the blush tint and the name turns Deep Red Ink at 800.
- A 12px mute legend sits below the table. The scorer ranking and report roster follow the same row grammar.
- **Form column (desktop ≥900px only):** the last five results as 18px squares with 3px corners and an 11px/700 letter, oldest to newest left to right: S is filled ink, U is Control Line grey, N is white with a 1px grey inset outline and a mute letter. Never red, which belongs to the own team. A legend sentence explains the reading direction. On the phone the column is hidden, so all required columns still fit without horizontal scrolling.

### Header Bar
- Phone and desktop: wordmark and search share one row (64px on desktop). The wordmark links home. Competition pages show a 13px "Verband › Bewerb" line above the H1, with a ★ follow star (40px, outline mute; filled Austrian Red when followed) right of the H1.
- Desktop (≥900px): Competition pages follow with the title and the sticky tabs; sub-pages with the breadcrumb and tabs; home, Bewerbe, venue and search show the bar alone.

### Match Row
- Flashscore form: time on the left spanning both lines (with the date above it where needed), home team over away team, one score per line in the Figure style (winner in ink 800, loser lighter at 700), and the chevron column on report-linked rows. A 12px meta line (venue link · note) runs underneath.
- Unplayed games show no score. A report not yet approved adds a mute superscript asterisk after the away score and one footnote under the list: "* Spielbericht noch nicht genehmigt".

### Fixture Row (team page)
- The team is implied, so the row names only the opponent: date and time stacked in 12px mute (52px column), a 12px/700 mute H or A (Heim/Auswärts, spelled out for screen readers), the opponent in 15px/600 with a venue-link subline, the own score first ("35:37") in the Figure style, then the chevron. Played rows are led by a 22px result chip.
- "Ergebnisse" lists played games newest first; "Danach" shows the next three and a "Alle N Spiele anzeigen" disclosure for the rest.

### Result Chips
- 22px squares, 3px corners, 11px/700 letter, same S/U/N colors as the form chips. Used ahead of fixture rows and in the "Zuletzt" line of a team card. The team head keeps 20px form chips; the standings form column 18px.

### Next-Match Card (signature)
- The one dark surface: ink fill, white text, 8px corners, 14px 16px padding. Line 1 is a condensed uppercase heading "Nächstes Spiel · <weekday, date>, <time>". Then one thought per line: "Heim gegen **<opponent>**" or "Auswärts bei **<opponent>**" (16px, opponent 800), the venue as a link, the address in 13px light grey, then the on-dark outlined "Route planen" button with round and resin facts beside it.
- On the team page it runs full-bleed under the team head (square on phones, 8px corners from 900px); inside a Meine-Teams card it sits inset.

### Round Flipper and Picker (signature)
- Two 44px circular field-grey buttons with chevrons flank a native select (16px/700, 44px, Control Line border, 6px corners) listing every round as "Runde N · <date span>". Choosing a round submits the GET form; a no-JS button remains. When there is no previous or next round, the circle stays in place at 35% opacity.

### Meine Favoriten (home)
- **No favorites:** a white panel "Finde dein Team" (Display), a 48px search "Team, Verein oder Bewerb" and a 14px mute hint how ★ works. No team list.
- **Favorites:** "Meine Favoriten" title, team cards first, then one block per followed Bewerb: linked name, a mini table (#, Team, Sp, Pkt; top 3 plus followed teams' rows, blush + red), "Ganze Tabelle", then the current round's match rows.
- **Dashboard cards:** white cards (square on phones, 8px from 900px). Team name 18px/800 as a link, a 13px mute line (competition · rank · points · record), the next-match card, a "Zuletzt" line (result chip, opponent, bold score linking to the report), and a "Spiele, Form und Spieler" link.
- Below, always: "Bewerbe nach Verband" (the same directory as `/bewerbe`, Verband sections as anchors).

### Bewerbe and Venue Pages
- **Bewerbe:** a Display title and a 13px mute scope line, then one panel per association with the association as a day-header strip and 56px full-row links (16px bold name, 13px mute subline with phase, round and games, right chevron).
- **Venue (Halle):** a 28px condensed uppercase name, the postal address as 16px lines, a solid "Route planen" button, a resin fact as label-over-value, then "Kommende Spiele hier" as Bewerbe-style rows.

### Thin-Data Note
- When fewer than a quarter of the scheduled games are played, Ranglisten and Statistik show a field-grey note (6px corners, 13px ink, inset by the gutter): "Erst N von M Spielen gespielt…", so a short list reads as early season, not broken.

### Team Page
- Head panel: the full official team name as condensed uppercase h1 (Deep Red Ink only for the showcase team), a rank line ("7. Platz · 6 Punkte · 3-0-3 · 170:191 (−21)"), Form chips (20px), Heim and Auswärts records as label-over-value facts (12px mute label over 16px/700 value), then the action row (remember toggle, "Spiele in Kalender").
- Then the next-match card, results and fixtures (Fixture Row), Teamstatistik and Spieler. No fixture is red, because every row is the team's own.
- Team statistics use a 3-column label-over-value grid on a near-white band (Tore/Sp., 7m, 2′/Sp., G, R, Zuschauer/Sp.); team card totals include officials, which the legend says.

### Lineup Columns
- Report lineups and the team's player table share one column set: (#,) Spieler, Tore, 7m (goals/attempts), 2′, G, R. A zero is left blank so the figures that happened stand out; goals are 700. In reports G and R show card rectangles (Card Yellow, Austrian Red); on the team page they are counts. One legend line explains: "7m = Tore/Versuche · 2′ = Zeitstrafen · G = Gelbe Karte · R = Rote Karte / Disqualifikation". The same abbreviations (2′, G, R) head the stat grids.

### Spielverlauf (report timeline)
- Collapsed by default: a summary row with the section title, an event count and an underlined "Anzeigen"/"Ausblenden". Inside, a mute header names both teams, halves split by day-header strips, and each 36px row reads minute (11px mute) | home event (right-aligned) | score (centered) | away event. Goal rows set the score in Condensed 800 16px; other events (cards, suspensions, missed 7m) are mute with the event type in 700.

### Statistik
- League totals as a label-over-value grid on a near-white band (3 columns on the phone, 5 on desktop), then a team comparison table (Team with games as subline, Tore/Sp. as the lead in Condensed 800 18px, 7m %, 2′/Sp., Zuschauer/Sp. in mute from 600px, in the subline below) that fits 390px with a 12px inset; the showcase team row gets the blush tint and a Deep Red Ink name. Team names link to the team page.

### Ranglisten
- Five lists behind a segmented switch (Tore, 7m, 2′, Gelb, Rot). Suspension and card lists lead with the per-game value nuLiga sorts by (∅/Sp. in the figure style) next to games and total; 7m shows attempts instead of games. Filtered to one team, the team subline is dropped.

### Today Marker
- A schedule day heading for the current Vienna date reads "**Heute** · Sonntag, 1. November" in Deep Red Ink on the usual field-grey day strip, 12px/700 with "Heute" at 800, sentence case. This is the only "live" red; there is no live score.

### Scoreboard
- Centered: home name right-aligned, the condensed score in the middle with the half-time score beneath it in 12px mute, away name left-aligned. Winner at 800, own team in Deep Red Ink. Below it are the facts line (number, date, venue link, "Route") and a status tag. A pending report gets a dashed border and stays neutral. A "Runde N" back link with a left chevron sits above.

## Do's and Don'ts

### Do:
- **Do** put the full standings table first on a league page, using real `<table>`, `<th scope>` and `<abbr>` semantics.
- **Do** carry the own team in red across every surface: blush row tint plus Deep Red Ink name in tables, and Deep Red Ink name in match rows, the scoreboard and lineup headings.
- **Do** set headings, the score and the deciding figures in Barlow Condensed 800, and everything else in Barlow.
- **Do** use the 1.5px ink border with 6px corners for every switch and button, and the inset red underline for tabs.
- **Do** keep sections flat: white on Field Grey, with 8px panel corners from 900px only.
- **Do** keep full official team names and let them wrap to two lines at 390px.
- **Do** make every link visible: a soft Control Line underline on names and venues, a chevron on every row that opens something.
- **Do** keep the next match as the single ink card in its context, one thought per line.
- **Do** collect pending states in one footnote per list, marked by an asterisk on the score.
- **Do** leave zero cells blank in lineup and player tables, and use the shared Tore · 7m · 2′ · G · R columns with their legend.

### Don't:
- **Don't** use pill tabs, initial circles, letter-spaced uppercase labels, soft shadows, or cards in place of a table (the rejected v2 look).
- **Don't** use red for decoration, for pending or unapproved states, or for anything outside The Red Has a Job Rule.
- **Don't** abbreviate club names or make a table scroll horizontally on phones.
- **Don't** add drop shadows; depth is tonal.
- **Don't** add a second dark surface next to the next-match card.
- **Don't** repeat a pending note on every row.
