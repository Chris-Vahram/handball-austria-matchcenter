import { expect, test } from "@playwright/test";

test.describe("Ranglisten", () => {
  test("goals ranking; team filter applies immediately", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/torschuetzen");
    await expect(page.locator(".tabs [aria-current=page]")).toHaveText("Ranglisten");
    const rows = page.locator("table.ranking tbody tr");
    await expect(rows.first()).toContainText("Arndt, Arvid");
    await page.selectOption("#team", "SK Konstant Traun / Edelweiss");
    await expect(page).toHaveURL(/team=SK/);
    const teams = await rows.locator("small").allInnerTexts();
    expect(new Set(teams)).toEqual(new Set(["SK Konstant Traun / Edelweiss"]));
    expect(await page.content()).not.toContain("person=");
  });

  test("per-game lists lead with nuLiga's sort key", async ({ page }) => {
    await page.goto("/hla-challenge-west/torschuetzen?liste=zeitstrafen");
    const first = page.locator("table.ranking tbody tr").first();
    await expect(first).toContainText("Dilys, Devanas");
    await expect(first.locator("td.val")).toHaveText("2,00");
  });

  test("thin data is explained in the Landesliga", async ({ page }) => {
    await page.goto("/landesliga-ooe/torschuetzen");
    await expect(page.locator(".thin")).toContainText("von 40 Spielen");
  });
});
