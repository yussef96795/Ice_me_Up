'use client';

import React, { useEffect, useState } from 'react';
import { DM_Sans, Cinzel } from 'next/font/google';
import { GlassCloseButton } from '@/components/ui/glass-close-button';
import DrinksMasonry, { MasonryItem } from '@/components/DrinksMasonry';
import FlowingMenu from './FlowingMenu/FlowingMenu';
import TeaGallery from './TeaGallery';
import MilkshakeGallery from './MilkshakeGallery';
import SmoothieGallery from './SmoothieGallery';
import BoissonsGallery from './BoissonsGallery';
import JusGallery from './JusGallery';
import BoissonsChaudesGallery from './BoissonsChaudesGallery';
import MojitoGallery from './MojitoGallery';
import MatchaGallery from './MatchaGallery';
import MacchiatoGallery from './MacchiatoGallery';
import FrappuccinoGallery from './FrappuccinoGallery';
import AffogatoGallery from './AffogatoGallery';
import IcedCoffeeGallery from './IcedCoffeeGallery';
import CafesGallery from './CafesGallery';

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

interface DrinksMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type DrinkView = 'masonry' | 'hot-iced-tea' | 'milkshake' | 'smoothie' | 'boissons' | 'jus' | 'boissons-chaudes' | 'mojito' | 'matcha' | 'macchiato' | 'frappuccino' | 'affogato' | 'iced-coffee' | 'cafes' | 'tea';

const hotIcedItems = [
  { link: '#', text: 'Hot', marqueeText: 'HOT' },
  { link: '#', text: 'Iced', marqueeText: 'ICED' },
];

export default function DrinksMenu({ isOpen, onClose }: DrinksMenuProps) {
  const [view, setView] = useState<DrinkView>('masonry');
  const [teaType, setTeaType] = useState<'hot' | 'iced'>('hot');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (view === 'tea') setView('hot-iced-tea');
        else if (view !== 'masonry') setView('masonry');
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, view]);

  useEffect(() => {
    if (!isOpen) { setView('masonry'); setTitle(''); }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  if (!isOpen) return null;

  const displayTitle =
    view === 'tea' ? (teaType === 'hot' ? 'Thés Chauds' : 'Thés Glacés') :
    view === 'hot-iced-tea' ? 'Hot / Iced Tea' :
    view === 'milkshake' ? 'Milkshake' :
    view === 'smoothie' ? 'Smoothie' :
    view === 'boissons' ? 'Boissons' :
    view === 'jus' ? 'Jus' :
    view === 'boissons-chaudes' ? 'Boissons Chaudes' :
    view === 'mojito' ? 'Mojito' :
    view === 'matcha' ? 'Matcha' :
    view === 'macchiato' ? 'Macchiato' :
    view === 'frappuccino' ? 'Frappuccino' :
    view === 'affogato' ? 'Affogato' :
    view === 'iced-coffee' ? 'Iced Coffee' :
    view === 'cafes' ? 'Cafés' :
    'Notre Carte';

  const showBack = view !== 'masonry';

  return (
    <div
      className={`${dmSans.variable} ${cinzel.variable}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        animation: 'drinksMenuIn 0.4s ease both',
      }}
    >
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

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      />

      <GlassCloseButton onClick={onClose} variant="close" />

      {showBack && (
        <GlassCloseButton
          onClick={() => {
            if (view === 'tea') setView('hot-iced-tea');
            else setView('masonry');
          }}
          variant="back"
        />
      )}

      <div style={{ position: 'absolute', top: 45, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <span
          key={view + teaType}
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontStyle: 'italic',
            fontSize: 40,
            color: '#ffffff',
            fontWeight: 400,
            animation: 'drinksMenuIn 0.4s ease both',
          }}
        >
          {displayTitle}
        </span>
      </div>

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
        {view === 'milkshake' ? <MilkshakeGallery /> :
        view === 'smoothie' ? <SmoothieGallery /> :
        view === 'boissons' ? <BoissonsGallery /> :
        view === 'jus' ? <JusGallery /> :
        view === 'boissons-chaudes' ? <BoissonsChaudesGallery /> :
        view === 'mojito' ? <MojitoGallery /> :
        view === 'matcha' ? <MatchaGallery /> :
        view === 'macchiato' ? <MacchiatoGallery /> :
        view === 'frappuccino' ? <FrappuccinoGallery /> :
        view === 'affogato' ? <AffogatoGallery /> :
        view === 'iced-coffee' ? <IcedCoffeeGallery /> :
        view === 'cafes' ? <CafesGallery /> :
        view === 'tea' ? <TeaGallery type={teaType} /> :
        view === 'hot-iced-tea' ? (
          <FlowingMenu
            items={hotIcedItems}
            textColor="#ffffff"
            bgColor="transparent"
            marqueeBgColor="rgba(255, 255, 255, 0.95)"
            marqueeTextColor="#120F17"
            borderColor="rgba(255, 255, 255, 0.2)"
            onItemClick={(item) => {
              setTeaType(item.text.toLowerCase() as 'hot' | 'iced');
              setView('tea');
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '0 40px 40px',
              display: 'flex',
              justifyContent: 'center',
              scrollbarWidth: 'none',
            }}
          >
            <DrinksMasonry onItemClick={(item: MasonryItem) => {
              switch (item.title) {
                case 'Hot/Iced Tea': setView('hot-iced-tea'); break;
                case 'Milkshake': setView('milkshake'); break;
                case 'Smoothie': setView('smoothie'); break;
                case 'Boissons': setView('boissons'); break;
                case 'Jus': setView('jus'); break;
                case 'Boissons Chaudes': setView('boissons-chaudes'); break;
                case 'Mojito': setView('mojito'); break;
                case 'Matcha': setView('matcha'); break;
                case 'Macchiato': setView('macchiato'); break;
                case 'Frappuccino': setView('frappuccino'); break;
                case 'Affogato': setView('affogato'); break;
                case 'Iced Coffee': setView('iced-coffee'); break;
                case 'Cafés': setView('cafes'); break;
                default: setView('masonry');
              }
            }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes drinksMenuIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
