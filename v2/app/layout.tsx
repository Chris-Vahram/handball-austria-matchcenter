import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@ui/nav";
import { Footer } from "@ui/footer";
import { TeamThemeProvider } from "@ui/team-theme";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = { title: { default: "Mein Handball", template: "%s · Mein Handball" }, description: "Folge deinen Handball-Teams — Spiele, Tabelle und Form auf einen Blick.", manifest: "/manifest.webmanifest", openGraph: { title: "Mein Handball", description: "Folge deinen Teams. Nächstes Spiel, Form und Tabelle sofort.", type: "website", locale: "de_AT" } };
export const viewport: Viewport = { themeColor: "#EEF1F8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" className={`${display.variable} ${sans.variable}`}><body><TeamThemeProvider /><Nav /><main className="mx-auto min-h-[70vh] max-w-5xl px-4 py-6 pb-28 md:px-6 md:py-9 md:pb-14">{children}</main><Footer /></body></html>;
}
