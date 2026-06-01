import { expect, test } from "@playwright/test";

test("landing exposes main navigation and fixtures", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Dein Spiel/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Bewerb auswählen" })).toBeVisible();
});

test("schedule filters and empty reset work", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga/spielplan?date=2020-01-01");
  await expect(page.getByRole("heading", { name: "Keine Treffer" })).toBeVisible();
  await page.getByRole("link", { name: "Filter zurücksetzen" }).click();
  await expect(page.getByRole("heading", { name: "Spielplan", exact: true })).toBeVisible();
});

test("competition switcher opens complete selected schedule", async ({ page }) => {
  await page.goto("/bewerbe/oohv-maenner-landesliga");
  await page.getByRole("link", { name: "HLA CHALLENGE" }).click();
  await expect(page.getByRole("heading", { name: "HLA CHALLENGE" })).toBeVisible();
  await page.getByRole("link", { name: "Vollständigen Spielplan öffnen" }).click();
  await expect(page.getByRole("heading", { name: "Spielplan", exact: true })).toBeVisible();
  await expect(page.getByText("30 Spiele im aktuellen Ergebnis")).toBeVisible();
});

test("report exposes team statistics and keeps player section gated", async ({ page }) => {
  await page.goto("/spiele/oohv-maenner-landesliga-2025-10-03-1");
  await expect(page.getByText("7-Meter").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Öffentlichen ÖHB-Bericht öffnen" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Spielerstatistik" })).toHaveCount(0);
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
