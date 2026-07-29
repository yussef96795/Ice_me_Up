'use client';

import React, { useEffect, useState } from 'react';
import { DM_Sans, Cinzel } from 'next/font/google';
import { GlassCloseButton } from '@/components/ui/glass-close-button';
import PastryMasonry from '@/components/PastryMasonry';
import PastryGallery from './PastryGallery';
import CrepeSaleeGallery from './CrepeSaleeGallery';
import CrepeSucreeGallery from './CrepeSucreeGallery';
import PancakeGallery from './PancakeGallery';
import GateauxGallery from './GateauxGallery';
import GauffreGallery from './GauffreGallery';
import PaniniGallery from './PaniniGallery';
import CroqueGallery from './CroqueGallery';

const dmSans = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const cinzel = Cinzel({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cinzel',
});

interface PastryMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type PastryView = 'masonry' | 'gallery' | 'crepe-salee' | 'crepe-sucree' | 'pancake' | 'gateaux' | 'gauffre' | 'panini' | 'croque';

export default function PastryMenu({ isOpen, onClose }: PastryMenuProps) {
  const [view, setView] = useState<PastryView>('masonry');

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

  useEffect(() => {
    if (!isOpen) setView('masonry');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`${dmSans.variable} ${cinzel.variable}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        animation: 'pastryMenuIn 0.4s ease both',
      }}
    >
      {/* Background image */}
      <img
        src="/gelato-interior.jpg"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          filter: 'blur(3px) brightness(0.55)',
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      {/* Close button */}
      <GlassCloseButton onClick={onClose} variant="close" />

      {/* Back arrow (gallery only) */}
      {view !== 'masonry' && (
        <GlassCloseButton onClick={() => setView('masonry')} variant="back" />
      )}

      {/* Title */}
      <div style={{ position: 'absolute', top: 45, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <span
          key={view}
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontStyle: 'italic',
            fontSize: 40,
            color: '#ffffff',
            fontWeight: 400,
            animation: 'pastryMenuIn 0.4s ease both',
          }}
        >
          {view === 'crepe-salee' ? 'Crêpes Salées' : view === 'crepe-sucree' ? 'Crêpes Sucrées' : view === 'pancake' ? 'Pancakes' : view === 'gateaux' ? 'Gâteaux' : view === 'gauffre' ? 'Gaufres' : view === 'panini' ? 'Paninis' : view === 'croque' ? 'Croques-Monsieur' : view === 'gallery' ? 'Nos Pâtisseries' : 'Notre Carte'}
        </span>
      </div>

      {/* Content Area */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          overflowY: view !== 'masonry' ? 'hidden' : 'auto',
          overflowX: 'hidden',
          padding: view !== 'masonry' ? '0' : '0 40px 40px',
          display: 'flex',
          justifyContent: 'center',
          scrollbarWidth: 'none',
        }}
      >
        {view === 'gallery' ? (
          <PastryGallery />
        ) : view === 'crepe-salee' ? (
          <CrepeSaleeGallery />
        ) : view === 'crepe-sucree' ? (
          <CrepeSucreeGallery />
        ) : view === 'pancake' ? (
          <PancakeGallery />
        ) : view === 'gateaux' ? (
          <GateauxGallery />
        ) : view === 'gauffre' ? (
          <GauffreGallery />
        ) : view === 'panini' ? (
          <PaniniGallery />
        ) : view === 'croque' ? (
          <CroqueGallery />
        ) : (
          <PastryMasonry onItemClick={(item) => {
            if (item.title === 'Crêpes Salées') setView('crepe-salee');
            else if (item.title === 'Crêpes Sucrées') setView('crepe-sucree');
            else if (item.title === 'Pancakes') setView('pancake');
            else if (item.title === 'Gâteaux') setView('gateaux');
            else if (item.title === 'Gaufres') setView('gauffre');
            else if (item.title === 'Paninis') setView('panini');
            else if (item.title === 'Croques-Monsieur') setView('croque');
            else setView('gallery');
          }} />
        )}
      </div>

      <style>{`
        @keyframes pastryMenuIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
