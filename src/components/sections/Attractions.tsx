import { motion } from 'framer-motion';
import { attractions } from '../../data/dubna';
import { useInView } from '../../hooks/useInView';
import AttractionCard from '../ui/AttractionCard';

export default function Attractions() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.5 });

  return (
    <section id="attractions" className="bg-bg-primary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-accent-primary text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Что посмотреть
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-cormorant font-bold text-text-primary"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Достопримечательности
          </motion.h2>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {attractions.map((attraction, i) => (
            <AttractionCard key={attraction.id} attraction={attraction} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
