"use client";

import { useEffect, useState } from "react";
import { isFavorite, readFavorites, toggleFavorite } from "@/lib/favorites";
import { notifyFollowChange } from "@ui/team-theme";
import { StarIcon } from "@ui/icons";

export function PlayerFollowButton({ slug }: { slug: string }) {
  const [selected, setSelected] = useState(false);
  useEffect(() => setSelected(isFavorite(readFavorites(window.localStorage), "player", slug)), [slug]);
  const onClick = () => {
    const next = toggleFavorite(window.localStorage, "player", slug);
    setSelected(isFavorite(next, "player", slug));
    notifyFollowChange();
  };
  return <button aria-pressed={selected} className={selected ? "btn-team" : "btn-soft"} onClick={onClick} type="button"><StarIcon className="size-4" />{selected ? "Spieler gefolgt" : "Spieler folgen"}</button>;
}
