import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const FRAMES_DIR = path.join(ROOT, 'ref', 'frames_temp');
const OUTPUT = path.join(ROOT, 'ref', 'showcase-full.mp4');

fs.mkdirSync(path.join(ROOT, 'ref'), { recursive: true });
fs.mkdirSync(FRAMES_DIR, { recursive: true });

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function smoothScroll(page, from, to, durationMs) {
  await page.evaluate(({ from, to, duration }) => {
    return new Promise(resolve => {
      const start = performance.now();
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, from + (to - from) * eased);
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  }, { from, to, duration: durationMs });
}

async function clickByText(page, text) {
  return page.evaluate((t) => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.textContent?.trim().includes(t));
    if (btn) { btn.click(); return true; }
    return false;
  }, text);
}

async function focusWheel(page) {
  return page.evaluate(() => {
    const el = document.querySelector('.option-wheel');
    if (el) { el.focus(); return true; }
    return false;
  });
}

async function main() {
  console.log('[1/6] Launching browser (1920x1080)...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--window-size=1920,1080',
      '--no-first-run',
      '--disable-extensions',
      '--disable-gpu',
      '--disable-software-rasterizer',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('[2/6] Starting CDP screencast...');
  const client = await page.createCDPSession();
  let frameCount = 0;

  await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 85,
    maxWidth: 1920,
    maxHeight: 1080,
    everyNthFrame: 1,
  });

  client.on('Page.screencastFrame', async (params) => {
    const framePath = path.join(FRAMES_DIR, `frame_${String(frameCount).padStart(6, '0')}.jpg`);
    fs.writeFileSync(framePath, Buffer.from(params.data, 'base64'));
    frameCount++;
    await client.send('Page.screencastFrameAck', { sessionId: params.sessionId });
  });

  console.log('[3/6] Navigating to site...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  console.log('  Page loaded, waiting for frame assets...');

  // Wait for frame images to preload
  await sleep(5000);

  // ──────────────────────────────────────────
  // PHASE 1: Hero hold (0-4s already elapsed from load)
  console.log('[4/6] Starting showcase flow...');
  console.log('  Phase 1: Hero hold...');
  await sleep(3500);

  // ──────────────────────────────────────────
  // PHASE 2: Click "Find a Location"
  console.log('  Phase 2: Clicking "Find a Location"...');
  const locClicked = await clickByText(page, 'Find a Location');
  console.log(`    Clicked: ${locClicked}`);
  await sleep(1200); // Wait for overlay open animation (400ms) + settle

  // ──────────────────────────────────────────
  // PHASE 3: Scroll through locations
  console.log('  Phase 3: Browsing locations...');

  // Focus the option wheel for keyboard input
  await focusWheel(page);
  await sleep(300);

  // Default is index 2 (Marsa). Visit all 5 locations:
  // Marsa → Menzah 5 → Mourouj 6 → Menzah 5 → Marsa → Jardins de Carthage → Bardo

  const locationSequence = [
    { key: 'ArrowDown', name: 'Menzah 5' },
    { key: 'ArrowDown', name: 'Mourouj 6' },
    { key: 'ArrowUp', name: 'Menzah 5 (return)' },
    { key: 'ArrowUp', name: 'Marsa (return)' },
    { key: 'ArrowUp', name: 'Jardins de Carthage' },
    { key: 'ArrowUp', name: 'Bardo' },
  ];

  // Brief pause on starting location (Marsa)
  console.log('    Starting at: Marsa');
  await sleep(1200);

  for (const { key, name } of locationSequence) {
    await page.keyboard.press(key);
    console.log(`    ${key} → ${name}`);
    await sleep(1200); // 200ms smoothing + 1s hold to read
  }

  // Hold on final location (Bardo)
  await sleep(800);

  // ──────────────────────────────────────────
  // PHASE 4: Close location overlay
  console.log('  Phase 4: Closing location overlay...');
  await page.click('.location-close-btn');
  await sleep(1000); // Wait for close animation

  // Brief hero pause
  console.log('  Brief hero pause...');
  await sleep(1000);

  // ──────────────────────────────────────────
  // PHASE 5: Smooth scroll down to interior section
  console.log('  Phase 5: Smooth scroll down...');
  // Total scroll height ≈ 5712px (476 frames × 12px)
  // Interior copy fully visible at ~4500px
  await smoothScroll(page, 0, 4500, 12000);

  // Pause at interior for "VIEW OUR MENU" to be visible
  console.log('  Pausing at interior section...');
  await sleep(2000);

  // ──────────────────────────────────────────
  // PHASE 6: Click "VIEW OUR MENU"
  console.log('  Phase 6: Clicking "VIEW OUR MENU"...');
  const menuClicked = await clickByText(page, 'VIEW OUR MENU');
  console.log(`    Clicked: ${menuClicked}`);
  await sleep(1200); // Wait for overlay animation

  // ──────────────────────────────────────────
  // PHASE 7: Browse flavours
  console.log('  Phase 7: Browsing flavours...');

  // Pause on first flavour (Chocolate)
  console.log('    Chocolate (current)');
  await sleep(2000);

  // Click next → Strawberry
  await page.click('.flavour-next');
  console.log('    → Strawberry');
  await sleep(1800);

  // Click next → Vanilla
  await page.click('.flavour-next');
  console.log('    → Vanilla');
  await sleep(1800);

  // Click next → Pistachio
  await page.click('.flavour-next');
  console.log('    → Pistachio');
  await sleep(1800);

  // Click prev → Vanilla (show both arrows work)
  await page.click('.flavour-prev');
  console.log('    ← Vanilla (prev)');
  await sleep(1500);

  // Hold briefly
  await sleep(500);

  // ──────────────────────────────────────────
  // PHASE 8: Close flavour modal
  console.log('  Phase 8: Closing flavour modal...');
  await page.click('.flavour-close-btn');
  await sleep(1000); // Wait for close animation

  // ──────────────────────────────────────────
  // PHASE 9: Smooth scroll back up to hero
  console.log('  Phase 9: Smooth scroll back up...');
  await smoothScroll(page, 4500, 0, 13000);

  // Final hero hold
  console.log('  Final hero hold...');
  await sleep(3000);

  // ──────────────────────────────────────────
  // STOP CAPTURE
  console.log('[5/6] Stopping capture...');
  console.log(`  Total frames captured: ${frameCount}`);
  await client.send('Page.stopScreencast');
  await browser.close();

  if (frameCount < 100) {
    console.error('ERROR: Too few frames captured. Aborting.');
    process.exit(1);
  }

  // ──────────────────────────────────────────
  // COMPILE VIDEO
  const elapsedSec = frameCount / 60; // rough estimate
  const inputFps = Math.max(1, Math.round(frameCount / 60));
  console.log(`[6/6] Compiling to mp4 (~${inputFps}fps input → 60fps output)...`);

  try {
    execSync(
      `ffmpeg -framerate ${inputFps} -i "${path.join(FRAMES_DIR, 'frame_%06d.jpg')}" ` +
      `-vf "fps=60" ` +
      `-c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart -y "${OUTPUT}"`,
      { stdio: 'inherit' }
    );
  } catch {
    console.log('  Retrying with auto-detect...');
    execSync(
      `ffmpeg -i "${path.join(FRAMES_DIR, 'frame_%06d.jpg')}" ` +
      `-vf "fps=60" ` +
      `-c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart -y "${OUTPUT}"`,
      { stdio: 'inherit' }
    );
  }

  console.log('  Cleaning up temp frames...');
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });

  const stats = fs.statSync(OUTPUT);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
  console.log(`\nDone! Output: ${OUTPUT} (${sizeMB} MB)`);
}

main().catch((err) => {
  console.error('Recording failed:', err.message);
  fs.rmSync(FRAMES_DIR, { recursive: true, force: true });
  process.exit(1);
});
