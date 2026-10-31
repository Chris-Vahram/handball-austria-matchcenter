import { expect, test } from "@playwright/test";

test.describe("Torschützen", () => {
  test("shows the goals ranking and filters to Traun", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/torschuetzen");
    const rows = page.locator("table.ranking tbody tr");
    await expect(rows.first()).toContainText("ARNDT, Arvid");
    await page.selectOption("#team", "SK Konstant Traun / Edelweiss");
    await page.getByRole("button", { name: "Anzeigen" }).click();
    await expect(page).toHaveURL(/team=SK/);
    const clubs = await rows.locator("small").allInnerTexts();
    expect(clubs.length).toBeGreaterThan(0);
    expect(new Set(clubs)).toEqual(new Set(["SK Konstant Traun / Edelweiss"]));
    const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(scroll).toBe(client);
    expect(await page.content()).not.toContain("person=");
  });

  test("switches between lists keeping the club filter", async ({ page }) => {
    await page.goto("/hla-challenge-west/torschuetzen?team=SK%20Konstant%20Traun%20%2F%20Edelweiss");
    await page.getByRole("link", { name: "2-Min" }).click();
    await expect(page.locator("#h-stats")).toHaveText("Zeitstrafen");
    await expect(page).toHaveURL(/liste=zeitstrafen&team=SK/);
  });
});
