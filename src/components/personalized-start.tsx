"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isFavorite, readFavorites, toggleFavorite, type Favorites } from "@/lib/favorites";

export type PersonalizedMatch = { id: string; competitionId: string; homeTeamId: string; awayTeamId: string; startsAt: string; venueName: string; competitionName: string; homeName: string; awayName: string };
export type PersonalizedData = { matches: PersonalizedMatch[]; teams: { id: string; clubId: string; name: string; slug: string }[]; clubs: { id: string; name: string; slug: string }[] };

const hasFavorites = (favorites: Favorites) => Object.values(favorites).some((items) => items.length > 0);
const hasUpcomingMatch = (teamId: string, data: PersonalizedData) => data.matches.some((match) => match.startsAt >= new Date().toISOString() && (match.homeTeamId === teamId || match.awayTeamId === teamId));
const relevant = (match: PersonalizedMatch, favorites: Favorites, data: PersonalizedData) => {
  const clubTeamIds = data.teams.filter((team) => favorites.club.includes(team.clubId)).map((team) => team.id);
  return favorites.competition.includes(match.competitionId) || favorites.team.includes(match.homeTeamId) || favorites.team.includes(match.awayTeamId) || clubTeamIds.includes(match.homeTeamId) || clubTeamIds.includes(match.awayTeamId);
};
const dedupeTeamSuggestions = (teams: PersonalizedData["teams"], favorites: Favorites, data: PersonalizedData) => {
  const ranked = [...teams].sort((a, b) => Number(favorites.team.includes(b.id)) - Number(favorites.team.includes(a.id)) || Number(hasUpcomingMatch(b.id, data)) - Number(hasUpcomingMatch(a.id, data)) || a.name.localeCompare(b.name, "de"));
  return ranked.filter((team, index, all) => all.findIndex((item) => item.clubId === team.clubId) === index);
};
const clubLabel = (clubId: string, data: PersonalizedData) => data.clubs.find((club) => club.id === clubId)?.name ?? data.teams.find((team) => team.clubId === clubId)?.name ?? "Unbekannter Verein";

export function PersonalizedStart({ data }: { data: PersonalizedData }) {
  const [favorites, setFavorites] = useState<Favorites>();
  const [storageError, setStorageError] = useState(false);
  useEffect(() => setFavorites(readFavorites(window.localStorage)), []);
  if (!favorites) return null;
  const next = data.matches.filter((match) => match.startsAt >= new Date().toISOString() && relevant(match, favorites, data)).sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0];
  const suggestedTeams = dedupeTeamSuggestions(data.teams, favorites, data);
  const saveClub = (clubId: string) => {
    const nextFavorites = toggleFavorite(window.localStorage, "club", clubId);
    setFavorites(nextFavorites);
    setStorageError(!isFavorite(nextFavorites, "club", clubId));
  };
  const nextDate = next ? new Intl.DateTimeFormat("de-AT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vienna" }).format(new Date(next.startsAt)) : undefined;
  return <section className="surface border-dashed p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Für dich</p><h2 className="mt-1 text-xl font-black text-navy">Wähle dein Team</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{hasFavorites(favorites) ? "Dein Favorit bleibt markiert. Du kannst hier jederzeit ein anderes Team wählen oder den Favoriten wieder entfernen." : "Speichere ein Team nur auf diesem Gerät. Danach zeigt dir die Startseite dein nächstes Spiel zuerst."}</p></div><Link className="button-secondary" href="/suche">Alle Teams suchen</Link></div>{storageError && <p className="mt-3 rounded-2xl bg-warning-50 px-3 py-2 text-sm font-bold text-warning">Speichern ist in diesem Browser gerade nicht verfügbar. Du kannst trotzdem alle Inhalte nutzen.</p>}<div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{suggestedTeams.slice(0, 6).map((team) => {
    const selected = isFavorite(favorites, "club", team.clubId);
    return <button aria-pressed={selected} className={`rounded-2xl border px-3 py-3 text-left text-sm font-black transition ${selected ? "border-accent bg-accent-50 text-accent" : "border-line bg-white text-navy hover:border-navy-100 hover:bg-navy-50"}`} key={team.clubId} onClick={() => saveClub(team.clubId)} type="button"><span aria-hidden="true">{selected ? "★ " : ""}</span>{clubLabel(team.clubId, data)}</button>;
  })}</div><div className="mt-4 flex flex-wrap gap-2"><Link className="button-primary" href="/bewerbe">Bewerb auswählen</Link><Link className="button-secondary" href="/teams/edelweiss-traun">Beispielteam öffnen</Link></div>{hasFavorites(favorites) && <div className="mt-6 border-t border-line pt-5">{next && nextDate ? <><h3 className="section-title text-2xl">Dein nächstes Spiel</h3><article className="surface mt-4 overflow-hidden border-navy bg-navy p-5 text-white"><p className="text-xs font-black uppercase tracking-wide text-blue-100">{next.competitionName}</p><p className="mt-3 text-sm font-bold text-blue-100">{nextDate}</p><div className="mt-3 grid grid-cols-[1fr_auto] gap-2 font-black"><span>{next.homeName}</span><span>–</span><span>{next.awayName}</span><span>–</span></div><p className="mt-4 text-xs text-blue-100">{next.venueName}</p></article></> : <><h3 className="mt-1 text-xl font-black text-navy">Kein kommendes Spiel gefunden</h3><p className="mt-2 text-sm leading-6 text-slate-600">Für deine gemerkten Einträge ist aktuell kein weiterer Termin verfügbar.</p></>}</div>}</section>;
}
