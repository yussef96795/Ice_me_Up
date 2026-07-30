@echo off
npx lighthouse http://localhost:3003 --output=json --output-path=stdout --only-audits=largest-contentful-paint,lcp-breakdown-insight,network-requests,bootup-time,mainthread-work-breakdown --chrome-flags="--headless --no-sandbox" --quiet
