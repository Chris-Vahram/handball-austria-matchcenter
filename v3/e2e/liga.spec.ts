import { expect, test } from "@playwright/test";

test.describe("Liga-Seite", () => {
  test("shows the full HLA West table with full names", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    const rows = page.locator("table.standings tbody tr");
    await expect(rows).toHaveCount(8);
    const traun = rows.nth(6);
    await expect(traun).toHaveClass(/me/);
    await expect(traun).toContainText("SK Konstant Traun / Edelweiss");
    await expect(traun).toContainText("3-0-3");
    await expect(traun).toContainText("170:191");
    await expect(page.getByText("Quelle: nuLiga", { exact: false })).toBeVisible();
    await expect(page.getByText("kein Angebot von ÖHB oder nuLiga", { exact: false })).toBeVisible();
  });

  test("fits 390 px without horizontal scrolling or truncated names", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of ["/hla-challenge-west", "/landesliga-ooe"]) {
      await page.goto(path);
      const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(scroll).toBe(client);
      const clipped = await page.locator("table.standings tbody th").evaluateAll((cells) => cells.filter((c) => c.scrollWidth > c.clientWidth).length);
      expect(clipped).toBe(0);
    }
  });

  test("opens on the current round and steps through rounds", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    const nav = page.locator(".round-nav strong");
    await expect(nav).toContainText("Runde 6");
    await page.getByRole("link", { name: "Runde 7" }).click();
    await expect(nav).toContainText("Runde 7");
    await expect(page).toHaveURL(/runde=7/);
    await page.getByRole("link", { name: "Runde 6" }).click();
    await expect(nav).toContainText("Runde 6");
  });

  test("round 6 shows results, pending approvals and the open match", async ({ page }) => {
    await page.goto("/hla-challenge-west?runde=6");
    const matches = page.locator("#spielplan .match");
    await expect(matches).toHaveCount(4);
    await expect(matches.nth(2)).toContainText("Bregenz Handball FT");
    await expect(matches.nth(2)).toContainText("37");
    await expect(matches.nth(2)).toHaveAttribute("href", "/hla-challenge-west/spiel/93135");
    await expect(page.getByText("Bericht noch nicht genehmigt").first()).toBeVisible();
    await expect(matches.nth(3)).toContainText("angesetzt");
    await expect(page.locator("body")).not.toContainText("BÖSC");
  });

  test("competition switch", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.getByRole("link", { name: "Landesliga OÖ" }).click();
    await expect(page.locator("h1")).toHaveText("Landesliga OÖ");
    await expect(page.locator("table.standings tbody tr.me")).toContainText("Sportunion EDELWEISS Linz / SK Traun");
  });

  test("unknown competition is a 404", async ({ page }) => {
    const res = await page.goto("/u18-irgendwas");
    expect(res?.status()).toBe(404);
  });
});
