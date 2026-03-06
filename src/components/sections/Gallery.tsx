import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, MagnifyingGlassPlus } from '@phosphor-icons/react';
import { galleryImages } from '@/data/images';
import { useInView } from '@/hooks/useInView';
import { getLenis } from '@/lib/lenis';
import LazyImage from '../ui/LazyImage';
import { SectionLabel, SectionTitle, SectionSubtitle, MonoText } from '../ui/Typography';
import Divider from '../ui/Divider';

export default function Gallery() {
  const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const isOpen = lightboxIndex !== null;
  const currentImage = isOpen ? galleryImages[lightboxIndex] : null;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
    getLenis()?.stop();
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
    getLenis()?.start();
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % galleryImages.length));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft')  prevImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? nextImage() : prevImage();
    touchStartX.current = null;
  };

  return (
    <section id="gallery" className="bg-bg-primary py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
          >
            <SectionLabel>Галерея</SectionLabel>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle className="mt-2">Дубна в фотографиях</SectionTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-3"
          >
            <SectionSubtitle>Виды города, природа и научная инфраструктура</SectionSubtitle>
          </motion.div>
        </div>

        <Divider className="my-8" />

        {/* Masonry grid using CSS columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
          {galleryImages.map((item, index) => (
            <GalleryCard
              key={`${item.src}-${index}`}
              item={item}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && currentImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={closeLightbox}
            />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-5xl max-h-[85vh] mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-center text-white/70 mt-3 text-sm" style={{ fontFamily: 'Geologica, sans-serif' }}>
                {currentImage.title}
              </p>
            </motion.div>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <MonoText className="text-white/60 text-xs">
                {lightboxIndex! + 1} / {galleryImages.length}
              </MonoText>
            </div>

            {/* Close */}
            <button
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
              aria-label="Закрыть"
            >
              <X size={20} color="white" />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={prevImage}
              aria-label="Предыдущее фото"
            >
              <ArrowLeft size={20} color="white" />
            </button>

            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={nextImage}
              aria-label="Следующее фото"
            >
              <ArrowRight size={20} color="white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Individual gallery card ────────────────────────────────────────────────────
function GalleryCard({
  item,
  index,
  onClick,
}: {
  item: { src: string; alt: string; title: string };
  index: number;
  onClick: () => void;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl cursor-pointer group mb-3 break-inside-avoid"
      data-cursor="zoom"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <LazyImage
        src={item.src}
        alt={item.alt}
        className="w-full"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
        <p
          className="text-white text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          style={{ fontFamily: 'Geologica, sans-serif' }}
        >
          {item.title}
        </p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <MagnifyingGlassPlus size={20} color="white" />
      </div>
    </motion.div>
  );
}
