'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import BorderGlow from '@/components/ui/BorderGlow';

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

const flavours = [
  { name: 'Chocolate', italian: 'CIOCCOLATO', image: '/flavors/chocolate-1.jpg', description: 'Single-origin dark chocolate from Ecuador. Deep, bittersweet, and unapologetically intense.', colors: ['#8B4513', '#D2691E', '#A0522D'], glowColor: '30 70 50' },
  { name: 'Strawberry', italian: 'FRAGOLA', image: '/flavors/chocolate-2.jpg', description: 'Sun-ripened strawberries at peak season. Bright, fruity, and naturally sweet.', colors: ['#FF6B9D', '#FF1493', '#FFB6C1'], glowColor: '340 100 70' },
  { name: 'Vanilla', italian: 'VANIGLIA', image: '/flavors/chocolate-3.jpg', description: 'Madagascar vanilla beans steeped overnight in fresh cream. Classic, floral, and deeply comforting.', colors: ['#FFF8DC', '#FAEBD7', '#FFEFD5'], glowColor: '38 100 90' },
  { name: 'Pistachio', italian: 'PISTACCHIO', image: '/flavors/chocolate-4.jpg', description: 'Sicilian pistachios, slow-roasted and ground into a rich green paste. Nutty, slightly sweet, unmistakably Italian.', colors: ['#93C572', '#6B8E23', '#8FBC8F'], glowColor: '100 50 45' },
];

interface FlavourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FlavourModal({ isOpen, onClose }: FlavourModalProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);

  // Keyboard
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') swiperRef.current?.slideNext();
      if (e.key === 'ArrowLeft') swiperRef.current?.slidePrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) swiperRef.current?.slideNext();
      else swiperRef.current?.slidePrev();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`${dmSerif.variable} ${dmSans.variable}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        animation: 'flavourModalIn 0.4s ease both',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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
      <button
        onClick={onClose}
        className="flavour-close-btn"
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
          Our Flavours
        </span>
      </div>

      {/* Carousel area */}
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
        {/* Custom glass arrows */}
        <button
          className="flavour-prev"
          style={{
            position: 'absolute',
            left: 40,
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: 52,
            height: 52,
            cursor: 'pointer',
            color: '#fff',
            fontSize: 18,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            zIndex: 20,
          }}
        >
          ‹
        </button>

        {/* Swiper */}
        <div style={{ width: '100%', maxWidth: 900, padding: '0 60px' }}>
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={2.43}
            loop
            spaceBetween={40}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.flavour-next',
              prevEl: '.flavour-prev',
            }}
            pagination={{
              clickable: true,
              el: '.flavour-pagination',
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            style={{ padding: '20px 0 60px' }}
          >
            {flavours.map((flavour, i) => (
              <SwiperSlide key={i}>
                <BorderGlow
                  animated
                  glowColor={flavour.glowColor}
                  backgroundColor="rgba(0,0,0,0.6)"
                  borderRadius={20}
                  glowRadius={75}
                  glowIntensity={3}
                  coneSpread={25}
                  colors={flavour.colors}
                >
                  <div style={{ padding: 0 }}>
                    <img
                      src={flavour.image}
                      alt={flavour.name}
                      style={{
                        width: '100%',
                        height: 300,
                        objectFit: 'cover',
                        borderRadius: 12,
                        marginBottom: 20,
                      }}
                    />
                    <h2
                      style={{
                        fontFamily: 'var(--font-dm-serif)',
                        fontSize: 32,
                        color: '#fff',
                        fontWeight: 400,
                        margin: '0 0 6px',
                      }}
                    >
                      {flavour.name}
                    </h2>
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 11,
                        color: 'rgba(255, 245, 225, 0.6)',
                        textTransform: 'uppercase',
                        letterSpacing: 4,
                        fontWeight: 500,
                        margin: '0 0 12px',
                      }}
                    >
                      {flavour.italian}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-dm-sans)',
                        fontSize: 14,
                        color: 'rgba(255, 245, 225, 0.8)',
                        lineHeight: 1.6,
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {flavour.description}
                    </p>
                  </div>
                </BorderGlow>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper pagination */}
          <div className="flavour-pagination" style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }} />
        </div>

        {/* Right arrow */}
        <button
          className="flavour-next"
          style={{
            position: 'absolute',
            right: 40,
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: 52,
            height: 52,
            cursor: 'pointer',
            color: '#fff',
            fontSize: 18,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
            zIndex: 20,
          }}
        >
          ›
        </button>
      </div>

      <style>{`
        @keyframes flavourModalIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes borderGlowIdle {
          0%   { --edge-proximity: 100; }
          50%  { --edge-proximity: 92; }
          100% { --edge-proximity: 100; }
        }
        .border-glow-card:not(:hover):not(.sweep-active) {
          animation: borderGlowIdle 4s ease-in-out infinite;
        }

        .flavour-close-btn:hover,
        .flavour-prev:hover,
        .flavour-next:hover {
          background: rgba(255, 255, 255, 0.25) !important;
        }

        .flavour-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          width: 8px;
          height: 8px;
          transition: all 0.25s ease;
        }
        .flavour-pagination .swiper-pagination-bullet-active {
          background: #ffffff;
          width: 28px;
          border-radius: 4px;
        }

        .swiper-slide {
          transition: transform 0.3s ease;
        }

        @media (max-width: 767px) {
          .flavour-prev { left: 16px !important; }
          .flavour-next { right: 16px !important; }
        }
      `}</style>
    </div>
  );
}
