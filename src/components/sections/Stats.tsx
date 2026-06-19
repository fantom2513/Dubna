import ScrambleNumber from '@/components/ui/ScrambleNumber';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { cityStats, radarData, populationData } from '../../data/dubna';
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Tooltip texts keyed by label
const statTooltips: Record<string, string> = {
  'Жителей':             'По данным Росстат, 2023',
  'Год основания':        'Дубна основана как закрытый научный городок',
  'Элемент':             'Дубний (Db) — назван в честь города',
  'Стран-членов ОИЯИ':   '18 государств-членов ОИЯИ',
  'Учёных в ОИЯИ':       'Ядерных физиков и исследователей',
  'НИИ и технопарков':   'Научно-исследовательских организаций',
};

export default function Stats() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="stats" className="bg-bg-secondary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionHeader eyebrow="Город в цифрах" title="Статистика" className="mb-16" />

        {/* Counter cards */}
        <TooltipProvider delayDuration={200}>
          <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 rounded-2xl overflow-hidden mb-20">
            {cityStats.map((stat, i) => (
              <ShadcnTooltip key={stat.label}>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="bg-bg-card p-6 text-center hover:bg-white/[0.04] transition-colors duration-200 cursor-default"
                  >
                    <div
                      className="text-accent-primary font-bold leading-none mb-2"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(24px, 3vw, 40px)' }}
                    >
                      <ScrambleNumber
                        value={stat.value}
                        active={inView}
                        separator={stat.label === 'Год основания' ? '' : ' '}
                        delay={i * 100}
                      />
                      {stat.suffix && (
                        <span className="text-accent-secondary text-base ml-1">{stat.suffix}</span>
                      )}
                    </div>
                    <div className="text-text-secondary text-xs leading-tight">{stat.label}</div>
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
                  {statTooltips[stat.label] ?? stat.description}
                </TooltipContent>
              </ShadcnTooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Source attribution */}
        <p
          className="text-center text-xs mb-16 -mt-14"
          style={{ color: 'var(--muted-foreground)', fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Данные: ОИЯИ, Росстат, ОЭЗ Дубна, 2024
        </p>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-white/5 rounded-2xl p-8"
          >
            <h3
              className="text-text-primary mb-6 text-lg font-bold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Индекс развития города
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="rgba(255,255,255,0.07)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#8a9bbf', fontSize: 11, fontFamily: '"IBM Plex Mono", monospace' }}
                />
                <Radar
                  name="Дубна"
                  dataKey="value"
                  stroke="#4fc3f7"
                  fill="#4fc3f7"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-bg-card border border-white/5 rounded-2xl p-8"
          >
            <h3
              className="text-text-primary mb-6 text-lg font-bold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Рост населения 1956–2024
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={populationData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="popGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4fc3f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4fc3f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: '#8a9bbf', fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis
                  tick={{ fill: '#8a9bbf', fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#131a28',
                    border: '1px solid rgba(79,195,247,0.2)',
                    borderRadius: '8px',
                    color: '#e8edf5',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '12px',
                  }}
                  formatter={(value: number | undefined) => value !== undefined ? [`${value.toLocaleString('ru')} чел.`, 'Население'] : ['—', 'Население']}
                />
                <Area
                  type="monotone"
                  dataKey="population"
                  stroke="#4fc3f7"
                  strokeWidth={2}
                  fill="url(#popGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
