import { expect, test } from "@playwright/test";

test.describe("Suche", () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); });

  test("finds Traun teams from the header", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.getByRole("searchbox", { name: "Team oder Spieler suchen" }).fill("traun");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/suche\?q=traun/);
    const hits = page.locator(".hits");
    await expect(hits.first()).toContainText("SK Konstant Traun / Edelweiss");
    await expect(hits.first()).toContainText("Sportunion EDELWEISS Linz / SK Traun");
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
  });

  test("finds a player and links to the team's scorer list", async ({ page }) => {
    await page.goto("/suche?q=strauch");
    const link = page.getByRole("link", { name: /STRAUCH, Tore/ });
    await expect(link).toContainText("SK Konstant Traun / Edelweiss");
    await link.click();
    await expect(page.locator("table.ranking tbody tr").first()).toContainText("SK Konstant Traun / Edelweiss");
  });

  test("states when nothing is found", async ({ page }) => {
    await page.goto("/suche?q=xyzq");
    await expect(page.getByText("Nichts gefunden für „xyzq“.")).toBeVisible();
  });
});
