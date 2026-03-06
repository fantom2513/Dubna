import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { seasons, temperatureData } from '../../data/dubna';
import { useInView } from '../../hooks/useInView';

export default function Climate() {
  const [activeSeason, setActiveSeason] = useState('winter');
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  const current = seasons.find((s) => s.id === activeSeason) ?? seasons[0];

  return (
    <section id="climate" className="bg-bg-secondary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-accent-primary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Климат и природа
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-cormorant font-bold text-text-primary"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Четыре сезона
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Season widget */}
          <div>
            {/* Season tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {seasons.map((season) => (
                <button
                  key={season.id}
                  onClick={() => setActiveSeason(season.id)}
                  className="relative px-5 py-2 rounded-full text-sm transition-all"
                  style={{
                    color: activeSeason === season.id ? '#07090f' : '#8a9bbf',
                    fontFamily: '"IBM Plex Mono", monospace',
                  }}
                >
                  {activeSeason === season.id && (
                    <motion.div
                      layoutId="season-tab"
                      className="absolute inset-0 rounded-full"
                      style={{ background: season.color }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{season.name}</span>
                </button>
              ))}
            </div>

            {/* Season content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSeason}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                {/* Icon + temp */}
                <div className="flex items-center gap-6 mb-6">
                  <div
                    className="text-7xl select-none"
                    role="img"
                    aria-label={current.name}
                  >
                    {current.icon}
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold"
                      style={{ fontFamily: '"IBM Plex Mono", monospace', color: current.color }}
                    >
                      {current.tempRange}
                    </div>
                    <div className="text-text-secondary text-sm mt-1">{current.name}</div>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-6">{current.description}</p>

                {/* Activities */}
                <div>
                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-3"
                    style={{ fontFamily: '"IBM Plex Mono", monospace', color: current.color }}
                  >
                    Чем заняться
                  </p>
                  <ul className="space-y-2">
                    {current.activities.map((activity, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 text-text-secondary text-sm"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: current.color }}
                        />
                        {activity}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Temperature chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-bg-card border border-white/5 rounded-2xl p-6"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] text-text-secondary mb-6"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Среднемесячные температуры (°C)
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={temperatureData} margin={{ top: 5, right: 10, bottom: 5, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#8a9bbf', fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis
                  tick={{ fill: '#8a9bbf', fontSize: 10, fontFamily: '"IBM Plex Mono", monospace' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}°`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0e1420',
                    border: '1px solid rgba(79,195,247,0.2)',
                    borderRadius: '8px',
                    color: '#e8edf5',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '12px',
                  }}
                  formatter={(v: number | undefined) => v !== undefined ? [`${v}°C`, 'Температура'] : ['—', 'Температура']}
                />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
                <Line
                  type="monotone"
                  dataKey="max"
                  stroke="#e8b84b"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#4fc3f7"
                  strokeWidth={2.5}
                  dot={{ fill: '#4fc3f7', r: 3 }}
                  activeDot={{ r: 5, fill: '#4fc3f7' }}
                />
                <Line
                  type="monotone"
                  dataKey="min"
                  stroke="#7ecb7e"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex gap-6 mt-4 justify-center">
              {[
                { color: '#4fc3f7', label: 'Средняя' },
                { color: '#e8b84b', label: 'Максимум' },
                { color: '#7ecb7e', label: 'Минимум' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className="w-4 h-0.5" style={{ background: l.color }} />
                  <span
                    className="text-xs text-text-secondary"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
