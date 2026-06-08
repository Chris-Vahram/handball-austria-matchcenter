# Sales Demo Pre-Launch Checklist

Use this checklist for a targeted sales preview. Public launch remains blocked
until every public-launch item is reviewed.

## Verified In Repository

- [x] Confirm feedback destination:
      `mailto:c.vahram@students.htl-leonding.ac.at`.
- [x] Confirm Google Maps search-link behavior uses allowed hall names only.
- [x] Confirm no third-party logos or copied brand assets are used.
- [x] Confirm the app runtime reads reviewed demo fixtures only.
- [x] Confirm `data/import-cache/`, `.env*`, raw snapshots, tokens, and secrets
      are excluded.
- [x] Confirm productive synchronization remains disabled.
- [x] Run test, lint, typecheck, build, E2E, audit, keyboard, and 360px QA.

## Required Before Sending Targeted Preview

- [ ] Push the reviewed commit to a private Git repository.
- [ ] Create a Vercel preview deployment from the reviewed commit.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final preview URL and redeploy.
- [ ] Open the final preview URL on a phone and desktop.
- [ ] Verify pitch page guided flow, start page, deduplicated team onboarding,
      persistent favorite state, team insights, search, competition, HLA
      CHALLENGE phases, table, match report, calendar export, share fallback,
      Maps link, footer, and legal routes.
- [ ] Decide whether the recipient receives an unlisted link or a
      password-protected preview.
- [ ] Confirm the intended recipient through the current official nuLiga or
      nu GmbH contact channel.
- [ ] Insert preview URL and recipient into the handoff template.

## Required Before Public Launch

- [ ] Replace all `[Vor öffentlichem Launch ergänzen]` placeholders.
- [ ] Review final imprint owner and contact details.
- [ ] Review final privacy text, responsible party, hosting provider, and legal
      basis.
- [ ] Review public domain and configure `NEXT_PUBLIC_SITE_URL`.
- [ ] Confirm feedback destination again.
- [ ] Review public domain, analytics, cookies, and external links.
- [ ] Obtain legal review for public availability.

## Later Productive Integration

- [ ] Obtain approved `nuPortalRS` sandbox, approved export, or written
      permission.
- [ ] Review contract, permitted fields, update interval, and rollback.
- [ ] Keep player-level and U18 publication disabled until explicit privacy and
      legal approval exists.
