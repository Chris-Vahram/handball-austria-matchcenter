# Sales Demo Pre-Launch Checklist

Public launch is blocked until every required item is reviewed.

## Required Before Public Deployment

- [ ] Replace all `[Vor öffentlichem Launch ergänzen]` placeholders.
- [ ] Review final imprint owner and contact details.
- [ ] Review final privacy text, responsible party, hosting provider, and legal
      basis.
- [ ] Review public domain and configure `NEXT_PUBLIC_SITE_URL`.
- [ ] Confirm feedback destination:
      `mailto:c.vahram@students.htl-leonding.ac.at`.
- [ ] Confirm Google Maps search-link behavior using allowed hall names only.
- [ ] Confirm no unapproved logos, trademarks, or brand assets are used.
- [ ] Confirm only reviewed demo fixtures enter deployment.
- [ ] Confirm `data/import-cache/`, `.env*`, raw snapshots, tokens, and secrets
      are excluded.
- [ ] Confirm productive synchronization remains disabled.
- [ ] Run test, lint, typecheck, build, E2E, audit, keyboard, and 360px QA.

## Later Productive Integration

- [ ] Obtain approved `nuPortalRS` sandbox, approved export, or written
      permission.
- [ ] Review contract, permitted fields, update interval, and rollback.
- [ ] Keep player-level and U18 publication disabled until explicit privacy and
      legal approval exists.
