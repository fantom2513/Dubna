export interface CityStat {
  value: number;
  label: string;
  suffix?: string;
  description: string;
  decimals?: number;
}

export interface Attraction {
  id: string;
  name: string;
  category: 'Наука' | 'История' | 'Природа' | 'Архитектура';
  description: string;
  size: 'normal' | 'tall' | 'wide';
  gradientFrom: string;
  gradientTo: string;
}

export interface Element {
  number: number;
  symbol: string;
  name: string;
  nameRu: string;
  year: number;
  fromDubna: boolean;
}

export interface Season {
  id: string;
  name: string;
  icon: string;
  tempRange: string;
  description: string;
  activities: string[];
  color: string;
}

export interface ArchitectureItem {
  id: string;
  name: string;
  year: string;
  gradient: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface RadarDataPoint {
  subject: string;
  value: number;
  fullMark: number;
}

export interface TemperatureDataPoint {
  month: string;
  temp: number;
  min: number;
  max: number;
}

export interface PopulationDataPoint {
  year: number;
  population: number;
}

// City statistics
export const cityStats: CityStat[] = [
  {
    value: 76000,
    label: 'Жителей',
    description: 'Население наукограда',
  },
  {
    value: 1956,
    label: 'Год основания',
    description: 'Основан как закрытый научный городок',
  },
  {
    value: 105,
    label: 'Элемент',
    suffix: 'Db',
    description: 'Дубний — назван в честь города',
  },
  {
    value: 18,
    label: 'Стран-членов ОИЯИ',
    description: 'Международный ядерный центр',
  },
  {
    value: 5600,
    label: 'Учёных в ОИЯИ',
    description: 'Ядерных физиков и исследователей',
  },
  {
    value: 12,
    label: 'НИИ и технопарков',
    description: 'Научно-исследовательских организаций',
  },
];

// Attractions
export const attractions: Attraction[] = [
  {
    id: 'jinr',
    name: 'ОИЯИ',
    category: 'Наука',
    description:
      'Объединённый институт ядерных исследований — международный центр мирового значения. Здесь синтезированы 7 новых элементов таблицы Менделеева, открытых советскими и российскими учёными.',
    size: 'tall',
    gradientFrom: '#0e1f3d',
    gradientTo: '#0a3a5c',
  },
  {
    id: 'lenin',
    name: 'Памятник Ленину',
    category: 'История',
    description:
      'Одна из крупнейших скульптур Ленина в России. Монументальный памятник стоит на берегу канала имени Москвы с 1961 года.',
    size: 'normal',
    gradientFrom: '#1a1206',
    gradientTo: '#2d2010',
  },
  {
    id: 'embankment',
    name: 'Набережная Волги',
    category: 'Природа',
    description:
      '3 км прогулочной зоны вдоль канала имени Москвы. Закаты здесь — отдельная достопримечательность, привлекающая фотографов со всего Подмосковья.',
    size: 'wide',
    gradientFrom: '#061520',
    gradientTo: '#0c2a3d',
  },
  {
    id: 'dk-mir',
    name: 'ДК «Мир»',
    category: 'Архитектура',
    description:
      'Дворец культуры в стиле сталинского ампира в первозданном виде. Символ правобережной Дубны, построенный в 1950-е годы.',
    size: 'normal',
    gradientFrom: '#1a0e0e',
    gradientTo: '#2d1a1a',
  },
  {
    id: 'jinr-museum',
    name: 'Музей ОИЯИ',
    category: 'Наука',
    description:
      'Экспозиция об истории синтеза трансурановых элементов. Уникальные экспонаты эпохи советской ядерной физики и современных исследований.',
    size: 'normal',
    gradientFrom: '#061828',
    gradientTo: '#0e2a40',
  },
  {
    id: 'park',
    name: 'Парк Большая Волга',
    category: 'Природа',
    description:
      'Сосновый лес прямо у воды. Место для пикников, байдарок и зимних лыжных прогулок в окружении векового леса.',
    size: 'tall',
    gradientFrom: '#061a0a',
    gradientTo: '#0e2d14',
  },
  {
    id: 'big-chair',
    name: 'Большой стул',
    category: 'Архитектура',
    description:
      'Арт-объект в центре Дубны — деревянный стул высотой несколько метров, ставший неофициальным символом города и популярным местом для фотографий.',
    size: 'normal',
    gradientFrom: '#1a0e06',
    gradientTo: '#3a2010',
  },
  {
    id: 'dam-viewpoint',
    name: 'Смотровая площадка у плотины',
    category: 'Природа',
    description:
      'Панорамная точка на гребне Иваньковской ГЭС — самое высокое место в городе с видом на Волжское водохранилище и лесные массивы обоих берегов.',
    size: 'normal',
    gradientFrom: '#061520',
    gradientTo: '#0a2a3d',
  },
];

// Periodic table elements (104-118)
export const periodicElements: Element[] = [
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', nameRu: 'Резерфордий', year: 1964, fromDubna: true },
  { number: 105, symbol: 'Db', name: 'Dubnium', nameRu: 'Дубний', year: 1967, fromDubna: true },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', nameRu: 'Сиборгий', year: 1974, fromDubna: true },
  { number: 107, symbol: 'Bh', name: 'Bohrium', nameRu: 'Борий', year: 1981, fromDubna: false },
  { number: 108, symbol: 'Hs', name: 'Hassium', nameRu: 'Хассий', year: 1984, fromDubna: false },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', nameRu: 'Мейтнерий', year: 1982, fromDubna: false },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', nameRu: 'Дармштадтий', year: 1994, fromDubna: false },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', nameRu: 'Рентгений', year: 1994, fromDubna: false },
  { number: 112, symbol: 'Cn', name: 'Copernicium', nameRu: 'Коперниций', year: 1996, fromDubna: false },
  { number: 113, symbol: 'Nh', name: 'Nihonium', nameRu: 'Нихоний', year: 2004, fromDubna: false },
  { number: 114, symbol: 'Fl', name: 'Flerovium', nameRu: 'Флеровий', year: 2002, fromDubna: true },
  { number: 115, symbol: 'Mc', name: 'Moscovium', nameRu: 'Московий', year: 2003, fromDubna: true },
  { number: 116, symbol: 'Lv', name: 'Livermorium', nameRu: 'Ливерморий', year: 2000, fromDubna: true },
  { number: 117, symbol: 'Ts', name: 'Tennessine', nameRu: 'Теннессин', year: 2010, fromDubna: true },
  { number: 118, symbol: 'Og', name: 'Oganesson', nameRu: 'Оганесон', year: 2002, fromDubna: true },
];

