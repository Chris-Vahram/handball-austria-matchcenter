## ADDED Requirements

### Requirement: Installable public web app shell
The system SHALL provide installability metadata for supported browsers and
SHALL identify itself as an independent handball matchcenter pilot.

#### Scenario: Browser reads web app manifest
- **WHEN** a supported browser requests the app manifest
- **THEN** the manifest provides app name, short name, icons, theme color,
  background color, and standalone display mode

### Requirement: Stale-data-safe offline behavior
The system SHALL NOT present cached sports datasets as current merely because a
PWA shell is installed.

#### Scenario: Static shell assets are cached
- **WHEN** optional offline support caches app-shell assets
- **THEN** sports datasets still retain visible retrieval metadata
- **AND** the system does not silently replace current sports records with an
  unlabelled stale cache

### Requirement: Public legal information
The system SHALL provide easily reachable German-language imprint and privacy
routes and SHALL keep placeholder owner details visibly incomplete until
reviewed values are configured.

#### Scenario: User opens legal information
- **WHEN** a user follows the legal links from the public application
- **THEN** the system shows imprint and privacy information routes
- **AND** identifies the independent pilot status

### Requirement: Search and social metadata
The system SHALL provide descriptive page metadata, sitemap output, robots
configuration, and social preview metadata suitable for a public sales demo.

#### Scenario: Search crawler requests sitemap
- **WHEN** a crawler requests the sitemap
- **THEN** the system returns public landing, competition, schedule, standings,
  search, imprint, and privacy routes

### Requirement: Cookie-minimal sales demo
The system SHALL avoid non-essential cookies, embedded tracking scripts, and
third-party analytics by default.

#### Scenario: User browses demo without optional analytics
- **WHEN** a user browses public demo routes
- **THEN** the system does not require a cookie banner for application
  functionality
- **AND** does not load non-essential tracking scripts

### Requirement: Feedback path
The system SHALL provide a configurable reviewed feedback contact link or
external reviewed form URL without embedding unapproved third-party scripts.

#### Scenario: User submits feedback
- **WHEN** a user activates the feedback action
- **THEN** the system opens the configured reviewed feedback destination

### Requirement: Demo deployment guide
The repository SHALL document preview deployment, custom-domain setup,
environment boundaries, legal review gates, rollback, and the migration path to
an approved official `nuPortalRS` adapter or approved export.

#### Scenario: Operator prepares sales demo deployment
- **WHEN** an operator follows the deployment guide
- **THEN** only reviewed demo fixtures are deployed
- **AND** ignored raw source snapshots are excluded
- **AND** productive synchronization remains disabled until an approved source
  contract exists
