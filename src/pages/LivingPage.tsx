import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hospital,
  GraduationCap,
  TreeEvergreen,
  Wind,
  Quotes,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';
import PageLayout from '@/components/layout/PageLayout';
import LazyImage from '@/components/ui/LazyImage';
import GlassCard from '@/components/ui/GlassCard';
import { SectionLabel, SectionTitle, SectionSubtitle } from '@/components/ui/Typography';
import { images } from '@/data/images';
import { useInView } from '@/hooks/useInView';
import { useAirQuality, getAqiLevel } from '@/hooks/api/useAirQuality';

// ── 1. Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <LazyImage src={images.living} alt="Волга и канал" className="w-full h-full" priority />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(7,9,15,0.35) 0%, rgba(7,9,15,0.1) 30%, rgba(7,9,15,0.75) 75%, #07090f 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at 40% 80%, rgba(126,203,126,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 pb-20" style={{ zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <SectionLabel style={{ color: 'rgba(126,203,126,0.85)' }}>
            Город у Волги · Подмосковье
          </SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <SectionTitle
            className="mt-2"
            style={{
              fontSize: 'clamp(40px, 7vw, 84px)',
              background: 'linear-gradient(135deg, #7ecb7e 0%, #a8e6a8 50%, #7ecb7e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Жить в Дубне
          </SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SectionSubtitle className="mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Дубна сочетает преимущества развитого наукограда с чистой природой, тишиной
            и близостью к Москве. Здесь живут учёные, программисты и их семьи.
          </SectionSubtitle>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Comparison bars ────────────────────────────────────────────────────────
const comparisons = [
  { label: 'Стоимость жилья', dubna: 38, moscow: 100, unit: 'Дубна в 2.6× дешевле' },
  { label: 'Трафик и пробки', dubna: 20, moscow: 100, unit: 'Пробок почти нет' },
  { label: 'Качество воздуха', dubna: 92, moscow: 45, unit: 'Значительно чище' },
  { label: 'Время до природы', dubna: 95, moscow: 30, unit: 'Лес в 5 минутах' },
] as const;

function ComparisonSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel style={{ color: '#7ecb7e' }}>01 / Сравнение</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Дубна vs Москва</SectionTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <SectionSubtitle className="mt-2">
              По ключевым показателям качества жизни
            </SectionSubtitle>
          </motion.div>
        </div>

        <div ref={ref} className="space-y-8">
          {comparisons.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-text-primary font-medium">{c.label}</span>
                <span
                  className="text-xs"
                  style={{ color: '#7ecb7e', fontFamily: '"IBM Plex Mono", monospace' }}
                >
                  {c.unit}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs w-16 text-right shrink-0"
                    style={{ color: '#7ecb7e', fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    Дубна
                  </span>
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #7ecb7e, #a8e6a8)' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${c.dubna}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.1 + 0.2, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs w-16 text-right shrink-0"
                    style={{ color: '#8a9bbf', fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    Москва
                  </span>
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'rgba(138,155,191,0.5)' }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${c.moscow}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.1 + 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p
          className="text-xs mt-8"
          style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
        >
          * Относительная шкала, основана на публичных данных 2023–2024 гг.
        </p>
      </div>
    </section>
  );
}

// ── 3. Infrastructure cards ───────────────────────────────────────────────────
function InfrastructureSection() {
  const { data: aqiData } = useAirQuality();
  const aqi = aqiData?.current?.european_aqi;
  const level = aqi != null ? getAqiLevel(aqi) : null;

  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  const cards = [
    {
      icon: Hospital,
      title: 'Медицина',
      color: '#f87171',
      items: [
        'Центральная городская больница',
        'Специализированные клиники',
        'Педиатрия мирового уровня',
        'Скорая помощь 24/7',
      ],
    },
    {
      icon: GraduationCap,
      title: 'Образование',
      color: '#4fc3f7',
      items: [
        'Университет «Дубна»',
        'Школы с углублённой физикой',
        'Детские сады рядом с домом',
        'Молодёжный центр ОИЯИ',
      ],
    },
    {
      icon: TreeEvergreen,
      title: 'Природа и спорт',
      color: '#7ecb7e',
      items: [
        'Парк «Большая Волга»',
        'Яхт-клуб на Волге',
        'Лесные трассы для бега',
        'Ледовый дворец',
      ],
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel style={{ color: '#7ecb7e' }}>02 / Инфраструктура</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Всё необходимое рядом</SectionTitle>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <GlassCard glowColor="green" className="p-6 h-full">
                  <Icon size={28} color={card.color} weight="duotone" className="mb-3" />
                  <h3
                    className="font-semibold text-text-primary mb-3"
                    style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem' }}
                  >
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="text-sm text-text-secondary flex items-start gap-2">
                        <span style={{ color: card.color, marginTop: 2, flexShrink: 0 }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}

          {/* AQI card — real data */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <GlassCard glowColor="green" className="p-6 h-full flex flex-col">
              <Wind size={28} color="#7ecb7e" weight="duotone" className="mb-3" />
              <h3
                className="font-semibold text-text-primary mb-3"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem' }}
              >
                Качество воздуха
              </h3>
              {level ? (
                <>
                  <div
                    className="text-4xl font-bold mb-1"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', color: level.color }}
                  >
                    {level.emoji} {aqi}
                  </div>
                  <div className="text-sm font-medium mb-1" style={{ color: level.color }}>
                    {level.label}
                  </div>
                  <p className="text-xs text-text-secondary mt-auto">{level.description}</p>
                  <p
                    className="text-xs mt-2"
                    style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    European AQI · Open-Meteo
                  </p>
                </>
              ) : (
                <div className="text-text-secondary text-sm mt-2">Загрузка данных...</div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 4. Testimonials carousel ──────────────────────────────────────────────────
const testimonials = [
  {
    text: 'Переехали из Москвы три года назад. Дети ходят пешком в школу, до леса 10 минут. Не могу представить, как жили в мегаполисе.',
    name: 'Анна К.',
    role: 'Программист, резидент ОЭЗ',
  },
  {
    text: 'Работаю в ОИЯИ уже 12 лет. Научная среда мирового уровня, а по вечерам — парус на Волге. Это сложно передать словами.',
    name: 'Дмитрий В.',
    role: 'Физик-ядерщик, ОИЯИ',
  },
  {
    text: 'Открыли стартап в ОЭЗ полтора года назад. Налоговые льготы, коллеги рядом, и можно бегать по набережной после работы.',
    name: 'Максим Р.',
    role: 'Основатель IT-компании',
  },
  {
    text: 'Дубна — это место, где умные люди не уезжают из страны. Здесь есть всё: наука, природа, семья. Лучший выбор в моей жизни.',
    name: 'Елена М.',
    role: 'Исследователь, ОИЯИ',
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setCurrent((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [inView]);

  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="mb-12 text-center">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel style={{ color: '#7ecb7e' }}>03 / Люди</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Что говорят жители</SectionTitle>
          </motion.div>
        </div>

        <div ref={ref}>
          <GlassCard glowColor="green" className="p-8 md:p-12 relative min-h-[220px] flex flex-col justify-between">
            <Quotes size={40} color="rgba(126,203,126,0.2)" weight="fill" className="absolute top-6 left-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p
                  className="text-text-primary leading-relaxed mb-6 relative"
                  style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(16px, 2.5vw, 20px)' }}
                >
                  «{testimonials[current].text}»
                </p>
                <div>
                  <div className="font-medium text-text-primary">{testimonials[current].name}</div>
                  <div
                    className="text-sm"
                    style={{ color: '#7ecb7e', fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {testimonials[current].role}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <CaretLeft size={20} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      background: i === current ? '#7ecb7e' : 'rgba(126,203,126,0.25)',
                      transform: i === current ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((i) => (i + 1) % testimonials.length)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <CaretRight size={20} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LivingPage() {
  return (
    <PageLayout title="Жить в Дубне">
      <HeroSection />
      <ComparisonSection />
      <InfrastructureSection />
      <TestimonialsSection />
    </PageLayout>
  );
}
