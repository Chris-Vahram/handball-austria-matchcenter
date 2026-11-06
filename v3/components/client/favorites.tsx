"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPETITIONS_KEY, FAVORITES_EVENT, TEAMS, readList, toggle, writeList } from "@/lib/favorites";

const store = () => (typeof window === "undefined" ? undefined : window.localStorage);
const safeStore = () => { try { return store(); } catch { return undefined; } };

/** Favorites list for one key, synced across components and tabs. `ready` is false until read on the client. */
export function useFavorites(key: string): [string[], (next: string[]) => void, boolean] {
  const [list, setList] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const sync = () => setList(readList(safeStore(), key));
    sync(); setReady(true);
    window.addEventListener(FAVORITES_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(FAVORITES_EVENT, sync); window.removeEventListener("storage", sync); };
  }, [key]);
  return [list, (next) => { setList(next); writeList(safeStore(), key, next); window.dispatchEvent(new Event(FAVORITES_EVENT)); }, ready];
}

/** ★ follow toggle for a team (`kind="team"`, id = team key) or a Bewerb (`kind="competition"`, id = competition id). */
export function FollowStar({ kind, id, label }: { kind: "team" | "competition"; id: string; label: string }) {
  const [list, setList] = useFavorites(kind === "team" ? TEAMS : COMPETITIONS_KEY);
  const on = list.includes(id);
  return (
    <button type="button" className={on ? "star on" : "star"} aria-pressed={on}
      aria-label={on ? `${label} folgst du – nicht mehr folgen` : `${label} folgen`}
      title={on ? "Nicht mehr folgen" : "Folgen – erscheint auf der Startseite"}
      onClick={() => setList(toggle(list, id))}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" /></svg>
    </button>
  );
}

/** Marks every `[data-team]` element of a favorite team with `.me`; re-runs on favorites and route/query changes. */
export function FavoriteHighlighter() {
  const [teams] = useFavorites(TEAMS);
  const path = usePathname();
  const params = useSearchParams();
  useEffect(() => {
    const set = new Set(teams);
    document.querySelectorAll<HTMLElement>("[data-team]").forEach((el) => el.classList.toggle("me", set.has(el.dataset.team!)));
  }, [teams, path, params]);
  return null;
}
