import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import LazyImage from './LazyImage';
import type { Attraction } from '@/data/dubna';

export const categoryColors: Record<string, string> = {
  'Наука':        '#e8b84b',
  'История':      '#e87d4b',
  'Природа':      '#7ecb7e',
  'Архитектура':  '#b47ef5',
};

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
  onClick?: () => void;
}

export default function AttractionCard({ attraction, index, onClick }: AttractionCardProps) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  const heightClass =
    attraction.size === 'tall'  ? 'row-span-2' :
    attraction.size === 'wide'  ? 'col-span-1 md:col-span-2' : '';

  const color = categoryColors[attraction.category] ?? '#4fc3f7';

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
      onClick={onClick}
    >
      {/* Background: local photo via LazyImage, or plain gradient fallback */}
      {attraction.imageUrl ? (
        <>
          <LazyImage
            src={attraction.imageUrl}
            alt={attraction.name}
            className="absolute inset-0 w-full h-full"
          />
          {/* Darkening overlay for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${attraction.gradientFrom}ee 0%, ${attraction.gradientFrom}88 50%, transparent 100%)`,
              zIndex: 1,
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
      <div className="absolute inset-0 grid-pattern opacity-30" style={{ zIndex: 2 }} />

      {/* Animated glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ zIndex: 3 }}
        animate={{
          boxShadow: hovered
            ? `0 0 40px ${color}33, inset 0 0 40px ${color}11`
            : 'none',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border"
        style={{ zIndex: 3 }}
        animate={{
          borderColor: hovered ? `${color}50` : 'rgba(255,255,255,0.05)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Category badge */}
      <div className="absolute top-4 left-4" style={{ zIndex: 4 }}>
        <span
          className="px-3 py-1 text-xs rounded-full font-medium"
          style={{
            fontFamily: '"IBM Plex Mono", monospace',
            background: `${color}20`,
            border: `1px solid ${color}50`,
            color,
          }}
        >
          {attraction.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ zIndex: 4 }}>
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
    </motion.div>
  );
}
