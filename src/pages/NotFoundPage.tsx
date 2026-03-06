import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import { SectionLabel, SectionTitle, BodyText } from '@/components/ui/Typography';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background 404 */}
      <span
        className="absolute select-none pointer-events-none font-cormorant font-black text-white leading-none"
        style={{ fontSize: 'clamp(10rem, 30vw, 22rem)', opacity: 0.04 }}
        aria-hidden="true"
      >
        404
      </span>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 text-center max-w-md"
      >
        <SectionLabel>Ошибка 404</SectionLabel>
        <SectionTitle>Страница не найдена</SectionTitle>
        <BodyText className="text-text-secondary">
          Возможно, она была перемещена или не существует
        </BodyText>

        <div className="flex items-center gap-4 mt-2">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-full text-sm font-mono-custom transition-all"
            style={{
              background: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            На главную
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-mono-custom border transition-colors hover:text-text-primary hover:border-accent-primary/60"
            style={{ borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}
          >
            <ArrowLeft size={14} />
            Назад
          </button>
        </div>
      </motion.div>
    </div>
  );
}
