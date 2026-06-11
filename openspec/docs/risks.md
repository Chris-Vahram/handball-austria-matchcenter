# Risks and Open Issues

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Productive data-use permission is unclear | Pilot cannot synchronize real data safely | Use curated sample only; request written permission and approved source |
| Automated scraping creates legal or operational conflict | Blocking issue for public launch | Keep scraping out of MVP; require separate reviewed ADR |
| Public source structure changes | Adapter breaks | Keep data adapter isolated and validate payloads |
| Stale demo data looks live | Users may trust outdated information | Label sample mode and show update timestamp |
| Personal data leaks into fixtures | Privacy violation | Explicit allowlist; schema review; no player, referee, or contact entities |
| Brand assets are used without permission | Trademark or licensing issue | Use neutral visual assets until approved |
| Multiple competition formats differ | Table or status assumptions break | Use source-supported optional fields and competition-aware adapters |
| Venue location approval remains unclear | Location UX may be incomplete | Store hall name first; clarify allowed address fields |
| Recipient path for nuLiga product review is not confirmed | Outreach may land at general office instead of decision maker | Start through verified OEHB office path, optionally ask nu Datenautomaten by phone/imprint for product contact |
| Preview is mistaken for official or public launch | Reputational/legal risk | Keep wording explicit: independent, unlisted, fixture-backed, no official status |
| Legal placeholders remain visible | Public launch blocked | Use only targeted preview; finalize imprint/privacy before custom domain or public marketing |

## Required Clarifications Before Productive Data Integration

- Name of approving OEHB or OOHV contact.
- Approved technical data source and update frequency.
- Permitted public venue fields.
- Permitted use of OEHB, OOHV, and HLA visual assets.
- Exact target season for pilot.
- Named product recipient for OEHB/nuLiga review.
- Whether first pitch should include PDF one-pager or only links/screenshots.
