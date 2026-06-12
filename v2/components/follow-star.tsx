"use client";

import { useEffect, useState } from "react";
import { isFavorite, readFavorites, toggleFavorite } from "@/lib/favorites";
import { setActiveClub, notifyFollowChange } from "@ui/team-theme";
import { StarIcon } from "@ui/icons";

/** Small star toggle to follow a club (covers all its teams across Bewerbe). */
export function FollowStar({ clubId, name, className = "" }: { clubId: string; name: string; className?: string }) {
  const [selected, setSelected] = useState(false);
  useEffect(() => setSelected(isFavorite(readFavorites(window.localStorage), "club", clubId)), [clubId]);
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const next = toggleFavorite(window.localStorage, "club", clubId);
    const now = isFavorite(next, "club", clubId);
    setSelected(now);
    if (now) setActiveClub(clubId);
    else notifyFollowChange();
  };
  return <button aria-pressed={selected} aria-label={selected ? `${name} nicht mehr folgen` : `${name} folgen`} className={`grid size-8 shrink-0 place-items-center rounded-full border transition ${selected ? "team-bg team-border" : "border-line bg-surface text-faint hover:text-team"} ${className}`} onClick={onClick} type="button"><StarIcon className="size-4" /></button>;
}
