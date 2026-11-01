"use client";

export function PrintButton() {
  return <button type="button" className="btn" onClick={() => window.print()}>Drucken / als PDF speichern</button>;
}
