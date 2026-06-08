import type { MetadataRoute } from "next";
import { data } from "@/data/query";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/demo", "/bewerbe", "/suche", "/impressum", "/datenschutz"];
  const competitionRoutes = data.competitions.flatMap((competition) => [`/bewerbe/${competition.slug}`, `/bewerbe/${competition.slug}/spielplan`, `/bewerbe/${competition.slug}/tabelle`]);
  return [...staticRoutes, ...competitionRoutes].map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: "daily" as const }));
}
