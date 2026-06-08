"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isFavorite, readFavorites, toggleFavorite, type Favorites } from "@/lib/favorites";

export type PersonalizedMatch = { id: string; competitionId: string; homeTeamId: string; awayTeamId: string; startsAt: string; venueName: string; competitionName: string; homeName: string; awayName: string };
export type PersonalizedData = { matches: PersonalizedMatch[]; teams: { id: string; clubId: string; name: string; slug: string }[] };

const hasFavorites = (favorites: Favorites) => Object.values(favorites).some((items) => items.length > 0);
const relevant = (match: PersonalizedMatch, favorites: Favorites, data: PersonalizedData) => {
  const clubTeamIds = data.teams.filter((team) => favorites.club.includes(team.clubId)).map((team) => team.id);
  return favorites.competition.includes(match.competitionId) || favorites.team.includes(match.homeTeamId) || favorites.team.includes(match.awayTeamId) || clubTeamIds.includes(match.homeTeamId) || clubTeamIds.includes(match.awayTeamId);
};

export function PersonalizedStart({ data }: { data: PersonalizedData }) {
  const [favorites, setFavorites] = useState<Favorites>();
  const [storageError, setStorageError] = useState(false);
  useEffect(() => setFavorites(readFavorites(window.localStorage)), []);
  if (!favorites) return null;
  const next = data.matches.filter((match) => match.startsAt >= new Date().toISOString() && relevant(match, favorites, data)).sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0];
  const suggestedTeams = [...data.teams].sort((a, b) => Number(data.matches.some((match) => match.startsAt >= new Date().toISOString() && (match.homeTeamId === b.id || match.awayTeamId === b.id))) - Number(data.matches.some((match) => match.startsAt >= new Date().toISOString() && (match.homeTeamId === a.id || match.awayTeamId === a.id))));
  const saveTeam = (teamId: string) => {
    const nextFavorites = toggleFavorite(window.localStorage, "team", teamId);
    setFavorites(nextFavorites);
    setStorageError(!isFavorite(nextFavorites, "team", teamId));
  };
  if (!hasFavorites(favorites)) return <section className="surface border-dashed p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow">Für dich</p><h2 className="mt-1 text-xl font-black text-navy">Wähle dein Team</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Speichere ein Team nur auf diesem Gerät. Danach zeigt dir die Startseite dein nächstes Spiel zuerst.</p></div><Link className="button-secondary" href="/suche">Alle Teams suchen</Link></div>{storageError && <p className="mt-3 rounded-2xl bg-warning-50 px-3 py-2 text-sm font-bold text-warning">Speichern ist in diesem Browser gerade nicht verfügbar. Du kannst trotzdem alle Inhalte nutzen.</p>}<div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{suggestedTeams.slice(0, 6).map((team) => <button className="rounded-2xl border border-line bg-white px-3 py-3 text-left text-sm font-black text-navy transition hover:border-navy-100 hover:bg-navy-50" key={team.id} onClick={() => saveTeam(team.id)} type="button">{team.name}</button>)}</div><div className="mt-4 flex flex-wrap gap-2"><Link className="button-primary" href="/bewerbe">Bewerb auswählen</Link><Link className="button-secondary" href="/teams/edelweiss-traun">Beispielteam öffnen</Link></div></section>;
  if (!next) return <section className="surface border-dashed p-5"><p className="eyebrow">Für dich</p><h2 className="mt-1 text-xl font-black text-navy">Kein kommendes Spiel gefunden</h2><p className="mt-2 text-sm leading-6 text-slate-600">Für deine gemerkten Einträge ist aktuell kein weiterer Termin verfügbar.</p></section>;
  const date = new Intl.DateTimeFormat("de-AT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vienna" }).format(new Date(next.startsAt));
  return <section><p className="eyebrow">Für dich</p><h2 className="section-title mt-1">Dein nächstes Spiel</h2><article className="surface mt-4 overflow-hidden border-navy bg-navy p-5 text-white"><p className="text-xs font-black uppercase tracking-wide text-blue-100">{next.competitionName}</p><p className="mt-3 text-sm font-bold text-blue-100">{date}</p><div className="mt-3 grid grid-cols-[1fr_auto] gap-2 font-black"><span>{next.homeName}</span><span>–</span><span>{next.awayName}</span><span>–</span></div><p className="mt-4 text-xs text-blue-100">{next.venueName}</p></article></section>;
}
