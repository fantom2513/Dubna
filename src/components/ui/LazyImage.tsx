import { useState } from 'react';
import { ImageBroken } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className,
  aspectRatio,
  priority = false,
}: LazyImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading placeholder */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-bg-card animate-pulse" />
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-bg-card to-bg-secondary">
          <ImageBroken size={32} className="text-text-secondary opacity-50" />
          <span className="text-xs text-text-secondary opacity-50">{alt}</span>
        </div>
      )}

      {/* Image */}
      {status !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          {...(priority ? { fetchPriority: 'high' } : {})}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  );
}
