"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { data, sortMatches } from "@/data/query";
import { readFavorites, type Favorites } from "@/lib/favorites";
import { readActiveClub, setActiveClub } from "@ui/team-theme";
import { MatchList, SectionHeader, TeamAvatar } from "@ui/ui";
import { ClubSummary } from "@ui/club-summary";
import { FollowStar } from "@ui/follow-star";
import { SearchIcon, CompassIcon } from "@ui/icons";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 11) return "Guten Morgen";
  if (hour < 17) return "Hallo";
  return "Guten Abend";
};
const clubName = (id: string) => data.clubs.find((club) => club.id === id)?.name ?? "Verein";

function SearchBox() {
  const router = useRouter();
  const [value, setValue] = useState("");
  return <form className="tile flex items-center gap-2 p-2" onSubmit={(event) => { event.preventDefault(); router.push(`/suche${value.trim() ? `?q=${encodeURIComponent(value.trim())}` : ""}`); }}>
    <SearchIcon className="ml-2 size-5 shrink-0 text-faint" />
    <input aria-label="Finde dein Team" className="min-w-0 flex-1 border-0 bg-transparent px-1 py-2 text-sm text-ink outline-none placeholder:text-faint" onChange={(event) => setValue(event.target.value)} placeholder="Finde dein Team, deinen Verein oder Bewerb" value={value} />
    <button className="btn-team !min-h-0 px-4 py-2" type="submit">Suchen</button>
  </form>;
}

export function Home() {
  const [favorites, setFavorites] = useState<Favorites>();
  const [activeClub, setActive] = useState<string>();
  useEffect(() => {
    const sync = () => { setFavorites(readFavorites(window.localStorage)); setActive(readActiveClub()); };
    sync();
    window.addEventListener("mc:team", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("mc:team", sync); window.removeEventListener("storage", sync); };
  }, []);

  const all = useMemo(() => sortMatches(data.matches), []);
  const now = new Date().toISOString();
  const upcoming = all.filter((match) => match.startsAt >= now && match.status === "scheduled");
  const recent = all.filter((match) => match.status === "finished").reverse();
  const feed = [...upcoming, ...recent].slice(0, 8);
  const suggestionClubs = useMemo(() => {
    const ids = new Set<string>();
    for (const match of upcoming) for (const teamId of [match.homeTeamId, match.awayTeamId]) {
      const club = data.teams.find((team) => team.id === teamId)?.clubId;
      if (club) ids.add(club);
    }
    return [...ids].slice(0, 6).map((id) => ({ id, name: clubName(id) }));
  }, [upcoming]);

  if (!favorites) return null;
  const followedClubs = favorites.club.map((id) => data.clubs.find((club) => club.id === id)).filter((club): club is (typeof data.clubs)[number] => Boolean(club));
  const active = followedClubs.find((club) => club.id === activeClub) ?? followedClubs[0];

  return <div className="space-y-8">
    <header className="space-y-4">
      <div><p className="eyebrow-team">{greeting()}</p><h1 className="page-title mt-2">Mein Handball</h1></div>
      <SearchBox />
    </header>

    {followedClubs.length > 0 ? <section className="space-y-4">
      <SectionHeader eyebrow="Folge deinen Vereinen" title="Deine Vereine" action={<Link className="text-sm font-bold text-muted hover:text-team" href="/suche">+ Verein folgen</Link>} />
      {followedClubs.length > 1 && <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">{followedClubs.map((club) => { const on = club.id === active?.id; return <button className={`flex shrink-0 items-center gap-2 rounded-full border px-2 py-1.5 pr-3.5 text-sm font-bold transition ${on ? "team-border team-soft-bg text-ink" : "border-line bg-surface text-muted hover:text-ink"}`} key={club.id} onClick={() => { setActiveClub(club.id); setActive(club.id); }} type="button" aria-pressed={on}><TeamAvatar name={club.name} clubId={club.id} className="size-7 text-[0.6rem]" /><span className="max-w-[10rem] truncate">{club.name}</span></button>; })}</div>}
      {active && <ClubSummary clubId={active.id} />}
    </section> : <section className="tile team-soft-bg border-0 p-6">
      <p className="eyebrow-team">Willkommen</p>
      <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">Folge deinen Teams.</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">Suche dein Team oder folge direkt aus den aktuellen Spielen — danach zeigt dir die Startseite die nächsten Spiele deiner Vereine über alle Bewerbe hinweg. Gespeichert wird nur lokal.</p>
      {suggestionClubs.length > 0 && <div className="mt-4"><p className="mb-2 text-[0.7rem] font-extrabold uppercase tracking-wider text-muted">Bald im Einsatz</p><div className="grid gap-2 sm:grid-cols-2">{suggestionClubs.map((club) => <div className="flex items-center gap-3 rounded-2xl bg-surface p-3" key={club.id}><TeamAvatar name={club.name} clubId={club.id} className="size-9 text-xs" /><span className="min-w-0 flex-1 truncate text-sm font-bold text-ink">{club.name}</span><FollowStar clubId={club.id} name={club.name} /></div>)}</div></div>}
    </section>}

    <section><SectionHeader eyebrow="Über alle Bewerbe" title="Aktuelle Spiele" action={<Link className="flex items-center gap-1 text-sm font-bold text-muted hover:text-team" href="/entdecken"><CompassIcon className="size-4" />Entdecken</Link>} /><MatchList matches={feed} showFollow /></section>
  </div>;
}
