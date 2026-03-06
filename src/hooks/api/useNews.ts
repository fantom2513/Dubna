import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  snippet: string;
}

// rss2json response shape
interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
  content?: string;
}

interface Rss2JsonResponse {
  status: string;
  items: Rss2JsonItem[];
}

export function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  if (isNaN(date)) return '';
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHour = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 60) return `${diffMin} мин назад`;
  if (diffHour < 24) return `${diffHour}ч назад`;
  if (diffDay === 1) return 'вчера';
  if (diffDay < 7) return `${diffDay} дня назад`;
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 120);
}

async function fetchNews(): Promise<NewsItem[]> {
  const RSS_URL = 'https://dubna.ru/rss/';

  // Try rss2json first (more reliable CORS)
  try {
    const { data } = await axios.get<Rss2JsonResponse>(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`,
      { timeout: 8000 }
    );
    if (data.status === 'ok' && data.items?.length) {
      return data.items.slice(0, 6).map((item) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        snippet: stripHtml(item.description ?? item.content ?? ''),
      }));
    }
  } catch {
    // try allorigins fallback
  }

  // Fallback: allorigins raw XML proxy
  try {
    const { data } = await axios.get<string>(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
      { timeout: 8000, responseType: 'text' }
    );
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/xml');
    const items = Array.from(doc.querySelectorAll('item')).slice(0, 6);
    return items.map((item) => ({
      title: item.querySelector('title')?.textContent ?? '',
      link: item.querySelector('link')?.textContent ?? '',
      pubDate: item.querySelector('pubDate')?.textContent ?? '',
      snippet: stripHtml(item.querySelector('description')?.textContent ?? ''),
    }));
  } catch {
    // Both failed
  }

  return [];
}

export function useNews() {
  return useQuery<NewsItem[], Error>({
    queryKey: ['news', 'dubna'],
    queryFn: fetchNews,
    refetchInterval: 1_800_000,
    staleTime: 900_000,
    retry: 1,
  });
}
