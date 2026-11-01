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
  return <div><button className="btn-soft" onClick={share} type="button">Spiel teilen</button>{fallback && <p className="mt-2 rounded-2xl bg-canvas p-3 text-xs text-muted">Link kopieren: <span className="select-all break-all text-team">{typeof window === "undefined" ? "" : window.location.href}</span></p>}</div>;
}
