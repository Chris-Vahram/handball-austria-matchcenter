# OEHB Public Importer Operations

## Scope

`npm run import:oehb -- <competition-id>` imports one configured public OEHB
competition page. Supported IDs:

- `oohv-maenner-landesliga`
- `oohv-mu18-grunddurchgang`
- `elite-cup-mu18-b`
- `hla-challenge`

The CLI is separate from Next.js rendering. It must never receive credentials
or access login-protected pages.

The public sales-demo build uses committed reviewed demo fixtures. Operators can
inspect local validated importer output under `data/import-cache/normalized/`.
Importer cache files are intentionally not an application runtime dependency.

## Cache and Pacing

- Raw snapshots: `data/import-cache/raw/`
- Validated normalized outputs: `data/import-cache/normalized/`
- Cache freshness: 24 hours
- Minimum request interval: 1500 milliseconds
- Retry limit: 2 retries after the initial request

`data/import-cache/` is ignored by Git. Never commit raw snapshots.

## Limitations

Competition-page parsing covers configured public sports tables: competition,
schedule, teams, venues, results, public report URLs, and standings. Report
statistics use a separate strict parser contract. Parser failures stop the
requested import and do not publish partially normalized data.

## Privacy Boundary

Only sports fields may reach normalized output. Contacts, phone numbers, email
addresses, referee data, private data, unrelated personal fields, player lists,
source person IDs, and portrait links are excluded.

Adult player-level publication is allowed only for separately reviewed public
adult match-report demo records under the documented publication profile. U18
player-level publication remains disabled until explicit privacy and legal
approval exists.

## Rollback

If source markup, fetching, or validation fails:

1. Stop the requested import.
2. Keep the last validated normalized output.
3. Review ignored raw snapshot locally.
4. Update parser fixtures and tests before retrying.
5. Fall back to committed curated pilot data if no validated cache exists.
