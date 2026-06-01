# Arbeitsweise

- Bevor du implementierst: Stelle maximal 8 gezielte Klaerungsfragen. Danach
  erstelle Spezifikation, Plan und Definition of Done.
- Code ist production-like: klare Struktur, kleine Funktionen, keine
  unnoetigen Abhaengigkeiten.

# Qualitaet

- Jede Kernlogik braucht Tests mit Jest und Supertest.
- Vor Abschluss: `npm test`, Lint und Typecheck ausfuehren, falls TypeScript
  verwendet wird. Ergebnisse melden.
- Fehlermeldungen und Edge Cases sauber behandeln.

# Security und Privacy

- Keine Secrets ausgeben. Keine `.env`-Inhalte, Tokens oder Schluessel anzeigen.
- Input Validation mit Zod oder Joi fuer alle Request-Bodies und Params.
- Auth: sichere Passworthashes mit Argon2 oder bcrypt. Sichere Cookies oder JWT
  verwenden, bevorzugt HttpOnly Cookie.
- Rate Limiting, Helmet und CORS korrekt konfigurieren.
- Datenbankzugriff nur mit parameterisierten Queries, Prisma oder Drizzle.
  Migrationen verwenden.

# Full Access Regeln

- Bei Befehlen ausserhalb des Projektordners: stoppen und vorher nachfragen.
- Bei `rm`, `mv`, rekursiven Aktionen oder Glob-Patterns: immer vorher
  erklaeren, was betroffen ist, und Approval abwarten.
