import type { ComponentType } from 'react';
import {
  Sun, CloudSun, Cloud, CloudFog, CloudRain, CloudSnow, CloudLightning,
  Wind, Drop, ThermometerSimple, SunHorizon, type IconProps,
} from '@phosphor-icons/react';
import { useWeather, getWeatherInfo } from '../../hooks/api/useWeather';
import WidgetCard from '../ui/WidgetCard';

type PhIcon = ComponentType<IconProps>;

// Weather-code → SVG icon + accent color (no emoji — design-system rule).
function weatherVisual(code: number): { Icon: PhIcon; color: string } {
  const GOLD = '#e8b84b';
  const BLUE = '#4fc3f7';
  const SNOW = '#bcd7ee';
  const GREY = '#8a9bbf';
  if (code === 0) return { Icon: Sun, color: GOLD };
  if (code === 1 || code === 2) return { Icon: CloudSun, color: GOLD };
  if (code === 3) return { Icon: Cloud, color: GREY };
  if (code === 45 || code === 48) return { Icon: CloudFog, color: GREY };
  if (code >= 51 && code <= 65) return { Icon: CloudRain, color: BLUE };
  if (code >= 71 && code <= 77) return { Icon: CloudSnow, color: SNOW };
  if (code === 80 || code === 81 || code === 82) return { Icon: CloudRain, color: BLUE };
  if (code === 85 || code === 86) return { Icon: CloudSnow, color: SNOW };
  if (code >= 95) return { Icon: CloudLightning, color: BLUE };
  return { Icon: Cloud, color: GREY };
}

const mono = { fontFamily: '"IBM Plex Mono", monospace' } as const;

function Metric({ Icon, value, label }: { Icon: PhIcon; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1 py-2.5 rounded-xl bg-white/[0.03]">
      <Icon size={16} weight="regular" className="text-accent-primary/80" />
      <span className="text-text-primary text-sm font-bold" style={mono}>{value}</span>
      <span className="text-text-secondary text-[10px] uppercase tracking-wider" style={mono}>{label}</span>
    </div>
  );
}

// Compact daylight progress (replaces the oversized static sun arc).
function Daylight({ sunrise, sunset }: { sunrise: string; sunset: string }) {
  const riseTime = new Date(sunrise);
  const setTime = new Date(sunset);
  const total = setTime.getTime() - riseTime.getTime();
  const elapsed = Date.now() - riseTime.getTime();
  const progress = Math.max(0, Math.min(1, elapsed / total));
  const pct = progress * 100;

  const fmt = (d: Date) =>
    d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5 text-[11px] text-text-secondary shrink-0" style={mono}>
        <SunHorizon size={14} className="text-accent-secondary" />
        {fmt(riseTime)}
      </span>
      <div className="relative flex-1 h-1 rounded-full bg-white/[0.06]">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, rgba(232,184,75,0.4), #e8b84b)' }}
        />
        {progress > 0 && progress < 1 && (
          <span
            className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-accent-secondary -translate-y-1/2"
            style={{ left: `calc(${pct}% - 5px)`, boxShadow: '0 0 8px rgba(232,184,75,0.6)' }}
          />
        )}
      </div>
      <span className="flex items-center gap-1.5 text-[11px] text-text-secondary shrink-0" style={mono}>
        {fmt(setTime)}
        <SunHorizon size={14} weight="fill" className="text-accent-secondary/70" />
      </span>
    </div>
  );
}

