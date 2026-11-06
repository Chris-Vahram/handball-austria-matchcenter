import { expect, test } from "@playwright/test";
import { match23 } from "./data";

test.describe("Spielbericht", () => {
  test("match 23: info, lineups, legend, venue link, no officials", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/spiel/93135");
    await expect(page.locator(".crumb")).toContainText("Spielbericht");
    await expect(page.locator(".scoreboard .score")).toContainText("37");
    await expect(page.locator(".scoreboard")).toContainText("Spiel Nr. 23");
    await expect(page.locator(".scoreboard").getByRole("link", { name: "Schendlingerhalle" })).toBeVisible();
    await expect(page.getByText("Spielbericht noch nicht genehmigt")).toHaveCount(match23.reportApproved === false ? 1 : 0);
    await expect(page.locator("table.roster")).toHaveCount(2);
    const summary = page.locator(".summary");
    await expect(summary.locator(".sum-team").nth(1).locator("li").first()).toContainText("Strauch, Tore");
    expect((await summary.boundingBox())!.y).toBeLessThan((await page.locator(".lineup").first().boundingBox())!.y);
    await expect(page.locator(".lineup-legend")).toContainText("R = Rote Karte / Disqualifikation");
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
    await expect(first).toContainText("15 Halilovic, Maid");
    await expect(page.locator(".timeline h3")).toHaveText(["1. Halbzeit", "2. Halbzeit"]);
  });

  test("back link returns to the match round; unknown report is a 404", async ({ page }) => {
    await page.goto("/hla-challenge-west/spiel/93135");
    await page.locator(".scoreboard .back").click();
    await expect(page).toHaveURL(/spielplan\?runde=6/);
    expect((await page.goto("/hla-challenge-west/spiel/1"))?.status()).toBe(404);
  });
});

test("PDF link only on Tabelle and Spielplan", async ({ page }) => {
  for (const [path, n] of [["/hla-challenge-west", 1], ["/hla-challenge-west/spielplan", 1], ["/hla-challenge-west/spiel/93135", 0], ["/hla-challenge-west/team/hsc-wels", 0], ["/", 0]] as const) {
    await page.goto(path);
    await expect(page.getByRole("link", { name: "Tabelle & Spielplan als PDF" })).toHaveCount(n);
  }
});
