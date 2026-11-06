import { expect, test } from "@playwright/test";

test.describe("Startseite Meine Teams", () => {
  test("pick two teams, dashboard persists after reload, change again", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await expect(page.locator("#h-my")).toHaveText("Mein Team wählen");
    await page.getByText("SK Konstant Traun / Edelweiss").first().click();
    await page.getByText("Sportunion EDELWEISS Linz / SK Traun").first().click();
    await page.getByRole("button", { name: "Fertig" }).first().click();
    await expect(page.locator(".card")).toHaveCount(2);
    await expect(page.locator(".card").first()).toContainText("SMC Innsbruck Handball Tirol");
    await expect(page.locator(".card").first()).toContainText("Sportzentrum Traun");
    await page.reload();
    await expect(page.locator("#h-my")).toHaveText("Meine Teams");
    await expect(page.locator(".card")).toHaveCount(2);
    await page.getByRole("button", { name: "Ändern" }).click();
    await expect(page.locator(".picker")).toBeVisible();
  });

  test("remember from the team page, competitions one tap away", async ({ page }) => {
    await page.goto("/hla-challenge-west/team/hsc-wels");
    await page.getByRole("button", { name: /Als Mein Team merken/ }).click();
    await expect(page.getByRole("button", { name: /Gemerkt als Mein Team/ })).toHaveAttribute("aria-pressed", "true");
    await page.goto("/");
    await expect(page.locator(".card")).toContainText("HSC Wels");
    await page.getByRole("link", { name: "Alle Bewerbe nach Verband" }).click();
    await expect(page.locator(".bewerbe")).toContainText("ÖHB – Österreichischer Handballbund");
    await expect(page.locator(".bewerbe")).toContainText("OÖHV – Oberösterreichischer Handballverband");
    await expect(page.locator(".scope")).toContainText("Prototyp");
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
