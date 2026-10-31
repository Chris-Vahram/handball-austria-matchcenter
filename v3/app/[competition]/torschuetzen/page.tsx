import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "@ui/shell";
import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import type { StatKind } from "@/importer/config";

const LISTS: { kind: StatKind; tab: string; value: string }[] = [
  { kind: "tore", tab: "Tore", value: "Tore" },
  { kind: "7m", tab: "7m", value: "7m-Tore" },
  { kind: "zeitstrafen", tab: "2-Min", value: "Zeitstrafen" },
  { kind: "gelb", tab: "Gelb", value: "Gelbe Karten" },
  { kind: "rot", tab: "Rot", value: "Rote Karten" }
];

type Props = { params: Promise<{ competition: string }>; searchParams: Promise<{ liste?: string; team?: string }> };

// Re-render hourly so the "veraltet" marker ages with the snapshot.
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.filter((id) => COMPETITIONS[id].category === "adult").map((competition) => ({ competition }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competition } = await params;
  return isCompetitionId(competition) ? { title: `${COMPETITIONS[competition].name} – Torschützen` } : {};
}

export default async function StatsPage({ params, searchParams }: Props) {
  const { competition } = await params;
  // ADR-005: no player statistics for youth competitions.
  if (!isCompetitionId(competition) || COMPETITIONS[competition].category !== "adult") notFound();
  const c = COMPETITIONS[competition];
  const data = getDataset(competition);
  const { liste, team: teamParam } = await searchParams;
  const list = LISTS.find((l) => l.kind === liste) ?? LISTS[0];
  const all = data?.stats[list.kind] ?? [];
  const teams = (data?.standings ?? []).map((s) => s.team);
  const team = teamParam && teams.includes(teamParam) ? teamParam : "";
  const rows = team ? all.filter((r) => r.team === team) : all;
  const href = (kind: StatKind) => `/${competition}/torschuetzen?liste=${kind}${team ? `&team=${encodeURIComponent(team)}` : ""}`;

  return (
    <>
      <Header id={competition} importedAt={data?.source.importedAt ?? null} tab="torschuetzen" />
      <main className="page stats">
        <section className="panel" aria-labelledby="h-stats">
          <h2 className="section-title" id="h-stats">{list.value}</h2>
          <nav className="lists" aria-label="Rangliste">
            {LISTS.map((l) => (
              <Link key={l.kind} href={href(l.kind)} aria-current={l.kind === list.kind ? "page" : undefined}>{l.tab}</Link>
            ))}
          </nav>
          <form className="filter" method="get" action={`/${competition}/torschuetzen`}>
            <input type="hidden" name="liste" value={list.kind} />
            <label htmlFor="team">Team</label>
            <select id="team" name="team" defaultValue={team}>
              <option value="">Alle Teams</option>
              {teams.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
            <button type="submit">Anzeigen</button>
          </form>
          {rows.length === 0 ? (
            <p className="empty">{all.length ? "Für dieses Team gibt es in dieser Liste keine Einträge." : "Noch keine Einträge."}</p>
          ) : (
            <table className="ranking">
              <caption className="sr-only">{list.value} {c.name}</caption>
              <thead>
                <tr>
                  <th scope="col" className="rk"><abbr title="Rang">#</abbr></th>
                  <th scope="col" className="nm">Spieler · Team</th>
                  <th scope="col"><abbr title="Spiele">Sp</abbr></th>
                  <th scope="col" className="val">{list.tab}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.rank}-${r.name}-${r.club}`} className={!team && r.team === c.showcaseTeam ? "me" : undefined}>
                    <td className="rk">{r.rank}</td>
                    <th scope="row" className="nm">{r.name}<small>{r.team}</small></th>
                    <td className="sp">{r.games}</td>
                    <td className="val">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className="legend">Rangliste wie auf nuLiga. Team aus den Spielberichten zugeordnet.</p>
        </section>
      </main>
      <Footer id={competition} importedAt={data?.source.importedAt ?? null} />
    </>
  );
}
