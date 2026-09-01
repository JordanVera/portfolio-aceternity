'use client';

import { MosaicLoadProvider, useMosaicLoad } from '@/components/MosaicLoadContext';
import { Preloader } from '@/components/Preloader';
import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

function MainPanelContent({ children }: { children: React.ReactNode }) {
  const { loading } = useMosaicLoad();

  return (
    <div
      className={twMerge(
        'flex min-h-0 flex-1 flex-col transition-opacity duration-200',
        loading && 'pointer-events-none opacity-0',
      )}
      aria-hidden={loading}
    >
      {children}
    </div>
  );
}

export function MainPanelLoader({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <MosaicLoadProvider containerRef={containerRef}>
      <div
        ref={containerRef}
        className="js-main-panel relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-surface lg:rounded-tl-xl"
      >
        <Preloader />
        <MainPanelContent>{children}</MainPanelContent>
      </div>
    </MosaicLoadProvider>
  );
}
