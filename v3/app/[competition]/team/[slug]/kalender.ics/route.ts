import { COMPETITIONS, COMPETITION_IDS, getDataset, isCompetitionId } from "@/data";
import { teamCalendar } from "@/lib/calendar";
import { teamBySlug, teamSlug } from "@/lib/teams";

export const dynamic = "force-static";
export const revalidate = 3600;

export function generateStaticParams() {
  return COMPETITION_IDS.flatMap((competition) =>
    (getDataset(competition)?.standings ?? []).map((s) => ({ competition, slug: teamSlug(s.team) })));
}

export async function GET(_: Request, { params }: { params: Promise<{ competition: string; slug: string }> }) {
  const { competition, slug } = await params;
  const data = isCompetitionId(competition) ? getDataset(competition) : null;
  const row = data ? teamBySlug(data, slug) : null;
  if (!data || !row || !isCompetitionId(competition)) return new Response("Nicht gefunden", { status: 404 });
  return new Response(teamCalendar(data, row.team, COMPETITIONS[competition].name), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="${slug}.ics"` }
  });
}
