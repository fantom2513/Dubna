import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
  style?: CSSProperties;
}

export function SectionLabel({ children, className, style }: TypographyProps) {
  return (
    <span
      style={style}
      className={cn(
        'text-sm uppercase tracking-[0.2em] text-accent-primary font-mono-custom block',
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ children, className, gradient = false, style }: TypographyProps) {
  return (
    <h2
      className={cn(
        'font-cormorant font-bold leading-tight',
        gradient
          ? 'bg-gradient-to-r from-white to-accent-primary bg-clip-text text-transparent'
          : 'text-text-primary',
        className
      )}
      style={{ fontSize: 'var(--text-section-title)', ...style }}
    >
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children, className, style }: TypographyProps) {
  return (
    <p
      style={style}
      className={cn(
        'font-geologica text-text-secondary max-w-[600px] leading-relaxed',
        className
      )}
    >
      {children}
    </p>
  );
}

export function BodyText({ children, className, style }: TypographyProps) {
  return (
    <p
      style={style}
      className={cn(
        'font-geologica text-text-primary leading-[1.7] max-w-[70ch]',
        className
      )}
    >
      {children}
    </p>
  );
}

export function MonoText({ children, className, style }: TypographyProps) {
  return (
    <span style={style} className={cn('font-mono-custom text-accent-primary', className)}>
      {children}
    </span>
  );
}
