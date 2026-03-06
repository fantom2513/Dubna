import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { Toaster } from 'sonner';

import { setLenis } from '@/lib/lenis';
import CustomCursor from './components/ui/CustomCursor';
import CommandPalette from './components/ui/CommandPalette';
import SharedLayout from './components/layout/SharedLayout';

import HomePage from './pages/HomePage';
import SciencePage from './pages/SciencePage';
import InvestPage from './pages/InvestPage';
import TourismPage from './pages/TourismPage';
import LivingPage from './pages/LivingPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <CommandPalette />
      <Routes>
        <Route element={<SharedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/science" element={<SciencePage />} />
          <Route path="/invest" element={<InvestPage />} />
          <Route path="/tourism" element={<TourismPage />} />
          <Route path="/living" element={<LivingPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(20px)',
            color: '#f0f4f8',
            fontFamily: 'Geologica, sans-serif',
          },
        }}
      />
    </>
  );
}
