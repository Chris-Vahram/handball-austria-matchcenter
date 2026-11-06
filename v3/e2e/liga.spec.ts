import { expect, test, type Page } from "@playwright/test";
import { hla, hlaRound } from "./data";

const noHScroll = async (page: Page) => {
  const { scroll, client } = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
  expect(scroll).toBe(client);
};

test.describe("Tabelle", () => {
  test("full HLA West table with full names, linked teams and the current round", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    const rows = page.locator("table.standings tbody tr");
    await expect(rows).toHaveCount(8);
    const traun = rows.nth(6);
    await expect(traun.getByRole("link", { name: "SK Konstant Traun / Edelweiss" })).toBeVisible();
    await expect(traun).toContainText("3-0-3");
    await expect(page.locator("#h-runde")).toContainText("Runde");
    await expect(page.getByRole("link", { name: "Ganzer Spielplan" })).toBeVisible();
    await expect(page.locator(".tabs [aria-current=page]")).toHaveText("Tabelle");
    await expect(page.getByText("kein Angebot von ÖHB oder nuLiga", { exact: false })).toBeVisible();
  });

  test("fits 390 px without horizontal scrolling or truncated names", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const path of ["/hla-challenge-west", "/landesliga-ooe", "/hla-challenge-west/spielplan", "/", "/bewerbe", "/halle/18346"]) {
      await page.goto(path);
      await noHScroll(page);
    }
    await page.goto("/hla-challenge-west");
    const clipped = await page.locator("table.standings tbody th").evaluateAll((cells) => cells.filter((c) => c.scrollWidth > c.clientWidth).length);
    expect(clipped).toBe(0);
  });

  test("Verband line leads to every Bewerb; three tabs; 404", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await expect(page.locator(".tabs a")).toHaveText(["Tabelle", "Spielplan", "Statistik"]);
    await page.locator(".verband").getByRole("link", { name: "ÖHB" }).click();
    await expect(page).toHaveURL(/\/bewerbe#oehb$/);
    await page.locator("#ooehv").getByRole("link", { name: /Landesliga OÖ/ }).click();
    await expect(page.locator("h1")).toHaveText("Landesliga OÖ");
    expect((await page.goto("/hla-challenge-west/torschuetzen"))?.status()).toBe(200);
    expect((await page.goto("/u18-irgendwas"))?.status()).toBe(404);
  });

  test("desktop shows the form column, phone hides it", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/hla-challenge-west");
    await expect(page.locator("tbody tr").first().locator("td.form")).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator("tbody tr").first().locator("td.form")).toBeHidden();
  });

  test("tabs stay pinned while scrolling", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west");
    await page.mouse.wheel(0, 900);
    await expect.poll(() => page.locator(".tabs-wrap").evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
  });

  test("header is one row: wordmark and search", async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/hla-challenge-west");
      const box = async (sel: string) => (await page.locator(sel).first().boundingBox())!;
      expect(Math.abs((await box(".brand")).y + (await box(".brand")).height / 2 - ((await box(".bar .search")).y + (await box(".bar .search")).height / 2))).toBeLessThan(12);
    }
  });
});

test.describe("Spielplan", () => {
  test("own page with active tab, stepper and direct round picker", async ({ page }) => {
    await page.goto("/hla-challenge-west/spielplan");
    await expect(page.locator(".tabs [aria-current=page]")).toHaveText("Spielplan");
    await expect(page.locator("#runde")).toHaveValue(String(hlaRound));
    await page.goto("/hla-challenge-west/spielplan?runde=6");
    await page.getByRole("link", { name: "Runde 7" }).click();
    await expect(page).toHaveURL(/runde=7/);
    await expect(page.locator("#runde")).toHaveValue("7");
    await page.selectOption("#runde", "10");
    await expect(page).toHaveURL(/runde=10/);
    await expect(page.locator("#runde")).toHaveValue("10");
  });

  test("each score sits on its team's line", async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/hla-challenge-west/spielplan?runde=6");
      const row = page.locator("#spielplan .match").filter({ hasText: "Bregenz Handball FT" });
      const top = async (sel: string) => Math.round((await row.locator(sel).first().boundingBox())!.y);
      expect(await top(".t.r1")).toBe(await top(".s.r1"));
      expect(await top(".t.r2")).toBe(await top(".s.r2"));
      await expect(row.locator(".t.r1")).toHaveText("Bregenz Handball FT");
      await expect(row.locator(".s.r1")).toHaveText("37");
    }
  });

  test("round 6 rows: figure score, chevron link to the report, venue link, pending note", async ({ page }) => {
    await page.goto("/hla-challenge-west/spielplan?runde=6");
    const rows = page.locator("#spielplan .match");
    await expect(rows).toHaveCount(4);
    const m23 = rows.filter({ hasText: "Bregenz Handball FT" });
    await expect(m23.locator(".stretch")).toHaveAttribute("href", "/hla-challenge-west/spiel/93135");
    await expect(m23.locator(".stretch svg")).toBeVisible();
    await expect(m23.getByRole("link", { name: "Schendlingerhalle" })).toHaveAttribute("href", /\/halle\/\d+/);
    const pending = hla.matches.some((m) => m.round === 6 && m.reportApproved === false);
    await expect(page.locator(".footnote")).toHaveCount(pending ? 1 : 0);
    await expect(page.locator("body")).not.toContainText("SRAA");
  });
});
