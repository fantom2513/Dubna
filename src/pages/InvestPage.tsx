import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Buildings,
  CurrencyDollar,
  Trophy,
  Clock,
  CheckCircle,
  Cpu,
  Flask,
  GraduationCap,
  Globe,
  Leaf,
  Handshake,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import PageLayout from '@/components/layout/PageLayout';
import LazyImage from '@/components/ui/LazyImage';
import GlassCard from '@/components/ui/GlassCard';
import { SectionLabel, SectionTitle, SectionSubtitle } from '@/components/ui/Typography';
import { images } from '@/data/images';
import { useInView } from '@/hooks/useInView';

// ── 1. Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <LazyImage src={images.oez} alt="ОЭЗ Дубна" className="w-full h-full" priority />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(7,9,15,0.4) 0%, rgba(7,9,15,0.15) 30%, rgba(7,9,15,0.75) 75%, #07090f 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at 60% 80%, rgba(232,184,75,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 pb-20" style={{ zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <SectionLabel style={{ color: 'rgba(232,184,75,0.8)' }}>
            Особая экономическая зона · Технико-внедренческого типа
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
              background: 'linear-gradient(135deg, #e8b84b 0%, #f5d47a 50%, #e8b84b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Инвестируйте в будущее
          </SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SectionSubtitle className="mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            ОЭЗ «Дубна» — ведущая особая экономическая зона России с уникальным налоговым режимом
            и готовой инфраструктурой для высокотехнологичного бизнеса.
          </SectionSubtitle>
        </motion.div>
      </div>
    </section>
  );
}

// ── 2. Metrics (CountUp) ──────────────────────────────────────────────────────
const metrics = [
  {
    icon: Buildings,
    value: 100,
    suffix: '+',
    label: 'резидентов',
    sub: 'Высокотехнологичные компании',
    prefix: '',
  },
  {
    icon: Clock,
    value: 20,
    suffix: '',
    label: 'лет ОЭЗ',
    sub: 'Работает с 2005 года',
    prefix: '',
  },
  {
    icon: CurrencyDollar,
    value: 0,
    suffix: '%',
    label: 'налог на прибыль',
    sub: 'Первые 5 лет деятельности',
    prefix: '',
  },
  {
    icon: Trophy,
    value: 3,
    suffix: '',
    label: 'место в РФ',
    sub: 'Рейтинг эффективности ОЭЗ',
    prefix: '#',
  },
] as const;

function MetricsSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel style={{ color: '#e8b84b' }}>01 / ОЭЗ в цифрах</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Ключевые показатели</SectionTitle>
          </motion.div>
        </div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard
                  glowColor="gold"
                  className="p-6 text-center h-full flex flex-col items-center justify-center gap-2"
                >
                  <Icon size={28} color="#e8b84b" weight="duotone" />
                  <div
                    className="font-bold leading-none mt-1"
                    style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 'clamp(28px, 4vw, 48px)',
                      color: '#e8b84b',
                    }}
                  >
                    {m.prefix}
                    {inView ? (
                      <CountUp start={0} end={m.value} duration={2.5} delay={i * 0.1} />
                    ) : '0'}
                    {m.suffix}
                  </div>
                  <div className="text-text-primary font-medium text-sm">{m.label}</div>
                  <div className="text-text-secondary text-xs">{m.sub}</div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 3. Advantages ─────────────────────────────────────────────────────────────
