# ADR-004: Controlled OEHB Public Ingestion

## Status

Reviewed for pilot implementation

## Decision

Import only configured public `https://www.oehb.at/de/bewerbe/...` pages through
an explicit operator CLI. Never fetch OEHB pages while rendering web requests.
Never authenticate, follow login-protected links, or crawl unconfigured URLs.

Use these conservative defaults:

- Cache freshness: 24 hours.
- Minimum delay between network requests: 1500 milliseconds.
- Retries after a failed request: at most 2.
- Failure behavior: stop the requested import after bounded retries and retain
  the last validated normalized output.
- Raw snapshots and normalized outputs: `data/import-cache/`, excluded from Git.

The parser extracts only allowlisted sports data. It must ignore and never
normalize contacts, phone numbers, email addresses, referee data, private data,
or unrelated personal fields. Player-level publication remains globally
disabled while privacy and legal review is pending.

## Source Allowlist

| Competition | Public OEHB page |
| --- | --- |
| OOHV Maenner Landesliga | `https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-LLM` |
| OOHV mU18 Grunddurchgang 25/26 | `https://www.oehb.at/de/bewerbe/lv/nul-OOoeHV-mU18` |
| Elite Cup MU18 B-Bewerb | `https://www.oehb.at/de/bewerbe/oems/nul-OeHB-OoeHB--Elite--Cup--MU18` |
| HLA CHALLENGE | `https://www.oehb.at/de/bewerbe/maennerbewerbe/nul-OoeHB-HLA--CHALLENGE` |
| HLA CHALLENGE Aufstiegsspiele und Regionalligen | `https://www.oehb.at/de/bewerbe/maennerbewerbe/nul-OoeHB-HLA--CHALLENGE--Aufstiegsspiele--u.--Regionalligen` |

The HLA CHALLENGE frontend hub also names the publicly documented 2025/26
structure using reviewed public nuLiga group pages:

| HLA CHALLENGE phase | Public nuLiga group page |
| --- | --- |
| Ost Hauptrunde | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=216473` |
| West Hauptrunde | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=216502` |
| Aufstiegsrunde | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=216503` |
| Ost Abstiegsrunde | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=216490` |
| West Abstiegsrunde | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=216460` |

The committed frontend fixture contains reviewed normalized tables and a small
schedule sample only. It must not copy contact sections, addresses, officials,
player statistics, or broader page content. Do not invent schedules or tables.

Subresources such as public report links require separate parser validation and
must match the same OEHB host before retrieval.

## Rollback

If fetching, parsing, or validation fails, do not publish new output. Keep the
last validated normalized cache and the committed reviewed demo fixture. An
operator can disable imports without changing the frontend adapter contract.

## Rationale

OEHB competition pages contain useful sports records and can also contain
excluded personal fields. Separate fetching, normalization, validation, and
publication decisions reduce source traffic and prevent accidental exposure.

## 2026/27 nuLiga Allowlist (v3, change `add-matchcenter-v3`, 2026-10-31)

The v3 operator importer (`v3/src/importer/`) may fetch these public nuLiga
pages on `oehb-handball.liga.nu`, under the same limits as above (operator CLI
only, 24h cache, ≥1500 ms between requests, max 2 retries, no login, no
crawling of unconfigured URLs). The root `src/importer/` allowlist is unchanged.

| Competition | Group page |
| --- | --- |
| MEHRLEBEN HLA CHALLENGE West Hauptrunde 26/27 | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+26%2F27&group=218583` |
| OÖHV Landesliga Männer, LLM-Grunddurchgang 26/27 | `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=O%C3%96HV+26%2F27&group=218721` |

Per configured group, these subpages are also allowed (same `championship`
and `group` parameters only):

- Spielplan (Gesamt): `groupPage?displayTyp=vorrunde&displayDetail=meetings&championship=…&group=…`
- Match reports: `groupMeetingReport?meeting=<id>&championship=…&group=…`
- Player statistics: `groupMeetingStatistics?displayType=<playerGoals|playerSevenMeterGoals|playerSuspensions|playerYellowCards|playerRedCards>&championship=…&group=…`
- Group and team statistics (added 2026-10-31, aggregate team data only): `groupMeetingStatistics?displayType=groupAndTeams&championship=…&group=…`

Not allowed: `nuDokument` PDFs, `teamPortrait` (publishes team officials with phone numbers; team pages are derived from the schedule instead), contact/officials pages ("Spielleiter und
Schiedsrichter-Einteiler", "Kontaktadressen, Hallen …"), `playerPortrait`,
and any other group. Player-level data from these pages is governed by
ADR-005.
