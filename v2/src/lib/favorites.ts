export const FAVORITES_STORAGE_KEY = "handball-matchcenter:favorites:v1";
export const favoriteKinds = ["competition", "team", "club", "player"] as const;
export type FavoriteKind = (typeof favoriteKinds)[number];
export type Favorites = Record<FavoriteKind, string[]>;
export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export const emptyFavorites = (): Favorites => ({ competition: [], team: [], club: [], player: [] });

const isPublicId = (value: unknown): value is string => typeof value === "string" && /^[a-z0-9-]+$/.test(value);

export function parseFavorites(value: string | null): Favorites {
  if (!value) return emptyFavorites();
  try {
    const parsed = JSON.parse(value) as Partial<Record<FavoriteKind, unknown>>;
    return Object.fromEntries(favoriteKinds.map((kind) => [kind, Array.isArray(parsed[kind]) ? [...new Set(parsed[kind].filter(isPublicId))] : []])) as Favorites;
  } catch {
    return emptyFavorites();
  }
}

export function readFavorites(storage?: StorageLike): Favorites {
  try {
    return parseFavorites(storage?.getItem(FAVORITES_STORAGE_KEY) ?? null);
  } catch {
    return emptyFavorites();
  }
}

export function toggleFavorite(storage: StorageLike | undefined, kind: FavoriteKind, id: string): Favorites {
  if (!isPublicId(id)) return readFavorites(storage);
  const favorites = readFavorites(storage);
  const selected = favorites[kind].includes(id);
  const next = { ...favorites, [kind]: selected ? favorites[kind].filter((item) => item !== id) : [...favorites[kind], id] };
  try {
    storage?.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
    return storage ? next : favorites;
  } catch {
    return favorites;
  }
}

export const isFavorite = (favorites: Favorites, kind: FavoriteKind, id: string) => favorites[kind].includes(id);
