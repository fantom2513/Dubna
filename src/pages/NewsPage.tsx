import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowSquareOut, WarningCircle, ArrowClockwise, Newspaper, Clock } from '@phosphor-icons/react';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { SectionLabel, SectionTitle } from '@/components/ui/Typography';

function SkeletonCard() {
  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
    >
      <div className="h-20 rounded-lg animate-pulse bg-white/5" />
      <div className="h-4 rounded w-3/4 animate-pulse bg-white/5" />
      <div className="h-4 rounded w-1/2 animate-pulse bg-white/5" />
    </div>
  );
}

import { useInView } from '@/hooks/useInView';
import { useNews, getRelativeTime } from '@/hooks/api/useNews';
import { notify } from '@/utils/toast';

// ── Skeleton grid ─────────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
      {/* featured skeleton */}
      <div className="h-64 rounded-2xl animate-pulse" style={{ background: 'var(--glass-bg)' }} />
      {/* grid skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="max-w-xl mx-auto px-6 py-24">
      <GlassCard className="p-8 text-center">
        <WarningCircle size={48} color="#f87171" weight="duotone" className="mx-auto mb-4" />
        <h2
          className="text-text-primary text-xl font-semibold mb-2"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          Не удалось загрузить новости
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          Проверьте соединение с интернетом и попробуйте снова.
        </p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all hover:scale-105"
          style={{
            background: 'rgba(79,195,247,0.1)',
            border: '1px solid rgba(79,195,247,0.3)',
            color: '#4fc3f7',
            fontFamily: '"IBM Plex Mono", monospace',
          }}
        >
          <ArrowClockwise size={16} />
          Повторить
        </button>
      </GlassCard>
    </div>
  );
}

// ── Featured article ──────────────────────────────────────────────────────────
function FeaturedArticle({ item }: { item: { title: string; link: string; pubDate: string; snippet: string } }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
        <GlassCard className="p-8 md:p-10 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(79,195,247,0.06) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <div
              className="w-full h-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(90deg, rgba(79,195,247,0.6) 0%, rgba(79,195,247,0.1) 100%)',
              }}
            />
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(79,195,247,0.1)',
                  border: '1px solid rgba(79,195,247,0.3)',
                  color: '#4fc3f7',
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
              >
                Главное
              </span>
              <span
                className="text-xs flex items-center gap-1"
                style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
              >
                <Clock size={12} />
                {getRelativeTime(item.pubDate)}
              </span>
            </div>
            <h2
              className="text-text-primary font-bold mb-3 group-hover:text-accent-primary transition-colors"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 'clamp(20px, 3vw, 32px)',
                lineHeight: 1.3,
              }}
            >
              {item.title}
            </h2>
            {item.snippet && (
              <p className="text-text-secondary leading-relaxed mb-4 line-clamp-3">{item.snippet}</p>
            )}
            <span
              className="inline-flex items-center gap-1.5 text-sm"
              style={{ color: '#4fc3f7', fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Читать полностью
              <ArrowSquareOut size={14} />
            </span>
          </div>
        </GlassCard>
      </a>
    </motion.div>
  );
}

// ── News card ─────────────────────────────────────────────────────────────────
function NewsCard({
  item,
  index,
}: {
  item: { title: string; link: string; pubDate: string; snippet: string };
  index: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.05, duration: 0.4 }}
    >
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block group h-full">
        <GlassCard className="p-5 h-full flex flex-col">
          <span
            className="text-xs mb-3 flex items-center gap-1"
            style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            <Clock size={11} />
            {getRelativeTime(item.pubDate)}
          </span>
          <h3
            className="text-text-primary font-semibold mb-2 group-hover:text-accent-primary transition-colors line-clamp-3 flex-1"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', lineHeight: 1.4 }}
          >
            {item.title}
          </h3>
          {item.snippet && (
            <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 mt-1">{item.snippet}</p>
          )}
          <div
            className="mt-3 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ color: '#4fc3f7', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Читать <ArrowSquareOut size={11} />
          </div>
        </GlassCard>
      </a>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NewsPage() {
  const { data, isLoading, error, refetch } = useNews();
  const [visibleCount, setVisibleCount] = useState(7);

  const handleRefresh = () => {
    refetch();
    notify.dataUpdated();
  };

  return (
    <PageLayout title="Новости">
      {/* Header */}
      <div className="pt-12 pb-8 px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionLabel>Лента новостей</SectionLabel>
            <div className="flex items-end justify-between mt-2 gap-4 flex-wrap">
              <SectionTitle style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}>
                Новости Дубны
              </SectionTitle>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all hover:scale-105 shrink-0 mb-1"
                style={{
                  background: 'rgba(79,195,247,0.08)',
                  border: '1px solid rgba(79,195,247,0.2)',
                  color: '#4fc3f7',
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
              >
                <ArrowClockwise size={14} />
                Обновить
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Newspaper size={14} color="var(--muted-foreground)" />
              <span
                className="text-xs"
                style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
              >
                dubna.ru · официальный сайт города
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      {isLoading && <LoadingSkeleton />}

      {error && !isLoading && (
        <ErrorState onRetry={() => { refetch(); }} />
      )}

      {data && data.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
          {/* Featured */}
          <FeaturedArticle item={data[0]} />

          {/* Grid */}
          {data.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.slice(1, visibleCount).map((item, i) => (
                <NewsCard key={item.link + i} item={item} index={i} />
              ))}
            </div>
          )}

          {/* Load more */}
          {visibleCount < data.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((n) => n + 6)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all hover:scale-105"
                style={{
                  border: '1px solid rgba(79,195,247,0.25)',
                  background: 'rgba(79,195,247,0.05)',
                  color: '#4fc3f7',
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
              >
                Показать ещё ({data.length - visibleCount} материалов)
              </button>
            </div>
          )}
        </div>
      )}

      {data && data.length === 0 && !isLoading && (
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <Newspaper size={48} color="var(--muted-foreground)" weight="duotone" className="mx-auto mb-4" />
          <p className="text-text-secondary">Новости пока не загрузились. Попробуйте обновить.</p>
        </div>
      )}
    </PageLayout>
  );
}
