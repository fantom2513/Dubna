import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useISSTracker } from '../../hooks/api/useISSTracker';
import WidgetCard from '../ui/WidgetCard';

// Map lat/lon to SVG coords (equirectangular projection)
function latLonToSVG(lat: number, lon: number, width: number, height: number) {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

function MiniGlobe({ lat, lon }: { lat: number; lon: number }) {
  const W = 240;
  const H = 120;
  const pos = latLonToSVG(lat, lon, W, H);

  // Dubna position
  const dubna = latLonToSVG(56.74, 37.17, W, H);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      className="rounded-lg overflow-hidden"
      style={{ background: '#07090f', border: '1px solid rgba(79,195,247,0.1)' }}
    >
      {/* Grid lines */}
      {[-60, -30, 0, 30, 60].map((lat_) => {
        const y_ = ((90 - lat_) / 180) * H;
        return (
          <line
            key={`lat${lat_}`}
            x1={0} y1={y_} x2={W} y2={y_}
            stroke="rgba(79,195,247,0.06)" strokeWidth="0.5"
          />
        );
      })}
      {[-120, -60, 0, 60, 120].map((lon_) => {
        const x_ = ((lon_ + 180) / 360) * W;
        return (
          <line
            key={`lon${lon_}`}
            x1={x_} y1={0} x2={x_} y2={H}
            stroke="rgba(79,195,247,0.06)" strokeWidth="0.5"
          />
        );
      })}

      {/* Equator */}
      <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="rgba(79,195,247,0.12)" strokeWidth="0.8" />

      {/* Simplified continents (rough polygons) */}
      {/* North America */}
      <path d="M 20,20 L 55,15 L 65,35 L 55,50 L 35,55 L 20,45 Z" fill="rgba(79,195,247,0.08)" stroke="rgba(79,195,247,0.2)" strokeWidth="0.5" />
      {/* South America */}
      <path d="M 45,55 L 65,55 L 68,80 L 55,95 L 42,85 Z" fill="rgba(79,195,247,0.08)" stroke="rgba(79,195,247,0.2)" strokeWidth="0.5" />
      {/* Europe */}
      <path d="M 100,15 L 120,12 L 125,25 L 115,30 L 100,28 Z" fill="rgba(79,195,247,0.1)" stroke="rgba(79,195,247,0.2)" strokeWidth="0.5" />
      {/* Africa */}
      <path d="M 108,32 L 128,30 L 135,65 L 120,85 L 105,75 L 100,50 Z" fill="rgba(79,195,247,0.08)" stroke="rgba(79,195,247,0.2)" strokeWidth="0.5" />
      {/* Asia */}
      <path d="M 125,12 L 200,8 L 210,35 L 185,45 L 155,40 L 130,30 Z" fill="rgba(79,195,247,0.1)" stroke="rgba(79,195,247,0.2)" strokeWidth="0.5" />
      {/* Australia */}
      <path d="M 180,65 L 210,60 L 218,80 L 205,88 L 185,82 Z" fill="rgba(79,195,247,0.08)" stroke="rgba(79,195,247,0.2)" strokeWidth="0.5" />

      {/* Dubna marker */}
      <circle cx={dubna.x} cy={dubna.y} r="3" fill="#e8b84b" opacity="0.9" />
      <circle cx={dubna.x} cy={dubna.y} r="6" fill="none" stroke="#e8b84b" strokeWidth="0.8" opacity="0.4" />

      {/* ISS dot — use x/y (SVG transform) not cx/cy which g elements don't have */}
      <motion.g
        animate={{ x: pos.x, y: pos.y }}
        transition={{ duration: 3, ease: 'linear' }}
      >
        <circle cx={0} cy={0} r="5" fill="#4fc3f7" />
        <circle cx={0} cy={0} r="9" fill="rgba(79,195,247,0.25)" />
        <circle cx={0} cy={0} r="14" fill="rgba(79,195,247,0.08)" />
      </motion.g>
    </svg>
  );
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [remaining, setRemaining] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setRemaining('Пролёт сейчас!');
        return;
      }
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setRemaining(h > 0 ? `${h}ч ${m}м ${s}с` : `${m}м ${s}с`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <span
      className="text-accent-primary font-bold"
      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
    >
      {remaining}
    </span>
  );
}

export default function ISSTrackerWidget() {
  const { data, isLoading, error, refetch } = useISSTracker();

  return (
    <WidgetCard
      title="МКС в реальном времени"
      icon="🛸"
      isLive
      isLoading={isLoading}
      error={error ? 'Нет данных о МКС' : null}
      onRetry={() => refetch()}
    >
      <AnimatePresence mode="wait">
        {data && (
          <motion.div
            key={data.position.timestamp}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <MiniGlobe lat={data.position.latitude} lon={data.position.longitude} />

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Широта',   value: `${data.position.latitude.toFixed(2)}°N` },
                { label: 'Долгота',  value: `${data.position.longitude.toFixed(2)}°E` },
                { label: 'Высота',   value: `${Math.round(data.position.altitude)} км` },
                { label: 'Скорость', value: `${Math.round(data.position.velocity).toLocaleString('ru')} км/ч` },
              ].map((item) => (
                <div key={item.label} className="bg-bg-secondary/50 rounded-lg p-2">
                  <div
                    className="text-[10px] text-text-secondary uppercase tracking-wider"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-xs font-bold text-text-primary mt-0.5"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {data.nextPass && (
              <div className="border border-accent-primary/20 rounded-lg p-3 bg-accent-primary/5">
                <p
                  className="text-[10px] text-text-secondary uppercase tracking-wider mb-2"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  Следующий пролёт над Дубной
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Через</span>
                    <CountdownTimer targetDate={data.nextPass.riseTime} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Макс. высота</span>
                    <span
                      className="text-accent-primary"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                    >
                      {data.nextPass.maxElevationDeg}°
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Длительность</span>
                    <span
                      className="text-accent-primary"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                    >
                      ~{data.nextPass.durationMin} мин
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </WidgetCard>
  );
}