// Timeline of element synthesis in Dubna
export const elementTimeline = [
  { year: 1964, number: 104, symbol: 'Rf', nameRu: 'Резерфордий', note: '' },
  { year: 1967, number: 105, symbol: 'Db', nameRu: 'Дубний', note: 'назван в честь города' },
  { year: 1974, number: 106, symbol: 'Sg', nameRu: 'Сиборгий', note: '' },
  { year: 2000, number: 116, symbol: 'Lv', nameRu: 'Ливерморий', note: '' },
  { year: 2002, number: 114, symbol: 'Fl', nameRu: 'Флеровий', note: '' },
  { year: 2003, number: 115, symbol: 'Mc', nameRu: 'Московий', note: '' },
  { year: 2010, number: 118, symbol: 'Og', nameRu: 'Оганесон', note: 'в честь Ю. Оганесяна' },
];

// Seasons data
export const seasons: Season[] = [
  {
    id: 'winter',
    name: 'Зима',
    icon: '❄',
    tempRange: '-15°C / -3°C',
    description:
      'Дубна зимой — это заснеженные сосновые леса, замёрзший канал и уютные кафе в центре города. Тихая, почти нордическая атмосфера наукограда.',
    activities: ['Лыжные прогулки в лесу', 'Каток на набережной', 'Посещение музея ОИЯИ', 'Фотосессия в снежном лесу'],
    color: '#4fc3f7',
  },
  {
    id: 'spring',
    name: 'Весна',
    icon: '🌸',
    tempRange: '2°C / 15°C',
    description:
      'Весной Дубна пробуждается вместе с природой. Разлив Волги создаёт живописные пейзажи, а цветущие сады украшают все улицы города.',
    activities: ['Прогулки по набережной', 'Наблюдение за перелётными птицами', 'Велопрогулки по лесным тропам', 'Рыбалка на Волге'],
    color: '#7ecb7e',
  },
  {
    id: 'summer',
    name: 'Лето',
    icon: '☀',
    tempRange: '18°C / 28°C',
    description:
      'Лето в Дубне — это пляжи на Волге, городские фестивали и белые ночи. Тёплый сезон привлекает туристов со всего Подмосковья.',
    activities: ['Купание на пляже', 'Сплав на байдарках', 'Городские фестивали', 'Пикники в Парке Большая Волга'],
    color: '#e8b84b',
  },
  {
    id: 'autumn',
    name: 'Осень',
    icon: '🍂',
    tempRange: '5°C / 16°C',
    description:
      'Осенняя Дубна особенно живописна. Золото берёзовых рощ отражается в тёмных водах Волги, создавая неповторимые закаты.',
    activities: ['Сбор грибов в лесу', 'Осенние фотопрогулки', 'Культурные мероприятия', 'Вечерние прогулки по набережной'],
    color: '#e8834b',
  },
];

