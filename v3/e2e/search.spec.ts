import { expect, test } from "@playwright/test";

test.describe("Suche", () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); });

  test("finds Traun teams from the header", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.getByRole("searchbox", { name: "Team suchen" }).fill("traun");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/suche\?q=traun/);
    const hits = page.locator(".hits");
    await expect(hits).toContainText("SK Konstant Traun / Edelweiss");
    await expect(hits).toContainText("Sportunion EDELWEISS Linz / SK Traun");
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
  });

  test("survives repeated q parameters", async ({ page }) => {
    const res = await page.goto("/suche?q=traun&q=linz");
    expect(res?.status()).toBe(200);
    await expect(page.locator(".hits")).toContainText("SK Konstant Traun / Edelweiss");
  });

  test("states when nothing is found and does not search persons", async ({ page }) => {
    await page.goto("/suche?q=strauch");
    await expect(page.getByText("Kein Team gefunden für „strauch“.")).toBeVisible();
  });
});
