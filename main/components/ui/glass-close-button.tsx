'use client';

import { X, ArrowLeft } from 'lucide-react';

interface GlassCloseButtonProps {
  onClick: () => void;
  variant?: 'close' | 'back';
  style?: React.CSSProperties;
  className?: string;
}

export function GlassCloseButton({ onClick, variant = 'close', style, className = '' }: GlassCloseButtonProps) {
  const Icon = variant === 'back' ? ArrowLeft : X;

  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={variant === 'back' ? 'Go back' : 'Close'}
      style={{
        position: 'absolute',
        top: 32,
        [variant === 'back' ? 'left' : 'right']: 40,
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        width: 52,
        height: 52,
        cursor: 'pointer',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
        transition: 'background 0.2s ease, box-shadow 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
        e.currentTarget.style.boxShadow = '0 0 16px rgba(255,255,255,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Icon size={20} strokeWidth={2} />
    </button>
  );
}
