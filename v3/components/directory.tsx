import Link from "next/link";
import { competitionsByAssociation, verbandSlug } from "@/lib/overview";
import { Chevron, RIGHT } from "./chevron";

/** All Bewerbe grouped by Verband; each Verband is an anchor (`/bewerbe#oehb`) so the list never filters anything away. */
export function Directory({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <>
      {competitionsByAssociation().map((g) => (
        <section key={g.association} className="panel" id={verbandSlug(g.association)} aria-labelledby={`h-${verbandSlug(g.association)}`}>
          <H className="day assoc" id={`h-${verbandSlug(g.association)}`}>{g.association}</H>
          <ul className="comp-list">
            {g.competitions.map((c) => (
              <li key={c.id}>
                <Link href={`/${c.id}`}>
                  <span>
                    <strong>{c.name}</strong>
                    <small>{c.phase} {c.season} · Runde {c.round} von {c.rounds}{c.leader && <> · Erster: {c.leader}</>}</small>
                  </span>
                  <Chevron d={RIGHT} size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
