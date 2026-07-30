const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const endpoint = browser.wsEndpoint();
  const result = await lighthouse('http://localhost:3003', {
    port: new URL(endpoint).port,
    output: 'json',
    onlyAudits: ['largest-contentful-paint', 'lcp-breakdown-insight', 'network-requests', 'bootup-time', 'mainthread-work-breakdown'],
    logLevel: 'error',
  });
  await browser.close();

  const j = result.lhr;
  const lcp = j.audits['largest-contentful-paint'];
  console.log('LCP:', Math.round(lcp.numericValue)+'ms');

  const lcpB = j.audits['lcp-breakdown-insight'];
  if (lcpB?.details?.items) {
    lcpB.details.items.forEach(item => {
      if (item.items) {
        item.items.forEach(sub => console.log(' ', sub.label + ':', Math.round(sub.duration) + 'ms'));
      }
    });
  }

  const net = j.audits['network-requests'];
  const frames = net?.details?.items?.filter(i => i.url?.includes('frame_')) || [];
  console.log('Frames loaded during test:', frames.length);

  const bt = j.audits['bootup-time'];
  if (bt) console.log('Bootup time:', bt.displayValue);
  const mw = j.audits['mainthread-work-breakdown'];
  if (mw) console.log('Main thread work:', mw.displayValue);
})();
