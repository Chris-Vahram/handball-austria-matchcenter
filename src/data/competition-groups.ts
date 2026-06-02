export type CompetitionPhase = {
  slug: string;
  name: string;
  description: string;
  sourceReference: string;
  scheduleHref?: string;
};

export const HLA_CHALLENGE_SOURCE = "https://www.oehb.at/de/bewerbe/maennerbewerbe/nul-OoeHB-HLA--CHALLENGE";

export const hlaChallengePhases: CompetitionPhase[] = [
  { slug: "grunddurchgang-staffel-ost", name: "Grunddurchgang · Staffel Ost", description: "Öffentlich bestätigte Staffel des HLA-CHALLENGE-Grunddurchgangs.", sourceReference: HLA_CHALLENGE_SOURCE },
  { slug: "grunddurchgang-staffel-west", name: "Grunddurchgang · Staffel West", description: "Öffentlich bestätigte Staffel des HLA-CHALLENGE-Grunddurchgangs.", sourceReference: HLA_CHALLENGE_SOURCE },
  { slug: "aufstiegsrunde", name: "Aufstiegsrunde", description: "Ausgewählte validierte Pilottermine sind in der Demo verfügbar.", sourceReference: HLA_CHALLENGE_SOURCE, scheduleHref: "/bewerbe/hla-challenge/spielplan" },
  { slug: "aufstiegsspiele-regionalligen", name: "Aufstiegsspiele & Regionalligen", description: "Öffentlich bestätigter Anschlussbewerb für Aufstiegsspiele und Regionalligen.", sourceReference: "https://www.oehb.at/de/bewerbe/maennerbewerbe/nul-OoeHB-HLA--CHALLENGE--Aufstiegsspiele--u.--Regionalligen" }
];

export const hlaChallengePhase = (slug: string) => hlaChallengePhases.find((phase) => phase.slug === slug);
