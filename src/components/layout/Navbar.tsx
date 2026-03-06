import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  List,
  X,
  House,
  Flask,
  MapPin,
  TrendUp,
  Buildings,
  Newspaper,
  Images,
  MagnifyingGlass,
} from '@phosphor-icons/react';
import MobileDrawer from '../ui/MobileDrawer';
import Divider from '../ui/Divider';
import { useSmoothAnchor } from '@/hooks/useSmoothAnchor';

// ── Desktop nav links ────────────────────────────────────────────────────────
const mainLinks = [
  { label: 'О городе',    href: '#about',    isAnchor: true },
  { label: 'Наука',       to: '/science',    isAnchor: false },
  { label: 'Туристам',    to: '/tourism',    isAnchor: false },
  { label: 'Инвесторам',  to: '/invest',     isAnchor: false },
] as const;

const rightLinks = [
  { label: 'Жить здесь', to: '/living' },
  { label: 'Новости',    to: '/news' },
] as const;

// ── Mobile links with icons ─────────────────────────────────────────────────
const mobileLinks = [
  { label: 'Главная',     to: '/',         icon: House },
  { label: 'Наука',       to: '/science',  icon: Flask },
  { label: 'Туристам',    to: '/tourism',  icon: MapPin },
  { label: 'Инвесторам',  to: '/invest',   icon: TrendUp },
  { label: 'Жить здесь', to: '/living',   icon: Buildings },
  { label: 'Новости',     to: '/news',     icon: Newspaper },
  { label: 'Галерея',     to: '/gallery',  icon: Images },
] as const;

// ── Monogram badge ───────────────────────────────────────────────────────────
function Monogram({ size = 36 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full font-mono-custom font-bold text-bg-primary flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: 'linear-gradient(135deg, #4fc3f7, #1a6b8a)',
      }}
    >
      Дб
    </div>
  );
}

// ── Active-link underline (shared layout animation) ─────────────────────────
const linkClass = (isActive: boolean) =>
  `relative text-sm transition-colors duration-200 ${
    isActive ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
  }`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollToAnchor = useSmoothAnchor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
          transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{ padding: '14px clamp(16px, 4vw, 48px)' }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Дубна — главная">
            <Monogram />
            <span
              className="text-text-primary text-sm tracking-[0.15em] font-bold group-hover:text-accent-primary transition-colors"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              ДУБНА
            </span>
          </Link>

          {/* Desktop center links */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Anchor link */}
            <button
              onClick={() => scrollToAnchor('#about')}
              className="relative text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              О городе
            </button>

            {/* Router links */}
            {(mainLinks.slice(1) as Array<{ label: string; to: string; isAnchor: false }>).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => linkClass(isActive)}
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop right block */}
          <div className="hidden md:flex items-center gap-5">
            {rightLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => linkClass(isActive)}
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent-primary"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Live indicator */}
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              LIVE
            </span>

            {/* ⌘K button */}
            <button
              onClick={openCommandPalette}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-text-secondary hover:text-text-primary transition-colors"
              style={{
                fontFamily: '"IBM Plex Mono", monospace',
                border: '1px solid var(--glass-border)',
              }}
              aria-label="Открыть поиск (Ctrl+K)"
            >
              <MagnifyingGlass size={12} />
              ⌘K
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden p-2 text-text-primary"
            aria-label={drawerOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <motion.div
              animate={{ rotate: drawerOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {drawerOpen ? <X size={22} /> : <List size={22} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Навигация">
        <div className="space-y-1 pb-4">
          {mobileLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              >
                <NavLink
                  to={link.to}
                  onClick={() => setDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-accent-primary bg-white/5'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`
                  }
                >
                  <Icon size={18} />
                  <span className="text-sm" style={{ fontFamily: 'Geologica, sans-serif' }}>
                    {link.label}
                  </span>
                </NavLink>
              </motion.div>
            );
          })}
        </div>

        <Divider />

        <button
          onClick={() => { setDrawerOpen(false); openCommandPalette(); }}
          className="flex items-center gap-2 w-full px-3 py-3 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          <MagnifyingGlass size={16} />
          ⌘K Поиск
        </button>
      </MobileDrawer>
    </>
  );
}
