import { useEffect, useRef, useState } from 'react';

interface ScrambleNumberProps {
  /** Final value to reveal */
  value: number;
  /** Start the reveal when this turns true */
  active: boolean;
  /** Thousands separator. Default ' ' */
  separator?: string;
  /** Reveal duration in ms. Default 1400 */
  duration?: number;
  /** Delay before starting, in ms */
  delay?: number;
}

function group(digits: string, separator: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * "Decodes" a number: digits flicker through random values then lock in
 * left-to-right. Falls back to the final value for reduced-motion users.
 */
export default function ScrambleNumber({
  value,
  active,
  separator = ' ',
  duration = 1400,
  delay = 0,
}: ScrambleNumberProps) {
  const final = Math.round(value).toString();
  const [display, setDisplay] = useState(active ? group(final, separator) : '0');
  const rafRef = useRef<number>(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplay(group(final, separator));
      return;
    }

    const total = final.length;
    let startTime = 0;
    const timeoutId = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out so digits settle smoothly
        const eased = 1 - Math.pow(1 - progress, 3);
        const locked = Math.floor(eased * total);

        let out = '';
        for (let i = 0; i < total; i++) {
          out += i < locked ? final[i] : String(Math.floor(Math.random() * 10));
        }
        setDisplay(group(out, separator));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(group(final, separator));
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return <>{display}</>;
}
