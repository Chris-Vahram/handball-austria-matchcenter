import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { Suspense } from "react";
import { FavoriteHighlighter } from "@ui/client/favorites";
import "./globals.css";

const text = Barlow({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700", "800"], variable: "--font-text" });
const display = Barlow_Condensed({ subsets: ["latin", "latin-ext"], weight: ["700", "800"], variable: "--font-display" });

export const metadata: Metadata = {
  title: { default: "Matchcenter", template: "%s · Matchcenter" },
  description: "Tabellen, Spielpläne und Spielberichte aus nuLiga – unabhängiger Prototyp."
};

export const viewport: Viewport = { themeColor: "#c8102e", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-AT" className={`${text.variable} ${display.variable}`}>
      <body>{children}<Suspense fallback={null}><FavoriteHighlighter /></Suspense></body>
    </html>
  );
}
