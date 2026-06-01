import type { Metadata } from "next";
import "@/app/globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = { title: "Handball Matchcenter", description: "Österreichischer Handball-Matchcenter Pilot" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body><Navigation /><main className="mx-auto max-w-6xl px-4 py-7 pb-24 md:px-6 md:py-10 md:pb-12">{children}</main></body></html>;
}
