"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarIcon, HomeIcon, SearchIcon, TrophyIcon } from "@/components/icons";

const links = [
  { href: "/", label: "Heute", icon: HomeIcon, exact: true },
  { href: "/bewerbe", label: "Bewerbe", icon: TrophyIcon },
  { href: "/suche", label: "Suche", icon: SearchIcon }
];

export function Navigation() {
  const pathname = usePathname();
  const active = (href: string, exact?: boolean) => exact ? pathname === href : pathname.startsWith(href);
  return <>
    <header className="sticky top-0 z-20 border-b border-line/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6"><Link className="flex items-center gap-2 font-black tracking-tight text-navy" href="/"><span className="grid size-9 place-items-center rounded-xl bg-navy text-sm text-white shadow-sm">H</span><span>HANDBALL <span className="text-accent">MATCHCENTER</span></span></Link><nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">{links.map((link) => <Link aria-current={active(link.href, link.exact) ? "page" : undefined} className={`rounded-xl px-3 py-2 text-sm font-bold transition ${active(link.href, link.exact) ? "bg-navy text-white" : "text-navy hover:bg-navy-50"}`} key={link.href} href={link.href}>{link.label}</Link>)}</nav></div>
    </header>
    <nav aria-label="Mobile Navigation" className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-3 rounded-2xl border border-line bg-white/95 p-1.5 shadow-lift backdrop-blur md:hidden">{links.map((link) => { const Icon = link.icon; return <Link aria-current={active(link.href, link.exact) ? "page" : undefined} className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[0.65rem] font-black transition ${active(link.href, link.exact) ? "bg-navy text-white" : "text-navy"}`} key={link.href} href={link.href}><Icon className="size-4" />{link.label}</Link>; })}</nav>
  </>;
}
