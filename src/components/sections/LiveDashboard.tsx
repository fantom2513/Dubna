import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from '../../hooks/useInView';

import WeatherWidget from '../live/WeatherWidget';
import AirQualityWidget from '../live/AirQualityWidget';
import ISSTrackerWidget from '../live/ISSTrackerWidget';
import EventsWidget from '../live/EventsWidget';
import TrainScheduleWidget from '../live/TrainScheduleWidget';
import NewsWidget from '../live/NewsWidget';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function UpdateIndicator() {
  const queryClient = useQueryClient();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === 'updated') {
        setLastUpdate(new Date());
        setFlash(true);
        setTimeout(() => setFlash(false), 1000);
      }
    });
    return unsubscribe;
  }, [queryClient]);

  const timeStr = lastUpdate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Moscow',
  });

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
      style={{
        background: 'rgba(13,20,40,0.9)',
        backdropFilter: 'blur(12px)',
        border: flash ? '1px solid rgba(79,195,247,0.5)' : '1px solid rgba(79,195,247,0.1)',
        boxShadow: flash ? '0 0 16px rgba(79,195,247,0.2)' : 'none',
      }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-accent-primary"
        animate={{ opacity: flash ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      />
      <span
        className="text-[10px] text-text-secondary whitespace-nowrap"
        style={{ fontFamily: '"IBM Plex Mono", monospace' }}
      >
        Обновлено: {timeStr}
      </span>
    </div>
  );
}

export default function LiveDashboard() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="live" className="bg-bg-secondary py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="flex items-center gap-3 mb-4"
          >
            <span
              className="text-accent-primary text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: '"IBM Plex Mono", monospace' }}
            >
              Дубна сейчас
            </span>
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <motion.div
                  className="absolute inset-0 w-2 h-2 rounded-full bg-red-500"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span
                className="text-[11px] text-red-400 uppercase tracking-wider"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                LIVE
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            className="font-cormorant font-bold text-text-primary"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Живые данные
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-text-secondary text-sm mt-3 max-w-lg"
          >
            Погода, качество воздуха, МКС, события и расписание — всё в реальном времени.
          </motion.p>
        </div>

        {/* Widget grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Row 1: Weather (tall, left) + ISS + AQ (right stack) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Left: Weather (spans 2 rows on larger screens via row-span trick with explicit height) */}
            <motion.div variants={itemVariants} className="md:row-span-2">
              <WeatherWidget />
            </motion.div>

            {/* Right column: ISS + AQ stacked */}
            <div className="flex flex-col gap-4">
              <motion.div variants={itemVariants}>
                <ISSTrackerWidget />
              </motion.div>
              <motion.div variants={itemVariants}>
                <AirQualityWidget />
              </motion.div>
            </div>
          </div>

          {/* Row 2: Events (left) + Train + News (right stack) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <EventsWidget />
            </motion.div>

            <div className="flex flex-col gap-4">
              <motion.div variants={itemVariants}>
                <TrainScheduleWidget />
              </motion.div>
              <motion.div variants={itemVariants}>
                <NewsWidget />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Global update indicator */}
      <UpdateIndicator />
    </section>
  );
}