// Architecture gallery items
export const architectureItems: ArchitectureItem[] = [
  { id: 'arch1', name: 'Главпочтамт Дубны', year: '1950-е', gradient: 'from-gray-800 to-gray-900' },
  { id: 'arch2', name: 'ДК «Мир»', year: '1954', gradient: 'from-slate-700 to-slate-900', colSpan: 2 },
  { id: 'arch3', name: 'Жилые дома улицы Мира', year: '1955–1960', gradient: 'from-zinc-700 to-zinc-900' },
  { id: 'arch4', name: 'Кинотеатр «Октябрь»', year: '1957', gradient: 'from-stone-700 to-stone-900' },
  { id: 'arch5', name: 'Административные здания', year: '1952–1958', gradient: 'from-neutral-700 to-neutral-900', colSpan: 2 },
  { id: 'arch6', name: 'Набережная правого берега', year: '1950-е', gradient: 'from-gray-700 to-gray-950' },
];

// Radar chart data
export const radarData: RadarDataPoint[] = [
  { subject: 'Наука', value: 98, fullMark: 100 },
  { subject: 'Экология', value: 82, fullMark: 100 },
  { subject: 'История', value: 88, fullMark: 100 },
  { subject: 'Инфраструктура', value: 74, fullMark: 100 },
  { subject: 'Туризм', value: 65, fullMark: 100 },
  { subject: 'Качество жизни', value: 79, fullMark: 100 },
];

// Temperature data
export const temperatureData: TemperatureDataPoint[] = [
  { month: 'Янв', temp: -8, min: -14, max: -3 },
  { month: 'Фев', temp: -7, min: -13, max: -2 },
  { month: 'Мар', temp: -1, min: -6, max: 3 },
  { month: 'Апр', temp: 8, min: 2, max: 14 },
  { month: 'Май', temp: 15, min: 8, max: 21 },
  { month: 'Июн', temp: 19, min: 13, max: 25 },
  { month: 'Июл', temp: 22, min: 15, max: 27 },
  { month: 'Авг', temp: 20, min: 14, max: 26 },
  { month: 'Сен', temp: 13, min: 8, max: 19 },
  { month: 'Окт', temp: 6, min: 2, max: 11 },
  { month: 'Ноя', temp: 0, min: -4, max: 4 },
  { month: 'Дек', temp: -5, min: -10, max: -1 },
];

// Population data
export const populationData: PopulationDataPoint[] = [
  { year: 1956, population: 12000 },
  { year: 1960, population: 25000 },
  { year: 1965, population: 38000 },
  { year: 1970, population: 50000 },
  { year: 1975, population: 58000 },
  { year: 1980, population: 63000 },
  { year: 1985, population: 67000 },
  { year: 1990, population: 70000 },
  { year: 1995, population: 68000 },
  { year: 2000, population: 66000 },
  { year: 2005, population: 67000 },
  { year: 2010, population: 71000 },
  { year: 2015, population: 73000 },
  { year: 2020, population: 75000 },
  { year: 2024, population: 76000 },
];