export default function WeatherWidget() {
  const { data, isLoading, error, refetch } = useWeather();
  const errorMessage = error ? 'Не удалось загрузить погоду' : null;

  return (
    <WidgetCard
      title="Погода · Дубна"
      icon={<ThermometerSimple size={18} className="text-accent-primary" />}
      isLive
      isLoading={isLoading}
      error={errorMessage}
      onRetry={() => refetch()}
      className="h-full"
    >
      {data && (() => {
        const weather = data.current;
        const info = getWeatherInfo(weather.weather_code);
        const { Icon: BigIcon, color } = weatherVisual(weather.weather_code);
        const daily = data.daily;
        const hourly = data.hourly;

        const hourTop = new Date(new Date().setMinutes(0, 0, 0));
        const hourlyItems = hourly.time
          .map((t, i) => ({
            time: new Date(t),
            temp: hourly.temperature_2m[i],
            precip: hourly.precipitation_probability[i],
            code: hourly.weather_code[i],
          }))
          .filter((h) => h.time > hourTop)
          .slice(0, 12);

        // Week temp range for the 7-day range bars
        const weekMin = Math.min(...daily.temperature_2m_min.slice(0, 7));
        const weekMax = Math.max(...daily.temperature_2m_max.slice(0, 7));
        const span = Math.max(1, weekMax - weekMin);

        return (
          <div className="space-y-5">
            {/* Hero: condition + temperature */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center w-20 h-20 rounded-2xl shrink-0"
                style={{ background: `radial-gradient(circle at 50% 40%, ${color}22, transparent 70%)` }}
              >
                <BigIcon size={56} weight="duotone" style={{ color }} aria-label={info.label} />
              </div>
              <div className="min-w-0">
                <div className="flex items-start gap-0.5">
                  <span className="text-text-primary font-bold leading-none" style={{ ...mono, fontSize: 'clamp(2.75rem, 9vw, 3.5rem)' }}>
                    {Math.round(weather.temperature_2m)}
                  </span>
                  <span className="text-accent-primary text-2xl leading-none mt-1" style={mono}>°</span>
                </div>
                <div className="text-text-primary text-sm mt-1 truncate">{info.label}</div>
                <div className="text-text-secondary text-xs mt-0.5">
                  Ощущается {Math.round(weather.apparent_temperature)}°
                </div>
              </div>
            </div>

            {/* Metric chips */}
            <div className="flex gap-2">
              <Metric Icon={Wind} value={`${Math.round(weather.wind_speed_10m)}`} label="км/ч" />
              <Metric Icon={Drop} value={`${weather.relative_humidity_2m}%`} label="влажн." />
              <Metric Icon={ThermometerSimple} value={`${Math.round(weather.apparent_temperature)}°`} label="ощущ." />
            </div>

            {/* Daylight progress */}
            {daily.sunrise[0] && daily.sunset[0] && (
              <Daylight sunrise={daily.sunrise[0]} sunset={daily.sunset[0]} />
            )}

            {/* Hourly */}
            {hourlyItems.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-2.5" style={mono}>
                  Почасовой прогноз
                </p>
                <div className="overflow-x-auto -mx-1 px-1">
                  <div className="flex gap-2" style={{ minWidth: 'max-content' }}>
                    {hourlyItems.map((h, i) => {
                      const v = weatherVisual(h.code);
                      return (
                        <div
                          key={i}
                          className="flex flex-col items-center gap-1.5 min-w-[46px] py-2.5 rounded-xl bg-white/[0.03]"
                        >
                          <span className="text-[10px] text-text-secondary" style={mono}>
                            {h.time.toLocaleTimeString('ru-RU', { hour: '2-digit', hour12: false })}
                          </span>
                          <v.Icon size={20} weight="fill" style={{ color: v.color }} />
                          <span className="text-xs text-text-primary font-bold" style={mono}>
                            {Math.round(h.temp)}°
                          </span>
                          <span
                            className="flex items-center gap-0.5 text-[9px]"
                            style={{ ...mono, color: h.precip > 40 ? '#4fc3f7' : '#6b7a99' }}
                          >
                            <Drop size={9} weight="fill" />{h.precip}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 7-day with temperature range bars */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-2.5" style={mono}>
                7 дней
              </p>
              <div className="space-y-2">
                {daily.time.slice(0, 7).map((t, i) => {
                  const dMin = daily.temperature_2m_min[i];
                  const dMax = daily.temperature_2m_max[i];
                  const left = ((dMin - weekMin) / span) * 100;
                  const width = Math.max(8, ((dMax - dMin) / span) * 100);
                  const v = weatherVisual(daily.weather_code[i]);
                  const isToday = i === 0;
                  return (
                    <div key={t} className="flex items-center gap-3">
                      <span
                        className={`text-[11px] w-9 shrink-0 capitalize ${isToday ? 'text-text-primary font-bold' : 'text-text-secondary'}`}
                        style={mono}
                      >
                        {new Date(t).toLocaleDateString('ru-RU', { weekday: 'short' })}
                      </span>
                      <v.Icon size={16} weight="fill" className="shrink-0" style={{ color: v.color }} />
                      <span className="text-[11px] text-text-secondary w-7 text-right shrink-0" style={mono}>
                        {Math.round(dMin)}°
                      </span>
                      <div className="relative flex-1 h-1.5 rounded-full bg-white/[0.06]">
                        <div
                          className="absolute h-full rounded-full"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            background: 'linear-gradient(90deg, #4fc3f7, #e8b84b)',
                          }}
                        />
                      </div>
                      <span className="text-[11px] text-text-primary w-7 shrink-0" style={mono}>
                        {Math.round(dMax)}°
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </WidgetCard>
  );
}
