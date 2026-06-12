"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { UsersIcon, CompassIcon, SearchIcon, HandballIcon } from "@ui/icons";

const links = [
  { href: "/", label: "Meine Teams", icon: UsersIcon, exact: true },
  { href: "/entdecken", label: "Entdecken", icon: CompassIcon },
  { href: "/suche", label: "Suche", icon: SearchIcon }
];

export function Nav() {
  const pathname = usePathname();
  const active = (href: string, exact?: boolean) => exact ? pathname === href : pathname.startsWith(href);
  return <>
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <Link className="group flex items-center gap-2.5" href="/">
          <span className="avatar team-bg size-9 shadow-pop transition group-hover:-translate-y-0.5"><HandballIcon className="size-5" /></span>
          <span className="font-display text-[0.95rem] font-extrabold tracking-tight text-ink">Mein <span className="team-text">Handball</span></span>
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden items-center gap-1 md:flex">{links.map((link) => { const on = active(link.href, link.exact); return <Link aria-current={on ? "page" : undefined} className={`relative rounded-2xl px-4 py-2 text-sm font-bold transition ${on ? "text-team-on" : "text-muted hover:text-ink"}`} key={link.href} href={link.href}>{on && <motion.span layoutId="navpill" className="team-bg absolute inset-0 -z-10 rounded-2xl shadow-pop" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}{link.label}</Link>; })}</nav>
      </div>
    </header>
    <nav aria-label="Mobile Navigation" className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-3 gap-1 rounded-3xl border border-line bg-surface/95 p-1.5 shadow-lift backdrop-blur-xl md:hidden">{links.map((link) => {
      const Icon = link.icon;
      const on = active(link.href, link.exact);
      return <Link aria-current={on ? "page" : undefined} className={`relative flex min-h-[3rem] flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[0.62rem] font-bold transition ${on ? "text-team-on" : "text-muted"}`} key={link.href} href={link.href}>{on && <motion.span layoutId="navdock" className="team-bg absolute inset-0 -z-10 rounded-2xl" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}<Icon className="size-5" />{link.label}</Link>;
    })}</nav>
  </>;
}
