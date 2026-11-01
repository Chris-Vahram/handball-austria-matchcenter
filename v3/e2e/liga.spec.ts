import { expect, test, type Page } from "@playwright/test";

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
    await expect(traun).toHaveClass(/me/);
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

  test("competition switch and 404", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await page.locator(".switch").getByRole("link", { name: "Landesliga OÖ" }).click();
    await expect(page.locator("h1")).toHaveText("Landesliga OÖ");
    await expect(page.locator("table.standings tbody tr.me")).toContainText("Sportunion EDELWEISS Linz / SK Traun");
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

  test("desktop header is one row: wordmark, switch, search", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/hla-challenge-west");
    const top = async (sel: string) => (await page.locator(sel).first().boundingBox())!.y;
    const [brand, sw, search] = [await top(".brand"), await top(".bar .switch"), await top(".search")];
    expect(Math.abs(brand - sw)).toBeLessThan(20);
    expect(Math.abs(search - sw)).toBeLessThan(20);
  });
});

test.describe("Spielplan", () => {
  test("own page with active tab, stepper and direct round picker", async ({ page }) => {
    await page.goto("/hla-challenge-west/spielplan");
    await expect(page.locator(".tabs [aria-current=page]")).toHaveText("Spielplan");
    await expect(page.locator("#runde")).toHaveValue("6");
    await page.getByRole("link", { name: "Runde 7" }).click();
    await expect(page).toHaveURL(/runde=7/);
    await expect(page.locator("#runde")).toHaveValue("7");
    await page.selectOption("#runde", "10");
    await expect(page).toHaveURL(/runde=10/);
    await expect(page.locator("#runde")).toHaveValue("10");
  });

  test("round 6 rows: figure score, chevron link to the report, venue link, pending note", async ({ page }) => {
    await page.goto("/hla-challenge-west/spielplan?runde=6");
    const rows = page.locator("#spielplan .match");
    await expect(rows).toHaveCount(4);
    const m23 = rows.filter({ hasText: "Bregenz Handball FT" });
    await expect(m23.locator(".stretch")).toHaveAttribute("href", "/hla-challenge-west/spiel/93135");
    await expect(m23.locator(".stretch svg")).toBeVisible();
    await expect(m23.getByRole("link", { name: "Schendlingerhalle" })).toHaveAttribute("href", /\/halle\/\d+/);
    await expect(page.locator(".footnote")).toHaveText("* Spielbericht noch nicht genehmigt");
    await expect(page.locator("body")).not.toContainText("SRAA");
  });
});
