import { expect, test } from "@playwright/test";

test.describe("Suche", () => {
  test.beforeEach(async ({ page }) => { await page.setViewportSize({ width: 390, height: 844 }); });

  test("finds Traun teams from the header", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.getByRole("combobox", { name: "Team oder Spieler suchen" }).fill("traun");
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

  test("finds a player and opens the team page", async ({ page }) => {
    await page.goto("/suche?q=strauch");
    const link = page.getByRole("link", { name: /Strauch, Tore/ });
    await expect(link).toContainText("SK Konstant Traun / Edelweiss");
    await link.click();
    await expect(page.locator("#h-team")).toHaveText("SK Konstant Traun / Edelweiss");
    await expect(page.locator("table.squad")).toContainText("Strauch, Tore");
  });

  test("suggests players while typing and opens the team page", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    const box = page.getByRole("combobox", { name: "Team oder Spieler suchen" });
    await box.fill("hali");
    const option = page.getByRole("option", { name: /Halilovic, Maid/ });
    await expect(option).toBeVisible();
    await box.press("ArrowDown");
    await box.press("Enter");
    await expect(page).toHaveURL(/\/team\/sk-konstant-traun-edelweiss/);
  });

  test("suggests a Bewerb first; a bare click (no mousedown) opens it", async ({ page }) => {
    await page.goto("/");
    const box = page.locator(".entry").getByRole("combobox");
    await box.fill("landes");
    const option = page.getByRole("option").first();
    await expect(option).toContainText("Landesliga OÖ");
    await option.dispatchEvent("click");
    await expect(page).toHaveURL(/\/landesliga-ooe$/);
  });

  test("finds a team by its Verein name", async ({ page }) => {
    await page.goto("/suche?q=SK-Handball%20Traun");
    await expect(page.locator(".hits")).toContainText("SK Konstant Traun / Edelweiss");
  });

  test("states when nothing is found", async ({ page }) => {
    await page.goto("/suche?q=xyzq");
    await expect(page.getByText("Nichts gefunden für „xyzq“.")).toBeVisible();
  });
});
