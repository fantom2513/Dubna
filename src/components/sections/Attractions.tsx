import { useState } from 'react';
import { motion } from 'framer-motion';
import { attractions, type Attraction } from '../../data/dubna';
import { useInView } from '../../hooks/useInView';

const categoryColors: Record<string, string> = {
  'Наука': '#e8b84b',
  'История': '#e87d4b',
  'Природа': '#7ecb7e',
  'Архитектура': '#b47ef5',
};

function AttractionCard({ attraction, index }: { attraction: Attraction; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const heightClass = attraction.size === 'tall'
    ? 'row-span-2'
    : attraction.size === 'wide'
    ? 'col-span-1 md:col-span-2'
    : '';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${heightClass}`}
      style={{ minHeight: attraction.size === 'tall' ? '400px' : '220px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background: photo with gradient overlay, or plain gradient */}
      {attraction.imageUrl ? (
        <>
          <img
            src={attraction.imageUrl}
            alt={attraction.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${attraction.gradientFrom}ee 0%, ${attraction.gradientFrom}88 50%, transparent 100%)`,
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${attraction.gradientFrom}, ${attraction.gradientTo})`,
          }}
        />
      )}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: hovered
            ? `0 0 40px ${categoryColors[attraction.category]}33, inset 0 0 40px ${categoryColors[attraction.category]}11`
            : 'none',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border"
        animate={{
          borderColor: hovered ? `${categoryColors[attraction.category]}50` : 'rgba(255,255,255,0.05)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Category badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className="px-3 py-1 text-xs rounded-full font-medium"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            background: `${categoryColors[attraction.category]}20`,
            border: `1px solid ${categoryColors[attraction.category]}50`,
            color: categoryColors[attraction.category],
          }}
        >
          {attraction.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Always visible title */}
        <h3
          className="text-text-primary font-bold text-xl mb-2"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {attraction.name}
        </h3>

        {/* Description slides up on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-text-secondary text-sm leading-relaxed">{attraction.description}</p>
        </motion.div>
      </div>

      {/* Scale animation */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

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
