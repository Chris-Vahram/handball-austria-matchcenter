import { expect, test } from "@playwright/test";

const noHScroll = async (page: import("@playwright/test").Page) => {
  const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(scroll).toBe(client);
};

test.describe("Teamseite", () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); });

  test("opens from the table and shows standing, next match, games and players", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.locator("table.standings").getByRole("link", { name: "SK Konstant Traun / Edelweiss" }).click();
    await expect(page).toHaveURL(/\/hla-challenge-west\/team\/sk-konstant-traun-edelweiss$/);
    await expect(page.locator("#h-team")).toHaveText("SK Konstant Traun / Edelweiss");
    await expect(page.locator(".team-line")).toContainText("7. Platz");
    await expect(page.locator(".next")).toContainText("SMC Innsbruck Handball Tirol");
    await expect(page.locator(".next")).toContainText("Spiel Nr. 25");
    await expect(page.locator("section[aria-labelledby=h-games] .match")).toHaveCount(14);
    await expect(page.locator("table.squad tbody tr").first()).toContainText("HALILOVIC, Maid");
    await expect(page.locator("table.squad tbody tr").first()).toContainText("35");
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/Mannschaftsverantwortlich|Mobil|\+43|@/);
    await noHScroll(page);
  });

  test("unknown team is a 404", async ({ page }) => {
    const res = await page.goto("/hla-challenge-west/team/gibt-es-nicht");
    expect(res?.status()).toBe(404);
  });
});

test.describe("Statistik", () => {
  test("group totals and team comparison fit the phone", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/statistik");
    await expect(page.locator("#h-group")).toContainText("23 von 56 Spielen");
    await expect(page.locator(".tstats")).toContainText("Heimsiege");
    await expect(page.locator(".tstats")).toContainText("17");
    await expect(page.locator("table.compare tbody tr")).toHaveCount(8);
    await expect(page.locator("table.compare tbody tr.me")).toContainText("SK Konstant Traun / Edelweiss");
    await noHScroll(page);
  });
});

test("desktop header is one row: wordmark, switch, search", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/hla-challenge-west");
  const top = async (sel: string) => (await page.locator(sel).first().boundingBox())!.y;
  const [brand, sw, search] = [await top(".brand"), await top(".bar .switch"), await top(".search")];
  expect(Math.abs(brand - sw)).toBeLessThan(20);
  expect(Math.abs(search - sw)).toBeLessThan(20);
});
