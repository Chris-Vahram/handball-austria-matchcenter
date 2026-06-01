# handball-austria-matchcenter

Unabhängiger, deutschsprachiger Matchcenter-Pilot für die OÖHV Männer
Landesliga 2025/26.

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
npm run test:e2e
```

## Datenhinweis

Die Anwendung zeigt manuell kuratierte Pilot-Beispieldaten, keine Live-Daten.
Quelle ist die öffentliche
[ÖHB-Bewerbsseite](https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-LLM).
Der Adapter in `src/data/adapter.ts` validiert den Datensatz vor Verwendung.

Enthalten sind ausschließlich Bewerb, Saison, Vereine, Teams, Hallennamen,
Spieltermine, Ergebnisse, Status und Tabelle. Nicht enthalten sind
Spielerlisten, Kontakte, Telefonnummern, E-Mail-Adressen, Schiedsrichterdaten
oder andere persönliche Details.

Produktive Synchronisierung braucht eine freigegebene offizielle Schnittstelle,
einen freigegebenen Export oder schriftliche Erlaubnis. Automatisiertes Scraping
ist nicht Bestandteil dieses Piloten.
