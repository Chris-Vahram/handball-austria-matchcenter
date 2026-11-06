import { expect, test } from "@playwright/test";

test.describe("Spielvorschau", () => {
  test("match 25 from the Spielplan row: date, teams, venue in the first viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/spielplan?runde=7");
    await page.locator("#spielplan .match").filter({ hasText: "SMC Innsbruck Handball Tirol" }).locator(".stretch").click();
    await expect(page).toHaveURL(/\/vorschau\/25$/);
    await expect(page.locator(".scoreboard .teams")).toContainText("SK Konstant Traun / Edelweiss");
    await expect(page.locator(".pv-venue")).toBeInViewport();
    await expect(page.locator(".pv-venue")).toContainText("Sportzentrum Traun");
    await expect(page.locator(".pv-table tbody tr")).toHaveCount(2);
    await expect(page.locator("#h-pv-h2h")).toBeVisible();
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
    expect(await page.locator("body").innerText()).not.toMatch(/\+43|@|SRAA/);
  });

  test("a reported match forwards to its Spielbericht; unknown number is a 404", async ({ page }) => {
    await page.goto("/hla-challenge-west/vorschau/23");
    await expect(page).toHaveURL(/\/spiel\/93135$/);
    expect((await page.goto("/hla-challenge-west/vorschau/9999"))?.status()).toBe(404);
  });
});
