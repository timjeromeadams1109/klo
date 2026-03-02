import { test, expect } from "@playwright/test";

test.describe("Core navigation", () => {
  test("home page loads with hero heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("bottom nav links are visible on mobile viewport", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/");
    const nav = page.locator("nav").last();
    await expect(nav).toBeVisible();
    await context.close();
  });

  test("skip link is present and targets #main-content", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });
});
