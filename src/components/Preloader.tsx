'use client';

import { JordanVeraLogo } from '@/components/JordanVeraLogo';
import { useMosaicLoad } from '@/components/MosaicLoadContext';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Preloader() {
  const { progress, complete, loading } = useMosaicLoad();
  const [mounted, setMounted] = useState(loading);

  useEffect(() => {
    if (loading) {
      setMounted(true);
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          data-mosaic-ignore
          initial={{ opacity: 1 }}
          animate={{ opacity: complete ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: complete ? 0.35 : 0, ease: 'easeOut' }}
          onAnimationComplete={() => {
            if (complete) setMounted(false);
          }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-12 bg-surface"
          role="status"
          aria-live="polite"
          aria-busy={!complete}
          aria-label={`Loading ${progress}%`}
        >
          <div className="preloader-logo-stage">
            <div className="preloader-logo">
              <JordanVeraLogo
                className="h-[min(42vw,4rem)] animate-pulse"
                priority
              />
            </div>
          </div>
          <div className="flex w-[min(60vw,16rem)] flex-col items-center gap-3">
            <div
              className="h-px w-full overflow-hidden bg-foreground/20"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full bg-accent transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-foreground-muted tabular-nums">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
