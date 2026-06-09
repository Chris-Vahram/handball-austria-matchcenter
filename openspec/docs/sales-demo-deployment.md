# Sales Demo Deployment Guide

## Scope

Deploy a reviewed fixture-backed preview of the independent matchcenter pilot.
Do not deploy ignored raw snapshots, local caches, secrets, or an unapproved
productive synchronization job.

## Standard Host

Use Vercel as the documented managed Next.js host for the sales demo:

1. Push the reviewed Git commit to a private GitHub repository.
2. Import the repository in Vercel.
3. Use the default Next.js build command: `npm run build`.
4. Let the sitemap derive the preview base URL from `VERCEL_URL`, or configure
   `NEXT_PUBLIC_SITE_URL` for a fixed public/custom domain.
5. Review the final preview URL before sharing it.
6. Add a custom domain only after legal owner details and privacy text are
   finalized.

The first handoff uses a reviewed, unlisted Vercel preview URL. Do not
advertise or index the preview as a public launch while legal placeholders
remain visible.

Current reviewed preview:

`https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app`

## Environment Boundary

- `NEXT_PUBLIC_SITE_URL`: canonical public base URL for sitemap and social links.
- `VERCEL_URL`: fallback preview host used when `NEXT_PUBLIC_SITE_URL` is not
  configured.
- Reviewed static demo fixtures: allowed.
- `data/import-cache/`: forbidden in Git and deployment artifacts.
- `.env*`: forbidden in Git except documented `.env.example`.
- Secrets, source credentials, tokens: not needed for fixture-backed demo.

## Preview Smoke Test

Run the repository checks before deploying. After deploying, repeat the manual
smoke test against the final preview URL on a phone and desktop:

1. Start page and personalized favorite.
2. Search, competition schedule, table, team, and club pages.
3. Match report, calendar download, share fallback, and Google Maps search
   link.
4. Footer, feedback mail link, imprint placeholder, and privacy placeholder.
5. Confirm that no productive synchronization, raw cache, or secret is part of
   the deployment.

## Rollback

Use Vercel deployment history to restore the previous reviewed deployment or
remove the public alias. Keep productive synchronization disabled.

## Productive Integration Boundary

The public frontend reads validated normalized records through the existing
adapter contract. A productive implementation must be a separately reviewed
adapter using one of:

1. Approved official `nuPortalRS` access.
2. Approved official export.
3. Written permission for a defined alternative process.

Do not add login-protected access, aggressive crawling, or broader public-page
scraping. Preserve strict schemas, allowlist validation, retrieval timestamps,
provenance, cache controls, and player-publication gates.
