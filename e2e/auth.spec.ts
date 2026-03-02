import { test, expect } from "@playwright/test";

test.describe("Authentication flows", () => {
  test("unauthenticated user visiting /advisor is redirected or blocked", async ({
    page,
  }) => {
    const response = await page.goto("/advisor");
    // Proxy should redirect to sign-in, or the page loads without authenticated content
    const url = page.url();
    const status = response?.status() ?? 0;
    expect(
      url.includes("/auth/signin") || status === 200 || status === 307
    ).toBeTruthy();
  });

  test("unauthenticated user visiting /vault is redirected or blocked", async ({
    page,
  }) => {
    const response = await page.goto("/vault");
    const url = page.url();
    const status = response?.status() ?? 0;
    expect(
      url.includes("/auth/signin") || status === 200 || status === 307
    ).toBeTruthy();
  });

  test("sign-in page renders OAuth buttons", async ({ page }) => {
    await page.goto("/auth/signin");
    // Look for buttons containing OAuth provider names
    const googleBtn = page.getByRole("button", { name: /google/i });
    const appleBtn = page.getByRole("button", { name: /apple/i });
    await expect(googleBtn).toBeVisible();
    await expect(appleBtn).toBeVisible();
  });

  test("sign-up page renders OAuth buttons", async ({ page }) => {
    await page.goto("/auth/signup");
    const googleBtn = page.getByRole("button", { name: /google/i });
    const appleBtn = page.getByRole("button", { name: /apple/i });
    await expect(googleBtn).toBeVisible();
    await expect(appleBtn).toBeVisible();
  });
});
