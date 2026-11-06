import { expect, test } from "@playwright/test";

test.describe("Startseite", () => {
  test("first visit: search and Verband list, no team checklist", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("#h-entry")).toHaveText("Finde dein Team");
    await expect(page.locator(".entry input[type=search]")).toBeInViewport();
    await expect(page.locator("input[type=checkbox]")).toHaveCount(0);
    await expect(page.locator("#oehb")).toContainText("HLA Challenge West");
    await expect(page.locator("#ooehv")).toContainText("Landesliga OÖ");
  });

  test("★ on team and Bewerb shows them on the home, persists, and unfollows", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/team/sk-konstant-traun-edelweiss");
    const star = page.locator(".team-head .star");
    await star.click();
    await expect(star).toHaveAttribute("aria-pressed", "true");
    await expect(star).toHaveAccessibleName(/folgst du/);
    await page.goto("/hla-challenge-west");
    await page.locator(".title-row .star").click();
    await page.goto("/");
    await expect(page.locator(".card")).toHaveCount(1);
    await expect(page.locator(".card")).toContainText("SMC Innsbruck Handball Tirol");
    const block = page.locator(".comp-block").filter({ hasText: "HLA Challenge West" });
    await expect(block).toBeVisible();
    // top 3 plus the followed team's row
    await expect(block.locator(".mini tbody tr:visible")).toHaveCount(4);
    await expect(block.locator(".mini tr.me")).toContainText("SK Konstant Traun / Edelweiss");
    await expect(page.locator(".comp-block").filter({ hasText: "Landesliga OÖ" })).toBeHidden();
    await page.reload();
    await expect(page.locator(".card")).toHaveCount(1);
    await page.goto("/hla-challenge-west/team/sk-konstant-traun-edelweiss");
    await page.locator(".team-head .star").click();
    await page.goto("/hla-challenge-west");
    await page.locator(".title-row .star").click();
    await page.goto("/");
    await expect(page.locator("#h-entry")).toBeVisible();
  });
});

test.describe("Favoriten-Markierung", () => {
  test("no favorites: nothing red", async ({ page }) => {
    await page.goto("/hla-challenge-west");
    await expect(page.locator("table.standings tr.me")).toHaveCount(0);
  });

  test("followed team stays marked through client navigation and back", async ({ page }) => {
    await page.goto("/hla-challenge-west/team/sk-konstant-traun-edelweiss");
    await page.locator(".team-head .star").click();
    await page.locator(".tabs").getByRole("link", { name: "Tabelle" }).click();
    await expect(page.locator("table.standings tr.me")).toContainText("SK Konstant Traun / Edelweiss");
    await page.locator(".tabs").getByRole("link", { name: "Statistik" }).click();
    await expect(page.locator("table.compare tr.me")).toContainText("SK Konstant Traun / Edelweiss");
    await page.locator(".tabs").getByRole("link", { name: "Spielplan" }).click();
    await page.selectOption("#runde", "7");
    await expect(page).toHaveURL(/runde=7/);
    await expect(page.locator("#spielplan .t.me")).toHaveText("SK Konstant Traun / Edelweiss");
    await page.goBack();
    await page.goBack();
    await expect(page.locator("table.compare tr.me")).toHaveCount(1);
  });
});

test("Halle: address, map link, resin rule, no court schedule", async ({ page }) => {
  await page.goto("/halle/18346");
  await expect(page.locator("#h-venue")).toHaveText("Handball-Arena Bregenz");
  await expect(page.locator("address")).toContainText("Untere Burggräflergasse 11");
  await expect(page.getByRole("link", { name: "Route planen" })).toHaveAttribute("href", /google\.com\/maps/);
  await expect(page.locator(".team-facts")).toContainText("nicht erlaubt");
  expect(await page.locator("body").innerText()).not.toMatch(/SRAA|Elite Cup|MEISTERLIGA|\+43/);
});
