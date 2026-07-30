import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, extname, basename } from 'path';

const PRODUCT_DIRS = [
  'affogato', 'Boissons', 'boissons chaudes', 'cafes',
  'crepe salee', 'crepe sucree', 'croque', 'flavors',
  'frappucino', 'gateaux', 'gauffre', 'hot tea',
  'iced coffee', 'iced tea', 'Jus', 'macchiato',
  'mansory_drinks', 'mansory_pastry', 'matcha', 'milk shake',
  'mojito', 'nos coupes', 'nos specialites', 'pancake',
  'panini', 'places', 'smoothie', 'yaourts glaces',
];

const PUBLIC_DIR = './public';
const WEBP_QUALITY = 85;
const MAX_WIDTH = 1200;

let totalConverted = 0;
let totalInputBytes = 0;
let totalOutputBytes = 0;
const errors = [];

for (const dir of PRODUCT_DIRS) {
  const fullDir = join(PUBLIC_DIR, dir);
  let files;
  try {
    files = readdirSync(fullDir).filter(f =>
      ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase())
    );
  } catch {
    console.warn(`  Skipping ${dir}/ — not found`);
    continue;
  }

  for (const file of files) {
    const inputPath = join(fullDir, file);
    const name = basename(file, extname(file));
    const outputPath = join(fullDir, `${name}.webp`);

    try {
      const inputMeta = await sharp(inputPath).metadata();
      const buf = await sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();

      const { writeFileSync } = await import('fs');
      writeFileSync(outputPath, buf);

      const inSize = inputMeta.size || 0;
      totalInputBytes += inSize;
      totalOutputBytes += buf.length;
      totalConverted++;
      process.stdout.write(`\r  ${totalConverted} converted`);
    } catch (err) {
      errors.push(`${dir}/${file}: ${err.message}`);
    }
  }
}

const savedMB = (totalInputBytes - totalOutputBytes) / 1024 / 1024;
console.log(`\n\nConverted ${totalConverted} images.`);
console.log(`Before: ${(totalInputBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`After:  ${(totalOutputBytes / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved:  ${savedMB.toFixed(2)} MB (${((1 - totalOutputBytes / totalInputBytes) * 100).toFixed(1)}%)`);
if (errors.length) {
  console.log(`\nErrors: ${errors.length}`);
  errors.forEach(e => console.log(`  ${e}`));
}
