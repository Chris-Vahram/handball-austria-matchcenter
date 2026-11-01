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
  round-flipper:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.round}"
    size: "44px"
  tab:
    textColor: "{colors.mute}"
    padding: "10px 0 11px"
    typography: "{typography.title}"
  tab-active:
    textColor: "{colors.ink}"
  table-row:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    height: "46px"
  table-row-own-team:
    backgroundColor: "{colors.red-soft}"
    textColor: "{colors.red-ink}"
  panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
  status-tag:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.status}"
    padding: "4px 8px"
  search-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 10px 0 32px"
    height: "44px"
  search-field-focus:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
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

**Creative North Star: "The Results Desk"**

A real sports results site, built properly. The full standings table is the first thing on screen, as a true table with full official club names, and the round's matches sit directly below it. The look follows the category convention set by HBL, laola1.at and Flashscore: a white page, dark ink, hairline rules, a condensed uppercase face for headings and the numbers that matter. Craft goes into density, alignment and tabular figures, not decoration.

Red is Austrian, not ornamental. It marks a fixed set of things: the 4px rule across the top, the active tab underline, the second half of the wordmark, focus and selection, today's day heading in the schedule, and the own team wherever it appears (standings, schedule, report, rankings, team page, Statistik). Everything else is ink, grey and white. The confirmed rejection is the v2 look: pill tabs, initial circles, letter-spaced caps labels, soft shadows, card mosaics standing in for a table.

On phones (390px) every section runs edge to edge, separated by 8px strips of the grey field. From 900px up the same sections become white panels with 8px corners floating on that grey field, so standings and the round column read as two separate work areas.

**Key Characteristics:**
- Table first, with real `<table>` semantics and full club names that wrap to at most two lines, never abbreviated or scrolled sideways.
- Two typefaces from one family: Barlow for text and figures, Barlow Condensed 800 uppercase for headings, the score and the deciding column.
- Tabular numerals everywhere (set on `body`).
- Red has a closed list of jobs; the own team is the signature use.
- Flat: no drop shadows. Depth comes from white surfaces on a grey field.

## Colors

A neutral ink-and-grey palette with one national red and a red tint.

### Primary
- **Austrian Red** (austrian-red): the 4px top rule on the header and the print head, the active tab underline, the wordmark's "center", the focus outline, text selection, the browser theme color, and the disqualification card marker.
- **Deep Red Ink** (red-ink): red used as text. Own-team names in standings, schedule, report, rankings and the Statistik comparison, the own-team lineup heading, the showcase team's page title, today's day heading, and the "veraltet" warning. It is darker than Austrian Red so text stays legible on white and on the tint.
- **Own-Team Blush** (red-soft): the background tint on the own team's row in standings, rankings, the Statistik comparison and the printed schedule, and the 2px focus halo around the search field. Printing is forced (`print-color-adjust: exact`) so the tint survives on paper.

### Neutral
- **Scoreboard Ink** (ink): body text, borders on segmented controls and buttons, the filled active segment, the rule under printed table headers.
- **Slate Mute** (mute): secondary text. Column headers, games-played and W-D-L columns, match times, meta lines, legends, the footer.
- **Hairline** (line): 1px row separators and the tab bar's bottom border.
- **Field Grey** (field): the page ground, the gap strips between sections, day headers in the schedule, round-flipper buttons, status tags.
- **White** (white): every working surface. Header, panels, tables, the print page.
- **Control Line** (control-line): the 1px border on the select and the search field, the draw chip in the form column, and the rule above each printed matchday group.
- **Near-White** (near-white): the hover fill on match rows and search hits, and the band behind label-over-value stat grids (report totals, Teamstatistik, Liga gesamt).

### Functional
- **Card Yellow** (card-yellow): only for the yellow-card marker in report lineups. It represents the referee's card and has no other use.

### Named Rules
**The Red Has a Job Rule.** Red appears only on the top rule, the active tab, the wordmark half, focus and selection, the disqualification card, today's day heading, and the own team. If an element isn't on that list, it isn't red.

**The Pending Stays Neutral Rule.** States like "Bericht noch nicht genehmigt" or "angesetzt" use ink or mute, never red, even on the own team's match.

## Typography

**Display Font:** Barlow Condensed (with system-ui, sans-serif), weights 700/800, loaded via next/font as `--font-display`
**Body Font:** Barlow (with system-ui, sans-serif), weights 400–800, loaded via next/font as `--font-text`

**Character:** One sporty grotesque family in two widths. The condensed cut does the shouting (league name, score, section titles, the points column) and the regular cut carries the data at reading size.

