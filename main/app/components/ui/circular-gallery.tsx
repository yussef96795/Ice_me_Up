'use client';

import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import Image from 'next/image';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const cardWidth = (isMobile: boolean) => isMobile ? 160 : 300;
const cardHeight = (isMobile: boolean) => isMobile ? 220 : 400;
const perspective = (isMobile: boolean) => isMobile ? 1000 : 2000;

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const animationFrameRef = useRef<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);
    const lastDragXRef = useRef(0);
    const [isMobile, setIsMobile] = useState(
      typeof window !== 'undefined' ? window.innerWidth <= 767 : false
    );

    useEffect(() => {
      const mq = window.matchMedia('(max-width: 767px)');
      setIsMobile(mq.matches);
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const autoRotate = () => {
        if (!isDraggingRef.current) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [autoRotateSpeed]);

    const handlePointerDown = (e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      setIsDragging(true);
      lastDragXRef.current = e.clientX;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - lastDragXRef.current;
      lastDragXRef.current = e.clientX;
      setRotation(prev => prev + deltaX * 0.5);
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
    };

    const anglePerItem = 360 / items.length;
    const cw = cardWidth(isMobile);
    const ch = cardHeight(isMobile);
    const effRadius = isMobile ? Math.min(radius, 260) : radius;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center select-none", className)}
        style={{ perspective: `${perspective(isMobile)}px`, cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={i}
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: cw,
                  height: ch,
                  transform: `rotateY(${itemAngle}deg) translateZ(${effRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -cw / 2,
                  marginTop: -ch / 2,
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden border border-white/20 backdrop-blur-lg bg-white/10">
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text}
                    fill
                    className="object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                    sizes={isMobile ? '160px' : '300px'}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h2 className="text-sm sm:text-xl font-bold leading-tight">{item.common}</h2>
                    <em className="text-[10px] sm:text-sm italic opacity-80">{item.binomial}</em>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
