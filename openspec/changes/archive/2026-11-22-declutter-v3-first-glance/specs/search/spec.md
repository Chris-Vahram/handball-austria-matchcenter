# Spec Delta

## MODIFIED Requirements

### Requirement: Search field on every page
Every app page SHALL show a search field in the header that submits to a results page and works without JavaScript. On the home page without favorites, where the "Finde dein Team" search is the page's main content, the header search MUST NOT be shown, so that exactly one search field is visible.

#### Scenario: Search from the Liga page
- **WHEN** the user types "Traun" in the header search on the HLA West page and submits
- **THEN** the results page for "Traun" opens

#### Scenario: One search field on first visit
- **WHEN** a visitor without favorites opens the home page
- **THEN** exactly one search field is visible and it submits to the results page

#### Scenario: Header search on the home with favorites
- **WHEN** a visitor with favorites opens the home page
- **THEN** the header search is shown
