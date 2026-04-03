/**
 * record-training-video.mjs
 *
 * Records a video walkthrough of the admin training guide.
 * Run: npx playwright test scripts/record-training-video.mjs
 * Or:  node scripts/record-training-video.mjs
 */

import { chromium } from "playwright";
import { resolve } from "path";

const BASE_URL = process.env.BASE_URL || "https://keithlodom.ai";
const ADMIN_EMAIL = "admin@keithlodom.io";

const OUTPUT_DIR = resolve("public/training/video");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("Launching browser...");

  const browser = await chromium.launch({
    headless: true,
    args: [
      `--unsafely-treat-insecure-origin-as-secure=${BASE_URL}`,
    ],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();

  // ── Sign in via NextAuth CSRF + API ──
  console.log("Signing in...");
  const password = process.env.ADMIN_PLAINTEXT_PASSWORD;
  if (!password) {
    console.error("Set ADMIN_PLAINTEXT_PASSWORD env var to the plaintext admin password.");
    process.exit(1);
  }
  await page.goto(`${BASE_URL}/auth/signin`);
  await page.waitForLoadState("networkidle");
  await sleep(2000);
  await page.fill('#email', ADMIN_EMAIL);
  await sleep(300);
  await page.fill('#password', password);
  await sleep(300);
  await page.locator('button', { hasText: 'Sign In' }).click();
  await sleep(5000);

  // ── Navigate to training page ──
  console.log("Opening training page...");
  await page.goto(`${BASE_URL}/admin/training`);
  await page.waitForLoadState("networkidle");
  await sleep(2000);

  // ── Show the Map view (default) ──  ~0-10s voiceover: intro
  console.log("Recording Map view...");
  await sleep(5000);

  // Scroll down slowly to show all categories  ~10-25s voiceover: map view
  for (let i = 0; i < 3; i++) {
    await page.mouse.wheel(0, 250);
    await sleep(2500);
  }
  await sleep(2000);

  // Scroll back up
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await sleep(3000);

  // ── Switch to Guide view ──  ~28s voiceover: guide view
  console.log("Switching to Guide view...");
  const guideBtn = page.getByRole("button", { name: "Guide", exact: true });
  await guideBtn.click();
  await sleep(4000);

  // ── Getting Started section expanded with audio player  ~32-45s
  console.log("Showing Getting Started section...");
  await sleep(3000);

  // Click the play button on the audio player
  console.log("Playing audio sample...");
  const playBtns = page.locator("#section-getting-started button.rounded-full");
  if (await playBtns.first().isVisible({ timeout: 3000 }).catch(() => false)) {
    await playBtns.first().click();
    await sleep(6000);
    await playBtns.first().click();
    await sleep(2000);
  }

  // Scroll to show the steps
  await page.mouse.wheel(0, 200);
  await sleep(3000);

  // ── Collapse Getting Started, scroll through sections  ~48-60s
  console.log("Navigating through guide sections...");
  const gettingStartedHeader = page.locator("#section-getting-started button").first();
  await gettingStartedHeader.click();
  await sleep(1500);

  // Slow scroll through sections
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 200);
    await sleep(2000);
  }

  // ── Expand User Management  ~62-85s
  console.log("Opening User Management...");
  const userMgmtHeader = page.locator("#section-users button").first();
  await userMgmtHeader.click();
  await sleep(4000);

  // Play audio briefly
  const userPlayBtns = page.locator("#section-users button.rounded-full");
  if (await userPlayBtns.first().isVisible({ timeout: 3000 }).catch(() => false)) {
    await userPlayBtns.first().click();
    await sleep(7000);
    await userPlayBtns.first().click();
    await sleep(2000);
  }

  // Scroll to show all steps and tips
  await page.mouse.wheel(0, 250);
  await sleep(3000);
  await page.mouse.wheel(0, 200);
  await sleep(3000);

  // ── Show the audio toggle  ~88-95s
  console.log("Toggling audio off/on...");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await sleep(2500);

  const audioToggle = page.getByRole("button", { name: /Audio On|Audio Off/ });
  if (await audioToggle.isVisible()) {
    await audioToggle.click();
    await sleep(2500);
    await audioToggle.click();
    await sleep(2500);
  }

  // ── Switch to Workflows view  ~98-110s
  console.log("Showing Workflows...");
  const workflowsBtn = page.getByRole("button", { name: "Workflows", exact: true });
  await workflowsBtn.click();
  await sleep(4000);

  // Scroll to show workflows
  await page.mouse.wheel(0, 250);
  await sleep(3000);
  await page.mouse.wheel(0, 250);
  await sleep(3000);

  // ── Quick look at the actual Users tab ──  ~112-125s
  console.log("Showing actual Users tab...");
  await page.goto(`${BASE_URL}/admin?tab=users`);
  await page.waitForLoadState("networkidle");
  await sleep(5000);

  // Scroll to show user cards and action buttons
  await page.mouse.wheel(0, 250);
  await sleep(4000);
  await page.mouse.wheel(0, 200);
  await sleep(4000);

  // ── Wrap up ──
  console.log("Finishing recording...");
  await sleep(3000);

  // Close to finalize the video
  await context.close();
  await browser.close();

  console.log(`\nVideo saved to: ${OUTPUT_DIR}/`);
  console.log("Look for the .webm file and convert to mp4 if needed.");
}

main().catch((err) => {
  console.error("Recording failed:", err);
  process.exit(1);
});
