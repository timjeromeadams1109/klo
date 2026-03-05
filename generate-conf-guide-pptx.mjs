import PptxGenJS from "/tmp/klo-pptx/node_modules/pptxgenjs/dist/pptxgen.es.js";
import { chromium } from "playwright";
import { mkdirSync } from "fs";

const slideDir = "/tmp/conf-guide-slides/";
try { mkdirSync(slideDir, { recursive: true }); } catch {}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

await page.goto("file:///Users/timothyadams/klo-app/conference-v2-guide.html", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

// Hide navigation UI
await page.evaluate(() => {
  const nav = document.querySelector('.nav');
  if (nav) nav.style.display = 'none';
  const counter = document.querySelector('.slide-counter');
  if (counter) counter.style.display = 'none';
});

const slideCount = await page.evaluate(() => document.querySelectorAll('.slide').length);
console.log(`Found ${slideCount} slides`);

for (let i = 0; i < slideCount; i++) {
  await page.evaluate((idx) => {
    document.querySelectorAll('.slide').forEach((s, j) => {
      s.style.display = j === idx ? 'flex' : 'none';
    });
  }, i);
  await page.waitForTimeout(500);
  const num = String(i + 1).padStart(2, "0");
  await page.screenshot({ path: `${slideDir}slide-${num}.png`, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  console.log(`Rendered slide ${i + 1}/${slideCount}`);
}

await page.close();
await browser.close();
console.log("All slides rendered.\n");

const pptx = new PptxGenJS();
pptx.author = "Tim Adams";
pptx.company = "KLO / Keith L. Odom";
pptx.subject = "KLO Conference Companion V2 — User Guide";
pptx.title = "KLO Conference Companion V2 — User Guide";
pptx.layout = "LAYOUT_16x9";

for (let i = 1; i <= slideCount; i++) {
  const num = String(i).padStart(2, "0");
  const s = pptx.addSlide();
  s.addImage({ path: `${slideDir}slide-${num}.png`, x: 0, y: 0, w: 10, h: 5.63 });
}

const outPath = "/Users/timothyadams/klo-app/conference-v2-guide.pptx";
await pptx.writeFile({ fileName: outPath });
console.log("PPTX saved to " + outPath);
