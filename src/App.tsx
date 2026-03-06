import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Stats from './components/sections/Stats';
import LiveDashboard from './components/sections/LiveDashboard';
import Attractions from './components/sections/Attractions';
import Science from './components/sections/Science';
import Architecture from './components/sections/Architecture';
import Climate from './components/sections/Climate';
import Map from './components/sections/Map';
import CustomCursor from './components/ui/CustomCursor';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-bg-primary"
      >
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Stats />
          <LiveDashboard />
          <Attractions />
          <Science />
          <Architecture />
          <Climate />
          <Map />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
