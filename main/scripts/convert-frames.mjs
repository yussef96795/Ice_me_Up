import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';
import { cpus } from 'os';

const INPUT_DIR    = './public/frames';
const WEBP_DIR     = './public/frames/webp';
const TARGET_WIDTH = 1920;
const WEBP_QUALITY = 80;
const CONCURRENCY  = Math.max(1, cpus().length - 1);

mkdirSync(WEBP_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR)
  .filter(f => ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()))
  .sort();

console.log(`Converting ${files.length} frames to WebP (concurrency: ${CONCURRENCY})...`);

const t0 = Date.now();

for (let i = 0; i < files.length; i += CONCURRENCY) {
  const batch = files.slice(i, i + CONCURRENCY);
  await Promise.all(batch.map(async (file) => {
    const name  = basename(file, extname(file));
    const input = join(INPUT_DIR, file);
    await sharp(input)
      .resize(TARGET_WIDTH)
      .webp({ quality: WEBP_QUALITY })
      .toFile(join(WEBP_DIR, `${name}.webp`));
  }));
  const pct = Math.round(((i + batch.length) / files.length) * 100);
  process.stdout.write(`\r  ${i + batch.length}/${files.length} frames (${pct}%)`);
}

const elapsed = ((Date.now() - t0) / 1000 / 60).toFixed(1);
console.log(`\n\nDone in ${elapsed} minutes.`);
console.log('Next: run "node scripts/build-spritesheets.mjs"');
