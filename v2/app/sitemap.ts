import type { MetadataRoute } from "next";
import { data } from "@/data/query";
import { releasedPlayers } from "@/data/player-stats";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/entdecken", "/pitch", "/demo", "/bewerbe", "/suche", "/impressum", "/datenschutz"];
  const competitionRoutes = data.competitions.flatMap((competition) => [`/bewerbe/${competition.slug}`, `/bewerbe/${competition.slug}/spielplan`, `/bewerbe/${competition.slug}/tabelle`, `/bewerbe/${competition.slug}/torschuetzen`]);
  const playerRoutes = releasedPlayers().map((player) => `/spieler/${player.slug}`);
  return [...staticRoutes, ...competitionRoutes, ...playerRoutes].map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "daily" as const }));
}