const advantages = [
  {
    icon: CurrencyDollar,
    title: 'Налоговые льготы',
    items: [
      '0% налог на прибыль (5 лет)',
      '5% сниженная ставка (далее)',
      'Освобождение от налога на имущество',
      '0% земельный налог',
    ],
  },
  {
    icon: Cpu,
    title: 'Готовая инфраструктура',
    items: [
      'Лабораторные и офисные корпуса',
      'Высокоскоростной интернет',
      'Резервное электроснабжение',
      'Логистические терминалы',
    ],
  },
  {
    icon: Flask,
    title: 'Научная экосистема',
    items: [
      'ОИЯИ — мировой центр науки',
      'Университет «Дубна»',
      'Совместные R&D проекты',
      'Доступ к уникальному оборудованию',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Кадры и образование',
    items: [
      'Выпускники ведущих вузов',
      'Программы целевой подготовки',
      'Международные специалисты ОИЯИ',
      'Центры переквалификации',
    ],
  },
  {
    icon: Globe,
    title: 'Международный статус',
    items: [
      '18 стран-членов ОИЯИ',
      'Международные соглашения',
      'Упрощённые визовые процедуры',
      'Глобальная коллаборация',
    ],
  },
  {
    icon: Leaf,
    title: 'Экология и качество жизни',
    items: [
      'Чистый воздух и водоёмы',
      'Зелёные зоны вокруг ОЭЗ',
      'Комфортный жилой район',
      'Развитая городская среда',
    ],
  },
] as const;

function AdvantagesSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel style={{ color: '#e8b84b' }}>02 / Преимущества</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Почему ОЭЗ «Дубна»</SectionTitle>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((adv, i) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <GlassCard glowColor="gold" className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={24} color="#e8b84b" weight="duotone" />
                    <h3
                      className="font-semibold text-text-primary"
                      style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem' }}
                    >
                      {adv.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {adv.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <CheckCircle size={14} color="#e8b84b" weight="fill" className="mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 4. Residents Marquee ──────────────────────────────────────────────────────
const residents1 = [
  'Роснано', 'ИТК', 'Дубна-Оптик', 'Протон-ПМ', 'ЭлТеко', 'Сонет', 'Дубна-Тех', 'НТЦ ЭЛИНС',
  'Физтех-Союз', 'ИТЦ Дубна', 'АТС-Дубна', 'КБ Аэрокосмос',
];
const residents2 = [
  'Экситон', 'НТЦ Буран', 'ДубнаSoft', 'Квант-Д', 'Лазертех', 'Нанотех-С', 'СМП-Дубна',
  'Радиотроника', 'Дубна-Био', 'ИТМ-Системы', 'ТехноДрайв', 'МикроПрибор',
];

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2">
      <div
        className="flex gap-4 w-max"
        style={{
          animation: `marquee ${reverse ? '35s' : '28s'} linear infinite ${reverse ? 'reverse' : ''}`,
        }}
      >
        {doubled.map((name, i) => (
          <span
            key={i}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm whitespace-nowrap"
            style={{
              border: '1px solid rgba(232,184,75,0.25)',
              background: 'rgba(232,184,75,0.05)',
              color: 'rgba(232,184,75,0.8)',
              fontFamily: '"IBM Plex Mono", monospace',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ResidentsSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          <SectionLabel style={{ color: '#e8b84b' }}>03 / Резиденты</SectionLabel>
          <SectionTitle className="mt-2">Компании-резиденты ОЭЗ</SectionTitle>
          <p className="text-text-secondary text-sm mt-2">
            Более 100 высокотехнологичных компаний выбрали Дубну
          </p>
        </motion.div>
      </div>

      <div className="space-y-3">
        <MarqueeRow items={residents1} />
        <MarqueeRow items={residents2} reverse />
      </div>
    </section>
  );
}

// ── 5. CTA ────────────────────────────────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section className="py-32 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center"
      >
        <Handshake size={48} color="#e8b84b" weight="duotone" className="mx-auto mb-6" />
        <SectionTitle
          className="mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          Станьте резидентом ОЭЗ
        </SectionTitle>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Подайте заявку на получение статуса резидента и получите доступ к уникальным
          налоговым преимуществам и инфраструктуре мирового уровня.
        </p>
        <a
          href="https://oez-dubna.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #e8b84b 0%, #d4a43a 100%)',
            color: '#07090f',
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '0.9rem',
            boxShadow: '0 0 40px rgba(232,184,75,0.3)',
          }}
        >
          Официальный сайт ОЭЗ «Дубна»
          <ArrowSquareOut size={18} weight="bold" />
        </a>
        <p
          className="text-text-secondary text-xs mt-4"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          oez-dubna.ru
        </p>
      </motion.div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function InvestPage() {
  return (
    <PageLayout title="Инвестиции">
      <HeroSection />
      <MetricsSection />
      <AdvantagesSection />
      <ResidentsSection />
      <CTASection />
    </PageLayout>
  );
}
