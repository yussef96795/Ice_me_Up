'use client';

import React, { useState, useEffect } from 'react';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import AnimatedContent from '@/components/ui/AnimatedContent';
import OptionWheel from '@/components/ui/OptionWheel';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const locations = [
  { name: 'Bardo', image: '/places/bardo.png' },
  { name: 'Jardins de Carthage', image: '/places/jardins-de-carthage.png' },
  { name: 'Marsa', image: '/places/marsa.png' },
  { name: 'Menzah 5', image: '/places/menzah-5.png' },
  { name: 'Mourouj 6', image: '/places/mourouj-6.png' },
];

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationOverlay({ isOpen, onClose }: LocationOverlayProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  const selected = locations[selectedIdx];

  return (
    <div
      className={`${dmSerif.variable} ${dmSans.variable}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        animation: 'locationOverlayIn 0.4s ease both',
      }}
    >
      {/* Background image — always frame_0001, never changes */}
      <img
        src="/frames/frame_0001.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          filter: 'blur(3px) brightness(0.35)',
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="location-close-btn"
        style={{
          position: 'absolute',
          top: 32,
          right: 40,
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: 52,
          height: 52,
          cursor: 'pointer',
          color: '#fff',
          fontSize: 20,
          fontWeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
          transition: 'background 0.2s ease',
        }}
      >
        ×
      </button>

      {/* Title */}
      <div style={{ position: 'absolute', top: 45, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <span
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontStyle: 'italic',
            fontSize: 40,
            color: '#ffffff',
            fontWeight: 400,
          }}
        >
          Find Us
        </span>
      </div>

      {/* Wheel area */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <AnimatedContent
          distance={80}
          direction="vertical"
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          delay={0.1}
        >
          <div style={{ width: '100vw', height: '70vh', position: 'relative' }}>
            <OptionWheel
              items={locations.map(l => l.name)}
              defaultSelected={2}
              onChange={(idx) => setSelectedIdx(idx)}
              textColor="#555555"
              activeColor="#ffffff"
              side="center"
              fontSize={3.5}
              spacing={1.5}
              curve={0}
              tilt={0}
              blur={2.5}
              fade={0.4}
              minOpacity={0.08}
              smoothing={200}
              inset={0}
              loop={false}
              draggable
              marqueeImage={selected.image}
              marqueeSpeed={25}
              selectedBgColor="#ffffff"
              selectedTextColor="#000000"
            />
          </div>
        </AnimatedContent>
      </div>

      <style>{`
        @keyframes locationOverlayIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .location-close-btn:hover {
          background: rgba(255, 255, 255, 0.25) !important;
        }
      `}</style>
    </div>
  );
}
