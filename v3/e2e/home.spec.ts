import { expect, test } from "@playwright/test";
import { hla } from "./data";

test.describe("Startseite", () => {
  for (const width of [390, 1440]) {
    test(`first visit at ${width}px: exactly one search, Verband rows, no team checklist`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await expect(page.locator("#h-entry")).toHaveText("Finde dein Team");
      await expect(page.locator(".entry input[type=search]")).toBeInViewport();
      await expect(page.locator("input[type=search]:visible")).toHaveCount(1);
      await expect(page.locator("input[type=checkbox]")).toHaveCount(0);
      const verbaende = page.locator("section[aria-labelledby=h-verbaende] .comp-list a");
      await expect(verbaende).toHaveCount(2);
      await expect(verbaende.first()).toHaveAttribute("href", "/bewerbe#oehb");
      await expect(page.getByText("HLA Challenge West")).toHaveCount(0);
    });
  }

  test("★ on team and Bewerb: three compact lists, persists, and unfollows", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/hla-challenge-west/team/sk-konstant-traun-edelweiss");
    const star = page.locator(".team-head .star");
    await star.click();
    await expect(star).toHaveAttribute("aria-pressed", "true");
    await expect(star).toHaveAccessibleName(/folgst du/);
    await page.goto("/landesliga-ooe");
    await page.locator(".title-row .star").click();
    await page.goto("/");
    await expect(page.locator("input[type=search]:visible")).toHaveCount(1);
    const last = page.locator("section[aria-labelledby=h-last] li");
    await expect(last).toHaveCount(1);
    await expect(last).toContainText("Bregenz Handball FT");
    await expect(last.locator("[data-team].me")).toHaveText("SK Konstant Traun / Edelweiss");
    const bewerbe = page.locator("section[aria-labelledby=h-bewerbe] li");
    // followed Landesliga (leader) + HLA via the favorite team, each once
    await expect(bewerbe).toHaveCount(2);
    await expect(bewerbe.filter({ hasText: "Landesliga OÖ" })).toContainText("Erster:");
    await expect(bewerbe.filter({ hasText: "HLA Challenge West" })).toContainText(/SK Konstant Traun \/ Edelweiss · \d+\. Platz/);
    await expect(page.locator("table.mini, .round-nav, .next-card")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Route planen" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Alle Bewerbe" })).toHaveAttribute("href", "/bewerbe");
    expect(await page.evaluate(() => document.documentElement.scrollHeight)).toBeLessThan(1100);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
    await page.reload();
    await expect(last).toHaveCount(1);
    await page.goto("/hla-challenge-west/team/sk-konstant-traun-edelweiss");
    await page.locator(".team-head .star").click();
    await page.goto("/landesliga-ooe");
    await page.locator(".title-row .star").click();
    await page.goto("/");
    await expect(page.locator("#h-entry")).toBeVisible();
  });

  test("next-match row opens the preview with the route", async ({ page }) => {
    await page.goto("/");
    const next = hla.matches.filter((m) => !m.score && m.date >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.date.localeCompare(b.date))[0];
    test.skip(!next, "no upcoming HLA match in the snapshot");
    await page.evaluate((key) => localStorage.setItem("matchcenter:my-teams", JSON.stringify([key])), `hla-challenge-west|${next.home}`);
    await page.reload();
    const row = page.locator("section[aria-labelledby=h-next] .match").first();
    await expect(row.locator(".r1")).toHaveText(next.home);
    await row.locator(".stretch").click();
    await expect(page).toHaveURL(/\/hla-challenge-west\/vorschau\/\d+$/);
    await expect(page.getByRole("link", { name: "Route planen" })).toBeVisible();
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
