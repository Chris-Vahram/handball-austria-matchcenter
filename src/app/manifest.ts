import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Handball Matchcenter Pilot", short_name: "Matchcenter", description: "Unabhängiger österreichischer Handball-Matchcenter Pilot", start_url: "/", display: "standalone", background_color: "#f3f6fa", theme_color: "#08284f", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
