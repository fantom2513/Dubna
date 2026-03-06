// All local images live in /public/images/ and are served from /images/

export const images = {
  // ── Главная страница ─────────────────────────────
  hero: '/images/valga1.jpg',
  // панорама Волги — самое атмосферное фото

  // ── Природа и город ──────────────────────────────
  volga: '/images/Kanal-imeni-Moskvy-2.jpg',
  // канал имени Москвы, вода

  // ── Достопримечательности ─────────────────────────
  leninMonument: '/images/lenin.jpg',
  jinr:          '/images/Oblozhka-OIYAI-1.jpg',
  embankment:    '/images/naberezhnaya.jpg',
  dkMir:         '/images/dom-kulturi-mir.jpg',
  jinrMuseum:    '/images/nuclear_uni_inside.jpg',
  bigChair:      '/images/big_chair_main.jpg',
  dam:           '/images/old_ges.jpg',
  park:          '/images/big_volga_doma.jpg',

  // ── Другие секции ────────────────────────────────
  oez:     '/images/nuclear_uni.jpg',
  living:  '/images/volga2_kanal.jpg',
  science: '/images/Oblozhka-OIYAI-1.jpg',
} as const;

export type ImageKey = keyof typeof images;

// ── Галерея: все изображения ─────────────────────

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
}

export const galleryImages: GalleryItem[] = [
  { src: images.hero,          alt: 'Панорама Волги',         title: 'Вид на Волгу' },
  { src: images.volga,         alt: 'Канал имени Москвы',     title: 'Канал имени Москвы' },
  { src: images.leninMonument, alt: 'Памятник Ленину',        title: 'Монумент Ленину' },
  { src: images.jinr,          alt: 'ОИЯИ',                   title: 'Институт ядерных исследований' },
  { src: images.embankment,    alt: 'Набережная',             title: 'Набережная Волги' },
  { src: images.dkMir,         alt: 'ДК Мир',                title: 'Дворец культуры «Мир»' },
  { src: images.jinrMuseum,    alt: 'Ядерный университет',   title: 'Учебный корпус' },
  { src: images.bigChair,      alt: 'Большой стул',          title: 'Арт-объект «Большой стул»' },
  { src: images.dam,           alt: 'Иваньковская ГЭС',      title: 'Иваньковская ГЭС' },
  { src: images.park,          alt: 'Парк Большая Волга',    title: 'Парк Большая Волга' },
  { src: images.oez,           alt: 'Ядерный университет',   title: 'Университет «Дубна»' },
  { src: images.living,        alt: 'Волга и канал',         title: 'Берег Волги' },
  { src: '/images/bug_chair.webp', alt: 'Большой стул',     title: 'Арт-объект днём' },
  { src: images.science,       alt: 'ОИЯИ',                  title: 'ОИЯИ — центр науки' },
];
