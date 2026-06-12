// UI-only cosmetic accent per club. Not personal/player data.
export type TeamColor = { accent: string; soft: string; on: string };

const palette: { accent: string; soft: string }[] = [
  { accent: "#2563EB", soft: "#E8EFFE" }, // blue
  { accent: "#0E9F6E", soft: "#E5F6EF" }, // emerald
  { accent: "#7C3AED", soft: "#F0EAFE" }, // violet
  { accent: "#E11D48", soft: "#FCE7EC" }, // rose
  { accent: "#0891B2", soft: "#E1F4F9" }, // cyan
  { accent: "#EA580C", soft: "#FCEAE0" }, // orange
  { accent: "#4F46E5", soft: "#EAE9FD" }, // indigo
  { accent: "#0D9488", soft: "#E0F5F2" }, // teal
  { accent: "#C026D3", soft: "#FAE8FD" }, // magenta
  { accent: "#B7791F", soft: "#FAF1DD" }  // gold
];

// Explicit identities for the most-used demo clubs (index into palette).
const overrides: Record<string, number> = {
  "edelweiss-traun": 1,
  "hc-linz-neue-heimat": 0
};

const hash = (value: string) => [...value].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);

export function teamColorByClub(clubId?: string): TeamColor {
  if (!clubId) return { accent: "#2563EB", soft: "#E8EFFE", on: "#FFFFFF" };
  const index = overrides[clubId] ?? hash(clubId) % palette.length;
  const swatch = palette[index];
  return { accent: swatch.accent, soft: swatch.soft, on: "#FFFFFF" };
}

export function teamVars(clubId?: string): Record<string, string> {
  const color = teamColorByClub(clubId);
  return { "--team": color.accent, "--team-soft": color.soft, "--team-on": color.on };
}
