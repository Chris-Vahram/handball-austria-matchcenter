"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [fallback, setFallback] = useState(false);
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    setFallback(true);
  };
  return <div><button className="button-secondary" onClick={share} type="button">Spiel teilen</button>{fallback && <p className="mt-2 rounded-xl bg-navy-50 p-3 text-xs font-bold text-navy">Link kopieren: <span className="break-all select-all">{typeof window === "undefined" ? "" : window.location.href}</span></p>}</div>;
}
