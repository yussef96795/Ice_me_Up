'use client';

import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 1440;
const CRITICAL_BATCH = 30;
const WINDOW = 15;
const LOOKAHEAD = 5;
const getPath = (i: number) =>
  `/frames/webp/frame_${String(i).padStart(4, '0')}.webp`;

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

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext('2d', { alpha: false })!;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);

    function draw(idx: number) {
      if (idx === lastRendered) return;
      const img = images[idx];
      if (!img?.complete || img.naturalWidth === 0) return;
      lastRendered = idx;

      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (W - w) / 2;
      const y = (H - h) / 2;

      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(img, Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));

      for (let n = 1; n <= LOOKAHEAD; n++) {
        const next = images[idx + n];
        if (next && !next.complete) next.decode().catch(() => {});
      }
    }

    function onScroll() {
      if (!scrollReady || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        try {
          const total = document.documentElement.scrollHeight - window.innerHeight;
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
        } finally {
          ticking = false;
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    (async () => {
      try {
        const img = await loadImage(getPath(1));
        if (disposed) return;
        images[0] = img;
        currentFrame = 0;
        draw(0);

        for (let i = 1; i < CRITICAL_BATCH; i++) {
          if (disposed) return;
          try {
            images[i] = await loadImage(getPath(i + 1));
          } catch { /* skip */ }
        }

        scrollReady = true;

        const total = document.documentElement.scrollHeight - H;
        if (total > 0 && window.scrollY > 0) {
          const idx = Math.min(
            Math.floor((window.scrollY / total) * TOTAL_FRAMES),
            TOTAL_FRAMES - 1
          );
          if (idx > 0 && idx !== currentFrame) {
            if (!images[idx]?.complete) {
              try { images[idx] = await loadImage(getPath(idx + 1)); } catch {}
            }
            if (images[idx]?.complete) {
              currentFrame = idx;
              draw(idx);
            }
          }
        }

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
