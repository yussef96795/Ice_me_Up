'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './FadeContent.css';

gsap.registerPlugin(ScrollTrigger);

const FadeContent = ({
  children,
  container,
  blur = false,
  duration = 1000,
  ease = 'power2.out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power2.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  reverse = false,
  scrollDistance = 500,
  ...props
}: {
  children: React.ReactNode;
  container?: string | HTMLElement | null;
  blur?: boolean;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  scrollDistance?: number;
  [key: string]: unknown;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getSeconds = (val: number) => (typeof val === 'number' && val > 10 ? val / 1000 : val);

    if (reverse) {
      gsap.set(el, {
        autoAlpha: 1,
        filter: 'blur(0px)',
        willChange: 'opacity, filter',
      });

      const st = ScrollTrigger.create({
        trigger: el,
        scroller: window,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(el, {
            autoAlpha: 1 - (1 - initialOpacity) * progress,
            filter: blur ? `blur(${10 * progress}px)` : 'blur(0px)',
          });
        },
      });

      return () => {
        st.kill();
        gsap.killTweensOf(el);
      };
    }

    let scrollerTarget: string | HTMLElement | null = container || null;
    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector<HTMLElement>(scrollerTarget);
    }

    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform',
    });

    const tl = gsap.timeline({
      paused: true,
      delay: getSeconds(delay),
      onComplete: () => {
        onComplete?.();
        if (disappearAfter > 0) {
          gsap.to(el, {
            autoAlpha: initialOpacity,
            filter: blur ? 'blur(10px)' : 'blur(0px)',
            delay: getSeconds(disappearAfter),
            duration: getSeconds(disappearDuration),
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          });
        }
      },
    });

    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease,
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    });

    return () => {
      st.kill();
      tl.kill();
      gsap.killTweensOf(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default FadeContent;
