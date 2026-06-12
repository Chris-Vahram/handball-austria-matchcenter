"use client";

import { useEffect, useState } from "react";
import { isFavorite, readFavorites, toggleFavorite, type FavoriteKind } from "@/lib/favorites";
import { setActiveClub, notifyFollowChange } from "@ui/team-theme";
import { StarIcon } from "@ui/icons";

const labels = { competition: "Bewerb", team: "Team", club: "Verein" };

export function FavoriteToggle({ kind, id }: { kind: FavoriteKind; id: string }) {
  const [selected, setSelected] = useState(false);
  useEffect(() => setSelected(isFavorite(readFavorites(window.localStorage), kind, id)), [id, kind]);
  const label = labels[kind];
  const onClick = () => {
    const next = toggleFavorite(window.localStorage, kind, id);
    const now = isFavorite(next, kind, id);
    setSelected(now);
    if (kind === "club" && now) setActiveClub(id);
    else notifyFollowChange();
  };
  return <button aria-pressed={selected} className={selected ? "btn-team" : "btn-soft"} onClick={onClick} type="button"><StarIcon className="size-4" />{selected ? `${label} gefolgt` : `${label} folgen`}</button>;
}
