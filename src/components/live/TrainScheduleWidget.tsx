import { useState, useEffect } from 'react';
import { useTrainSchedule, type Train } from '../../hooks/api/useTrainSchedule';
import WidgetCard from '../ui/WidgetCard';

function formatDuration(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}ч ${m}м`;
}

function CountdownToTrain({ departure }: { departure: string }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const [h, m] = departure.split(':').map(Number);
      const depDate = new Date();
      depDate.setHours(h, m, 0, 0);
      const diff = depDate.getTime() - now.getTime();
      if (diff <= 0) { setLabel('Отправился'); return; }
      const hh = Math.floor(diff / 3_600_000);
      const mm = Math.floor((diff % 3_600_000) / 60_000);
      const ss = Math.floor((diff % 60_000) / 1000);
      setLabel(hh > 0 ? `через ${hh}ч ${mm}м` : `через ${mm}м ${ss}с`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [departure]);

  return <span className="text-accent-primary text-xs" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>{label}</span>;
}

function TrainRow({ train }: { train: Train }) {
  return (
    <div
      className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-all ${
        train.isNext
          ? 'border border-accent-primary/30 bg-accent-primary/5'
          : 'border border-transparent'
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span
            className="text-sm font-bold text-text-primary"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            {train.departure}
          </span>
          <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="shrink-0">
            <path d="M0 4h13M9 1l4 3-4 3" stroke="#8a9bbf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            className="text-sm text-text-secondary"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            {train.arrival}
          </span>
        </div>
        {train.isNext && <CountdownToTrain departure={train.departure} />}
      </div>
      <div className="text-right shrink-0">
        <div
          className="text-xs text-text-secondary"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          {formatDuration(train.durationMin)}
        </div>
        {train.stopsCount > 0 && (
          <div
            className="text-[10px] text-text-secondary/60"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            ·{train.stopsCount} ост.
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrainScheduleWidget() {
  const { data, isLoading, error, refetch } = useTrainSchedule();

  return (
    <WidgetCard
      title="Электрички · Мск→Дубна"
      icon="🚆"
      isLoading={isLoading}
      error={error ? 'Нет данных о расписании' : null}
      onRetry={() => refetch()}
    >
      {data && (
        <div>
          {data.isMock && (
            <div className="mb-3 p-2 rounded-lg bg-accent-secondary/10 border border-accent-secondary/20">
              <p
                className="text-[10px] text-accent-secondary leading-relaxed"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                Тестовые данные. Добавьте VITE_YANDEX_RASP_KEY в .env для реального расписания.
              </p>
            </div>
          )}

          <div className="mb-2 px-3">
            <div className="flex items-center gap-3 text-[10px] text-text-secondary" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              <span className="flex-1">Отправление</span>
              <span>Прибытие</span>
              <span className="ml-auto">В пути</span>
            </div>
          </div>

          <div className="space-y-1">
            {data.trains.length > 0 ? (
              data.trains.map((train, i) => <TrainRow key={i} train={train} />)
            ) : (
              <p className="text-text-secondary text-xs text-center py-4">
                На сегодня поездов больше нет
              </p>
            )}
          </div>

          <div
            className="mt-3 pt-3 border-t border-white/5 text-[10px] text-text-secondary"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Савёловский вокз. → ст. Дубна
          </div>
        </div>
      )}
    </WidgetCard>
  );
}
