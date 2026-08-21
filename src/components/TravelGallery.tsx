'use client';

import { ElectricHover } from '@/components/ElectricBorder';
import { travelMedia, TravelMedia } from '@/constants/travel';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
  IconX,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export const TravelGallery = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);

  const goTo = useCallback((direction: -1 | 1) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      const next = current + direction;
      if (next < 0) return travelMedia.length - 1;
      if (next >= travelMedia.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') goTo(-1);
      if (event.key === 'ArrowRight') goTo(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, close, goTo]);

  return (
    <>
      <div className="columns-2 gap-5 md:columns-3">
        {travelMedia.map((item, index) => (
          <GalleryTile
            key={item.src}
            item={item}
            index={index}
            paused={lightboxOpen}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightboxOpen && activeIndex !== null && (
          <Lightbox
            item={travelMedia[activeIndex]}
            onClose={close}
            onPrev={() => goTo(-1)}
            onNext={() => goTo(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const GalleryTile = ({
  item,
  index,
  paused,
  onOpen,
}: {
  item: TravelMedia;
  index: number;
  paused: boolean;
  onOpen: () => void;
}) => {
  return (
    <ElectricHover
      borderRadius={6}
      className="mb-5 w-full break-inside-avoid rounded-md"
    >
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.04 }}
        onClick={onOpen}
        aria-label={
          item.type === 'video' ? 'Open travel video' : 'Open travel photo'
        }
        className="group relative block w-full overflow-hidden rounded-md ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        {item.type === 'image' ? (
          <Image
            src={item.src}
            alt="Travel photo"
            width={800}
            height={1000}
            className="h-auto w-full rounded-md object-cover"
          />
        ) : (
          <GridVideo src={item.src} paused={paused} />
        )}
      </motion.button>
    </ElectricHover>
  );
};

const GridVideo = ({ src, paused }: { src: string; paused: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (paused) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [paused, src]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="pointer-events-none h-auto w-full rounded-md"
      />
      <span className="pointer-events-none absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white ring-1 ring-white/20">
        <IconPlayerPlay className="h-3.5 w-3.5 fill-white" />
      </span>
    </div>
  );
};

const Lightbox = ({
  item,
  onClose,
  onPrev,
  onNext,
}: {
  item: TravelMedia;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Travel media"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4 py-16 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-zinc-900/80 p-2 text-white ring-1 ring-white/10 transition hover:bg-zinc-800"
      >
        <IconX className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900/80 p-2 text-white ring-1 ring-white/10 transition hover:bg-zinc-800 md:left-6"
      >
        <IconChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-zinc-900/80 p-2 text-white ring-1 ring-white/10 transition hover:bg-zinc-800 md:right-6"
      >
        <IconChevronRight className="h-5 w-5" />
      </button>

      <motion.div
        key={item.src}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="relative flex h-[80vh] w-full max-w-5xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt="Travel photo"
            className="max-h-full max-w-full rounded-md object-contain"
          />
        ) : (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full rounded-md"
          />
        )}
      </motion.div>
    </motion.div>
  );
};
