import { expect, test } from "@playwright/test";

test("Tabelle & Spielplan print view contains the full season", async ({ page, browserName }, info) => {
  test.skip(info.project.name !== "desktop" || browserName !== "chromium", "PDF rendering runs once in desktop Chromium");
  await page.goto("/hla-challenge-west");
  await page.getByRole("link", { name: "Tabelle & Spielplan als PDF" }).click();
  await expect(page).toHaveURL(/\/hla-challenge-west\/druck$/);
  await expect(page.locator("table.standings tbody tr")).toHaveCount(8);
  await expect(page.locator(".print-schedule tbody tr")).toHaveCount(56);
  const text = await page.locator(".print").innerText();
  expect(text).not.toMatch(/BÖSC|SZÜC|BUBA|PILL\./);
  expect(text).toContain("Quelle: nuLiga");
  await page.emulateMedia({ media: "print" });
  const pdf = await page.pdf({ format: "A4" });
  expect(pdf.byteLength).toBeGreaterThan(10_000);
  await info.attach("tabelle-spielplan.pdf", { body: pdf, contentType: "application/pdf" });
});
