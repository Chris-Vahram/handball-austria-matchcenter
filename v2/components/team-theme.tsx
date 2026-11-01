"use client";

import { useEffect } from "react";
import { readFavorites } from "@/lib/favorites";
import { teamColorByClub } from "@/lib/team-color";

const ACTIVE_KEY = "handball-matchcenter:active-club:v1";
const TEAM_EVENT = "mc:team";

/** Active followed club (drives the global accent). */
export function readActiveClub(): string | undefined {
  try {
    const favorites = readFavorites(window.localStorage);
    const stored = window.localStorage.getItem(ACTIVE_KEY) ?? undefined;
    return stored && favorites.club.includes(stored) ? stored : favorites.club[0];
  } catch {
    return undefined;
  }
}

export function setActiveClub(clubId: string) {
  try {
    window.localStorage.setItem(ACTIVE_KEY, clubId);
  } catch {
    // ignore unavailable storage
  }
  window.dispatchEvent(new CustomEvent(TEAM_EVENT));
}

export function notifyFollowChange() {
  window.dispatchEvent(new CustomEvent(TEAM_EVENT));
}

function applyTheme(clubId?: string) {
  const root = document.documentElement;
  const color = teamColorByClub(clubId);
  root.style.setProperty("--team", color.accent);
  root.style.setProperty("--team-soft", color.soft);
  root.style.setProperty("--team-on", color.on);
}

/** Tints the global chrome to the active followed club. Mounted once in layout. */
export function TeamThemeProvider() {
  useEffect(() => {
    const update = () => applyTheme(readActiveClub());
    update();
    window.addEventListener(TEAM_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(TEAM_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return null;
}
