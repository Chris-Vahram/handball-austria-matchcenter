# nuLiga Sales Demo Handoff

## Scope

Send a targeted, reviewed preview of the independent handball matchcenter
pilot. It is a UX and frontend concept backed by reviewed demo fixtures. It is
not an official nuLiga product, not a live integration, and not a public
launch.

## Before Sending

1. Complete the targeted-preview section in
   `openspec/docs/sales-demo-prelaunch-checklist.md`.
2. Use the current Vercel preview URLs:
   - Pitch: `https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/pitch`
   - Demo: `https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/demo`
3. Send first through the verified OEHB office contact path, optionally CC the
   OEHB competition coordinator. Use the nu Datenautomaten imprint/phone path
   only after confirming the right product recipient.
4. Keep the initial message short and request a 20-minute product discussion.
5. Attach at most three screenshots:
   `output/playwright/pitch-mobile.png`,
   `output/playwright/home-mobile.png`, and
   `output/playwright/report-mobile.png`.

## Email Template

Subject: UX-Konzept für ein modernes nuLiga-Handball-Matchcenter

Guten Tag [Name ergänzen],

ich habe einen unabhängigen, mobilen Matchcenter-Prototyp für den
Handball-Bereich erstellt. Der Fokus liegt auf einer schnellen und einfachen
Nutzung für Spieler, Trainer, Eltern und Funktionäre.

Der Prototyp zeigt anhand geprüfter Demo-Daten:

- nächste Spiele, Uhrzeit und Halle auf einen Blick,
- übersichtliche Spielpläne, Ergebnisse und Tabellen,
- lokale Favoriten für einen persönlichen Einstieg,
- Kalenderexport, Teilen und externe Routenlinks.

Pitch-Seite:
https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/pitch

Demo-Link:
https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/demo

Der Link ist ein unabhängiger UX-Prototyp und keine offizielle
nuLiga-Anwendung. Es gibt keine produktive Datenanbindung, keine Anmeldung,
keine U18-Spielerstatistik und keine Veröffentlichung von Kontakten,
Schiedsrichterdaten, Portraitlinks oder Personen-IDs.

Gerne würde ich das Konzept in einem kurzen Gespräch vorstellen und erfahren,
ob ein moderner Matchcenter-Ansatz für nuLiga interessant ist. Wären in den
nächsten Wochen 20 Minuten für einen Austausch möglich?

Mit freundlichen Grüßen

[Name ergänzen]

## 5-Minute Demo Script

1. Pitch page `/pitch`: explain problem, target users, pilot status, and
   safety boundaries.
2. Demo page `/demo`: use the numbered guided flow and explain problem,
   solution, target users, pilot status, and data boundaries.
3. Start page: show that team selection is simple, deduplicated by club context,
   and local-only.
4. Save a team favorite: show that the selected team stays visible and the
   personalized next match appears below it.
5. Open a team page: show next match, latest result, table position, form curve,
   and report links.
6. Open HLA CHALLENGE: show that phases remain separated instead of mixing
   Grunddurchgang, Aufstiegsrunde, and Playoffs.
7. Open a table: show mobile cards and desktop table without squeezing a table
   into a phone layout.
8. Open the sample match report: show result, venue, team statistics, calendar
   export, sharing, Maps search link, approved adult player statistics, and
   public source transparency.
9. Close with the boundary: reviewed demo fixtures today; official approved
   adapter or export only after agreement.

## Discussion Goals

- Validate whether nuLiga sees value in a modern handball matchcenter
  experience.
- Identify the responsible product or business contact.
- Ask whether an approved sandbox, export, or documented `nuPortalRS` path can
  be discussed if there is interest.
- Clarify next step: feedback call, pilot scope, or technical discovery.

## Do Not Claim

- Do not claim partnership, official status, live data, or production
  readiness.
- Do not promise a productive integration before access and contract review.
- Do not publish U18 player-level data or non-allowlisted personal data.

## ChatGPT Email Polish Prompt

Use this prompt only to improve wording. Do not ask ChatGPT to invent legal
claims, partnership status, or unverified recipients.

```text
Verbessere diese E-Mail für einen professionellen Erstkontakt an den
Österreichischen Handballbund / nuLiga / nu Datenautomaten.

Ziel: kurzer Feedbacktermin, nicht aggressiv verkaufen. Ton: seriös, knapp,
selbstbewusst, nicht übertrieben.

Was schon vorhanden ist:
- funktionierender Next.js/Vercel Prototyp
- private GitHub-Ablage
- mobile-first Pitch-Seite
- geführter Demo-Flow
- Startseite mit nächstem Spiel und Favoritenteam
- HLA CHALLENGE Phasenübersicht
- Edelweiss/Traun Vereinskontext
- Teamseiten mit nächstem Spiel, letztem Ergebnis, Tabellenposition und Form
- Demo-Spielbericht mit Statistik und Spielverlauf
- Kalenderexport, Teilen und Google-Maps-Suchlink
- sichtbare Datenschutz-/Impressum-Platzhalter für späteren öffentlichen Launch
- keine Kontakte, Telefonnummern, E-Mails, Schiedsrichterdaten, Login-Seiten
  oder privaten Daten

Links:
Pitch:
https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/pitch

Demo:
https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/demo

Bitte liefere:
1. finale E-Mail auf Deutsch
2. kurze Version
3. Betreffzeilen
4. Version an ÖHB
5. Version an nu Datenautomaten
6. Follow-up nach 7 Tagen
```
