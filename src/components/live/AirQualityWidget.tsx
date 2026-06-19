import { Wind } from '@phosphor-icons/react';
import { useAirQuality, getAqiLevel } from '../../hooks/api/useAirQuality';
import WidgetCard from '../ui/WidgetCard';

const mono = { fontFamily: '"IBM Plex Mono", monospace' } as const;

function AqiGauge({ aqi, color }: { aqi: number; color: string }) {
  const radius = 38;
  const circumference = Math.PI * radius; // half circle
  const progress = Math.min(100, Math.max(0, aqi)) / 100;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex justify-center mb-4">
      <svg width="120" height="70" viewBox="0 0 120 70">
        {/* Track */}
        <path
          d={`M 10 60 A ${radius} ${radius} 0 0 1 110 60`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d={`M 10 60 A ${radius} ${radius} 0 0 1 110 60`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
        {/* Center value */}
        <text
          x="60" y="56"
          textAnchor="middle"
          fill={color}
          fontSize="22"
          fontWeight="bold"
          fontFamily='"IBM Plex Mono", monospace'
        >
          {aqi}
        </text>
        <text x="60" y="68" textAnchor="middle" fill="#8a9bbf" fontSize="10" fontFamily='"IBM Plex Mono", monospace'>
          AQI
        </text>
      </svg>
    </div>
  );
}

export default function AirQualityWidget() {
  const { data, isLoading, error, refetch } = useAirQuality();

  return (
    <WidgetCard
      title="Качество воздуха"
      icon={<Wind size={18} weight="duotone" className="text-accent-primary" />}
      isLoading={isLoading}
      error={error ? 'Нет данных о качестве воздуха' : null}
      onRetry={() => refetch()}
    >
      {data && (() => {
        const c = data.current;
        const level = getAqiLevel(c.european_aqi);

        const pollutants = [
          { label: 'PM₂.₅', value: c.pm2_5,          unit: 'μg/m³', safe: 10 },
          { label: 'PM₁₀',  value: c.pm10,            unit: 'μg/m³', safe: 20 },
          { label: 'NO₂',   value: c.nitrogen_dioxide, unit: 'μg/m³', safe: 40 },
          { label: 'O₃',    value: c.ozone,            unit: 'μg/m³', safe: 100 },
        ];

        return (
          <div>
            <AqiGauge aqi={c.european_aqi} color={level.color} />

            {/* Status pill (replaces emoji smiley) */}
            <div className="flex flex-col items-center text-center mb-5">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-1.5"
                style={{ background: `${level.color}1a`, border: `1px solid ${level.color}40` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: level.color }} />
                <span className="text-sm font-bold" style={{ color: level.color, fontFamily: '"Cormorant Garamond", serif' }}>
                  {level.label}
                </span>
              </div>
              <div className="text-text-secondary text-xs max-w-[220px] leading-relaxed">{level.description}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {pollutants.map((p) => {
                const over = p.value > p.safe;
                const pct = Math.min(100, (p.value / p.safe) * 100);
                const c2 = over ? '#fb923c' : '#4fc3f7';
                return (
                  <div key={p.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] text-text-secondary uppercase tracking-wider" style={mono}>{p.label}</span>
                      <span className="text-[9px] text-text-secondary/70" style={mono}>{p.unit}</span>
                    </div>
                    <div className="text-sm font-bold mt-0.5" style={{ ...mono, color: c2 }}>{p.value.toFixed(1)}</div>
                    <div className="mt-1.5 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: c2 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </WidgetCard>
  );
}
