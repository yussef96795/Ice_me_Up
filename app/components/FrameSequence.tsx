'use client';

import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 476;
const CRITICAL_BATCH = 30;
const WINDOW = 15;
const LOOKAHEAD = 5;
const getPath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, '0')}.jpg`;

function loadImage(path: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = path;
  });
}

export default function FrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    let disposed = false;
    let currentFrame = -1;
    let lastRendered = -1;
    let ticking = false;
    let scrollReady = false;

    // DPR = 1 — skip retina scaling, 4× fewer pixels to draw
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // No alpha — browser skips transparency compositing
    const ctx = canvas.getContext('2d', { alpha: false })!;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

    function draw(idx: number) {
      if (idx === lastRendered) return;
      const img = images[idx];
      if (!img?.complete) return;
      lastRendered = idx;

      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (W - w) / 2;
      const y = (H - h) / 2;

      // Integer coordinates — no sub-pixel anti-aliasing
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));

      // Pre-decode next few frames in background
      for (let n = 1; n <= LOOKAHEAD; n++) {
        const next = images[idx + n];
        if (next && !next.complete) next.decode().catch(() => {});
      }
    }

    function onScroll() {
      if (!scrollReady || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - H;
        if (total > 0) {
          const idx = Math.min(
            Math.floor((window.scrollY / total) * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
          );
          if (idx !== currentFrame) {
            currentFrame = idx;
            draw(idx);
          }
        }
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Phase 1 — load frame 0 only, draw immediately
    (async () => {
      try {
        const img = await loadImage(getPath(1));
        if (disposed) return;
        images[0] = img;
        currentFrame = 0;
        draw(0);

        // Phase 2 — load frames 1-59 (critical batch)
        for (let i = 1; i < CRITICAL_BATCH; i++) {
          if (disposed) return;
          try {
            images[i] = await loadImage(getPath(i + 1));
          } catch { /* skip */ }
        }

        // Unlock scroll after critical frames are loaded
        scrollReady = true;

        // Phase 3 — load remaining frames during idle time
        const loadRest = async () => {
          for (let i = CRITICAL_BATCH; i < TOTAL_FRAMES; i++) {
            if (disposed) return;
            try {
              images[i] = await loadImage(getPath(i + 1));
            } catch { /* skip */ }
          }
        };
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadRest(), { timeout: 2000 });
        } else {
          setTimeout(() => loadRest(), 200);
        }
      } catch { /* skip */ }
    })();

    return () => {
      disposed = true;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div style={{ height: `${TOTAL_FRAMES * 12}px`, position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}
