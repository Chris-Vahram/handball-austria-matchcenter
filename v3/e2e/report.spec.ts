import { expect, test } from "@playwright/test";

test.describe("Spielbericht", () => {
  test("match 23 shows info, both lineups and no officials", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/spiel/93135");
    await expect(page.locator(".scoreboard")).toContainText("Bregenz Handball FT");
    await expect(page.locator(".scoreboard")).toContainText("SK Konstant Traun / Edelweiss");
    await expect(page.locator(".scoreboard .score")).toContainText("37");
    await expect(page.locator(".scoreboard")).toContainText("Spiel Nr. 23");
    await expect(page.locator(".scoreboard")).toContainText("Schendlingerhalle");
    await expect(page.getByText("Spielbericht noch nicht genehmigt")).toBeVisible();
    await expect(page.locator("table.roster")).toHaveCount(2);
    await expect(page.locator("table.roster").nth(1)).toContainText("STRAUCH, Tore");
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/SR A|SR B|Zeitn\.|Sek\.|Lizenznr/);
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
  });

  test("back link returns to the match round", async ({ page }) => {
    await page.goto("/hla-challenge-west/spiel/93135");
    await page.getByRole("link", { name: "Runde 6" }).click();
    await expect(page.locator(".round-nav strong")).toContainText("Runde 6");
  });

  test("unknown report is a 404", async ({ page }) => {
    const res = await page.goto("/hla-challenge-west/spiel/1");
    expect(res?.status()).toBe(404);
  });
});
