# handball-austria-matchcenter

Unabhängiger, deutschsprachiger Matchcenter-Pilot für ausgewählte
österreichische Handball-Bewerbe.

## Lokal starten

```bash
npm install
npm run playwright:install
npm run dev
```

Prüfungen:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

## Sales-Demo Deployment

Der dokumentierte Standard für einen Preview-Deploy ist Vercel. Der aktuelle
Stand hat eine unlistete, geprüfte Preview:

- Pitch: https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/pitch
- Demo: https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/demo

Dies ist kein öffentlicher Launch und keine offizielle nuLiga-, ÖHB-, OÖHV-
oder HLA-Anwendung.

Für den gezielten Versand an nuLiga und für einen späteren öffentlichen Launch
gelten getrennte Freigaben:

- [Deployment-Guide](openspec/docs/sales-demo-deployment.md)
- [Pre-Launch-Checkliste](openspec/docs/sales-demo-prelaunch-checklist.md)
- [Sales-Demo-Handoff](openspec/docs/sales-demo-handoff.md)
- [Kontakt-/Outreach-Plan](openspec/docs/sales-outreach-contact-plan.md)

## Datenhinweis

Die Anwendung zeigt validierte Pilotdaten, keine garantierten Live-Daten. Der
Adapter in `src/data/adapter.ts` validiert Datensätze vor Verwendung.

Enthalten sind ausschließlich Bewerb, Saison, Vereine, Teams, Hallennamen,
Spieltermine, Ergebnisse, Status und Tabelle. Nicht enthalten sind
Spielerlisten, Kontakte, Telefonnummern, E-Mail-Adressen, Schiedsrichterdaten
oder andere persönliche Details. Einzelne erwachsene Demo-Spielberichtsdaten
sind nur im dokumentierten, geprüften Veröffentlichungsprofil enthalten; U18-
Spielerdaten bleiben deaktiviert.

Produktive Synchronisierung braucht freigegebenen `nuPortalRS`-Zugriff, einen
freigegebenen Export oder schriftliche Erlaubnis. Login-geschützter Zugriff und
aggressives Crawling sind nicht Bestandteil dieses Piloten.
