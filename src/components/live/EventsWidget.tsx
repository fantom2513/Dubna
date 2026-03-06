import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEvents, eventCategories, getCategoryInfo, formatEventDate } from '../../hooks/api/useEvents';
import WidgetCard from '../ui/WidgetCard';

export default function EventsWidget() {
  const { data, isLoading, error, refetch } = useEvents();
  const [activeCategory, setActiveCategory] = useState('');

  const filtered = (data ?? []).filter((ev) => {
    if (!activeCategory) return true;
    return ev.tags.includes(activeCategory);
  });

  return (
    <WidgetCard
      title="Афиша Москвы"
      icon="📅"
      isLoading={isLoading}
      error={error ? 'Не удалось загрузить события' : null}
      onRetry={() => refetch()}
      className="h-full"
    >
      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {eventCategories.map((cat) => (
          <button
            key={cat.tag}
            onClick={() => setActiveCategory(cat.tag)}
            className="relative px-3 py-1 rounded-full text-xs transition-all"
            style={{
              fontFamily: '"IBM Plex Mono", monospace',
              color: activeCategory === cat.tag ? '#07090f' : '#8a9bbf',
            }}
          >
            {activeCategory === cat.tag && (
              <motion.div
                layoutId="event-filter"
                className="absolute inset-0 rounded-full"
                style={{ background: cat.color }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Events list */}
      <div className="space-y-2 overflow-y-auto" style={{ maxHeight: '360px' }}>
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-text-secondary text-xs text-center py-8"
            >
              Нет событий по выбранной категории
            </motion.p>
          ) : (
            filtered.map((event) => {
              const catInfo = getCategoryInfo(event.tags);
              const startDate = event.dates[0]?.start;

              return (
                <motion.a
                  key={event.id}
                  href={`https://kudago.com/msk/event/${event.id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  layout
                  className="block p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/3 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            fontFamily: '"IBM Plex Mono", monospace',
                            background: `${catInfo.color}20`,
                            border: `1px solid ${catInfo.color}40`,
                            color: catInfo.color,
                          }}
                        >
                          {catInfo.label}
                        </span>
                        {startDate && (
                          <span
                            className="text-[10px] text-text-secondary"
                            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                          >
                            {formatEventDate(startDate)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-primary group-hover:text-accent-primary transition-colors leading-tight line-clamp-2">
                        {event.short_title || event.title}
                      </p>
                    </div>
                    <svg
                      width="14" height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="shrink-0 mt-0.5 text-text-secondary group-hover:text-accent-primary transition-colors"
                    >
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </motion.a>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </WidgetCard>
  );
}
