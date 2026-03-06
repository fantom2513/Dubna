import { useAirQuality, getAqiLevel } from '../../hooks/api/useAirQuality';
import WidgetCard from '../ui/WidgetCard';

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
      icon="🌍"
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

            <div className="text-center mb-4">
              <div className="text-2xl mb-1" role="img" aria-label={level.label}>
                {level.emoji}
              </div>
              <div
                className="text-base font-bold"
                style={{ fontFamily: '"Cormorant Garamond", serif', color: level.color }}
              >
                {level.label}
              </div>
              <div className="text-text-secondary text-xs mt-1">{level.description}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {pollutants.map((p) => (
                <div key={p.label} className="bg-bg-secondary/50 rounded-lg p-2">
                  <div
                    className="text-[10px] text-text-secondary uppercase tracking-wider"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {p.label}
                  </div>
                  <div
                    className="text-sm font-bold mt-0.5"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      color: p.value > p.safe ? '#fb923c' : '#4fc3f7',
                    }}
                  >
                    {p.value.toFixed(1)}
                  </div>
                  <div
                    className="text-[9px] text-text-secondary"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {p.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </WidgetCard>
  );
}
