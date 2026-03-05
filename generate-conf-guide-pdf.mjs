import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

await page.goto("file:///Users/timothyadams/klo-app/conference-v2-guide.html", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// Hide navigation, show all slides for PDF
await page.evaluate(() => {
  const nav = document.querySelector('.nav');
  if (nav) nav.style.display = 'none';
  const counter = document.querySelector('.slide-counter');
  if (counter) counter.style.display = 'none';
  document.querySelectorAll('.slide').forEach(s => {
    s.style.display = 'flex';
    s.style.pageBreakAfter = 'always';
  });
});

await page.waitForTimeout(1000);

const outPath = "/Users/timothyadams/klo-app/conference-v2-guide.pdf";
await page.pdf({
  path: outPath,
  width: "1920px",
  height: "1080px",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

console.log("PDF saved to " + outPath);
await browser.close();
