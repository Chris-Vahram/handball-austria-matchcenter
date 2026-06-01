"use client";

import { useEffect, useState } from "react";
import { isFavorite, readFavorites, toggleFavorite, type FavoriteKind } from "@/lib/favorites";

const labels = { competition: "Bewerb", team: "Team", club: "Verein" };

export function FavoriteToggle({ kind, id }: { kind: FavoriteKind; id: string }) {
  const [selected, setSelected] = useState(false);
  useEffect(() => setSelected(isFavorite(readFavorites(window.localStorage), kind, id)), [id, kind]);
  const label = labels[kind];
  return <button aria-pressed={selected} className={`button-secondary gap-2 ${selected ? "border-accent bg-accent-50 text-accent" : ""}`} onClick={() => setSelected(isFavorite(toggleFavorite(window.localStorage, kind, id), kind, id))} type="button"><span aria-hidden="true">{selected ? "★" : "☆"}</span>{selected ? `${label} gespeichert` : `${label} merken`}</button>;
}