### Hierarchy
- **Display** (Condensed 800, 30px on mobile / 40px from 900px, line-height 1, uppercase): the league name H1. The team page H1 uses 28px (line-height 1.05) on mobile and 40px from 900px so long official names wrap cleanly.
- **Score** (Condensed 800, 44px / 64px from 900px, line-height 1): the Spielbericht result. The colon uses mute.
- **Headline** (Condensed 800, 22px, uppercase): section titles (Spielplan, the lineup team names, the stats list title) and the wordmark. Print uses 26px for its H1 and 18px for its H2.
- **Figure** (Condensed 800, 20px): the column that decides the ranking, Pkt in standings and the value in the Ranglisten. 18px for the lead column (Tore/Sp) in the Statistik comparison, 15px in print.
- **Title** (Barlow 600, 14–15px): team names in tables, tab and segment labels, button labels. Own-team names step up to 800 in standings.
- **Body** (Barlow 400, 15px, line-height 1.4): match-row team names, table cells. Score figures in match rows use 600, and winners use 700.
- **Meta** (Barlow 400, 13px): match times, the "Stand" line, report facts.
- **Label** (Barlow 600, 12px, sentence case, no tracking): table column headers, day headers (700), legends and the footer (400).

### Named Rules
**The Condensed Means Weight Rule.** Barlow Condensed 800 is reserved for headings, the score and the single deciding column per table. Never use it for running text or secondary figures.

**The Tabular Figures Rule.** Tabular numerals are on globally. Numeric columns align right, and names align left.

## Layout

Mobile-first, single column at 390px with a 16px gutter (`--gutter`) that widens to 24px from 900px. Content is capped at 1200px. The print view is capped at 900px; on desktop the Ranglisten and search pages are capped at 760px and Statistik at 860px.

- **Mobile:** sections are full-width white blocks separated by 8px of field grey. The header holds the wordmark-and-search bar (52px), the competition switch (max 420px) wrapping below it, the title block, and sticky underline tabs.
- **Desktop (≥900px):** the Liga page splits into a 1.6fr / 1fr grid (standings left, round right) with a 16px gap. The report puts its scoreboard over two lineups side by side. Sections become rounded panels. The footer splits into source text and a right-aligned PDF button.
- **Rows:** standings rows are 46px tall (48px on desktop), roster rows 40px, and match rows use a 52px time column, then names, then scores. Desktop widens the numeric columns instead of adding new ones.
- **No horizontal scrolling at 390px.** Long official names wrap to a second line instead of being truncated.
- **Print:** A4, margins of 14mm 12mm 18mm. Tighter rows (5px padding, 13px text), each matchday group kept together on a page, and a fixed source footer.

## Elevation & Depth

Flat. There are no drop shadows anywhere. Depth is tonal: white working surfaces sit on the Field Grey ground, and on desktop they get 8px corners to read as panels. The build uses `box-shadow` only for lines, never elevation: the inset 3px red underline on the active tab, the 2px blush focus halo on the search field, and the 1px grey inset outline on the loss chip.

### Named Rules
**The Flat Field Rule.** Separate surfaces with white on grey and with hairlines, never with shadows.

## Shapes

Mostly square, with small and purposeful corners: 3px on form chips, 4px on status tags, 6px on controls (segmented switch, list switch, buttons, select), 8px on desktop panels only (mobile sections stay square), and a full circle only on the 44px round-flipper buttons. Switches and buttons use a 1.5px ink border, fields a 1px Control Line border, while tables use 1px hairlines between rows and have no outer border. Report card markers are small solid rectangles in the card's color. Icons are inline SVG chevrons (stroke 2.4, round caps).

## Components

### Buttons
- **Shape:** gently squared (6px), 1.5px ink border.
- **Outline (primary action, e.g. "Tabelle & Spielplan als PDF", "Drucken"):** white fill, ink text, 15px/600, 11px 12px padding, full width on mobile.
- **Hover:** fills ink with white text.
- **Solid (form submit, "Filtern"):** ink fill with white text, 9px 14px padding.
- **Focus:** global 2px Austrian Red outline with a 2px offset.

### Segmented Controls
- **Style:** a grid of equal segments inside a 1.5px ink border with 6px corners. The competition switch has two segments; the scorer list switch has five, divided by hairlines.
- **State:** the active segment (`aria-current="page"`) fills ink with white text. Inactive segments show ink on white.

### Tabs
- Underline tabs (Tabelle, Spielplan, Ranglisten, Statistik) in a row with 18px gaps, 15px/600 mute text, 44px tall, sticky at the top over a hairline bottom border.
- **Active:** ink text with an inset 3px Austrian Red underline. There is no pill or background.

### Inputs / Fields
- **Select:** 1px Control Line border, 6px corners, white fill, 16px text, 44px minimum height. Below 600px the label sits above a full-width select and the button sits underneath, so long official team names are never cut; from 600px label, select and button share one row.
- **Search field (header bar, every page):** field-grey fill, 1px Control Line border, 6px corners, 44px height, 16px text, a drawn 16px magnifier in mute inside on the left, placeholder "Team oder Spieler". On focus it turns white with an ink border and a 2px blush halo instead of the red outline. It is a plain GET form to /suche; teams come from the standings, players from the nuLiga rankings (ADR-005 amendment).
- **Focus:** the global red outline, except the search field (above).
- **Search results:** "Teams" and "Spieler" group headings use the day-header style; each hit is a 15px/600 row with a 13px mute subline, hairline-separated, near-white on hover.
- **Touch targets:** every control (switch, tabs, list switch, search, filter, back links) is at least 44px tall.

