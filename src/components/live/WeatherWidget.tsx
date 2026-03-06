import { useWeather, getWeatherInfo } from '../../hooks/api/useWeather';
import WidgetCard from '../ui/WidgetCard';
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip,
} from 'recharts';

function SunArc({ sunrise, sunset }: { sunrise: string; sunset: string }) {
  const now = new Date();
  const riseTime = new Date(sunrise);
  const setTime = new Date(sunset);
  const total = setTime.getTime() - riseTime.getTime();
  const elapsed = now.getTime() - riseTime.getTime();
  const progress = Math.max(0, Math.min(1, elapsed / total));

  // SVG arc: from left to right, semicircle (viewBox coords)
  const cx = 80; const cy = 48; const r = 42;
  const startAngle = Math.PI;
  const endAngle = 0;
  const t = startAngle + (endAngle - startAngle) * progress;
  const dotX = cx + r * Math.cos(t);
  const dotY = cy - r * Math.sin(t);

  const fmt = (d: Date) => d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="relative w-full">
      <svg className="w-full h-auto" viewBox="0 0 160 56" preserveAspectRatio="xMidYMid meet">
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="2"
        />
        {progress > 0 && (
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${dotX} ${dotY}`}
            fill="none"
            stroke="#e8b84b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        <circle cx={dotX} cy={dotY} r="5" fill="#e8b84b" />
        <circle cx={dotX} cy={dotY} r="9" fill="rgba(232,184,75,0.2)" />
        <line x1={cx - r - 6} y1={cy} x2={cx + r + 6} y2={cy} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      </svg>
      <div className="flex justify-between text-[10px] mt-1" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
        <span className="text-text-secondary">🌅 {fmt(riseTime)}</span>
        <span className="text-text-secondary">🌇 {fmt(setTime)}</span>
      </div>
    </div>
  );
}

export default function WeatherWidget() {
  const { data, isLoading, error, refetch } = useWeather();

  const errorMessage = error ? 'Не удалось загрузить погоду' : null;

  return (
    <WidgetCard
      title="Погода · Дубна"
      icon="🌡️"
      isLive
      isLoading={isLoading}
      error={errorMessage}
      onRetry={() => refetch()}
      className="h-full"
    >
      {data && (() => {
        const weather = data.current;
        const info = getWeatherInfo(weather.weather_code);
        const daily = data.daily;
        const hourly = data.hourly;

        // Hourly: next 24 hours from current hour
        const hourlyItems = hourly.time
          .map((t, i) => ({
            time: new Date(t),
            temp: hourly.temperature_2m[i],
            precip: hourly.precipitation_probability[i],
            weatherCode: hourly.weather_code[i],
          }))
          .filter((h) => h.time > new Date(new Date().setMinutes(0, 0, 0)))
          .slice(0, 24);

        // 7-day chart data
        const chartData = daily.time.map((t, i) => ({
          day: new Date(t).toLocaleDateString('ru-RU', { weekday: 'short' }),
          max: daily.temperature_2m_max[i],
          min: daily.temperature_2m_min[i],
        }));

        return (
          <div className="space-y-4">
            {/* Current weather */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-7xl select-none leading-none mb-1" role="img" aria-label={info.label}>
                  {info.icon}
                </div>
                <div
                  className="text-5xl font-bold text-text-primary leading-none"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  {Math.round(weather.temperature_2m)}°
                </div>
                <div className="text-text-secondary text-sm mt-1">{info.label}</div>
              </div>
              <div className="text-right space-y-1.5">
                <div className="text-text-secondary text-xs">
                  Ощущается <span className="text-text-primary" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {Math.round(weather.apparent_temperature)}°
                  </span>
                </div>
                <div className="text-text-secondary text-xs">
                  💨 <span className="text-text-primary" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {Math.round(weather.wind_speed_10m)} км/ч
                  </span>
                </div>
                <div className="text-text-secondary text-xs">
                  💧 <span className="text-text-primary" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    {weather.relative_humidity_2m}%
                  </span>
                </div>
              </div>
            </div>

            {/* Sunrise/sunset arc */}
            {daily.sunrise[0] && daily.sunset[0] && (
              <SunArc sunrise={daily.sunrise[0]} sunset={daily.sunset[0]} />
            )}

            {/* Hourly scroll */}
            {hourlyItems.length > 0 && (
              <div>
                <p
                  className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-2"
                  style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  Почасовой прогноз
                </p>
                <div className="overflow-x-auto">
                  <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
                    {hourlyItems.map((h, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 min-w-[44px]">
                        <span
                          className="text-[10px] text-text-secondary"
                          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                        >
                          {h.time.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </span>
                        <span className="text-lg select-none" role="img" aria-hidden="true">
                          {getWeatherInfo(h.weatherCode).icon}
                        </span>
                        <span
                          className="text-xs text-text-primary font-bold"
                          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                        >
                          {Math.round(h.temp)}°
                        </span>
                        <span
                          className="text-[10px]"
                          style={{
                            color: h.precip > 50 ? '#4fc3f7' : '#8a9bbf',
                            fontFamily: '"IBM Plex Mono", monospace',
                          }}
                        >
                          {h.precip}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7-day forecast */}
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-2"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                7 дней
              </p>
              <div className="space-y-1">
                {daily.time.slice(0, 7).map((t, i) => {
                  const precip = daily.precipitation_probability_max[i] ?? 0;
                  const winfo = getWeatherInfo(daily.weather_code[i]);
                  return (
                    <div key={t} className="flex items-center gap-2">
                      <span
                        className="text-[11px] text-text-secondary w-8 shrink-0 capitalize"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                      >
                        {new Date(t).toLocaleDateString('ru-RU', { weekday: 'short' })}
                      </span>
                      <span className="text-sm select-none w-6 shrink-0" role="img" aria-hidden="true">
                        {winfo.icon}
                      </span>
                      <span
                        className="text-[11px] text-text-secondary w-8 shrink-0"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                      >
                        {Math.round(daily.temperature_2m_min[i])}°
                      </span>
                      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent-primary/60"
                          style={{ width: `${precip}%` }}
                        />
                      </div>
                      <span
                        className="text-[11px] text-accent-primary w-8 text-right shrink-0"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                      >
                        {Math.round(daily.temperature_2m_max[i])}°
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mini chart */}
            <div>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#8a9bbf', fontSize: 9, fontFamily: '"IBM Plex Mono", monospace' }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: '#131a28',
                      border: '1px solid rgba(79,195,247,0.2)',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontFamily: '"IBM Plex Mono", monospace',
                    }}
                    formatter={(v: number | undefined) => v !== undefined ? [`${v}°C`, ''] : ['', '']}
                  />
                  <Line type="monotone" dataKey="max" stroke="#e8b84b" strokeWidth={1.5} dot={false} activeDot={false} />
                  <Line type="monotone" dataKey="min" stroke="#4fc3f7" strokeWidth={1.5} dot={false} activeDot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })()}
    </WidgetCard>
  );
}
