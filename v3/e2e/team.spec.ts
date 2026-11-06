import { expect, test } from "@playwright/test";
import { hlaGroup } from "./data";

test.describe("Teamseite", () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); });

  test("from the table: breadcrumb, next match card, results split from upcoming, players", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.locator("table.standings").getByRole("link", { name: "SK Konstant Traun / Edelweiss" }).click();
    await expect(page).toHaveURL(/\/team\/sk-konstant-traun-edelweiss$/);
    await expect(page.locator("#h-team")).toHaveText("SK Konstant Traun / Edelweiss");
    await expect(page.locator(".crumb")).toContainText("HLA Challenge West");
    await expect(page.locator(".next-card")).toContainText("SMC Innsbruck Handball Tirol");
    await expect(page.locator(".next-card")).toContainText("Am Nordsaum 160, 4050 Traun");
    await expect(page.locator(".next-card").getByRole("link", { name: "Route planen" })).toHaveAttribute("href", /google\.com\/maps/);
    await expect(page.locator(".result-row")).toHaveCount(6);
    await expect(page.locator(".result-row").first()).toContainText("Bregenz Handball FT");
    await expect(page.locator(".result-row").first().locator(".chip")).toContainText("N");
    await expect(page.locator("section[aria-labelledby=h-upcoming] .fixture")).toHaveCount(7);
    await expect(page.locator("section[aria-labelledby=h-upcoming] .fixture:visible")).toHaveCount(3);
    await page.getByText("Alle 7 Spiele anzeigen").click();
    await expect(page.locator("section[aria-labelledby=h-upcoming] .fixture:visible")).toHaveCount(7);
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