### Standings Table (signature)
- A real table: # | Team | Sp | S-U-N | Tore | +/− | Pkt. Rank is bold, the team is left-aligned 600, numbers sit right, and Sp and S-U-N are in mute. Pkt uses the Figure style.
- **Own team:** the whole row gets the blush tint and the name turns Deep Red Ink at 800.
- A 12px mute legend sits below the table. The scorer ranking and report roster follow the same row grammar.
- **Form column (desktop ≥900px only):** the last five results as 18px squares with 3px corners and an 11px/700 letter, oldest to newest left to right: S is filled ink, U is Control Line grey, N is white with a 1px grey inset outline and a mute letter. Never red, which belongs to the own team. A legend sentence explains the reading direction. On the phone the column is hidden, so all required columns still fit without horizontal scrolling.

### Header Bar
- Phone: wordmark and search share the first row, the two-segment competition switch spans the second.
- Desktop (≥900px): one row, wordmark | switch (max 420px) | search (max 280px), 64px tall, 24px gaps. The competition title and the sticky tab bar (Tabelle, Spielplan, Ranglisten, Statistik) follow below. The search page shows the bar alone, without switch or tabs.

### Match Row
- Flashscore form: time on the left spanning both lines, home team over away team, one score per line on the right, and the winner in bold. A meta line (number · venue · note) runs underneath.
- Played games link to the report, with a near-white hover. Unplayed games show "angesetzt" in mute where the score would be.

### Round Flipper (signature)
- Two 44px circular field-grey buttons with chevrons around a centered "Runde N" with its date span. When there is no previous or next round, the button stays in place at 35% opacity.

### Team Page
- Head panel: the full official team name as condensed uppercase h1 (Deep Red Ink only for the showcase team), a rank line ("7. Platz · 6 Punkte · 3-0-3 · 170:191 (−21)"), then Form chips (20px, same colors as the form column), Heim and Auswärts records as label-over-value facts (12px mute label over 16px/700 value).
- "Nächstes Spiel" panel: day and time in mute, the pairing in 17px/600 with the team itself in 800 (stacked on the phone, joined by a mute dash from 900px), meta line with number, Runde and Heim-/Auswärtsspiel.
- Fixtures reuse the Match Row with the date stacked above the time; on the team page no row is red, because every row is the team's own.
- Team statistics use a 3-column label-over-value grid on a near-white band (per-game values, Zuschauer/Sp.); the player table follows the roster grammar (Tore, 7m Tore/Versuche, 2′, G, R). Team card totals include officials, which the legend says.
- Desktop: fixtures left, statistics and players right, both 1fr.

### Statistik
- League totals as a label-over-value grid on a near-white band (3 columns on the phone, 5 on desktop), then a team comparison table (Team with games as subline, Tore/Sp as the lead in Condensed 800 18px, 7m-Quote, 2′/Sp, Zuschauer/Sp in mute) that fits 390px with a 12px inset; the showcase team row gets the blush tint and a Deep Red Ink name. Team names link to the team page.

### Ranglisten
- Five lists behind a segmented switch (Tore, 7m, 2-Min, Gelb, Rot). Suspension and card lists lead with the per-game value nuLiga sorts by (∅/Sp. in the figure style) next to games and total; 7m shows attempts instead of games.

### Today Marker
- A schedule day heading for the current Vienna date reads "**Heute** · Sonntag, 1. November" in Deep Red Ink on the usual field-grey day strip, 12px/700 with "Heute" at 800, sentence case. This is the only "live" red; there is no live score.

### Scoreboard
- Centered: home name right-aligned, the condensed score in the middle with the half-time score beneath it in 12px mute, away name left-aligned. Winner at 800, own team in Deep Red Ink. Below it are the facts line and a status tag. A pending report gets a dashed border and stays neutral.

## Do's and Don'ts

### Do:
- **Do** put the full standings table first, using real `<table>`, `<th scope>` and `<abbr>` semantics.
- **Do** carry the own team in red across every surface: blush row tint plus Deep Red Ink name in tables, and Deep Red Ink name in match rows, the scoreboard and lineup headings.
- **Do** set headings, the score and the single deciding column in Barlow Condensed 800 uppercase, and everything else in Barlow.
- **Do** use the 1.5px ink border with 6px corners for every switch and button, and the inset red underline for tabs.
- **Do** keep sections flat: white on Field Grey, with 8px panel corners from 900px only.
- **Do** keep full official team names and let them wrap to two lines at 390px.

### Don't:
- **Don't** use pill tabs, initial circles, letter-spaced uppercase labels, soft shadows, or cards in place of a table (the rejected v2 look).
- **Don't** use red for decoration, for pending or unapproved states, or for anything outside The Red Has a Job Rule.
- **Don't** abbreviate club names or make a table scroll horizontally on phones.
- **Don't** add drop shadows; depth is tonal.
