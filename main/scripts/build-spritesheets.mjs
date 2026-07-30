import sharp from 'sharp';
import { readdirSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const INPUT_DIR        = './public/frames/webp';
const OUT_DIR          = './public/spritesheets/webp';
const FRAMES_PER_SHEET = 48;
const FRAME_W          = 1920;
const FRAME_H          = 1080;
const COLS             = 8;
const ROWS             = 6;
const WEBP_QUALITY     = 80;

mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR)
  .filter(f => f.endsWith('.webp'))
  .sort();

const totalFrames = files.length;
const chunks = [];
for (let i = 0; i < files.length; i += FRAMES_PER_SHEET) {
  chunks.push(files.slice(i, i + FRAMES_PER_SHEET));
}

console.log(`Building ${chunks.length} WebP spritesheets...`);

for (let ci = 0; ci < chunks.length; ci++) {
  const chunk = chunks[ci];
  const sheetW = COLS * FRAME_W;
  const actualRows = Math.ceil(chunk.length / COLS);
  const sheetH = actualRows * FRAME_H;

  const composite = chunk.map((file, idx) => {
    const col = idx % COLS;
    const row = Math.floor(idx / COLS);
    return {
      input: join(INPUT_DIR, file),
      top: row * FRAME_H,
      left: col * FRAME_W,
    };
  });

  await sharp({
    create: { width: sheetW, height: sheetH, channels: 3, background: { r: 0, g: 0, b: 0 } },
  })
    .composite(composite)
    .webp({ quality: WEBP_QUALITY })
    .toFile(join(OUT_DIR, `sheet-${String(ci).padStart(3, '0')}.webp`));

  process.stdout.write(`\r  Sheet ${ci + 1}/${chunks.length}`);
}

const meta = {
  format: 'webp',
  frameWidth: FRAME_W,
  frameHeight: FRAME_H,
  framesPerSheet: FRAMES_PER_SHEET,
  cols: COLS,
  rows: ROWS,
  totalFrames,
  totalSheets: chunks.length,
};
writeFileSync(join(OUT_DIR, 'meta.json'), JSON.stringify(meta, null, 2));
console.log(`\n\nDone. ${totalFrames} frames in ${chunks.length} sheets.`);
console.log(`Output: ${OUT_DIR}/`);
