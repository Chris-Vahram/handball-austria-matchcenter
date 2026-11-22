---
version: 1
slug: "v3-app-liga"
primary_target: "v3/app/liga"
related_targets: []
---

# Liga-Seite: Tabelle + Spielplan (v3)

Scope: first v3 surface, one league page (HLA Challenge West Hauptrunde 26/27, OÖHV Landesliga LLM-GD 26/27). Mode: Operate. Mobile-first.
Audience/job: players, coaches, fans check the standings and the round's results/schedule, mostly on the phone; then open a Spielbericht or the PDF.
Constraints: PRODUCT.md (privacy, nuLiga-backed data only, full official team names, no abbreviations, no horizontal scrolling on 390px).
Later surfaces: Spielbericht, Spielerstatistik, Tabelle/Spielplan-PDF inherit this world.

## Direction contract

THESIS: A real sports results site, built properly: the full table is the first thing you see, with real table semantics and full club names, the round's games below, red only where it means something. It refuses abstract art-worlds, card mosaics, pill tabs and the v2 look.

OWN-WORLD: White ground #FFFFFF with section gaps on #F3F4F6, ink #15171A, secondary #5E636B, hairlines #E4E6EA. Austrian red #C8102E marks: the 4px top rule, the active tab underline, the brand's second half, the own team (row tint #FCE8EB + red name), live/today. On desktop (≥900px) sections sit as white panels with 8px radius on the #F3F4F6 field, so table and round column read as two work areas. Barlow for text and figures (tabular), Barlow Condensed 800 uppercase for headings and the Pkt column. Competition switch is a two-segment control (1.5px ink border, 6px radius); section tabs are underline tabs. Match rows in Flashscore form: home over away, score per line, winner bold.

STORY: Open league → read the whole table, find your team in red → open a team for its fixtures, form, next match and players → scroll to Spielplan, flip rounds ("Heute" in red on match day) → open a played game for its Spielbericht → compare teams in Statistik → download Tabelle & Spielplan as PDF.

FIRST VIEWPORT: Phone 390: red 4px rule; wordmark "Matchcenter" + search field "Team oder Spieler" (owner, 2026-10-31: "ja mach ein suchleiste wenn das die offene decisions war" and "ja die suche kann auch spieler finden benutze als quelle handball stats"; players from the nuLiga rankings per ADR-005 amendment); on desktop wordmark, competition switch and search share one row; segmented HLA Challenge West | Landesliga OÖ; H1 league name (condensed uppercase 30px) with phase, season and "Stand" line; sticky tabs Tabelle / Spielplan / Ranglisten / Statistik; table # | Team (full name, wraps to max two lines) | Sp | S-U-N | Tore | +/− | Pkt, all 8 rows in view, own team tinted. Desktop: table ~2/3 left, current round schedule right column, same tokens.

FORM: Category standard (canon), chosen by the owner after three rejected rounds; layout sketch .impeccable/mocks/decision/names-a.html (row variant A). Signature move: the own team carried in red across table, schedule, reports and scorer lists (pending report states stay neutral, never red), plus a round flipper that steps through the whole season. seed:f40ddc759b89d806

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Amendment 2026-11-06 (streamline-v3)

Owner: "die app sollte später ein kompletter nuliga handball österreich ersatz sein … eine übersicht … über das team und bewerb was man halt favoritisiert hat"; red marks "Nur Favoriten"; tabs "Zusammenlegen, 3 Tabs". FIRST VIEWPORT now: no competition switch; "Verband › Bewerb" line + ★ beside the H1; tabs Tabelle / Spielplan / Statistik. The signature "own team in red" is the visitor's favorites. Home is a favorites overview (or "Finde dein Team" without favorites).


## Amendment 2026-11-22 (declutter-v3-first-glance)

A friend of the owner opened the home for the first time and found it "a bit overwhelming and bloated at first glance". Owner picked "Eine Spieleliste": home with favorites = "Meine nächsten Spiele" (match rows → Spielvorschau), "Zuletzt" (result rows → report), "Meine Bewerbe" (rank/points or leader → Tabelle), "Alle Bewerbe" link; no dark next-match card, mini table or round list on the home. Without favorites: one search field (header search hidden) + Verband rows. Captures: `.impeccable/review/declutter-home-*.png`.
