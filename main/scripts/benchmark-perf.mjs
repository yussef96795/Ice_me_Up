import { launch } from 'puppeteer-core';
import { accessSync } from 'fs';

const URL = 'http://localhost:3000/';

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

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const MOBILE_DEVICE = {
  name: 'Mobile',
  viewport: { width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true, hasTouch: true },
  userAgent:
    'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
};

async function run() {
  const chromePath = await findChrome();
  console.log(`Chrome: ${chromePath}\n`);

  const browser = await launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--no-first-run'],
  });

  try {
    const page = await browser.newPage();
    await page.emulate(MOBILE_DEVICE);

    const client = await page.createCDPSession();
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: 1638.4 * 1024,
      uploadThroughput: 675 * 1024,
    });
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

    const metrics = {};
    let longTaskDuration = 0;

    await page.evaluateOnNewDocument(() => {
      window.__perfMetrics = {};
      window.__longTaskDuration = 0;

      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perfMetrics[entry.entryType + ':latest'] = entry;
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            window.__perfMetrics.cls = (window.__perfMetrics.cls || 0) + entry.value;
          }
          if (entry.entryType === 'largest-contentful-paint') {
            window.__perfMetrics.lcp = entry;
            window.__perfMetrics.lcpValue = entry.renderTime || entry.loadTime;
          }
        }
      });
      po.observe({ type: 'largest-contentful-paint', buffered: true });
      po.observe({ type: 'layout-shift', buffered: true });
      po.observe({ type: 'first-contentful-paint', buffered: true });

      const lo = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            window.__longTaskDuration += entry.duration - 50;
          }
        }
      });
      lo.observe({ type: 'longtask', buffered: true });
    });

    console.log('Navigating to page...');
    await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 });

    await sleep(5000);

    const perfData = await page.evaluate(() => {
      const fcpEntry = performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint');
      return {
        fcp: fcpEntry?.startTime ?? null,
        lcp: window.__perfMetrics?.lcpValue ?? null,
        cls: window.__perfMetrics?.cls ?? 0,
        longTasks: window.__longTaskDuration ?? 0,
      };
    });

    console.log('\n=== Performance Results (Mobile Simulation) ===');
    console.log(`LCP (Largest Contentful Paint): ${perfData.lcp ? (perfData.lcp / 1000).toFixed(2) + 's' : 'N/A'}`);
    console.log(`FCP (First Contentful Paint):   ${perfData.fcp ? (perfData.fcp / 1000).toFixed(2) + 's' : 'N/A'}`);
    console.log(`CLS (Cumulative Layout Shift):   ${perfData.cls ? perfData.cls.toFixed(3) : 'N/A'}`);
    console.log(`TBT (Total Blocking Time, approx): ${perfData.longTasks ? (perfData.longTasks - 50 > 0 ? ((perfData.longTasks - 50) / 1000).toFixed(2) + 's' : '0s (no long tasks >50ms)') : 'N/A'}`);

    // Collect JS coverage data
    console.log('\n=== Assets ===');
    const requests = await page.evaluate(() =>
      performance.getEntriesByType('resource')
        .filter(r => r.name.includes('/_next/'))
        .map(r => ({ name: r.name.split('/').pop(), size: r.transferSize || r.encodedBodySize, dur: r.duration }))
    );
    const totalJS = requests.filter(r => r.name.endsWith('.js')).reduce((s, r) => s + r.size, 0);
    const totalCSS = requests.filter(r => r.name.endsWith('.css')).reduce((s, r) => s + r.size, 0);
    console.log(`JS transferred: ${(totalJS / 1024).toFixed(0)}KB`);
    console.log(`CSS transferred: ${(totalCSS / 1024).toFixed(0)}KB`);
    requests.filter(r => r.name.endsWith('.js')).sort((a, b) => b.size - a.size).slice(0, 5).forEach(r =>
      console.log(`  ${r.name}: ${(r.size / 1024).toFixed(0)}KB (${r.dur.toFixed(0)}ms)`)
    );

    await page.close();
  } finally {
    await browser.close();
  }
}

run().catch(e => { console.error(e); process.exit(1); });
