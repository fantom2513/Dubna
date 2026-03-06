import { motion } from 'framer-motion';
import { Atom } from '@phosphor-icons/react';
import { elementTimeline } from '@/data/dubna';
import { useInView } from '@/hooks/useInView';

interface TimelineItemProps {
  item: (typeof elementTimeline)[number];
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex gap-6 group"
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full shrink-0 mt-1.5 group-hover:scale-125 transition-transform flex items-center justify-center"
          style={{ background: '#4fc3f7', boxShadow: '0 0 10px rgba(79,195,247,0.5)' }}
        >
          <Atom size={8} color="#07090f" weight="bold" />
        </div>
        {!isLast && (
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
  );
}

export default function DiscoveriesTimeline() {
  return (
    <div className="space-y-0">
      {elementTimeline.map((item, i) => (
        <TimelineItem
          key={item.year}
          item={item}
          index={i}
          isLast={i === elementTimeline.length - 1}
        />
      ))}

      {/* Summary counter */}
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
  );
}
