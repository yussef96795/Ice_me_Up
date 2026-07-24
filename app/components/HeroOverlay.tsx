'use client';

import React, { useEffect } from 'react';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';
import FadeContent from './FadeContent';
import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
import { lerp } from './lerp';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 476;
const INTERIOR_FADE_START = 300;
const INTERIOR_FADE_END = 380;

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

export default function HeroOverlay({ onOpenMenu, onOpenLocations }: { onOpenMenu?: () => void; onOpenLocations?: () => void }) {
  useEffect(() => {
    const interiorCopy = document.querySelector<HTMLElement>('[data-interior-copy]');
    if (!interiorCopy) return;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * TOTAL_FRAMES);

        const interiorOpacity = lerp(frame, INTERIOR_FADE_START, INTERIOR_FADE_END, 0, 1);
        interiorCopy.style.opacity = String(interiorOpacity);
        interiorCopy.style.pointerEvents = interiorOpacity > 0.1 ? 'auto' : 'none';
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        pointerEvents: 'none',
      }}
      className={`${dmSerif.variable} ${dmSans.variable}`}
    >
      {/* Top vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 160,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Left scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0) 75%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ─── Navigation ─── */}
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          padding: '0 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: 22,
            fontWeight: 400,
            color: '#ffffff',
            letterSpacing: '-0.3px',
            lineHeight: 1,
          }}
        >
          ice me up
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <LiquidGlassButton
            as="a"
            href="#menu"
            className="hero-nav-link"
            tintColor="rgba(255, 255, 255, 0.08)"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              lineHeight: 1,
              padding: '8px 16px',
              borderRadius: 100,
            }}
          >
            Menu
          </LiquidGlassButton>
          <LiquidGlassButton
            as="a"
            href="#about"
            className="hero-nav-link"
            tintColor="rgba(255, 255, 255, 0.08)"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              lineHeight: 1,
              padding: '8px 16px',
              borderRadius: 100,
            }}
          >
            About
          </LiquidGlassButton>
          <LiquidGlassButton
            className="hero-nav-link"
            tintColor="rgba(255, 255, 255, 0.08)"
            onClick={onOpenLocations}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              lineHeight: 1,
              padding: '8px 16px',
              borderRadius: 100,
            }}
          >
            Locations
          </LiquidGlassButton>
          <LiquidGlassButton
            className="hero-order-btn"
            tintColor="rgba(255, 255, 255, 0.2)"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 14,
              fontWeight: 600,
              color: '#1a1a1a',
              borderRadius: 100,
              padding: '11px 24px',
              lineHeight: 1,
            }}
          >
            Order Now
          </LiquidGlassButton>
        </div>
      </nav>

      {/* ─── Hero Copy ─── */}
      <div
        data-hero-copy
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '0 56px 0',
          paddingTop: 180,
          maxWidth: 520,
          zIndex: 10,
          pointerEvents: 'auto',
        }}
        className="hero-copy"
      >
        <ScrollReveal
          reverse
          splitWords={false}
          scrollDistance={400}
          enableBlur={false}
          baseOpacity={0}
          baseRotation={0}
          containerClassName="hero-eyebrow"
          textClassName="hero-eyebrow-text"
        >
          HANDCRAFTED · SMALL BATCH
        </ScrollReveal>

        <div className="hero-headline">
          <ScrollReveal
            as="div"
            reverse
            scrollDistance={500}
            enableBlur={false}
            baseOpacity={0}
            baseRotation={1}
            containerClassName="hero-headline-line"
            textClassName="hero-headline-word"
          >
            Scoops that make
          </ScrollReveal>
          <ScrollReveal
            as="div"
            reverse
            scrollDistance={500}
            enableBlur={false}
            baseOpacity={0}
            baseRotation={1}
            containerClassName="hero-headline-line hero-headline-italic"
            textClassName="hero-headline-word"
          >
            every day sweeter
          </ScrollReveal>
        </div>

        <ScrollReveal
          reverse
          scrollDistance={600}
          enableBlur
          baseOpacity={0.1}
          baseRotation={2}
          blurStrength={3}
          containerClassName="hero-subheading"
          textClassName="hero-subheading-text"
        >
          Fresh flavors, real ingredients, and a little bit of joy in every cup. Come find your new favorite.
        </ScrollReveal>

        <FadeContent
          reverse
          blur
          scrollDistance={500}
          initialOpacity={0}
          className="hero-cta-wrapper"
        >
          <LiquidGlassButton
            tintColor="rgba(124, 191, 138, 0.25)"
            className="hero-cta-btn"
            onClick={onOpenLocations}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 15,
              fontWeight: 600,
              color: '#ffffff',
              borderRadius: 100,
              padding: '14px 32px',
              letterSpacing: 0.2,
              lineHeight: 1,
            }}
          >
            Find a Location
          </LiquidGlassButton>
        </FadeContent>
      </div>

      {/* ─── Interior Copy ─── */}
      <div
        data-interior-copy
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        {/* Bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Text content — bottom left */}
        <div
          className="interior-copy-content"
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            maxWidth: 600,
            pointerEvents: 'auto',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.4,
              marginBottom: 28,
            }}
          >
            Handcrafted Italian gelato, made fresh daily in the heart of the city.
          </p>

          <LiquidGlassButton
            as="button"
            tintColor="rgba(180, 160, 220, 0.25)"
            onClick={onOpenMenu}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 16,
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: 3,
              textTransform: 'uppercase' as const,
              padding: '20px 56px',
              borderRadius: 100,
              marginBottom: 20,
              cursor: 'pointer',
            }}
          >
            VIEW OUR MENU
          </LiquidGlassButton>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: 15,
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: 0.5,
              lineHeight: 1,
            }}
          >
            16 flavours · daily rotation
          </p>
        </div>
      </div>

      <style>{`
        .hero-eyebrow {
          margin: 0 0 16px 0;
        }
        .hero-eyebrow-text {
          font-family: var(--font-dm-sans);
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
          line-height: 1;
        }

        .hero-headline {
          margin-bottom: 20px;
        }
        .hero-headline-line {
          margin: 0;
        }
        .hero-headline-word {
          font-family: var(--font-dm-serif);
          font-size: clamp(36px, 4vw, 64px);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.08;
          letter-spacing: -1px;
          white-space: nowrap;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3);
        }
        .hero-headline-italic .hero-headline-word {
          font-style: italic;
        }

        .hero-subheading {
          margin: 0 0 36px 0;
        }
        .hero-subheading-text {
          font-family: var(--font-dm-sans);
          font-size: 18px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.55;
          max-width: 400px;
          text-shadow: 0 1px 3px rgba(0,0,0,0.35);
        }

        .hero-cta-wrapper {
          width: fit-content;
        }

        @media (max-width: 767px) {
          nav {
            padding: 0 20px !important;
          }
          .hero-nav-link {
            display: none !important;
          }
          .hero-copy {
            left: 24px !important;
            padding-bottom: 80px !important;
          }
          .hero-headline-word {
            font-size: clamp(28px, 6vw, 42px) !important;
          }
          .hero-subheading-text {
            font-size: 16px !important;
            max-width: 320px !important;
          }
          .interior-copy-content {
            left: 24px !important;
            right: 24px !important;
            bottom: 60px !important;
          }
        }
      `}</style>
    </div>
  );
}
