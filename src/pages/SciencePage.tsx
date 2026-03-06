import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { ArrowSquareOut, UsersThree, Buildings, CaretDown } from '@phosphor-icons/react';
import PageLayout from '@/components/layout/PageLayout';
import LazyImage from '@/components/ui/LazyImage';
import GlassCard from '@/components/ui/GlassCard';
import { SectionLabel, SectionTitle, SectionSubtitle, MonoText } from '@/components/ui/Typography';
import ElementsTable from '@/components/ui/ElementsTable';
import DiscoveriesTimeline from '@/components/ui/DiscoveriesTimeline';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { images } from '@/data/images';
import { useInView } from '@/hooks/useInView';
import { getLenis } from '@/lib/lenis';

function scrollTo(id: string) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

// ── 1. Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <LazyImage src={images.jinr} alt="ОИЯИ" className="w-full h-full" priority />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(7,9,15,0.5) 0%, rgba(7,9,15,0.2) 40%, rgba(7,9,15,0.7) 80%, #07090f 100%)',
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 pb-20" style={{ zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <SectionLabel className="text-white/70">
            Объединённый институт ядерных исследований
          </SectionLabel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <SectionTitle
            gradient
            className="mt-2"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}
          >
            Здесь рождаются элементы
          </SectionTitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <SectionSubtitle className="text-white/70 mt-3">
            ОИЯИ — международный центр фундаментальных исследований, основанный в 1956 году.
            Здесь открыто 7 новых элементов таблицы Менделеева.
          </SectionSubtitle>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-2 mt-5"
        >
          {['⚛️ 7 открытых элементов', '🌍 18 стран-членов', '👥 5 600 сотрудников', '📅 с 1956 года'].map((b) => (
            <Badge
              key={b}
              className="px-3 py-1 h-auto text-sm text-white border-white/20 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              {b}
            </Badge>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8"
        >
          <button
            onClick={() => scrollTo('elements-table')}
            className="px-6 py-3 rounded-full text-sm font-medium text-bg-primary transition-all hover:opacity-90"
            style={{ background: 'var(--accent-primary)', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Интерактивная таблица
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
        onClick={() => scrollTo('key-facts')}
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

// ── 2. Key facts (CountUp) ────────────────────────────────────────────────────
const facts = [
  { value: 18,   suffix: '',  label: 'стран-членов',        tooltip: 'Государства-члены ОИЯИ по всему миру' },
  { value: 5600, suffix: '+', label: 'сотрудников',          tooltip: 'Учёные, инженеры и специалисты' },
  { value: 7,    suffix: '',  label: 'открытых элементов',  tooltip: 'Дб, Rf, Sg, Bh, Fl, Mc, Og — открыты в Дубне' },
  { value: 1956, suffix: '',  label: 'год основания',        tooltip: 'Основан 26 марта 1956 года' },
] as const;

function KeyFactsSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <section id="key-facts" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>01 / Факты</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">ОИЯИ в цифрах</SectionTitle>
          </motion.div>
        </div>

        <TooltipProvider delayDuration={200}>
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 mb-6">
            {facts.map((fact, i) => (
              <ShadcnTooltip key={fact.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="bg-bg-card border-t border-b border-white/5 p-8 text-center cursor-default
                               border-r border-r-white/5 last:border-r-0 hover:border-accent-primary/20 transition-all"
                  >
                    <div
                      className="text-accent-primary font-bold leading-none mb-2"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(32px, 4vw, 56px)' }}
                    >
                      {inView ? (
                        <CountUp start={0} end={fact.value} duration={2.5} separator=" " delay={i * 0.1} />
                      ) : '0'}
                      {fact.suffix && <span>{fact.suffix}</span>}
                    </div>
                    <div className="text-text-secondary text-sm">{fact.label}</div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    backdropFilter: 'blur(12px)',
                    color: 'var(--foreground)',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '11px',
                  }}
                >
                  {fact.tooltip}
                </TooltipContent>
              </ShadcnTooltip>
            ))}
          </div>
        </TooltipProvider>

        <p
          className="text-center text-xs"
          style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Данные: ОИЯИ, jinr.ru, 2024
        </p>
      </div>
    </section>
  );
}

// ── 3. Elements table ─────────────────────────────────────────────────────────
function ElementsSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="elements-table" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-4">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>02 / Таблица элементов</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Открытия ОИЯИ</SectionTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="mt-3"
          >
            <SectionSubtitle>
              Элементы 104–118 — семь из них открыты учёными Дубны.
              Нажмите на подсвеченный элемент, чтобы узнать подробности.
            </SectionSubtitle>
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex gap-5 text-sm mb-8 mt-6">
          <span className="flex items-center gap-2 text-text-secondary">
            <span
              className="w-4 h-4 rounded"
              style={{ background: 'rgba(79,195,247,0.15)', border: '1px solid rgba(79,195,247,0.5)' }}
            />
            Открыт в Дубне
          </span>
          <span className="flex items-center gap-2 text-text-secondary">
            <span
              className="w-4 h-4 rounded"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
            />
            Другие элементы
          </span>
        </div>

        <ElementsTable />
      </div>
    </section>
  );
}

