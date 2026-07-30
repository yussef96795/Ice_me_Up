'use client';

import React, { useEffect } from 'react';
import { DM_Serif_Display, DM_Sans } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from './ScrollReveal';

import { LiquidGlassButton } from '@/components/ui/liquid-glass-button';
import { lerp } from './lerp';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 1440;
const INTERIOR_FADE_START = 396;
const INTERIOR_FADE_END = 476;
const INTERIOR_DISAPPEAR = 500;
const INTERIOR2_FADE_START = 916;
const INTERIOR2_FADE_END = 996;
const INTERIOR2_DISAPPEAR = 1020;
const INTERIOR3_FADE_START = 1360;
const INTERIOR3_FADE_END = 1440;

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

export default function HeroOverlay({ onOpenMenu, onOpenLocations, onOpenGelato, onOpenDrinks }: { onOpenMenu?: () => void; onOpenLocations?: () => void; onOpenGelato?: () => void; onOpenDrinks?: () => void }) {
  const scrollToFrame = (frame: number) => {
    const totalScroll = TOTAL_FRAMES * 12;
    const vh = window.innerHeight;
    const target = (frame / TOTAL_FRAMES) * (totalScroll - vh);
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  useEffect(() => {
    const interiorCopy = document.querySelector<HTMLElement>('[data-interior-copy]');
    const interiorCopy2 = document.querySelector<HTMLElement>('[data-interior-copy-2]');
    const interiorCopy3 = document.querySelector<HTMLElement>('[data-interior-copy-3]');
    const heroCopy = document.querySelector<HTMLElement>('[data-hero-copy]');
    if (!interiorCopy || !interiorCopy2 || !interiorCopy3) return;

    const applyFrame = (frame: number) => {
      const fadeIn = lerp(frame, INTERIOR_FADE_START, INTERIOR_FADE_END, 0, 1);
      const fadeOut = lerp(frame, INTERIOR_FADE_END, INTERIOR_DISAPPEAR, 1, 0);
      const interiorOpacity = Math.min(fadeIn, fadeOut);
      interiorCopy.style.opacity = String(interiorOpacity);
      interiorCopy.style.pointerEvents = interiorOpacity > 0.1 ? 'auto' : 'none';

      const fadeIn2 = lerp(frame, INTERIOR2_FADE_START, INTERIOR2_FADE_END, 0, 1);
      const fadeOut2 = lerp(frame, INTERIOR2_FADE_END, INTERIOR2_DISAPPEAR, 1, 0);
      const interior2Opacity = Math.min(fadeIn2, fadeOut2);
      interiorCopy2.style.opacity = String(interior2Opacity);
      interiorCopy2.style.pointerEvents = interior2Opacity > 0.1 ? 'auto' : 'none';

      const interior3Opacity = lerp(frame, INTERIOR3_FADE_START, INTERIOR3_FADE_END, 0, 1);
      interiorCopy3.style.opacity = String(interior3Opacity);
      interiorCopy3.style.pointerEvents = interior3Opacity > 0.1 ? 'auto' : 'none';

      if (heroCopy) {
        const anyInteriorActive = interiorOpacity > 0.1 || interior2Opacity > 0.1 || interior3Opacity > 0.1;
        heroCopy.style.pointerEvents = anyInteriorActive ? 'none' : 'auto';
      }
    };

    const total = document.documentElement.scrollHeight - window.innerHeight;
    const initProgress = total > 0 ? window.scrollY / total : 0;
    applyFrame(Math.floor(initProgress * TOTAL_FRAMES));

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        applyFrame(Math.floor(self.progress * TOTAL_FRAMES));
      },
    });

    ScrollTrigger.refresh();

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
          background: 'var(--gradient-vignette)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Left scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--gradient-scrim)',
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
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--color-text-primary)',
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
            className="hero-nav-link"
            tintColor="rgba(255, 255, 255, 0.08)"
            onClick={() => scrollToFrame(476)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              lineHeight: 1,
              padding: '8px 16px',
              borderRadius: 100,
            }}
          >
            Gelato
          </LiquidGlassButton>
          <LiquidGlassButton
            className="hero-nav-link"
            tintColor="rgba(255, 255, 255, 0.08)"
            onClick={() => scrollToFrame(996)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              lineHeight: 1,
              padding: '8px 16px',
              borderRadius: 100,
            }}
          >
            Pastry
          </LiquidGlassButton>
          <LiquidGlassButton
            className="hero-nav-link"
            tintColor="rgba(255, 255, 255, 0.08)"
            onClick={() => scrollToFrame(1440)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              lineHeight: 1,
              padding: '8px 16px',
              borderRadius: 100,
            }}
          >
            Drinks
          </LiquidGlassButton>
          <LiquidGlassButton
            className="hero-order-btn"
            tintColor="rgba(255, 255, 255, 0.2)"
            onClick={onOpenLocations}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              color: '#1a1a1a',
              borderRadius: 100,
              padding: '11px 24px',
              lineHeight: 1,
            }}
          >
            Locations
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

        <ScrollReveal
          reverse
          scrollDistance={500}
          splitWords={false}
          enableBlur
          containerClassName="hero-cta-wrapper"
        >
          <LiquidGlassButton
            tintColor="rgba(124, 191, 138, 0.25)"
            className="hero-cta-btn"
            onClick={onOpenLocations}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              borderRadius: 100,
              padding: '14px 32px',
              letterSpacing: 0.2,
              lineHeight: 1,
            }}
          >
            Find a Location
          </LiquidGlassButton>
        </ScrollReveal>
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
            background: 'var(--gradient-bottom)',
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
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
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
            onClick={onOpenGelato}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
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
            VIEW OUR GELATO
          </LiquidGlassButton>

        </div>
      </div>

      {/* ─── Interior Copy 2 (frame 996) ─── */}
      <div
        data-interior-copy-2
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'var(--gradient-bottom)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="interior-copy-content"
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            maxWidth: 600,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.4,
              marginBottom: 28,
            }}
          >
            Patisserie born from old recipes, baked slowly and with intention, one slice at a time.
          </p>

          <LiquidGlassButton
            as="button"
            tintColor="rgba(255, 247, 0, 0.25)"
            onClick={onOpenMenu}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
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
            VIEW OUR PASTRY
          </LiquidGlassButton>

        </div>
      </div>

      {/* ─── Interior Copy 3 (frame 1440) ─── */}
      <div
        data-interior-copy-3
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'var(--gradient-bottom)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="interior-copy-content"
          style={{
            position: 'absolute',
            bottom: 80,
            left: 80,
            maxWidth: 600,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 3vw, 36px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.4,
              marginBottom: 28,
            }}
          >
            Fresh, seasonal, and made to order — because the best drinks don't come from a bottle.
          </p>

          <LiquidGlassButton
            as="button"
            tintColor="rgba(255, 182, 193, 0.25)"
            onClick={onOpenDrinks}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
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
            VIEW OUR DRINKS
          </LiquidGlassButton>

        </div>
      </div>

      <style>{`
        .hero-eyebrow {
          margin: 0 0 16px 0;
        }
        .hero-eyebrow-text {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-dim);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: var(--shadow-text);
          line-height: 1;
        }

        .hero-headline {
          margin-bottom: 20px;
        }
        .hero-headline-line {
          margin: 0;
        }
        .hero-headline-word {
          font-family: var(--font-display);
          font-size: clamp(36px, 4vw, 64px);
          font-weight: 400;
          color: var(--color-text-primary);
          line-height: 1.08;
          letter-spacing: -1px;
          white-space: nowrap;
          text-shadow: var(--shadow-text-strong);
        }
        .hero-headline-italic .hero-headline-word {
          font-style: italic;
        }

        .hero-subheading {
          margin: 0 0 36px 0;
        }
        .hero-subheading-text {
          font-family: var(--font-body);
          font-size: 18px;
          font-weight: 400;
          color: var(--color-text-secondary);
          line-height: 1.55;
          max-width: 400px;
          text-shadow: var(--shadow-text);
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
