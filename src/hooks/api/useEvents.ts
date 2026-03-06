import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface KudaGoEvent {
  id: number;
  title: string;
  short_title: string;
  dates: { start: number; end: number }[];
  place: { title: string } | null;
  tags: string[];
  description: string;
}

export interface EventCategory {
  label: string;
  color: string;
  tag: string;
}

export const eventCategories: EventCategory[] = [
  { label: 'Все',      color: '#8a9bbf', tag: '' },
  { label: 'Наука',    color: '#4fc3f7', tag: 'science' },
  { label: 'Выставки', color: '#a78bfa', tag: 'exhibition' },
  { label: 'Концерты', color: '#f472b6', tag: 'concert' },
  { label: 'Лекции',   color: '#34d399', tag: 'lecture' },
];

export function getCategoryInfo(tags: string[]): EventCategory {
  for (const cat of eventCategories.slice(1)) {
    if (tags.includes(cat.tag)) return cat;
  }
  return { label: 'Событие', color: '#e8b84b', tag: 'festival' };
}

export function formatEventDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });
}

async function fetchEvents(): Promise<KudaGoEvent[]> {
  const actualSince = Math.floor(Date.now() / 1000);
  const { data } = await axios.get<{ results: KudaGoEvent[] }>(
    'https://kudago.com/public-api/v1.4/events/',
    {
      params: {
        lang: 'ru',
        location: 'msk',
        fields: 'id,title,short_title,dates,place,tags,description',
        tags: 'science,exhibition,festival,concert,lecture',
        page_size: 12,
        actual_since: actualSince,
        order_by: '-publication_date',
      },
      timeout: 10_000,
    }
  );
  return data.results ?? [];
}

export function useEvents() {
  return useQuery<KudaGoEvent[], Error>({
    queryKey: ['events', 'dubna'],
    queryFn: fetchEvents,
    refetchInterval: 3_600_000,
    staleTime: 1_800_000,
  });
}
