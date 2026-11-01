import { expect, test } from "@playwright/test";

test.describe("Spielbericht", () => {
  test("match 23: info, lineups, legend, venue link, no officials", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/spiel/93135");
    await expect(page.locator(".crumb")).toContainText("Spielbericht");
    await expect(page.locator(".scoreboard .score")).toContainText("37");
    await expect(page.locator(".scoreboard")).toContainText("Spiel Nr. 23");
    await expect(page.locator(".scoreboard").getByRole("link", { name: "Schendlingerhalle" })).toBeVisible();
    await expect(page.getByText("Spielbericht noch nicht genehmigt")).toBeVisible();
    await expect(page.locator("table.roster")).toHaveCount(2);
    await expect(page.locator(".lineup-legend")).toContainText("D = Disqualifikation");
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/SR A|SR B|Zeitn\.|Sek\.|Lizenznr|OFFIZIELL|SCHIRI/);
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
  });

  test("Spielverlauf is collapsed, opens on demand, starts with the first goal", async ({ page }) => {
    await page.goto("/hla-challenge-west/spiel/93135");
    const first = page.locator(".timeline .tl").first();
    await expect(first).toBeHidden();
    await page.locator(".timeline summary").click();
    await expect(first).toContainText("02:12");
    await expect(first).toContainText("0:1");
    await expect(first).toContainText("15 HALILOVIC, Maid");
    await expect(page.locator(".timeline h3")).toHaveText(["1. Halbzeit", "2. Halbzeit"]);
  });

  test("back link returns to the match round; unknown report is a 404", async ({ page }) => {
    await page.goto("/hla-challenge-west/spiel/93135");
    await page.locator(".scoreboard .back").click();
    await expect(page).toHaveURL(/spielplan\?runde=6/);
    expect((await page.goto("/hla-challenge-west/spiel/1"))?.status()).toBe(404);
  });
});
