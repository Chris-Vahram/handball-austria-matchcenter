import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export const metadata: Metadata = { title: { default: "Handball Matchcenter", template: "%s · Handball Matchcenter" }, description: "Unabhängiger österreichischer Handball-Matchcenter Pilot", manifest: "/manifest.webmanifest", openGraph: { title: "Handball Matchcenter", description: "Spielplan, Hallen, Ergebnisse und Tabellen schnell im Blick.", type: "website", locale: "de_AT" } };
export const viewport: Viewport = { themeColor: "#08284f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body><Navigation /><main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-7 pb-24 md:px-6 md:py-10 md:pb-12">{children}</main><Footer /></body></html>;
}
