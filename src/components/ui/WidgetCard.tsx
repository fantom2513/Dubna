import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface WidgetCardProps {
  title: string;
  icon: string;
  isLive?: boolean;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  children: ReactNode;
  className?: string;
}

export default function WidgetCard({
  title,
  icon,
  isLive = false,
  isLoading = false,
  error = null,
  onRetry,
  children,
  className = '',
}: WidgetCardProps) {
  return (
    <div
      className={`bg-bg-card border border-white/5 rounded-2xl p-6 hover:border-accent-primary/20 transition-all duration-300 flex flex-col min-w-0 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg select-none" role="img" aria-hidden="true">
            {icon}
          </span>
          <span
            className="text-text-secondary text-xs uppercase tracking-[0.2em]"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            {title}
          </span>
        </div>

        {isLive && (
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <motion.div
                className="absolute inset-0 w-2 h-2 rounded-full bg-red-500"
                animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span
              className="text-[10px] text-red-400 uppercase tracking-wider"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <SkeletonLoader />
      ) : error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-3 animate-pulse flex-1">
      <div className="h-10 bg-white/5 rounded-lg w-3/4" />
      <div className="h-4 bg-white/5 rounded w-full" />
      <div className="h-4 bg-white/5 rounded w-5/6" />
      <div className="h-4 bg-white/5 rounded w-2/3" />
      <div className="h-4 bg-white/5 rounded w-4/5" />
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6 text-center flex-1">
      <span className="text-2xl" role="img" aria-label="error">⚠️</span>
      <p className="text-text-secondary text-xs max-w-[200px]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-xs text-accent-primary hover:text-text-primary transition-colors border border-accent-primary/30 rounded-full px-4 py-1.5"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Повторить
        </button>
      )}
    </div>
  );
}
