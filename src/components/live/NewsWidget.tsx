import { useNews, getRelativeTime } from '../../hooks/api/useNews';
import WidgetCard from '../ui/WidgetCard';

export default function NewsWidget() {
  const { data, isLoading, error, refetch } = useNews();

  return (
    <WidgetCard
      title="Новости Дубны"
      icon="📰"
      isLoading={isLoading}
      error={error ? 'Нет данных о новостях' : null}
      onRetry={() => refetch()}
    >
      {data && (
        <div>
          {data.length === 0 ? (
            <p className="text-text-secondary text-xs text-center py-4">
              Новости временно недоступны
            </p>
          ) : (
            <div className="divide-y divide-white/5">
              {data.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-3 group hover:bg-white/2 -mx-1 px-1 rounded transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[10px] text-text-secondary mb-1"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                      >
                        {getRelativeTime(item.pubDate)}
                      </div>
                      <p className="text-sm text-text-primary group-hover:text-accent-primary transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </p>
                    </div>
                    <svg
                      width="12" height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="shrink-0 mt-1 text-text-secondary/40 group-hover:text-accent-primary transition-colors"
                    >
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-white/5">
            <a
              href="https://dubna.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-text-secondary hover:text-accent-primary transition-colors flex items-center gap-1"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              dubna.ru →
            </a>
          </div>
        </div>
      )}
    </WidgetCard>
  );
}
