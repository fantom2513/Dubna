import type { ComponentType } from 'react';
import type { IconProps } from '@phosphor-icons/react';

const mono = { fontFamily: '"IBM Plex Mono", monospace' } as const;

interface StatTileProps {
  label: string;
  value: string;
  /** Optional value color (defaults to primary text). */
  accent?: string;
  /** Optional leading Phosphor icon. */
  icon?: ComponentType<IconProps>;
}

/** Refined label/value tile used across live widgets (replaces flat squares). */
export default function StatTile({ label, value, accent, icon: Icon }: StatTileProps) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon size={11} weight="bold" className="text-text-secondary/70" />}
        <span className="text-[10px] text-text-secondary uppercase tracking-wider" style={mono}>
          {label}
        </span>
      </div>
      <div
        className="text-sm font-bold mt-1 truncate"
        style={{ ...mono, color: accent ?? 'var(--text-primary)' }}
      >
        {value}
      </div>
    </div>
  );
}
