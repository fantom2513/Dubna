import type { ReactNode } from 'react';
import type { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  glowColor?: 'blue' | 'gold' | 'green';
}

const glowShadow = {
  blue: 'var(--shadow-glow-blue)',
  gold: 'var(--shadow-glow-gold)',
  green: 'var(--shadow-glow-green)',
};

export default function GlassCard({
  children,
  className,
  style,
  onClick,
  glowColor = 'blue',
}: GlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: glowShadow[glowColor] }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'rounded-xl border',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        background: 'var(--glass-bg)',
        borderColor: 'var(--glass-border)',
        backdropFilter: 'var(--glass-blur)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
