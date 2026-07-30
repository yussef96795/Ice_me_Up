'use client';

import type React from 'react';
import { cn } from '@/lib/utils';

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  tintColor?: string;
  glassBlur?: string;
  as?: 'button' | 'a';
  href?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export const LiquidGlassButton = ({
  children,
  className = '',
  tintColor = 'rgba(255, 255, 255, 0.08)',
  glassBlur = '20px',
  as = 'button',
  href,
  style,
  onClick,
}: LiquidGlassButtonProps) => {
  const Component = as === 'a' ? 'a' : 'button';

  return (
    <Component
      className={cn('relative overflow-hidden', className)}
      style={{
        background: tintColor,
        backdropFilter: `blur(${glassBlur})`,
        WebkitBackdropFilter: `blur(${glassBlur})`,
        boxShadow: `
          inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35),
          inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35),
          0 4px 4px rgba(0, 0, 0, 0.15),
          0 0 12px rgba(0, 0, 0, 0.08),
          0 0 24px rgba(255, 255, 255, 0.1)
        `,
        transition: 'filter 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.filter = 'brightness(1.12)';
        el.style.boxShadow = `
          inset 2px 2px 2px 0 rgba(255, 255, 255, 0.4),
          inset -2px -2px 2px 0 rgba(255, 255, 255, 0.4),
          0 6px 6px rgba(0, 0, 0, 0.18),
          0 0 16px rgba(0, 0, 0, 0.1),
          0 0 32px rgba(255, 255, 255, 0.15)
        `;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.filter = 'none';
        el.style.boxShadow = `
          inset 2px 2px 2px 0 rgba(255, 255, 255, 0.35),
          inset -2px -2px 2px 0 rgba(255, 255, 255, 0.35),
          0 4px 4px rgba(0, 0, 0, 0.15),
          0 0 12px rgba(0, 0, 0, 0.08),
          0 0 24px rgba(255, 255, 255, 0.1)
        `;
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.filter = 'brightness(0.92)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.filter = 'brightness(1.12)';
      }}
      {...(as === 'a' ? { href } : {})}
      onClick={onClick}
    >
      {children}
    </Component>
  );
};
