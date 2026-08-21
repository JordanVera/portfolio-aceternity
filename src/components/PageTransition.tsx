'use client';

import { motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="lg:pl-2 lg:pt-2 bg-background flex-1 overflow-y-auto"
    >
      {children}
    </motion.div>
  );
}
