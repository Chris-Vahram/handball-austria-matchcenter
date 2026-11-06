## Context

The current Next.js pilot already provides a polished mobile-first public
matchcenter, validated public sports records, strict exclusion of unnecessary
personal fields, and controlled pilot ingestion. The sales demo now needs
repeat-use value and a credible deployment story without pretending to replace
the underlying association platform.

The target audience includes players, trainers, parents, fans, club officials,
association representatives, and a potential nuLiga integration partner.
Productive integration should use an approved official interface such as
`nuPortalRS`, an approved export, or written permission. The pilot must not add
login-protected access, aggressive crawling, or personal-data publication.

## Goals / Non-Goals

**Goals:**

- Make the demo useful for repeat visits through privacy-preserving favorites.
- Make fixture workflows practical through calendar export, sharing, and hall
  navigation.
- Make the frontend installable and publicly presentable as a sales demo.
- Add legal-information placeholders, SEO essentials, and deployment guidance.
- Document the migration boundary from pilot fixtures to an approved
  `nuPortalRS` adapter.

**Non-Goals:**

- User accounts, remote favorite synchronization, or profile databases.
- Result entry, club administration, player-pass workflows, or referee tools.
- Live-score polling without an approved source.
- Offline caching of sports datasets that could misleadingly appear current.
- Enabling player-level or U18 personal-data publication.
- Adding automated scraping behavior or weakening the strict source allowlist.

## Decisions

### Browser-local favorites without accounts

Store only public entity IDs for favorite competitions, teams, and clubs in
browser `localStorage`. Add a small client boundary for favorite toggles and the
personalized start module. The rest of the app remains server-rendered.

Alternative: add authentication and a database. Rejected because it increases
privacy, security, operational, and sales-demo scope without improving the
initial pitch.

### Personalized start module, not a separate dashboard

Keep the public landing page useful for first-time visitors. Add a progressive
enhancement module that shows favorite contexts and the next matching fixture
when local favorites exist.

Alternative: replace landing page with a logged-in dashboard. Rejected because
the product must remain immediately usable for every visitor.

### Server-generated iCalendar export

Add an `.ics` route for individual matches and selected team schedules. Generate
standards-based calendar output from validated normalized sports records.

Alternative: use a client-side calendar library. Rejected because the format is
small, deterministic, and easier to test without a dependency.

### Native sharing with resilient fallback

Use the Web Share API where available and fall back to a copyable canonical
fixture URL. Keep this enhancement in a small client component.

Alternative: social-network-specific integrations. Rejected because canonical
links work across messaging apps and avoid tracking dependencies.

### Approved hall navigation only

Generate an external Google Maps search URL only from the already allowed hall
name. Never infer or enrich addresses from unrelated sources, embed a map, or
add tracking parameters.

Alternative: geocode venue names automatically. Rejected because it creates data
quality and approval questions outside the pilot boundary.

### Installable PWA shell without stale-data promises

Add manifest, icons, theme colors, and installability metadata. If a service
worker is added, cache only static app-shell assets. Displayed sports records
must continue to use validated current build or server data with visible update
metadata.

Alternative: offline-first dataset caching. Rejected because stale fixtures can
mislead users about schedule changes.

### Demo deployment before productive synchronization

Deploy reviewed fixture-backed sales demos through a managed Next.js host such
as Vercel. Document environment, domain, legal pages, rollback, and preview
workflow. Keep productive official integration as a replaceable adapter.

Alternative: deploy local raw snapshots. Rejected because raw snapshots are
ignored, may contain excluded fields, and are not sales-demo artifacts.

### Feedback link without embedded tracking

Add a configurable feedback contact link or external reviewed form URL. Do not
embed analytics, third-party scripts, or non-essential cookies by default.

## Risks / Trade-offs

- [Local favorites disappear when browser storage is cleared] -> Explain that
  favorites stay on the device and avoid implying account synchronization.
- [Calendar exports become stale after schedule changes] -> Include source and
  generation metadata and keep exports easy to refresh.
- [Hall navigation URL is wrong or unapproved] -> Make field optional and
  fixture-review every configured URL.
- [PWA install implies offline correctness] -> Cache shell assets only and keep
  visible update metadata.
- [Public demo accidentally looks official] -> Preserve independent-pilot label
  and avoid unapproved logos or claims.
- [Legal text requires owner details] -> Add explicit placeholders and block
  public production launch until owner review fills them.

## Migration Plan

1. Add local-favorite and personalized-start behavior behind small client
   components.
2. Add fixture actions and optional reviewed hall navigation fields.
3. Add PWA shell metadata, legal routes, SEO files, and feedback configuration.
4. Add deployment documentation and a reviewed static-fixture demo workflow.
5. Run unit, lint, typecheck, build, Playwright, accessibility, and mobile QA.
6. Deploy a preview URL with reviewed demo fixtures only.
7. Present the demo and request approved `nuPortalRS` sandbox or export access.
8. Implement an official adapter as a separate reviewed change after approval.

Rollback: remove the deployment or restore the previous reviewed commit. Local
favorites remain optional progressive enhancement and do not affect normalized
sports datasets.

## Open Questions

- Which legal owner details and domain will be used for the public demo?
- Which reviewed feedback destination should the demo expose?
- Which venue-navigation fields are approved for publication?
- Will the demo use a Vercel account or another managed Next.js host?
- Who can provide an approved `nuPortalRS` sandbox, contract, or sample export?
