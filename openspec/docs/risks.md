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

## Required Clarifications Before Productive Data Integration

- Name of approving OEHB or OOHV contact.
- Approved technical data source and update frequency.
- Permitted public venue fields.
- Permitted use of OEHB, OOHV, and HLA visual assets.
- Exact target season for pilot.
