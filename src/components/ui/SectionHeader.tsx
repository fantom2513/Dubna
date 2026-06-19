import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  align?: 'left' | 'center';
  accent?: 'primary' | 'secondary';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  align = 'left',
  accent = 'primary',
  className = '',
}: SectionHeaderProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const accentColor = accent === 'secondary' ? 'text-accent-secondary' : 'text-accent-primary';

  return (
    <div ref={ref} className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`${accentColor} text-xs tracking-[0.3em] uppercase mb-4`}
        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-cormorant font-bold text-text-primary"
        style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'var(--text-section-title)' }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
