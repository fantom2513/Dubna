import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { architectureItems, type ArchitectureItem } from '../../data/dubna';
import { useInView } from '../../hooks/useInView';

function GalleryItem({
  item,
  index,
  onOpen,
}: {
  item: ArchitectureItem;
  index: number;
  onOpen: (item: ArchitectureItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const colStyle = item.colSpan ? { gridColumn: `span ${item.colSpan}` } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="relative overflow-hidden rounded-xl cursor-pointer group"
      style={{ minHeight: '200px', ...colStyle }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(item)}
    >
      {/* Gradient bg */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500`}
        style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Architectural details (decorative lines) */}
      <div className="absolute inset-4 border border-white/5 rounded-lg pointer-events-none" />
      <div className="absolute inset-8 border border-white/3 rounded-md pointer-events-none" />

      {/* Year badge */}
      <div className="absolute top-4 right-4">
        <span
          className="text-xs text-text-secondary/60 px-2 py-1 bg-black/30 rounded"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          {item.year}
        </span>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-accent-primary/5 rounded-xl border border-accent-primary/20"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
        <p
          className="text-text-primary text-sm font-medium"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {item.name}
        </p>
      </div>

      {/* Open icon on hover */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M8 3l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Lightbox({ item, onClose }: { item: ArchitectureItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${item.gradient} relative overflow-hidden`}
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-6 border border-white/10 rounded-xl" />
          <div className="absolute inset-10 border border-white/5 rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3
              className="text-2xl text-white font-bold"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {item.name}
            </h3>
            <span
              className="text-text-secondary text-sm"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              {item.year} · Правый берег Дубны
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-bg-card border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Architecture() {
  const [openItem, setOpenItem] = useState<ArchitectureItem | null>(null);
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section id="architecture" className="bg-bg-primary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-accent-secondary text-xs tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Правый берег · 1950-е
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-cormorant font-bold text-text-primary mb-4"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Застывшее время
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="text-text-secondary max-w-2xl mb-12 leading-relaxed"
        >
          Правый берег Дубны — уникальный архитектурный заповедник. Сталинский ампир 1950-х годов
          сохранился здесь практически нетронутым: широкие проспекты, помпезные фасады, дворцы культуры
          и жилые дома с арками. Это живой музей советского модернизма.
        </motion.p>

        {/* Gallery grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {architectureItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} onOpen={setOpenItem} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openItem && <Lightbox item={openItem} onClose={() => setOpenItem(null)} />}
      </AnimatePresence>
    </section>
  );
}
