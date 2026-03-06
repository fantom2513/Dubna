import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { periodicElements, elementTimeline, type Element } from '../../data/dubna';
import { useInView } from '../../hooks/useInView';

function ElementCell({ element, onClick }: { element: Element; onClick: (e: Element) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="relative aspect-square rounded-lg border text-center flex flex-col items-center justify-center p-1 transition-all"
      style={{
        borderColor: element.fromDubna
          ? 'rgba(79,195,247,0.5)'
          : 'rgba(255,255,255,0.06)',
        background: element.fromDubna
          ? hovered
            ? 'rgba(79,195,247,0.2)'
            : 'rgba(79,195,247,0.08)'
          : 'rgba(255,255,255,0.02)',
        boxShadow: element.fromDubna && hovered
          ? '0 0 20px rgba(79,195,247,0.3)'
          : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(element)}
      whileHover={{ scale: element.fromDubna ? 1.08 : 1.03 }}
      transition={{ duration: 0.15 }}
    >
      <span
        className="text-[8px] leading-none"
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          color: element.fromDubna ? '#4fc3f7' : '#8a9bbf',
          opacity: 0.7,
        }}
      >
        {element.number}
      </span>
      <span
        className="font-bold leading-tight"
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 'clamp(10px, 1.5vw, 16px)',
          color: element.fromDubna ? '#4fc3f7' : '#8a9bbf',
          opacity: element.fromDubna ? 1 : 0.4,
        }}
      >
        {element.symbol}
      </span>
      <span
        className="text-[7px] leading-none hidden md:block"
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          color: element.fromDubna ? '#7ecb7e' : '#8a9bbf',
          opacity: element.fromDubna ? 0.8 : 0.25,
        }}
      >
        {element.year}
      </span>
    </motion.button>
  );
}

function ElementTooltip({ element, onClose }: { element: Element; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-bg-card border border-accent-primary/30 rounded-2xl p-8 max-w-sm w-full text-center"
        style={{ boxShadow: '0 0 60px rgba(79,195,247,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="text-7xl font-bold text-accent-primary mb-2"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          {element.symbol}
        </div>
        <div className="text-4xl font-bold text-text-primary mb-1" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          {element.nameRu}
        </div>
        <div className="text-text-secondary text-sm mb-4">{element.name}</div>
        <div className="flex justify-center gap-6">
          <div>
            <div className="text-accent-primary font-bold" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              {element.number}
            </div>
            <div className="text-text-secondary text-xs">атомный номер</div>
          </div>
          <div>
            <div className="text-accent-secondary font-bold" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              {element.year}
            </div>
            <div className="text-text-secondary text-xs">год открытия</div>
          </div>
        </div>
        {element.fromDubna && (
          <div className="mt-4 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            Открыт в Дубне ✦
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-6 text-text-secondary text-xs hover:text-text-primary transition-colors"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          [закрыть]
        </button>
      </div>
    </motion.div>
  );
}

export default function Science() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="science" className="bg-bg-secondary py-32 px-6 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-accent-primary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            ОИЯИ · Атомное сердце
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-cormorant font-bold text-text-primary"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Синтез элементов
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Timeline */}
          <div>
            <div className="space-y-0">
              {elementTimeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full shrink-0 mt-1.5 group-hover:scale-125 transition-transform"
                      style={{ background: '#4fc3f7', boxShadow: '0 0 10px rgba(79,195,247,0.5)' }}
                    />
                    {i < elementTimeline.length - 1 && (
                      <div className="w-px flex-1 bg-accent-primary/15 my-1" style={{ minHeight: '40px' }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <span
                      className="text-xs text-accent-secondary"
                      style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                    >
                      {item.year}
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-2xl font-bold text-text-primary"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                      >
                        {item.nameRu}
                      </span>
                      <span
                        className="text-sm text-accent-primary"
                        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                      >
                        {item.symbol} · {item.number}
                      </span>
                    </div>
                    {item.note && (
                      <span className="text-xs text-accent-tertiary mt-1 block">← {item.note}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 p-6 rounded-2xl border border-accent-primary/20 bg-bg-primary/50"
            >
              <div
                className="text-4xl font-bold text-accent-primary mb-1"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                7 из 118
              </div>
              <p className="text-text-secondary text-sm">
                элементов таблицы Менделеева открыты в Дубне
              </p>
            </motion.div>
          </div>

          {/* Right: Periodic table (104-118) */}
          <div>
            <p
              className="text-xs text-text-secondary uppercase tracking-[0.2em] mb-6"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Тяжёлые элементы 104–118
            </p>
            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {periodicElements.map((el) => (
                <ElementCell key={el.number} element={el} onClick={setSelectedElement} />
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-4" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              Нажмите на элемент для подробностей
            </p>
          </div>
        </div>
      </div>

      {/* Tooltip modal */}
      <AnimatePresence>
        {selectedElement && (
          <ElementTooltip element={selectedElement} onClose={() => setSelectedElement(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
