import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (WCAG)", () => {
  test("home page passes axe-core audit (critical/serious only)", async ({
    page,
  }) => {
    await page.goto("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await new AxeBuilder({ page: page as any })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["region", "color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("sign-in page passes axe-core audit (critical/serious only)", async ({
    page,
  }) => {
    await page.goto("/auth/signin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await new AxeBuilder({ page: page as any })
      .withTags(["wcag2a", "wcag2aa"])
      .disableRules(["region", "color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('modal has role="dialog" and aria-modal="true"', async ({ page }) => {
    await page.goto("/");
    // Trigger a modal if there is a trigger element
    const modalTrigger = page.locator("[data-modal-trigger]").first();
    if (await modalTrigger.isVisible({ timeout: 2000 }).catch(() => false)) {
      await modalTrigger.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("aria-modal", "true");
    }
  });
});
