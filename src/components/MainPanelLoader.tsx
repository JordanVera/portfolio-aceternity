'use client';

import { MosaicLoadProvider } from '@/components/MosaicLoadContext';
import { Preloader } from '@/components/Preloader';
import { useRef } from 'react';

export function MainPanelLoader({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <MosaicLoadProvider containerRef={containerRef}>
      <div
        ref={containerRef}
        className="js-main-panel relative flex flex-col flex-1 bg-surface min-h-screen lg:rounded-tl-xl overflow-y-auto"
      >
        <Preloader />
        {children}
      </div>
    </MosaicLoadProvider>
  );
}
