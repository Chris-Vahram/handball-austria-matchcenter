import { expect, test } from "@playwright/test";

test("landing exposes main navigation and fixtures", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Dein Spiel/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Bewerb auswählen" }).first()).toBeVisible();
});

test("schedule filters and empty reset work", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/spielplan?date=2020-01-01");
  await expect(page.getByRole("heading", { name: "Keine Treffer" })).toBeVisible();
  await page.getByRole("link", { name: "Filter zurücksetzen" }).click();
  await expect(page.getByRole("heading", { name: "Spielplan", exact: true })).toBeVisible();
});

test("competition switcher opens HLA challenge phase hub", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga");
  await page.getByRole("link", { name: "HLA CHALLENGE" }).click();
  await expect(page.getByRole("heading", { name: "HLA CHALLENGE" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Phase auswählen" })).toBeVisible();
});

test("hla challenge hub exposes reviewed public nuLiga groups", async ({ page }) => {
  await page.goto("/bewerbe/hla-challenge");
  await expect(page.getByRole("heading", { name: "Phase auswählen" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ost Hauptrunde/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /West Hauptrunde/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Aufstiegsrunde/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Ost Abstiegsrunde/ })).toBeVisible();
  await page.getByRole("link", { name: /West Abstiegsrunde/ }).click();
  await page.locator('a[href="/bewerbe/hla-challenge-west-abstiegsrunde/tabelle"]').click();
  await expect(page).toHaveURL("/bewerbe/hla-challenge-west-abstiegsrunde/tabelle");
  await expect(page.getByRole("link", { name: "SK Konstant Traun / Edelweiss" })).toBeVisible();
});

test("report exposes team statistics and keeps player section gated", async ({ page }) => {
  await page.goto("/spiele/m-2025-10-03");
  await expect(page.getByText("7-Meter").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Öffentlichen nuLiga-Bericht öffnen" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Spielerstatistik noch nicht öffentlich" })).toBeVisible();
});

test("nuliga report shows anonymized match flow", async ({ page }) => {
  await page.goto("/spiele/m-2026-06-01");
  await expect(page.getByText("41:37").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Spielverlauf" })).toBeVisible();
  await expect(page.getByText("7-Meter vergeben")).toBeVisible();
  await expect(page.getByText("Veröffentlichung pending")).toBeVisible();
});

test("standings, team and club routes link together", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/tabelle");
  await expect(page.getByRole("heading", { name: "Tabelle" })).toBeVisible();
  await page.getByRole("link", { name: "ASKÖ HC Urfahr" }).click();
  await expect(page.getByText("Verein:")).toBeVisible();
  await page.getByRole("link", { name: "ASKÖ HC Urfahr" }).first().click();
  await expect(page.getByRole("heading", { name: "Teams", exact: true })).toBeVisible();
});

test("active filters remain visible as chips", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/spielplan?date=2026-06-01");
  await expect(page.getByLabel("Aktive Filter")).toContainText("Datum:");
  await expect(page.getByRole("link", { name: "Alle Filter löschen" })).toBeVisible();
});

test("mobile standings use scannable cards", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/bewerbe/oohv-maenner-landesliga/tabelle");
  await expect(page.getByRole("list")).toBeVisible();
  await expect(page.getByRole("table")).toBeHidden();
});

test("search finds venue", async ({ page }) => {
  await page.goto("/suche?q=Pernau");
  await expect(page.getByRole("link", { name: "SH Pernau, Wels - Sterner Arena" })).toBeVisible();
});

test("mobile navigation stays usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Mobile Navigation" })).toBeVisible();
});

test("saved team favorite personalizes landing", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-06-01T12:00:00.000Z") });
  await page.goto("/teams/hc-linz-neue-heimat");
  await page.getByRole("button", { name: "Team merken" }).click();
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Dein nächstes Spiel" })).toBeVisible();
});

test("fixture convenience actions export, share and open maps", async ({ page }) => {
  await page.goto("/spiele/m-2025-10-03");
  const calendar = await page.request.get("/api/kalender/spiel/m-2025-10-03");
  expect(calendar.headers()["content-type"]).toContain("text/calendar");
  expect(await calendar.text()).toContain("BEGIN:VEVENT");
  await page.getByRole("button", { name: "Spiel teilen" }).click();
  await expect(page.getByText("Link kopieren:")).toBeVisible();
  await expect(page.getByRole("link", { name: "In Google Maps öffnen" })).toHaveAttribute("href", /google\.com\/maps\/search/);
});

test("team schedule calendar exports validated fixtures", async ({ page }) => {
  const calendar = await page.request.get("/api/kalender/team/hc-linz-neue-heimat");
  expect(calendar.headers()["content-disposition"]).toContain(".ics");
  expect(await calendar.text()).toContain("BEGIN:VCALENDAR");
});

test("sales demo shell exposes manifest, legal links and feedback", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Impressum" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Datenschutz" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Feedback senden" })).toHaveAttribute("href", "mailto:c.vahram@students.htl-leonding.ac.at");
  const manifest = await page.request.get("/manifest.webmanifest");
  expect(await manifest.json()).toMatchObject({ short_name: "Matchcenter", display: "standalone" });
});

test("legal placeholders, sitemap and robots remain explicit", async ({ page }) => {
  await page.goto("/impressum");
  await expect(page.getByText("[Vor öffentlichem Launch ergänzen]").first()).toBeVisible();
  await page.goto("/datenschutz");
  await expect(page.getByText("[Vor öffentlichem Launch ergänzen]")).toBeVisible();
  expect(await (await page.request.get("/robots.txt")).text()).toContain("Sitemap:");
  expect(await (await page.request.get("/sitemap.xml")).text()).toContain("/impressum");
});
