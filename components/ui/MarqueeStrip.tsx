import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './MarqueeStrip.css';

interface MarqueeStripProps {
  text: string;
  image: string;
  speed?: number;
  textColor?: string;
  bgColor?: string;
  textSize?: number;
  className?: string;
}

function MarqueeStrip({
  text,
  image,
  speed = 15,
  textColor = '#ffffff',
  bgColor = 'transparent',
  textSize = 4,
  className = '',
}: MarqueeStripProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(6);

  useEffect(() => {
    const calc = () => {
      if (!innerRef.current) return;
      const part = innerRef.current.querySelector('.marquee-strip__part');
      if (!part) return;
      const contentW = (part as HTMLElement).offsetWidth;
      const needed = Math.ceil(window.innerWidth / contentW) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text, image]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const setup = () => {
      if (!innerRef.current) return;
      const part = innerRef.current.querySelector('.marquee-strip__part');
      if (!part) return;
      const contentW = (part as HTMLElement).offsetWidth;
      if (contentW === 0) return;

      animRef.current?.kill();
      animRef.current = gsap.to(innerRef.current, {
        x: -contentW,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    };

    const timer = setTimeout(setup, 50);
    return () => {
      clearTimeout(timer);
      animRef.current?.kill();
    };
  }, [text, image, speed, repetitions]);

  return (
    <div
      className={`marquee-strip ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="marquee-strip__inner-wrap">
        <div className="marquee-strip__inner" ref={innerRef}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <div
              className="marquee-strip__part"
              key={i}
              style={{ color: textColor, fontSize: `${textSize}vh` }}
            >
              <span>{text}</span>
              <div
                className="marquee-strip__img"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeStrip;
