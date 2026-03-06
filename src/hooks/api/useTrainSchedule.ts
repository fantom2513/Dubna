import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Train {
  departure: string;  // HH:mm
  arrival: string;    // HH:mm
  durationMin: number;
  stopsCount: number;
  isNext?: boolean;
}

export interface TrainScheduleResult {
  trains: Train[];
  isMock: boolean;
}

// Moscow time helpers
function nowMoscow(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
}

function toMoscowTime(dateStr: string): Date {
  return new Date(new Date(dateStr).toLocaleString('en-US', { timeZone: 'Europe/Moscow' }));
}

function parseHHMM(d: Date): string {
  return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// Mock data (realistic suburban train times)
const MOCK_TRAINS: Train[] = [
  { departure: '06:42', arrival: '09:10', durationMin: 148, stopsCount: 14 },
  { departure: '08:15', arrival: '10:42', durationMin: 147, stopsCount: 12 },
  { departure: '10:37', arrival: '13:04', durationMin: 147, stopsCount: 14 },
  { departure: '12:10', arrival: '14:38', durationMin: 148, stopsCount: 13 },
  { departure: '14:43', arrival: '17:12', durationMin: 149, stopsCount: 14 },
  { departure: '16:20', arrival: '18:48', durationMin: 148, stopsCount: 12 },
  { departure: '18:55', arrival: '21:22', durationMin: 147, stopsCount: 13 },
  { departure: '20:30', arrival: '22:58', durationMin: 148, stopsCount: 14 },
];

function filterFutureTrains(trains: Train[]): Train[] {
  const now = nowMoscow();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const future = trains.filter((t) => {
    const [h, m] = t.departure.split(':').map(Number);
    return h * 60 + m > nowMinutes;
  });
  if (future.length > 0) future[0] = { ...future[0], isNext: true };
  return future.slice(0, 6);
}

interface YandexSegment {
  departure: string;
  arrival: string;
  duration: number;
  stops_count?: number;
}

async function fetchRealTrains(apiKey: string): Promise<Train[]> {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await axios.get<{ segments: YandexSegment[] }>(
    'https://api.rasp.yandex.net/v3.0/search/',
    {
      params: {
        apikey: apiKey,
        from: 's9600213',   // Москва Савёловская
        to: 's9603832',     // Дубна
        transport_types: 'suburban',
        date: today,
        limit: 10,
      },
      timeout: 10_000,
    }
  );
  const now = nowMoscow();
  const trains: Train[] = (data.segments ?? [])
    .map((seg): Train => {
      const dep = toMoscowTime(seg.departure);
      const arr = toMoscowTime(seg.arrival);
      return {
        departure: parseHHMM(dep),
        arrival: parseHHMM(arr),
        durationMin: Math.round(seg.duration / 60),
        stopsCount: seg.stops_count ?? 0,
      };
    })
    .filter((t) => {
      const [h, m] = t.departure.split(':').map(Number);
      const depMin = h * 60 + m;
      const nowMin = now.getHours() * 60 + now.getMinutes();
      return depMin > nowMin;
    })
    .slice(0, 6);

  if (trains.length > 0) trains[0] = { ...trains[0], isNext: true };
  return trains;
}

async function fetchTrains(): Promise<TrainScheduleResult> {
  const apiKey = import.meta.env.VITE_YANDEX_RASP_KEY as string | undefined;

  if (!apiKey) {
    return { trains: filterFutureTrains(MOCK_TRAINS), isMock: true };
  }

  try {
    const trains = await fetchRealTrains(apiKey);
    return { trains, isMock: false };
  } catch {
    return { trains: filterFutureTrains(MOCK_TRAINS), isMock: true };
  }
}

export function useTrainSchedule() {
  return useQuery<TrainScheduleResult, Error>({
    queryKey: ['trains', 'dubna'],
    queryFn: fetchTrains,
    refetchInterval: 300_000,
    staleTime: 60_000,
  });
}
