import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface AirQualityCurrent {
  time: string;
  pm2_5: number;
  pm10: number;
  european_aqi: number;
  us_aqi: number;
  nitrogen_dioxide: number;
  ozone: number;
}

export interface AirQualityData {
  current: AirQualityCurrent;
}

export interface AqiLevel {
  label: string;
  color: string;
  emoji: string;
  description: string;
}

export function getAqiLevel(aqi: number): AqiLevel {
  if (aqi <= 20) return { label: 'Отличный',    color: '#4ade80', emoji: '😊', description: 'Безопасно для всех' };
  if (aqi <= 40) return { label: 'Хороший',     color: '#86efac', emoji: '🙂', description: 'Допустимо для всех' };
  if (aqi <= 60) return { label: 'Умеренный',   color: '#fde047', emoji: '😐', description: 'Чувствительным людям лучше остаться дома' };
  if (aqi <= 80) return { label: 'Плохой',      color: '#fb923c', emoji: '😷', description: 'Рекомендуется сократить время на улице' };
  return          { label: 'Очень плохой',       color: '#f87171', emoji: '☠️', description: 'Избегайте пребывания на улице' };
}

async function fetchAirQuality(): Promise<AirQualityData> {
  const url = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
  url.searchParams.set('latitude', '56.74');
  url.searchParams.set('longitude', '37.17');
  url.searchParams.set('current', 'pm2_5,pm10,european_aqi,us_aqi,nitrogen_dioxide,ozone');
  url.searchParams.set('timezone', 'Europe/Moscow');

  const { data } = await axios.get<AirQualityData>(url.toString());
  return data;
}

export function useAirQuality() {
  return useQuery<AirQualityData, Error>({
    queryKey: ['air-quality', 'dubna'],
    queryFn: fetchAirQuality,
    refetchInterval: 900_000,
    staleTime: 600_000,
  });
}
