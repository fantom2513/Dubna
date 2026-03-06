import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DividerProps {
  icon?: ReactNode;
  className?: string;
}

export default function Divider({ icon, className }: DividerProps) {
  if (icon) {
    return (
      <div className={cn('flex items-center gap-4 my-8', className)}>
        <div
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(to right, transparent, var(--accent-primary))',
          }}
        />
        <span className="text-accent-primary opacity-60 flex-shrink-0">{icon}</span>
        <div
          className="flex-1 h-px"
          style={{
            background: 'linear-gradient(to left, transparent, var(--accent-primary))',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn('h-px my-8', className)}
      style={{
        background:
          'linear-gradient(to right, transparent, var(--accent-primary), transparent)',
      }}
    />
  );
}
