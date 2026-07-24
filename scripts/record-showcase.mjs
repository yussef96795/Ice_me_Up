import puppeteer from 'puppeteer';
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';

const ROOT = path.resolve(import.meta.dirname, '..');
const FRAMES_DIR = path.join(ROOT, 'ref', 'frames_temp');
const OUTPUT = path.join(ROOT, 'ref', 'showcase.mp4');

fs.mkdirSync(FRAMES_DIR, { recursive: true });

function waitForServer(port, timeout = 60000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      http.get(`http://localhost:${port}`, (res) => {
        res.resume();
        resolve();
      }).on('error', () => {
        if (Date.now() - start > timeout) reject(new Error('Server timeout'));
        else setTimeout(check, 500);
      });
    };
    check();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('[1/7] Starting dev server...');
  const dev = spawn('npm', ['run', 'dev'], {
    shell: true,
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await waitForServer(3000);
    console.log('  Dev server ready on :3000');
  } catch {
    console.log('  Waiting extra for dev server...');
    await sleep(8000);
  }

  console.log('[2/7] Launching browser (1920x1080)...');
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

  console.log('[3/7] Starting CDP screencast...');
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

  console.log('[4/7] Navigating to site...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  console.log('  Page loaded, waiting for frames to initialize...');
  await sleep(4000);

  console.log('[5/7] Smooth scroll (0-6s)...');
  await page.evaluate(async () => {
    const totalScroll = 4500;
    const duration = 5500;
    const start = performance.now();
    return new Promise((resolve) => {
      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        window.scrollTo(0, eased * totalScroll);
        if (progress < 1) requestAnimationFrame(step);
        else resolve();
      }
      requestAnimationFrame(step);
    });
  });

  console.log('  Scroll complete, pausing...');
  await sleep(1500);

  console.log('[6/7] Clicking VIEW OUR MENU...');
  const clicked = await page.evaluate(() => {
    const btns = [...document.querySelectorAll('button')];
    const btn = btns.find(b => b.textContent?.trim().includes('VIEW OUR MENU'));
    if (btn) { btn.click(); return true; }
    return false;
  });
  console.log(`  Button clicked: ${clicked}`);
  await sleep(2000);

  console.log('[7/7] Browsing flavors...');
  for (let i = 0; i < 3; i++) {
    const nextClicked = await page.evaluate(() => {
      const btn = document.querySelector('.flavour-next');
      if (btn) { btn.click(); return true; }
      return false;
    });
    console.log(`  Next click ${i + 1}/3: ${nextClicked}`);
    await sleep(1500);
  }

  await sleep(1000);

  console.log(`Captured ${frameCount} frames total.`);
  await client.send('Page.stopScreencast');
  await browser.close();
  dev.kill();

  if (frameCount < 10) {
    console.error('ERROR: Too few frames captured. Aborting.');
    process.exit(1);
  }

  const detectedFps = Math.max(1, Math.round(frameCount / 13));
  console.log(`Compiling to mp4 (detected ~${detectedFps}fps, targeting 60fps output)...`);

  try {
    execSync(
      `ffmpeg -framerate ${detectedFps} -i "${path.join(FRAMES_DIR, 'frame_%06d.jpg')}" ` +
      `-vf "fps=60" ` +
      `-c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart -y "${OUTPUT}"`,
      { stdio: 'inherit' }
    );
  } catch (e) {
    console.log('ffmpeg with detected fps failed, trying auto-detect...');
    execSync(
      `ffmpeg -i "${path.join(FRAMES_DIR, 'frame_%06d.jpg')}" ` +
      `-vf "fps=60" ` +
      `-c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart -y "${OUTPUT}"`,
      { stdio: 'inherit' }
    );
  }

  console.log('Cleaning up temp frames...');
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
