import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';

const navLinks = [
  { label: 'О городе', href: '#about' },
  { label: 'Наука', href: '#science' },
  { label: 'Достопримечательности', href: '#attractions' },
  { label: 'Статистика', href: '#stats' },
  { label: 'Live', href: '#live' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
        style={{ paddingTop: '2px' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group"
          >
            <AtomLogo />
            <span
              className="text-text-primary text-xl font-cormorant tracking-[0.2em] font-bold group-hover:text-accent-primary transition-colors"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              ДУБНА
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-text-secondary hover:text-accent-primary transition-colors text-sm tracking-widest uppercase font-mono"
                style={{ fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '0.12em' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-text-primary"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-text-primary"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-text-primary"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-text-primary text-4xl font-cormorant hover:text-accent-primary transition-colors"
                  style={{ fontFamily: '"Cormorant Garamond", serif' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AtomLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Nucleus */}
      <circle cx="16" cy="16" r="2.5" fill="#4fc3f7" />
      {/* Orbit 1 */}
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#4fc3f7" strokeWidth="0.8" strokeOpacity="0.7" fill="none" />
      {/* Orbit 2 - rotated 60deg */}
      <ellipse
        cx="16" cy="16" rx="13" ry="5"
        stroke="#4fc3f7" strokeWidth="0.8" strokeOpacity="0.5" fill="none"
        transform="rotate(60 16 16)"
      />
      {/* Orbit 3 - rotated 120deg */}
      <ellipse
        cx="16" cy="16" rx="13" ry="5"
        stroke="#4fc3f7" strokeWidth="0.8" strokeOpacity="0.4" fill="none"
        transform="rotate(120 16 16)"
      />
      {/* Electron dots */}
      <circle cx="29" cy="16" r="1.5" fill="#4fc3f7" />
      <circle cx="9.5" cy="7" r="1.5" fill="#4fc3f7" opacity="0.7" />
      <circle cx="9.5" cy="25" r="1.5" fill="#4fc3f7" opacity="0.5" />
    </svg>
  );
}