// ── 4. Timeline ───────────────────────────────────────────────────────────────
function TimelineSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="timeline" className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>03 / История открытий</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Таймлайн Дубны</SectionTitle>
          </motion.div>
        </div>

        <div className="max-w-2xl">
          <DiscoveriesTimeline />
        </div>
      </div>
    </section>
  );
}

// ── 5. Excursions ─────────────────────────────────────────────────────────────
function ExcursionSection() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="excursions" className="py-24 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="mb-12">
          <motion.div initial={{ opacity: 0 }} animate={titleInView ? { opacity: 1 } : {}}>
            <SectionLabel>04 / Экскурсии</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            <SectionTitle className="mt-2">Посетить ОИЯИ</SectionTitle>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Group excursions */}
          <GlassCard glowColor="blue" className="p-8">
            <UsersThree size={32} color="#4fc3f7" className="mb-4" />
            <h3
              className="text-xl font-bold text-text-primary mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Групповые экскурсии
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              ОИЯИ принимает организованные группы от 10 человек. Экскурсия включает посещение
              ускорителей, лабораторий и знакомство с историей открытий.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>📅</MonoText>
                <span>По предварительной заявке</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>👥</MonoText>
                <span>От 10 человек</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>🕐</MonoText>
                <span>~2 часа</span>
              </div>
            </div>
            <a
              href="https://jinr.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-bg-primary transition-all hover:opacity-90"
              style={{ background: 'var(--accent-primary)', fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Записаться на экскурсию
              <ArrowSquareOut size={14} />
            </a>
          </GlassCard>

          {/* Museum */}
          <GlassCard className="p-8">
            <Buildings size={32} className="text-text-secondary mb-4" />
            <h3
              className="text-xl font-bold text-text-primary mb-3"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Музей истории науки
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              Музей ОИЯИ открыт для всех желающих. Экспозиция рассказывает об истории института,
              открытых элементах и достижениях учёных.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>🕐</MonoText>
                <span>Вт–Вс: 10:00 — 17:00</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>💰</MonoText>
                <span>Вход свободный</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
                <MonoText>📍</MonoText>
                <span>г. Дубна, ул. Жолио-Кюри, 6</span>
              </div>
            </div>
            <a
              href="https://jinr.ru/museum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-full"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Подробнее о музее
              <ArrowSquareOut size={14} />
            </a>
          </GlassCard>
        </div>

        {/* CTA banner */}
        <GlassCard className="p-10 text-center" style={{ background: 'radial-gradient(ellipse at center, rgba(79,195,247,0.08) 0%, transparent 70%), var(--glass-bg)' }}>
          <h3
            className="text-2xl font-bold text-text-primary mb-3"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Хотите узнать больше о науке в Дубне?
          </h3>
          <p className="text-text-secondary mb-6">
            Официальный сайт ОИЯИ — новости, исследования, история института.
          </p>
          <a
            href="https://jinr.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-bg-primary transition-all hover:opacity-90"
            style={{ background: 'var(--accent-primary)', fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Официальный сайт ОИЯИ
            <ArrowSquareOut size={14} />
          </a>
        </GlassCard>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SciencePage() {
  return (
    <PageLayout title="Наука и ОИЯИ" description="ОИЯИ — международный центр ядерных исследований в Дубне">
      <HeroSection />
      <KeyFactsSection />
      <ElementsSection />
      <TimelineSection />
      <ExcursionSection />
    </PageLayout>
  );
}
