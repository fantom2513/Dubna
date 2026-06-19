import { motion, useReducedMotion } from 'framer-motion';

export default function ElementSpotlight() {
  const reduced = useReducedMotion();
  return (
    <section
      aria-label="Дубний — элемент 105"
      className="relative w-full overflow-hidden bg-bg-secondary py-32 md:py-40"
    >
      {/* Giant decorative number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.span
          initial={reduced ? false : { opacity: 0, scale: 1.08 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant font-black leading-none text-accent-primary/[0.06]"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(220px, 38vw, 640px)' }}
        >
          105
        </motion.span>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-accent-secondary text-xs tracking-[0.4em] uppercase mb-6"
          style={{ fontFamily: '"IBM Plex Mono", monospace' }}
        >
          Периодическая таблица · Группа 5
        </motion.p>
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant font-bold text-text-primary mb-6"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Дубний
        </motion.h2>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-text-secondary text-[15px] md:text-base leading-relaxed max-w-2xl mx-auto"
        >
          Сверхтяжёлый элемент с атомным номером 105, синтезированный в Объединённом институте
          ядерных исследований и названный в честь города. Немногие города мира носят имя,
          вписанное в периодическую таблицу.
        </motion.p>

        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="h-px w-12 bg-accent-primary/30" />
          <span
            className="text-accent-primary text-sm tracking-[0.3em]"
            style={{ fontFamily: '"IBM Plex Mono", monospace' }}
          >
            Db · 105
          </span>
          <span className="h-px w-12 bg-accent-primary/30" />
        </div>
      </div>
    </section>
  );
}
