import { createServer } from 'net';
import { launch } from 'puppeteer-core';
import lighthouse from 'lighthouse';
import { spawn } from 'child_process';
import { accessSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { once } from 'events';

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

async function findChrome() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  ];
  for (const p of paths) {
    try { accessSync(p); return p; } catch {}
  }
  throw new Error('Chrome not found');
}

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('Server did not start');
}

async function isPortFree(port) {
  return new Promise(resolve => {
    const server = createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => { server.close(); resolve(true); });
    server.listen(port);
  });
}

async function main() {
  const chromePath = await findChrome();
  console.log(`Chrome: ${chromePath}`);

  const wasRunning = !(await isPortFree(PORT));
  let server;
  if (!wasRunning) {
    console.log('Starting next server...');
    server = spawn('node', [resolve('node_modules', 'next', 'dist', 'bin', 'next'), 'start', '-p', String(PORT)], {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
    });
    server.stdout.on('data', d => process.stdout.write(d));
    server.stderr.on('data', d => process.stderr.write(d));
    await waitForServer(URL);
    console.log('Server ready');
  } else {
    console.log('Server already running');
  }

  const browser = await launch({
    executablePath: chromePath,
    args: ['--remote-debugging-port=9222', '--no-sandbox'],
  });

  try {
    const { lhr } = await lighthouse(URL, {
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      formFactor: 'mobile',
      screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4,
      },
      throttlingMethod: 'simulate',
    }, undefined, browser);

    console.log('\n=== Lighthouse Results ===');
    for (const cat of ['performance', 'accessibility', 'best-practices', 'seo']) {
      const score = lhr.categories[cat]?.score;
      console.log(`${cat}: ${score != null ? Math.round(score * 100) : 'N/A'}`);
    }

    const audits = ['largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive', 'mainthread-work-breakdown', 'bootup-time', 'network-requests'];
    console.log('\n=== Key Audits ===');
    for (const id of audits) {
      const a = lhr.audits[id];
      if (a) console.log(`${id}: ${a.displayValue ?? a.numericValue}`);
    }

    writeFileSync('lighthouse-report.json', JSON.stringify(lhr, null, 2));
    console.log('\nReport saved to lighthouse-report.json');
  } finally {
    await browser.close();
  }

  if (server && !server.killed) {
    server.kill();
    console.log('Server stopped');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
