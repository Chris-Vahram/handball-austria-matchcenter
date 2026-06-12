import { expect, test } from "@playwright/test";

test("home is content-first with no follows required", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Mein Handball" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Aktuelle Spiele" })).toBeVisible();
  await expect(page.getByLabel("Finde dein Team")).toBeVisible();
  await expect(page.getByRole("button", { name: /folgen/ }).first()).toBeVisible();
});

test("following a club builds the personal area", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /folgen/ }).first().click();
  await expect(page.getByRole("heading", { name: "Deine Vereine" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Vereinsseite öffnen/ }).first()).toBeVisible();
});

test("primary navigation exposes Team-OS sections", async ({ page }, testInfo) => {
  await page.goto("/");
  const navName = testInfo.project.name === "mobile" ? "Mobile Navigation" : "Hauptnavigation";
  const nav = page.getByRole("navigation", { name: navName });
  await expect(nav.getByRole("link", { name: "Meine Teams" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Entdecken" })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Suche" })).toBeVisible();
  await page.goto("/entdecken");
  await expect(page.getByRole("heading", { name: "Verbände & Bewerbe" })).toBeVisible();
});

test("mobile navigation stays usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Mobile Navigation" })).toBeVisible();
});

test("entdecken browses by Verband to a table", async ({ page }) => {
  await page.goto("/entdecken");
  await expect(page.getByRole("heading", { name: "Oberösterreichischer Handballverband" })).toBeVisible();
  await page.getByRole("link", { name: /OÖHV Männer Landesliga/ }).first().click();
  await page.getByRole("link", { name: "Tabelle öffnen" }).click();
  await expect(page.getByRole("heading", { name: "Tabelle" })).toBeVisible();
});

test("schedule filters and empty reset work", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/spielplan?date=2020-01-01");
  await expect(page.getByRole("heading", { name: "Keine Treffer" })).toBeVisible();
  await page.getByRole("link", { name: "Filter zurücksetzen" }).click();
  await expect(page.getByRole("heading", { name: "Spielplan", exact: true })).toBeVisible();
});

test("active filters remain visible as chips", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/spielplan?date=2026-06-01");
  await expect(page.getByLabel("Aktive Filter")).toContainText("Datum:");
  await expect(page.getByRole("link", { name: "Alle Filter löschen" })).toBeVisible();
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
  await page.getByRole("link", { name: /West Abstiegsrunde/ }).first().click();
  await page.locator('a[href="/bewerbe/hla-challenge-west-abstiegsrunde/tabelle"]').click();
  await expect(page).toHaveURL("/bewerbe/hla-challenge-west-abstiegsrunde/tabelle");
  await expect(page.getByRole("link", { name: "SK Konstant Traun / Edelweiss" }).first()).toBeVisible();
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
  await expect(page.getByRole("heading", { name: "Spielerstatistik" })).toBeVisible();
  await expect(page.getByText("PETRISIC, David")).toBeVisible();
  await expect(page.getByText("SEMMELMAYER, Christoph")).toBeVisible();
});

test("standings, team and club routes link together", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/tabelle");
  await expect(page.getByRole("heading", { name: "Tabelle" })).toBeVisible();
  await page.getByRole("link", { name: "ASKÖ HC Urfahr" }).first().click();
  await expect(page.getByText("Verein:")).toBeVisible();
  await page.getByRole("link", { name: "ASKÖ HC Urfahr" }).first().click();
  await expect(page.getByRole("heading", { name: "Teams", exact: true })).toBeVisible();
});

test("mobile standings use scannable cards", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/bewerbe/oohv-maenner-landesliga/tabelle");
  await expect(page.getByRole("list")).toBeVisible();
  await expect(page.locator("table").first()).toHaveCSS("display", "none");
});

test("team page shows widget board and reports", async ({ page }) => {
  await page.goto("/teams/hc-linz-neue-heimat");
  await expect(page.getByRole("heading", { name: "SG HC LINZ AG/Neue Heimat" })).toBeVisible();
  await expect(page.getByText("Letztes Ergebnis")).toBeVisible();
  await expect(page.getByText("Formkurve")).toBeVisible();
  await expect(page.getByText("Tabelle").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Spielberichte" })).toBeVisible();
});

test("edelweiss traun club context aggregates aliases and matches", async ({ page }) => {
  await page.goto("/suche?q=Konstant%20Traun");
  await page.getByRole("link", { name: /Verein[\s\S]*Sportunion EDELWEISS Linz \/ SK Traun/ }).first().click();
  await expect(page).toHaveURL("/vereine/edelweiss-traun");
  await expect(page.getByRole("heading", { name: "Sportunion EDELWEISS Linz / SK Traun" })).toBeVisible();
  await expect(page.getByRole("link", { name: "SK Konstant Traun / Edelweiss" }).first()).toBeVisible();
});

test("search finds venue", async ({ page }) => {
  await page.goto("/suche?q=Pernau");
  await expect(page.getByRole("link", { name: "SH Pernau, Wels - Sterner Arena" })).toBeVisible();
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

test("pitch demo explains the team-os value", async ({ page }) => {
  await page.goto("/demo");
  await expect(page.getByRole("heading", { name: "Folge deinen Handball-Teams" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "In fünf Minuten vorzeigbar" })).toBeVisible();
  await expect(page.getByText("Geführter Demo-Flow")).toBeVisible();
  await expect(page.getByText("Produktive Synchronisierung erst mit genehmigter API")).toBeVisible();
  await expect(page.locator('a[href="/spiele/m-2026-06-01"]').filter({ hasText: "Spielbericht + Route" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Feedback senden" })).toHaveAttribute("href", "mailto:c.vahram@students.htl-leonding.ac.at");
});

test("sales pitch page is sendable to nuliga", async ({ page }) => {
  await page.goto("/pitch");
  await expect(page.getByRole("heading", { name: /Dein Matchcenter/ })).toBeVisible();
  await expect(page.getByText("Follow statt Suchen.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Demo starten" })).toHaveAttribute("href", "/demo");
  await expect(page.getByText("Dies ist kein offizieller Launch.")).toBeVisible();
});

test("sales demo shell exposes manifest, legal links and feedback", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Impressum" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Datenschutz" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Feedback senden" })).toHaveAttribute("href", "mailto:c.vahram@students.htl-leonding.ac.at");
  const manifest = await page.request.get("/manifest.webmanifest");
  expect(await manifest.json()).toMatchObject({ short_name: "Mein Handball", display: "standalone" });
});

test("legal placeholders, sitemap and robots remain explicit", async ({ page }) => {
  await page.goto("/impressum");
  await expect(page.getByText("[Vor öffentlichem Launch ergänzen]").first()).toBeVisible();
  await page.goto("/datenschutz");
  await expect(page.getByText("[Vor öffentlichem Launch ergänzen]")).toBeVisible();
  expect(await (await page.request.get("/robots.txt")).text()).toContain("Sitemap:");
  expect(await (await page.request.get("/sitemap.xml")).text()).toContain("/impressum");
});
