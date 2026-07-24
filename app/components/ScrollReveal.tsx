'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

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

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const targets = splitWords ? el.querySelectorAll('.word') : el;

    if (reverse) {
      gsap.fromTo(
        targets,
        { opacity: 1, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: baseOpacity,
          stagger: splitWords ? 0.05 : 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: 0 },
        {
          ease: 'none',
          rotate: baseRotation,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          targets,
          { filter: 'blur(0px)' },
          {
            ease: 'none',
            filter: `blur(${blurStrength}px)`,
            stagger: splitWords ? 0.05 : 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top top',
              end: `+=${scrollDistance}`,
              scrub: true,
            },
          }
        );
      }
    } else {
      gsap.fromTo(
        el,
        { transformOrigin: '0% 50%', rotate: baseRotation },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        targets,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: splitWords ? 0.05 : 0,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        }
      );

      if (enableBlur) {
        gsap.fromTo(
          targets,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: splitWords ? 0.05 : 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true,
            },
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
