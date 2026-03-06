import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'О городе', href: '#about' },
  { label: 'Наука', href: '#science' },
  { label: 'Достопримечательности', href: '#attractions' },
  { label: 'Статистика', href: '#stats' },
  { label: 'Климат', href: '#climate' },
  { label: 'Архитектура', href: '#architecture' },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-primary border-t border-white/5 overflow-hidden py-16 px-6">
      {/* Huge background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-white/[0.03] font-cormorant font-black leading-none"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '20vw',
            whiteSpace: 'nowrap',
          }}
        >
          DUBNA
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Col 1: Logo + description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="2.5" fill="#4fc3f7" />
                <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#4fc3f7" strokeWidth="0.8" strokeOpacity="0.7" fill="none" />
                <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#4fc3f7" strokeWidth="0.8" strokeOpacity="0.5" fill="none" transform="rotate(60 16 16)" />
                <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#4fc3f7" strokeWidth="0.8" strokeOpacity="0.4" fill="none" transform="rotate(120 16 16)" />
                <circle cx="29" cy="16" r="1.5" fill="#4fc3f7" />
                <circle cx="9.5" cy="7" r="1.5" fill="#4fc3f7" opacity="0.7" />
                <circle cx="9.5" cy="25" r="1.5" fill="#4fc3f7" opacity="0.5" />
              </svg>
              <span
                className="text-text-primary text-xl font-bold tracking-[0.2em]"
                style={{ fontFamily: '"Cormorant Garamond", serif' }}
              >
                ДУБНА
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Наукоград Дубна — город будущего на берегу Волги.
              Атомная столица России и мировой центр ядерной физики.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.2em] text-accent-primary mb-6"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Навигация
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Coordinates */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.2em] text-accent-primary mb-6"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Координаты
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Широта', value: '55°44′ с.ш.' },
                { label: 'Долгота', value: '37°14′ в.д.' },
                { label: 'Регион', value: 'МО, Россия' },
                { label: 'Статус', value: 'Наукоград' },
                { label: 'Основан', value: '1956 год' },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <span
                    className="text-xs text-text-secondary uppercase tracking-wider"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-xs text-text-primary"
                    style={{ fontFamily: '"IBM Plex Mono", monospace' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-accent-primary"
            />
            <span
              className="text-xs text-text-secondary"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              © 2024 Дубна — Город Будущего
            </span>
          </div>
          <span
            className="text-xs text-text-secondary/50"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            55°44′N · 37°14′E · JINR · DUBNA
          </span>
        </div>
      </div>
    </footer>
  );
}
