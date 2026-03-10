#!/usr/bin/env node
/**
 * App Store Screenshot Generator
 * Generates screenshots at required sizes for Apple App Store and Google Play.
 *
 * Apple sizes: 6.7" (1290x2796), 6.5" (1284x2778), iPad (2048x2732)
 * Google Play: phone (1080x1920), feature graphic (1024x500)
 */

import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { resolve } from 'path'

const BASE_URL = process.argv[2] || 'http://localhost:3000'

const PAGES = [
  { path: '/', name: 'home' },
  { path: '/assessments', name: 'assessments' },
  { path: '/advisor', name: 'ai-advisor' },
  { path: '/events', name: 'events' },
  { path: '/booking', name: 'booking' },
  { path: '/profile', name: 'profile' },
  { path: '/pricing', name: 'pricing' },
]

// Device configs — logical pixels with deviceScaleFactor for retina
const DEVICES = [
  // Apple App Store — 6.7" (iPhone 15 Pro Max)
  { name: 'iphone-6.7', width: 430, height: 932, scale: 3, folder: 'apple-6.7' },
  // Apple App Store — 6.5" (iPhone 14 Plus)
  { name: 'iphone-6.5', width: 428, height: 926, scale: 3, folder: 'apple-6.5' },
  // Apple App Store — iPad Pro 12.9"
  { name: 'ipad-12.9', width: 1024, height: 1366, scale: 2, folder: 'apple-ipad' },
  // Google Play — phone
  { name: 'android-phone', width: 360, height: 640, scale: 3, folder: 'google-phone' },
]

const OUTPUT_DIR = resolve('screenshots/app-store')

async function run() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const browser = await chromium.launch()
  let count = 0

  for (const device of DEVICES) {
    const dir = resolve(OUTPUT_DIR, device.folder)
    mkdirSync(dir, { recursive: true })

    const context = await browser.newContext({
      viewport: { width: device.width, height: device.height },
      deviceScaleFactor: device.scale,
      colorScheme: 'dark',
      isMobile: device.width < 500,
      hasTouch: device.width < 500,
    })

    const page = await context.newPage()

    for (const pg of PAGES) {
      const url = `${BASE_URL}${pg.path}`
      console.log(`  ${device.name} → ${pg.name}...`)

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
      } catch {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 })
      }

      // Wait for animations/images
      await page.waitForTimeout(1500)

      // Hide any cookie banners or popups
      await page.evaluate(() => {
        document.querySelectorAll('[class*="cookie"], [class*="banner"], [class*="popup"], [class*="toast"]').forEach(el => el.remove())
      })

      const filename = `${pg.name}.png`
      await page.screenshot({ path: resolve(dir, filename), fullPage: false })
      count++
    }

    await context.close()
  }

  // Google Play Feature Graphic (1024x500)
  console.log('  Generating Google Play feature graphic...')
  const fgDir = resolve(OUTPUT_DIR, 'google-feature-graphic')
  mkdirSync(fgDir, { recursive: true })

  const fgContext = await browser.newContext({
    viewport: { width: 1024, height: 500 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  })
  const fgPage = await fgContext.newPage()
  try {
    await fgPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 15000 })
  } catch {
    await fgPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 15000 })
  }
  await fgPage.waitForTimeout(1500)
  await fgPage.screenshot({ path: resolve(fgDir, 'feature-graphic.png') })
  count++

  await fgContext.close()
  await browser.close()

  console.log(`\nDone! ${count} screenshots saved to ${OUTPUT_DIR}`)
  console.log('\nFolders:')
  console.log('  apple-6.7/    → iPhone 6.7" (1290x2796px)')
  console.log('  apple-6.5/    → iPhone 6.5" (1284x2778px)')
  console.log('  apple-ipad/   → iPad 12.9" (2048x2732px)')
  console.log('  google-phone/ → Android phone (1080x1920px)')
  console.log('  google-feature-graphic/ → Feature graphic (1024x500px)')
}

run().catch(err => { console.error(err); process.exit(1) })
