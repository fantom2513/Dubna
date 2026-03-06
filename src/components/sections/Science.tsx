import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import ElementsTable from '../ui/ElementsTable';
import DiscoveriesTimeline from '../ui/DiscoveriesTimeline';

export default function Science() {
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
          <DiscoveriesTimeline />

          {/* Right: Periodic table (104-118) */}
          <div>
            <ElementsTable />
          </div>
        </div>
      </div>
    </section>
  );
}
