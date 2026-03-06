import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { periodicElements, type Element } from '@/data/dubna';

// ── Single element cell ────────────────────────────────────────────────────────
function ElementCell({ element, onClick }: { element: Element; onClick: (e: Element) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      className="relative aspect-square rounded-lg border text-center flex flex-col items-center justify-center p-1 transition-all"
      style={{
        borderColor: element.fromDubna ? 'rgba(79,195,247,0.5)' : 'rgba(255,255,255,0.06)',
        background: element.fromDubna
          ? hovered ? 'rgba(79,195,247,0.2)' : 'rgba(79,195,247,0.08)'
          : 'rgba(255,255,255,0.02)',
        boxShadow: element.fromDubna && hovered ? '0 0 20px rgba(79,195,247,0.3)' : 'none',
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

// ── Modal detail card ──────────────────────────────────────────────────────────
function ElementModal({ element, onClose }: { element: Element; onClose: () => void }) {
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
        <div
          className="text-4xl font-bold text-text-primary mb-1"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {element.nameRu}
        </div>
        <div className="text-text-secondary text-sm mb-4">{element.name}</div>
        <div className="flex justify-center gap-6">
          <div>
            <div
              className="text-accent-primary font-bold"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {element.number}
            </div>
            <div className="text-text-secondary text-xs">атомный номер</div>
          </div>
          <div>
            <div
              className="text-accent-secondary font-bold"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {element.year}
            </div>
            <div className="text-text-secondary text-xs">год открытия</div>
          </div>
        </div>
        {element.fromDubna && (
          <div
            className="mt-4 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
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

// ── Public component ───────────────────────────────────────────────────────────
export default function ElementsTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  return (
    <>
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

      <AnimatePresence>
        {selectedElement && (
          <ElementModal element={selectedElement} onClose={() => setSelectedElement(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
