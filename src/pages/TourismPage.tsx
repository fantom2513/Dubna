import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Train, Car, Bus, ArrowSquareOut, CaretDown,
  Buildings, ForkKnife, Flask, Gift,
} from '@phosphor-icons/react';
import PageLayout from '@/components/layout/PageLayout';
import LazyImage from '@/components/ui/LazyImage';
import GlassCard from '@/components/ui/GlassCard';
import { SectionLabel, SectionTitle, SectionSubtitle, MonoText } from '@/components/ui/Typography';
import Divider from '@/components/ui/Divider';
import AttractionCard from '@/components/ui/AttractionCard';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { images } from '@/data/images';
import { attractions, seasons } from '@/data/dubna';
import { useInView } from '@/hooks/useInView';
import { getLenis } from '@/lib/lenis';

// ── Smooth scroll helper ──────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
  else el?.scrollIntoView({ behavior: 'smooth' });
}

// ── 1. Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <LazyImage src={images.volga} alt="Вид на Волгу" className="w-full h-full" priority />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(7,9,15,0.5) 0%, rgba(7,9,15,0.2) 40%, rgba(7,9,15,0.7) 80%, #07090f 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6 pb-20"
        style={{ zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel className="text-white/70">Добро пожаловать</SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <SectionTitle
            gradient
            className="mt-2"
            style={{ fontSize: 'clamp(48px, 8vw, 96px)' } as React.CSSProperties}
          >
            Откройте Дубну
          </SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SectionSubtitle className="text-white/70 mt-3">
            Наукоград на берегу Волги — 110 км от Москвы
          </SectionSubtitle>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-5"
        >
          {['🚂 2 часа от Москвы', '🔬 Наукоград', '🌊 Берег Волги', '🏛️ ОИЯИ'].map((b) => (
            <Badge
              key={b}
              className="px-3 py-1 h-auto text-sm text-white border-white/20 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              {b}
            </Badge>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          <button
            onClick={() => scrollTo('places')}
            className="px-6 py-3 rounded-full text-sm font-medium text-bg-primary transition-all hover:opacity-90"
            style={{ background: 'var(--accent-primary)', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Достопримечательности
          </button>
          <button
            onClick={() => scrollTo('how-to-get')}
            className="px-6 py-3 rounded-full text-sm font-medium text-white/80 border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Как добраться
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 cursor-pointer"
        style={{ zIndex: 10 }}
        onClick={() => scrollTo('places')}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs tracking-[0.2em] uppercase" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            scroll
          </span>
          <CaretDown size={20} weight="thin" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── 2. Places ─────────────────────────────────────────────────────────────────
function PlacesSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="places" className="py-24 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-4">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>02 / Места</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Что посмотреть</SectionTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="mt-3"
          >
            <SectionSubtitle>Восемь мест, которые стоит увидеть в Дубне</SectionSubtitle>
          </motion.div>
        </div>

        <Divider className="my-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[220px]">
          {attractions.map((attraction, i) => (
            <AttractionCard key={attraction.id} attraction={attraction} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. How to get ─────────────────────────────────────────────────────────────
function HowToGetSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="how-to-get" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>03 / Маршрут</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Как добраться</SectionTitle>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Train */}
          <GlassCard glowColor="blue" className="p-6 relative">
            <div className="absolute top-4 right-4">
              <Badge className="text-xs bg-accent-primary/20 border-accent-primary/40 text-accent-primary">
                Рекомендуем
              </Badge>
            </div>
            <Train size={32} color="#4fc3f7" className="mb-4" />
            <SectionLabel className="mb-2">На поезде</SectionLabel>
            <h3 className="text-text-primary font-semibold mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem' }}>
              Савёловский вокзал → Дубна
            </h3>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>⏱</MonoText>
                <span>~1 ч 55 мин</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>🔄</MonoText>
                <span>Каждые 1–2 часа</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>💰</MonoText>
                <span>от 300 ₽</span>
              </div>
            </div>
            <a
              href="https://www.rzd.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-accent-primary hover:text-text-primary transition-colors"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Расписание <ArrowSquareOut size={14} />
            </a>
          </GlassCard>

          {/* Car */}
          <GlassCard glowColor="gold" className="p-6">
            <Car size={32} color="#e8b84b" className="mb-4" />
            <SectionLabel className="mb-2" style={{ color: 'var(--accent-secondary)' } as React.CSSProperties}>На машине</SectionLabel>
            <h3 className="text-text-primary font-semibold mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem' }}>
              Дмитровское шоссе (А104)
            </h3>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>📍</MonoText>
                <span>120 км от МКАД</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>⏱</MonoText>
                <span>~2 часа (без пробок)</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>⚠️</MonoText>
                <span>Пт вечер / Вс вечер — пробки</span>
              </div>
            </div>
            <div
              className="rounded-lg p-3 text-sm"
              style={{
                background: 'rgba(234,179,8,0.08)',
                border: '1px solid rgba(234,179,8,0.2)',
                color: 'rgba(234,179,8,0.8)',
                fontFamily: 'Geologica, sans-serif',
              }}
            >
              Планируйте поездку заранее в выходные
            </div>
          </GlassCard>

          {/* Bus */}
          <GlassCard className="p-6">
            <Bus size={32} color="var(--muted-foreground)" className="mb-4" />
            <SectionLabel className="mb-2" style={{ color: 'var(--muted-foreground)' } as React.CSSProperties}>На автобусе</SectionLabel>
            <h3 className="text-text-primary font-semibold mb-4" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem' }}>
              От метро Тимирязевская
            </h3>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>🚌</MonoText>
                <span>Также от м. Алтуфьево</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>⏱</MonoText>
                <span>~2.5 часа</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>📋</MonoText>
                <span>Уточняйте расписание</span>
              </div>
            </div>
            <a
              href="https://www.mosgortrans.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Расписание мосгортранс <ArrowSquareOut size={14} />
            </a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

// ── 4. Seasons ────────────────────────────────────────────────────────────────
const BEST_SEASON = 'summer';

function SeasonsSection() {
  const [active, setActive] = useState('summer');
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const current = seasons.find((s) => s.id === active) ?? seasons[0];

  return (
    <section id="seasons" className="py-24 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>04 / Сезоны</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Когда приехать</SectionTitle>
          </motion.div>
        </div>

        {/* Season tabs — same layoutId pattern as Climate.tsx */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {seasons.map((season) => (
            <button
              key={season.id}
              onClick={() => setActive(season.id)}
              className="relative px-5 py-2 rounded-full text-sm transition-all flex items-center gap-2"
              style={{
                color: active === season.id ? '#07090f' : '#8a9bbf',
                fontFamily: '"IBM Plex Mono", monospace',
              }}
            >
              {active === season.id && (
                <motion.div
                  layoutId="tourism-season-tab"
                  className="absolute inset-0 rounded-full"
                  style={{ background: season.color }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{season.name}</span>
              {season.id === BEST_SEASON && (
                <span
                  className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full"
                  style={{
                    background: active === season.id ? 'rgba(0,0,0,0.2)' : 'rgba(232,184,75,0.15)',
                    color: active === season.id ? '#07090f' : '#e8b84b',
                    fontFamily: '"IBM Plex Mono", monospace',
                  }}
                >
                  ★
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Season content with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left: description */}
            <div>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-7xl select-none" role="img" aria-label={current.name}>
                  {current.icon}
                </div>
                <div>
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', color: current.color }}
                  >
                    {current.tempRange}
                  </div>
                  <div className="text-text-secondary text-sm mt-1">
                    {current.name}
                    {current.id === BEST_SEASON && (
                      <Badge
                        className="ml-2 text-[10px] h-auto py-0.5"
                        style={{ background: 'rgba(232,184,75,0.15)', color: '#e8b84b', borderColor: 'rgba(232,184,75,0.3)' }}
                      >
                        ★ Лучшее время
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-text-secondary leading-relaxed">{current.description}</p>
            </div>

            {/* Right: activities */}
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: '"IBM Plex Mono", monospace', color: current.color }}
              >
                Чем заняться
              </p>
              <ul className="space-y-3">
                {current.activities.map((activity, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-3 text-text-secondary"
                  >
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: current.color }} />
                    {activity}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 5. Practical info (FAQ Accordion) ─────────────────────────────────────────
const faqs = [
  {
    id: 'stay',
    Icon: Buildings,
    question: 'Где остановиться?',
    answer:
      'В Дубне несколько отелей разного уровня: отель «Дубна» (центр), гостиница «Москва», хостелы у реки. Также доступна аренда квартир посуточно через Авито и Циан.',
  },
  {
    id: 'food',
    Icon: ForkKnife,
    question: 'Где поесть?',
    answer:
      'Ресторан «Наука» у ОИЯИ, кафе на набережной, местные пиццерии и кофейни в центре. В выходные рекомендуем приезжать с запасом — популярные места могут быть заняты.',
  },
  {
    id: 'jinr-tour',
    Icon: Flask,
    question: 'Можно ли попасть в ОИЯИ?',
    answer:
      'Да! ОИЯИ принимает организованные экскурсионные группы. Нужно заранее подать заявку на сайте jinr.ru. Индивидуальные визиты — через музей истории науки ОИЯИ, который открыт для всех желающих.',
  },
  {
    id: 'souvenirs',
    Icon: Gift,
    question: 'Что привезти?',
    answer:
      'Уникальные сувениры с символикой элемента Дубний (Db, №105): магниты, кружки, футболки с таблицей Менделеева. Продаются в сувенирном магазине ОИЯИ и в нескольких точках в центре города.',
  },
] as const;

function PracticalSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="practical" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>05 / Практично</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Полезная информация</SectionTitle>
          </motion.div>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map(({ id, Icon, question, answer }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <AccordionItem
                value={id}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <AccordionTrigger
                  className="px-5 py-4 text-left text-text-primary hover:text-accent-primary hover:no-underline transition-colors"
                  style={{ fontFamily: 'Geologica, sans-serif' }}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} className="text-accent-primary shrink-0" />
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="px-5 pb-5 text-text-secondary leading-relaxed"
                  style={{ fontFamily: 'Geologica, sans-serif' }}
                >
                  {answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function TourismPage() {
  return (
    <PageLayout title="Туристам" description="Откройте Дубну — наукоград на берегу Волги">
      <HeroSection />
      <PlacesSection />
      <HowToGetSection />
      <SeasonsSection />
      <PracticalSection />
    </PageLayout>
  );
}
