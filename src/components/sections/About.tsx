import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { images } from '@/data/images';

// Subtle background images for cards (null = no bg photo)
const blockImages: Record<string, string | null> = {
  history: null,
  science: images.jinr,
  nature:  images.volga,
};

const blocks = [
  {
    id: 'history',
    label: '01 / История',
    title: 'Рождён в эпоху атома',
    content:
      'Дубна возникла в 1956 году как секретный закрытый город для советских ядерных физиков. Здесь, на берегу Волги, были сосредоточены лучшие умы страны, создававшие будущее человечества. Сегодня наукоград сохраняет научное наследие и продолжает привлекать исследователей со всего мира.',
    timeline: [
      { year: '1956', event: 'Основание города и ОИЯИ' },
      { year: '1964', event: 'Открытие резерфордия' },
      { year: '1992', event: 'Статус наукограда' },
      { year: '2024', event: 'Сегодня' },
    ],
    color: '#e8b84b',
  },
  {
    id: 'science',
    label: '02 / Наука',
    title: 'Сердце мировой физики',
    content:
      'ОИЯИ — Объединённый институт ядерных исследований — объединяет 18 государств-членов и ведёт фундаментальные исследования в области ядерной физики. В институте синтезированы 7 новых элементов Периодической таблицы Менделеева. Ускоритель NICA открывает новую эпоху в понимании материи.',
    stats: [
      { value: '18', label: 'стран-членов' },
      { value: '7', label: 'новых элементов' },
      { value: '5600', label: 'сотрудников' },
    ],
    color: '#4fc3f7',
  },
  {
    id: 'nature',
    label: '03 / Природа',
    title: 'На слиянии рек',
    content:
      'Дубна расположена в уникальном месте — на слиянии Волги, Дубны и канала имени Москвы. Сосновые леса, чистый воздух и широкие речные просторы делают город настоящим оазисом природы в Московской области. Здесь природа и наука существуют в гармонии.',
    nature: ['Волга', 'Канал им. Москвы', 'р. Дубна', 'Сосновые леса'],
    color: '#7ecb7e',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="about" ref={sectionRef} className="relative bg-bg-primary py-32 overflow-hidden">
      {/* Decorative element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-right leading-none"
        >
          <div
            className="font-cormorant font-black text-white/[0.03] leading-none"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(120px, 20vw, 280px)',
            }}
          >
            105
          </div>
          <div
            className="text-white/[0.04] text-right mr-6"
            style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '1.5rem', letterSpacing: '0.3em' }}
          >
            Dubnium · Db
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div ref={titleRef} className="mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-accent-primary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Анатомия города
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-cormorant font-bold text-text-primary"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(40px, 5vw, 64px)',
            }}
          >
            О городе
          </motion.h2>
        </div>

        {/* Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {blocks.map((block, idx) => (
            <AboutBlock key={block.id} block={block} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Block {
  id: string;
  label: string;
  title: string;
  content: string;
  color: string;
  timeline?: { year: string; event: string }[];
  stats?: { value: string; label: string }[];
  nature?: string[];
}

function AboutBlock({ block, index }: { block: Block; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="relative bg-bg-card border border-white/5 rounded-2xl p-8 hover:border-accent-primary/20 transition-all duration-500 overflow-hidden"
    >
      {/* Subtle background photo */}
      {blockImages[block.id] && (
        <img
          src={blockImages[block.id]!}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ opacity: block.id === 'science' ? 0.06 : 0.1 }}
        />
      )}
      <p
        className="text-xs uppercase tracking-[0.2em] mb-4"
        style={{ fontFamily: '"IBM Plex Mono", monospace', color: block.color }}
      >
        {block.label}
      </p>
      <h3
        className="text-2xl font-bold text-text-primary mb-4"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
      >
        {block.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">{block.content}</p>

      {/* Timeline */}
      {block.timeline && (
        <div className="space-y-3">
          {block.timeline.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="text-xs text-accent-secondary shrink-0 w-10"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {item.year}
              </span>
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-xs text-text-secondary text-right">{item.event}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {block.stats && (
        <div className="grid grid-cols-3 gap-4 mt-2">
          {block.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl font-bold text-accent-primary"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {s.value}
              </div>
              <div className="text-xs text-text-secondary mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Nature tags */}
      {block.nature && (
        <div className="flex flex-wrap gap-2 mt-2">
          {block.nature.map((n, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full border border-accent-tertiary/30 text-accent-tertiary"
            >
              {n}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
