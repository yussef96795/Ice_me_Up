'use client';

import React, { useEffect, useState } from 'react';
import { DM_Sans, Cinzel } from 'next/font/google';
import { GlassCloseButton } from '@/components/ui/glass-close-button';
import FlowingMenu from './FlowingMenu/FlowingMenu';
import NosSpecialites from './NosSpecialites';
import YaourtsGallery from './YaourtsGallery';
import ComposezGallery from '@/components/ComposezGallery';
import NosCoupes from './NosCoupes';

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

const gelatoItems = [
  { link: '#', text: 'Composez votre coupe' },
  { link: '#', text: 'Nos specialites' },
  { link: '#', text: 'Yaourts glacees' },
  { link: '#', text: 'Nos coupes' },
];

const composezItems = [
  { link: '#', text: '1 Boule', marqueeText: '1 BOULE — 7DT' },
  { link: '#', text: '2 Boules', marqueeText: '2 BOULES — 10DT' },
  { link: '#', text: '3 Boules', marqueeText: '3 BOULES — 13DT' },
];

const yaourtsItems = [
  { link: '#', text: 'Moyen', marqueeText: 'MOYEN — 6DT' },
  { link: '#', text: 'Large', marqueeText: 'LARGE — 9DT' },
];

function getToppingItems(basePrice: number) {
  return [
    { link: '#', text: '0 Toppings', marqueeText: `0 TOPPINGS — ${basePrice}DT` },
    { link: '#', text: '1 Topping', marqueeText: `1 TOPPING — ${basePrice + 4}DT` },
    { link: '#', text: '2 Toppings', marqueeText: `2 TOPPINGS — ${basePrice + 7}DT` },
  ];
}

interface GelatoMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GelatoMenu({ isOpen, onClose }: GelatoMenuProps) {
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [selectedTopping, setSelectedTopping] = useState<number | null>(null);
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
    if (!isOpen) {
      setActiveSubMenu(null);
      setSelectedPrice(null);
      setSelectedTopping(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const inToppings = activeSubMenu !== null && selectedPrice !== null;

  const currentItems = inToppings
    ? getToppingItems(selectedPrice)
    : activeSubMenu === 'composez'
      ? composezItems
      : activeSubMenu === 'yaourts'
        ? yaourtsItems
        : activeSubMenu === 'specialites'
          ? []
          : gelatoItems;

  const currentTitle = inToppings && selectedTopping === null
    ? 'Extras'
      : activeSubMenu === 'composez'
        ? selectedTopping !== null
          ? 'Choisissez votre goût'
          : 'Composez votre coupe'
      : activeSubMenu === 'yaourts'
        ? selectedTopping !== null
          ? 'Nos Yaourts'
          : 'Yaourts Glacés'
        : activeSubMenu === 'specialites'
          ? 'Nos Spécialités'
        : activeSubMenu === 'coupes'
          ? 'Nos Coupes'
          : 'Notre Carte';

  const showBack = activeSubMenu !== null;

  return (
    <div
      className={`${dmSans.variable} ${cinzel.variable}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        animation: 'gelatoMenuIn 0.4s ease both',
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

      {/* Back arrow (sub-menu only) */}
      {showBack && (
        <GlassCloseButton
          onClick={() => {
            if (selectedTopping !== null) setSelectedTopping(null);
            else if (selectedPrice) setSelectedPrice(null);
            else setActiveSubMenu(null);
          }}
          variant="back"
        />
      )}

      {/* Title */}
      <div style={{ position: 'absolute', top: 45, left: 0, right: 0, textAlign: 'center', zIndex: 10 }}>
        <span
          key={currentTitle}
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontStyle: 'italic',
            fontSize: 40,
            color: '#ffffff',
            fontWeight: 400,
            animation: 'gelatoMenuIn 0.4s ease both',
          }}
        >
          {currentTitle}
        </span>
      </div>

      {/* FlowingMenu */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
        }}
      >
        {activeSubMenu === 'specialites' ? (
          <NosSpecialites />
        ) : activeSubMenu === 'coupes' ? (
          <NosCoupes />
        ) : activeSubMenu === 'yaourts' && selectedTopping !== null && selectedPrice !== null ? (
          <YaourtsGallery toppings={selectedTopping} basePrice={selectedPrice} />
        ) : activeSubMenu === 'composez' && selectedTopping !== null ? (
          <ComposezGallery />
        ) : activeSubMenu ? (
          <FlowingMenu
            key={inToppings ? `toppings-${selectedPrice}` : activeSubMenu}
            items={currentItems}
            textColor="#ffffff"
            bgColor="transparent"
            marqueeBgColor="rgba(255, 255, 255, 0.95)"
            marqueeTextColor="#120F17"
            borderColor="rgba(255, 255, 255, 0.2)"
            onItemClick={inToppings ? (item) => {
              const count = item.text.startsWith('0') ? 0 : item.text.startsWith('1') ? 1 : 2;
              if (activeSubMenu === 'yaourts' || activeSubMenu === 'composez') setSelectedTopping(count);
            } : (item) => {
              if (item.text === '1 Boule') setSelectedPrice(7);
              else if (item.text === '2 Boules') setSelectedPrice(10);
              else if (item.text === '3 Boules') setSelectedPrice(13);
              else if (item.text === 'Moyen') setSelectedPrice(6);
              else if (item.text === 'Large') setSelectedPrice(9);
            }}
          />
        ) : (
          <FlowingMenu
            items={gelatoItems}
            textColor="#ffffff"
            bgColor="transparent"
            marqueeBgColor="rgba(255, 255, 255, 0.95)"
            marqueeTextColor="#120F17"
            borderColor="rgba(255, 255, 255, 0.2)"
            onItemClick={(item) => {
              if (item.text === 'Composez votre coupe') {
                setActiveSubMenu('composez');
              } else if (item.text === 'Yaourts glacees') {
                setActiveSubMenu('yaourts');
              } else if (item.text === 'Nos specialites') {
                setActiveSubMenu('specialites');
              } else if (item.text === 'Nos coupes') {
                setActiveSubMenu('coupes');
              }
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes gelatoMenuIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}