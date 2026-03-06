import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  NavigationArrow,
  ArrowSquareOut,
  MapPin,
  Globe,
  TelegramLogo,
  YoutubeLogo,
  Atom,
} from '@phosphor-icons/react';
import Divider from '../ui/Divider';
import { useSmoothAnchor } from '@/hooks/useSmoothAnchor';

// ── Monogram (same as Navbar) ─────────────────────────────────────────────────
function Monogram({ size = 36 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: 'linear-gradient(135deg, #4fc3f7, #1a6b8a)',
        fontFamily: '"IBM Plex Mono", monospace',
        color: '#07090f',
      }}
    >
      Дб
    </div>
  );
}

const navLinks = [
  { label: 'Главная',    to: '/' },
  { label: 'Наука',      to: '/science' },
  { label: 'Туристам',   to: '/tourism' },
  { label: 'Инвесторам', to: '/invest' },
  { label: 'Жить здесь', to: '/living' },
  { label: 'Новости',    to: '/news' },
  { label: 'Галерея',    to: '/gallery' },
] as const;

const externalLinks = [
  { label: 'Сайт ОИЯИ',         href: 'https://jinr.ru' },
  { label: 'ОЭЗ Дубна',         href: 'https://oez-dubna.ru' },
  { label: 'Администрация',      href: 'https://dubna.ru' },
  { label: 'Наукоград Дубна',    href: 'https://naukograd-dubna.ru' },
] as const;

const socials = [
  { label: 'Telegram', Icon: TelegramLogo, href: 'https://t.me/dubna' },
  { label: 'YouTube',  Icon: YoutubeLogo,  href: 'https://youtube.com' },
] as const;

export default function Footer() {
  const scrollToAnchor = useSmoothAnchor();

  return (
    <footer className="relative bg-bg-primary border-t overflow-hidden" style={{ borderColor: 'var(--glass-border)' }}>
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-white/[0.025] font-black leading-none"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '20vw', whiteSpace: 'nowrap' }}
        >
          DUBNA
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Monogram />
              <span
                className="text-text-primary text-sm tracking-[0.15em] font-bold"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                ДУБНА
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4" style={{ fontFamily: 'Geologica, sans-serif' }}>
              Наукоград на берегу Волги. Атомная столица России и мировой центр ядерной физики.
            </p>
            <div className="flex items-center gap-1.5">
              <NavigationArrow size={13} className="text-accent-primary flex-shrink-0" />
              <span
                className="text-xs text-accent-primary"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                56.7333° N, 37.1667° E
              </span>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-accent-primary mb-5"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Навигация
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    style={{ fontFamily: 'Geologica, sans-serif' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToAnchor('#about')}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  style={{ fontFamily: 'Geologica, sans-serif' }}
                >
                  О городе
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 — External resources */}
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-accent-primary mb-5"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Ресурсы
            </p>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors group"
                    style={{ fontFamily: 'Geologica, sans-serif' }}
                  >
                    {link.label}
                    <ArrowSquareOut size={12} className="opacity-40 group-hover:opacity-70 transition-opacity flex-shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contacts & info */}
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.2em] text-accent-primary mb-5"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Контакты
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-accent-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary" style={{ fontFamily: 'Geologica, sans-serif' }}>
                  Московская обл., г. Дубна
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Globe size={14} className="text-accent-primary flex-shrink-0 mt-0.5" />
                <a
                  href="https://dubna.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  style={{ fontFamily: 'Geologica, sans-serif' }}
                >
                  dubna.ru
                </a>
              </div>
              <div
                className="mt-4 rounded-lg p-3"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Atom size={12} className="text-accent-primary" />
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
                    ОИЯИ / JINR
                  </span>
                </div>
                <p className="text-xs text-text-secondary" style={{ fontFamily: 'Geologica, sans-serif' }}>
                  Основан в 1956 году. 18 государств-членов.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with atom icon */}
        <Divider icon={<Atom size={14} className="text-accent-primary" />} className="mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-accent-primary flex-shrink-0"
            />
            <span
              className="text-xs text-text-secondary"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              © 2024 Дубна — Город будущего
            </span>
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
            <span
              className="text-xs text-text-secondary/40 ml-2"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              56°N · 37°E · JINR
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
