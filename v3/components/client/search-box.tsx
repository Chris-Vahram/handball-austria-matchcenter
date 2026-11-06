"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type Entry = { label: string; sub: string; href: string; kind: "Team" | "Spieler"; key: string };

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
let cache: Promise<Entry[]> | null = null;
const loadIndex = () => (cache ??= fetch("/suche/index.json").then((r) => (r.ok ? r.json() : [])).catch(() => []));

/**
 * Header search: a plain GET form to /suche (works without JS) that suggests teams and players
 * while typing (ARIA combobox). The index is a static JSON file, loaded on first focus.
 */
export function SearchBox({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  const [index, setIndex] = useState<Entry[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const box = useRef<HTMLFormElement>(null);

  const terms = normalize(q.trim()).split(/\s+/).filter(Boolean);
  const hits = terms.join("").length < 2 ? [] : index.filter((e) => terms.every((t) => e.key.includes(t))).slice(0, 8);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = (href: string) => { setOpen(false); router.push(href); };

  return (
    <form ref={box} className="search" action="/suche" method="get" role="search"
      onSubmit={(e) => { if (active >= 0 && hits[active]) { e.preventDefault(); go(hits[active].href); } }}>
      <label htmlFor="q" className="sr-only">Team oder Spieler suchen</label>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <input id="q" name="q" type="search" placeholder="Team oder Spieler" autoComplete="off" value={q} minLength={2} required
        role="combobox" aria-expanded={open && hits.length > 0} aria-controls={listId} aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        onFocus={() => { loadIndex().then(setIndex); setOpen(true); }}
        onChange={(e) => { setQ(e.target.value); setActive(-1); setOpen(true); }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, hits.length - 1)); }
          else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
          else if (e.key === "Escape") { setOpen(false); setActive(-1); }
        }} />
      {open && hits.length > 0 && (
        <ul className="suggest" id={listId} role="listbox" aria-label="Vorschläge">
          {hits.map((h, i) => (
            <li key={h.href + h.label} id={`${listId}-${i}`} role="option" aria-selected={i === active}
              onMouseDown={(e) => { e.preventDefault(); go(h.href); }} onMouseEnter={() => setActive(i)}>
              <span className="kind">{h.kind}</span>
              <span className="lbl">{h.label}<small>{h.sub}</small></span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
