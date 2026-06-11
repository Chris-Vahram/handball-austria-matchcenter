# Cold Restart Continuation Prompt

Use caveman mode.

Work in `/Users/mitgl/Desktop/coden/nuLiga`.

Read first:

- `AGENTS.md`
- `README.md`
- `openspec/docs/fsd.md`
- `openspec/docs/sdd.md`
- `openspec/docs/data-strategy.md`
- `openspec/docs/privacy-legal-review.md`
- `openspec/docs/risks.md`
- `openspec/docs/sales-demo-deployment.md`
- `openspec/docs/sales-demo-handoff.md`
- `openspec/docs/sales-demo-prelaunch-checklist.md`
- `openspec/docs/sales-demo-quality-review.md`
- `openspec/docs/sales-outreach-contact-plan.md`
- `docs/sales-pitch.md`
- `docs/nuliga-email-template.md`

Current state:

- Private GitHub repo exists:
  `https://github.com/Chris-Vahram/handball-austria-matchcenter`
- Current reviewed Vercel preview:
  `https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app`
- Pitch page:
  `https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/pitch`
- Guided demo:
  `https://handball-austria-matchcenter-k1il6x1uu-chris-vahrams-projects.vercel.app/demo`
- Check current commit with `git log --oneline -5`. Relevant recent commits
  before this continuation update:
  - `db23f2d docs: update sales preview handoff`
  - `e3620e8 feat: add nuliga pitch package`
  - `5d08798 fix: derive sitemap url on vercel`
- App is a fixture-backed sales preview, not a public launch.
- Legal pages still contain placeholders and must be finalized before public
  launch/custom domain.

What exists:

- Mobile-first matchcenter UI.
- `/pitch` sales page.
- `/demo` guided demo flow.
- Start page with next match and local favorite onboarding.
- Edelweiss/Traun unified club context.
- HLA CHALLENGE phase hub.
- Team insights: next match, latest result, table position, form.
- Demo match report with adult player statistics and match timeline.
- Calendar export, share fallback, Google Maps search links.
- German loading, empty, and error states.
- Docs for sales pitch and email template.
- Local screenshots under ignored `output/playwright/`.

Hard constraints:

- Do not change data strategy without OpenSpec proposal.
- Do not add scraping.
- Do not access login-protected pages.
- Do not add contacts, phone numbers, email addresses, referee data, source
  person IDs, player portrait links, private data, or unrelated personal fields
  to sports fixtures.
- U18 player-level publication remains disabled until explicit documented
  privacy/legal approval.
- Favorites stay browser-local.
- No analytics, login, push, native app, backend DB, or productive nuLiga
  integration unless separately specified and approved.
- Do not expose secrets or `.env` contents.

Recommended next work:

1. Polish final outreach email using `docs/nuliga-email-template.md` and
   `openspec/docs/sales-outreach-contact-plan.md`.
2. Optionally create a one-page PDF pitch from `docs/sales-pitch.md`.
3. Confirm current OEHB office recipient from official OEHB contact/office page
   before sending.
4. Send first targeted preview with at most three screenshots:
   - `output/playwright/pitch-mobile.png`
   - `output/playwright/home-mobile.png`
   - `output/playwright/report-mobile.png`
5. Wait 5-7 working days, then send one short follow-up.
6. If no response, call OEHB office or nu Datenautomaten imprint phone and ask
   for the right product/business contact.

Before code completion run when code changes:

- `npm test`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e`
- `npm audit --omit=dev` if dependency/security scope changed or release
  readiness is requested.

For docs-only changes, tests are not required; report that only Markdown changed.

Commit only intended files. Ignore `.DS_Store` files unless explicitly asked.
