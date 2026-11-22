import { expect, test } from "@playwright/test";
import { todayInVienna } from "../src/lib/format";
import { isOverdue, isUpcoming } from "../src/lib/rounds";
import { nextMatch, teamMatches } from "../src/lib/teams";
import { hla, hlaGroup } from "./data";

test.describe("Teamseite", () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); });

  test("from the table: breadcrumb, next match card, results split from upcoming, players", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.locator("table.standings").getByRole("link", { name: "SK Konstant Traun / Edelweiss" }).click();
    await expect(page).toHaveURL(/\/team\/sk-konstant-traun-edelweiss$/);
    await expect(page.locator("#h-team")).toHaveText("SK Konstant Traun / Edelweiss");
    await expect(page.locator(".crumb")).toContainText("HLA Challenge West");
    const next = nextMatch(hla, "SK Konstant Traun / Edelweiss", todayInVienna());
    test.skip(!next, "no upcoming Traun match in the snapshot");
    await expect(page.locator(".next-card")).toContainText(next!.home === "SK Konstant Traun / Edelweiss" ? next!.away : next!.home);
    await expect(page.locator(".next-card")).toContainText("Am Nordsaum 160, 4050 Traun");
    await expect(page.locator(".next-card").getByRole("link", { name: "Route planen" })).toHaveAttribute("href", /google\.com\/maps/);
    // Same split as the page: results incl. "Ergebnis ausständig", newest first; the rest after the next match.
    const all = teamMatches(hla, "SK Konstant Traun / Edelweiss");
    const played = all.filter((m) => m.score || isOverdue(m)).reverse();
    const later = all.filter((m) => isUpcoming(m) && m.number !== next!.number);
    const newestPlayed = played.find((m) => m.score)!;
    await expect(page.locator(".result-row")).toHaveCount(played.length);
    await expect(page.locator(".result-row").filter({ has: page.locator(".chip:not(:text('–'))") }).first()).toContainText(newestPlayed.home === "SK Konstant Traun / Edelweiss" ? newestPlayed.away : newestPlayed.home);
    await expect(page.locator("section[aria-labelledby=h-upcoming] .fixture")).toHaveCount(later.length);
    await expect(page.locator("section[aria-labelledby=h-upcoming] .fixture:visible")).toHaveCount(Math.min(3, later.length));
    if (later.length > 3) {
      await page.getByText(`Alle ${later.length} Spiele anzeigen`).click();
      await expect(page.locator("section[aria-labelledby=h-upcoming] .fixture:visible")).toHaveCount(later.length);
    }
    await expect(page.locator("table.squad tbody tr").first()).toContainText("Halilovic, Maid");
    expect(await page.locator("body").innerText()).not.toMatch(/Mannschaftsverantwortlich|Mobil|\+43|@/);
  });

  test("calendar export", async ({ request }) => {
    const res = await request.get("/hla-challenge-west/team/sk-konstant-traun-edelweiss/kalender.ics");
    expect(res.headers()["content-type"]).toContain("text/calendar");
    const body = await res.text();
    expect(body.match(/BEGIN:VEVENT/g)).toHaveLength(14);
  });

  test("unknown team is a 404", async ({ page }) => {
    expect((await page.goto("/hla-challenge-west/team/gibt-es-nicht"))?.status()).toBe(404);
  });
});

test.describe("Statistik", () => {
  test("group totals and team comparison fit the phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/statistik");
    await expect(page.locator(".tabs [aria-current=page]")).toHaveText("Statistik");
    await expect(page.locator("main h2").first()).toContainText("Torschützen");
    await expect(page.locator("section[aria-labelledby=h-top] tbody tr")).toHaveCount(10);
    await page.getByRole("link", { name: "Alle Ranglisten" }).click();
    await expect(page).toHaveURL(/\/torschuetzen$/);
    await page.goBack();
    await expect(page.locator("#h-group")).toContainText(`${hlaGroup.games} von ${hlaGroup.scheduled} Spielen`);
    await expect(page.locator("table.compare thead")).toContainText("Tore/Sp.");
    await expect(page.locator("table.compare tbody tr")).toHaveCount(8);
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
  });
});
