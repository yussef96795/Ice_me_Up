'use client';

import React, { useState, useEffect } from 'react';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import { GlassCloseButton } from '@/components/ui/glass-close-button';
import AnimatedContent from '@/components/ui/AnimatedContent';
import OptionWheel from '@/components/ui/OptionWheel';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const locations = [
  { name: 'Bardo', image: '/places/bardo.png', mapUrl: 'https://www.google.com/maps/place/Ice+me+up+Le+Bardo/data=!4m2!3m1!1s0x0:0x249abc6f6bd3f60d?sa=X&ved=1t:2428&ictx=111' },
  { name: 'Jardins de Carthage', image: '/places/jardins-de-carthage.png', mapUrl: 'https://www.google.com/maps/place/Ice+me+Up+les+Jardins+de+Carthage/data=!4m2!3m1!1s0x0:0x3c56a68f85f635f5?sa=X&ved=1t:2428&ictx=111' },
  { name: 'Marsa', image: '/places/marsa.png', mapUrl: 'https://www.google.com/maps/place/Ice+me+up+la+Marsa/data=!4m2!3m1!1s0x0:0xcb974b7f04f5b147?sa=X&ved=1t:2428&ictx=111' },
  { name: 'Menzah 5', image: '/places/menzah-5.png', mapUrl: 'https://www.google.com/maps/place/Ice+me+up+El+Menzah+5/data=!4m2!3m1!1s0x0:0x770fc0fcd7507ac8?sa=X&ved=1t:2428&ictx=111' },
  { name: 'Mourouj 6', image: '/places/mourouj-6.png', mapUrl: 'https://www.google.com/maps/place/Ice+me+up+El+Mourouj+6/data=!4m2!3m1!1s0x0:0xa6e3238a79f38373?sa=X&ved=1t:2428&ictx=111' },
];

interface LocationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationOverlay({ isOpen, onClose }: LocationOverlayProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 767 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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
        src="/frames/webp/frame_0001.webp"
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
      <GlassCloseButton onClick={onClose} variant="close" className="location-close-btn" />

      {/* Title */}
      <div style={{ position: 'absolute', top: isMobile ? 28 : 45, left: 0, right: 0, textAlign: 'center', zIndex: 10, paddingTop: 'env(safe-area-inset-top, 0px)' }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: isMobile ? 28 : 40,
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
          <div style={{ width: '100vw', height: isMobile ? '55vh' : '70vh', position: 'relative' }}>
            <OptionWheel
              items={locations.map(l => l.name)}
              defaultSelected={2}
              onChange={(idx) => setSelectedIdx(idx)}
              textColor="#555555"
              activeColor="#ffffff"
              side="center"
              fontSize={isMobile ? 2.2 : 3.5}
              spacing={isMobile ? 1.2 : 1.5}
              curve={0}
              tilt={0}
              blur={2.5}
              fade={0.4}
              minOpacity={0.08}
              smoothing={200}
              inset={isMobile ? 20 : 0}
              loop={false}
              draggable
              itemLinks={locations.map(l => l.mapUrl)}
            />
          </div>
        </AnimatedContent>
      </div>

      <style>{`
        @keyframes locationOverlayIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 767px) {
          .location-close-btn {
            top: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
