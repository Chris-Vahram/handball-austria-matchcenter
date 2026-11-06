/** Explains early-season figures instead of letting a short list look broken. */
export function ThinData({ played, scheduled }: { played: number; scheduled: number }) {
  if (!scheduled || played * 4 >= scheduled) return null;
  return <p className="thin">Erst {played} von {scheduled} Spielen gespielt. Die Werte beruhen auf diesen Spielen und füllen sich mit jedem Spielbericht.</p>;
}
