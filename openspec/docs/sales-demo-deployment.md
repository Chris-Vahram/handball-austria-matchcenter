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
4. Review the generated preview URL before sharing it.
5. Configure `NEXT_PUBLIC_SITE_URL` to the reviewed preview or custom domain.
6. Add a custom domain only after legal owner details and privacy text are
   finalized.

No actual deployment is part of this change.

## Environment Boundary

- `NEXT_PUBLIC_SITE_URL`: canonical public base URL for sitemap and social links.
- Reviewed static demo fixtures: allowed.
- `data/import-cache/`: forbidden in Git and deployment artifacts.
- `.env*`: forbidden in Git except documented `.env.example`.
- Secrets, source credentials, tokens: not needed for fixture-backed demo.

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
