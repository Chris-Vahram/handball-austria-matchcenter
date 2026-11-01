import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Mein Handball — Matchcenter Pilot", short_name: "Mein Handball", description: "Folge deinen Handball-Teams — Spiele, Tabelle und Form auf einen Blick.", start_url: "/", display: "standalone", background_color: "#EEF1F8", theme_color: "#EEF1F8", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
