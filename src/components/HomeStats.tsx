'use client';

import { timeline } from '@/constants/timeline';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const CAREER_START_YEAR = 2018;

type Stat = {
  label: string;
  value?: number;
  suffix?: string;
  text?: string;
};

const stats: Stat[] = [
  {
    value: new Date().getFullYear() - CAREER_START_YEAR,
    suffix: '+',
    label: 'Years shipping code',
  },
  { text: '3', label: 'Companies worked for' },
  { text: '4', label: 'Dev roles held' },
  { text: 'Houston', label: 'Home base' },
];

const Counter = ({ value, suffix }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    });

    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
};

export const HomeStats = () => {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-foreground/10 ring-1 ring-foreground/10 sm:grid-cols-4">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3, delay: idx * 0.06 }}
          className="bg-surface-elevated/40 px-4 py-5"
        >
          <dd className="text-2xl font-black text-accent md:text-3xl">
            {stat.text ?? (
              <Counter value={stat.value ?? 0} suffix={stat.suffix} />
            )}
          </dd>
          <dt className="mt-1 text-xs text-foreground-subtle md:text-sm">
            {stat.label}
          </dt>
        </motion.div>
      ))}
    </dl>
  );
};
