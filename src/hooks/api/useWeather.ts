import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface WeatherCurrent {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  precipitation: number;
}

export interface WeatherDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
  precipitation_probability_max: number[];
}

export interface WeatherHourly {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
}

export interface WeatherData {
  current: WeatherCurrent;
  daily: WeatherDaily;
  hourly: WeatherHourly;
}

export interface WeatherCodeInfo {
  label: string;
  icon: string;
}

export const weatherCodeMap: Record<number, WeatherCodeInfo> = {
  0:  { label: 'Ясно',                   icon: '☀️' },
  1:  { label: 'Преимущественно ясно',   icon: '🌤️' },
  2:  { label: 'Переменная облачность',  icon: '⛅' },
  3:  { label: 'Пасмурно',              icon: '☁️' },
  45: { label: 'Туман',                 icon: '🌫️' },
  48: { label: 'Изморозь',              icon: '🌫️' },
  51: { label: 'Лёгкая морось',         icon: '🌦️' },
  53: { label: 'Умеренная морось',      icon: '🌦️' },
  55: { label: 'Сильная морось',        icon: '🌦️' },
  61: { label: 'Небольшой дождь',       icon: '🌧️' },
  63: { label: 'Умеренный дождь',       icon: '🌧️' },
  65: { label: 'Сильный дождь',         icon: '🌧️' },
  71: { label: 'Небольшой снег',        icon: '🌨️' },
  73: { label: 'Умеренный снег',        icon: '❄️' },
  75: { label: 'Сильный снег',          icon: '❄️' },
  80: { label: 'Ливень',                icon: '🌧️' },
  81: { label: 'Умеренный ливень',      icon: '⛈️' },
  85: { label: 'Снежный ливень',        icon: '🌨️' },
  95: { label: 'Гроза',                 icon: '⛈️' },
  99: { label: 'Гроза с градом',        icon: '⛈️' },
};

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return weatherCodeMap[code] ?? { label: 'Неизвестно', icon: '🌡️' };
}

const DUBNA_LAT = 56.74;
const DUBNA_LON = 37.17;

async function fetchWeather(): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(DUBNA_LAT));
  url.searchParams.set('longitude', String(DUBNA_LON));
  url.searchParams.set(
    'current',
    'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,precipitation'
  );
  url.searchParams.set(
    'daily',
    'temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset,precipitation_probability_max'
  );
  url.searchParams.set('hourly', 'temperature_2m,precipitation_probability,weather_code');
  url.searchParams.set('timezone', 'Europe/Moscow');
  url.searchParams.set('forecast_days', '7');

  const { data } = await axios.get<WeatherData>(url.toString());
  return data;
}

export function useWeather() {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', 'dubna'],
    queryFn: fetchWeather,
    refetchInterval: 600_000,
    staleTime: 300_000,
  });
}
