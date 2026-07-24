import { useRef, useEffect, type ReactNode } from 'react';
import { gsap } from 'gsap';
import './AnimatedContent.css';

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
  className?: string;
}

const AnimatedContent = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
}: AnimatedContentProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? distance : -distance;

    gsap.set(el, {
      opacity: initialOpacity,
      scale,
      [axis]: offset,
    });

    const tl = gsap.timeline();

    tl.to(el, {
      [axis]: 0,
      opacity: animateOpacity ? 1 : initialOpacity,
      scale: 1,
      duration,
      ease,
      delay,
      onComplete,
    });

    if (disappearAfter > 0) {
      tl.to(el, {
        [axis]: reverse ? -distance : distance,
        opacity: 0,
        scale,
        duration: disappearDuration,
        ease: disappearEase,
        onComplete: onDisappearanceComplete,
      }, disappearAfter);
    }

    return () => {
      tl.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className={`animated-content ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedContent;
