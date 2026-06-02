export type CompetitionPhase = {
  slug: string;
  name: string;
  description: string;
  sourceReference: string;
  competitionSlug: string;
};

const nuLigaGroup = (group: number) => `https://oehb-handball.liga.nu/cgi-bin/WebObjects/nuLigaHBAT.woa/wa/groupPage?championship=%C3%96HB+25%2F26&group=${group}`;

export const hlaChallengePhases: CompetitionPhase[] = [
  { slug: "ost-hauptrunde", competitionSlug: "hla-challenge-ost-hauptrunde", name: "Ost Hauptrunde", description: "Vollständige öffentliche nuLiga-Tabelle 2025/26.", sourceReference: nuLigaGroup(216473) },
  { slug: "west-hauptrunde", competitionSlug: "hla-challenge-west-hauptrunde", name: "West Hauptrunde", description: "Vollständige öffentliche nuLiga-Tabelle 2025/26 mit Traun / Edelweiss.", sourceReference: nuLigaGroup(216502) },
  { slug: "aufstiegsrunde", competitionSlug: "hla-challenge-aufstiegsrunde", name: "Aufstiegsrunde", description: "Vollständige öffentliche nuLiga-Tabelle 2025/26.", sourceReference: nuLigaGroup(216503) },
  { slug: "ost-abstiegsrunde", competitionSlug: "hla-challenge-ost-abstiegsrunde", name: "Ost Abstiegsrunde", description: "Vollständige öffentliche nuLiga-Tabelle 2025/26.", sourceReference: nuLigaGroup(216490) },
  { slug: "west-abstiegsrunde", competitionSlug: "hla-challenge-west-abstiegsrunde", name: "West Abstiegsrunde", description: "Öffentliche nuLiga-Tabelle und geprüfter Spielplan-Ausschnitt mit Traun / Edelweiss.", sourceReference: nuLigaGroup(216460) }
];

export const hlaChallengePhase = (slug: string) => hlaChallengePhases.find((phase) => phase.slug === slug);
