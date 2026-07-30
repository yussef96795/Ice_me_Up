'use client';

import { useEffect, useRef, useMemo } from 'react';

import './ScrollReveal.css';

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  reverse = false,
  splitWords = true,
  scrollDistance = 500,
  as = 'div',
}: {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  reverse?: boolean;
  splitWords?: boolean;
  scrollDistance?: number;
  as?: 'h2' | 'div' | 'span';
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const splitText = useMemo(() => {
    if (!splitWords) return null;
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children, splitWords]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tweens: Array<{ scrollTrigger?: { kill: () => void }; kill: () => void }> = [];
    let disposed = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      if (disposed) return;

      const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
      const targets = splitWords ? el.querySelectorAll('.word') : el;

      if (reverse) {
        tweens.push(
          gsap.fromTo(
            targets,
            { opacity: 1, willChange: 'opacity' },
            {
              ease: 'none',
              opacity: baseOpacity,
              stagger: splitWords ? 0.05 : 0,
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top top',
                end: `+=${scrollDistance}`,
                scrub: true,
              },
            }
          )
        );

        tweens.push(
          gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: 0 },
            {
              ease: 'none',
              rotate: baseRotation,
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top top',
                end: `+=${scrollDistance}`,
                scrub: true,
              },
            }
          )
        );

        if (enableBlur) {
          tweens.push(
            gsap.fromTo(
              targets,
              { filter: 'blur(0px)' },
              {
                ease: 'none',
                filter: `blur(${blurStrength}px)`,
                stagger: splitWords ? 0.05 : 0,
                immediateRender: false,
                scrollTrigger: {
                  trigger: el,
                  scroller,
                  start: 'top top',
                  end: `+=${scrollDistance}`,
                  scrub: true,
                },
              }
            )
          );
        }
      } else {
        tweens.push(
          gsap.fromTo(
            el,
            { transformOrigin: '0% 50%', rotate: baseRotation },
            {
              ease: 'none',
              rotate: 0,
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom',
                end: rotationEnd,
                scrub: true,
              },
            }
          )
        );

        tweens.push(
          gsap.fromTo(
            targets,
            { opacity: baseOpacity, willChange: 'opacity' },
            {
              ease: 'none',
              opacity: 1,
              stagger: splitWords ? 0.05 : 0,
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                scroller,
                start: 'top bottom-=20%',
                end: wordAnimationEnd,
                scrub: true,
              },
            }
          )
        );

        if (enableBlur) {
          tweens.push(
            gsap.fromTo(
              targets,
              { filter: `blur(${blurStrength}px)` },
              {
                ease: 'none',
                filter: 'blur(0px)',
                stagger: splitWords ? 0.05 : 0,
                immediateRender: false,
                scrollTrigger: {
                  trigger: el,
                  scroller,
                  start: 'top bottom-=20%',
                  end: wordAnimationEnd,
                  scrub: true,
                },
              }
            )
          );
        }
      }
    })();

    return () => {
      disposed = true;
      tweens.forEach(t => {
        if (t.scrollTrigger) t.scrollTrigger.kill();
        t.kill();
      });
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength, reverse, splitWords, scrollDistance]);

  const content = splitWords ? (
    <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
  ) : (
    <p className={`scroll-reveal-text ${textClassName}`}>{children}</p>
  );

  if (as === 'span') {
    return <span ref={containerRef as React.Ref<HTMLSpanElement>} className={`scroll-reveal ${containerClassName}`}>{content}</span>;
  }
  if (as === 'h2') {
    return <h2 ref={containerRef as React.Ref<HTMLHeadingElement>} className={`scroll-reveal ${containerClassName}`}>{content}</h2>;
  }
  return <div ref={containerRef as React.Ref<HTMLDivElement>} className={`scroll-reveal ${containerClassName}`}>{content}</div>;
};

export default ScrollReveal;
