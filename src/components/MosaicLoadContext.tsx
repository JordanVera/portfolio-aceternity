'use client';

import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

type MosaicLoadContextValue = {
  progress: number;
  complete: boolean;
};

const MosaicLoadContext = createContext<MosaicLoadContextValue>({
  progress: 100,
  complete: true,
});

export function useMosaicLoad() {
  return useContext(MosaicLoadContext);
}

const MEDIA_SELECTOR = 'img, video, audio';
const LOAD_TIMEOUT_MS = 12000;

type MediaElement = HTMLImageElement | HTMLVideoElement | HTMLAudioElement;

function isMediaLoaded(el: MediaElement): boolean {
  if (el instanceof HTMLImageElement) {
    return el.complete && el.naturalWidth > 0;
  }
  return el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

function getMediaSrc(el: MediaElement): string {
  if (el instanceof HTMLImageElement) {
    return el.currentSrc || el.src;
  }
  return el.currentSrc || el.src;
}

function ensureImageLoading(el: HTMLImageElement) {
  if (!el.complete && el.loading === 'lazy') {
    el.loading = 'eager';
  }
}

function waitForMedia(el: MediaElement, signal: AbortSignal): Promise<void> {
  if (isMediaLoaded(el)) return Promise.resolve();

  return new Promise((resolve) => {
    const finish = () => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    };

    const onAbort = () => finish();

    signal.addEventListener('abort', onAbort, { once: true });

    if (el instanceof HTMLImageElement) {
      el.addEventListener('load', finish, { once: true });
      el.addEventListener('error', finish, { once: true });
    } else {
      el.addEventListener('loadeddata', finish, { once: true });
      el.addEventListener('canplay', finish, { once: true });
      el.addEventListener('error', finish, { once: true });
    }
  });
}

function collectMedia(container: HTMLElement): MediaElement[] {
  const ignored = new Set<HTMLElement>();

  container.querySelectorAll('[data-mosaic-ignore]').forEach((node) => {
    if (node instanceof HTMLElement) {
      ignored.add(node);
      node.querySelectorAll(MEDIA_SELECTOR).forEach((child) => {
        if (child instanceof HTMLElement) ignored.add(child);
      });
    }
  });

  const elements: MediaElement[] = [];

  container.querySelectorAll(MEDIA_SELECTOR).forEach((node) => {
    if (
      !(node instanceof HTMLImageElement) &&
      !(node instanceof HTMLVideoElement) &&
      !(node instanceof HTMLAudioElement)
    ) {
      return;
    }

    if (ignored.has(node)) return;
    if (!getMediaSrc(node)) return;

    if (node instanceof HTMLImageElement) {
      ensureImageLoading(node);
    }

    elements.push(node);
  });

  return elements;
}

export function MosaicLoadProvider({
  containerRef,
  children,
}: {
  containerRef: RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const abort = new AbortController();
    const { signal } = abort;

    const finish = () => {
      if (signal.aborted) return;
      setProgress(100);
      setComplete(true);
    };

    const reset = () => {
      setProgress(0);
      setComplete(false);
    };

    if (!container || reduceMotion) {
      reset();
      finish();
      return () => abort.abort();
    }

    reset();

    let observer: MutationObserver | undefined;
    let pollId: ReturnType<typeof setInterval> | undefined;
    let maxWaitId: ReturnType<typeof setTimeout> | undefined;

    const tracked = new Set<MediaElement>();
    const pending = new Set<MediaElement>();

    const updateProgress = () => {
      if (signal.aborted) return;

      const total = tracked.size;
      if (total === 0) {
        setProgress(100);
        return;
      }

      const loaded = total - pending.size;
      setProgress(Math.min(100, Math.round((loaded / total) * 100)));
    };

    const checkDone = () => {
      if (signal.aborted) return;
      if (tracked.size > 0 && pending.size === 0) {
        observer?.disconnect();
        if (pollId) clearInterval(pollId);
        if (maxWaitId) clearTimeout(maxWaitId);
        finish();
      }
    };

    const trackElement = (el: MediaElement) => {
      if (tracked.has(el)) return;

      tracked.add(el);

      if (isMediaLoaded(el)) {
        updateProgress();
        checkDone();
        return;
      }

      pending.add(el);
      updateProgress();

      void waitForMedia(el, signal).then(() => {
        if (signal.aborted) return;
        pending.delete(el);
        updateProgress();
        checkDone();
      });
    };

    const scan = () => {
      if (signal.aborted) return;
      collectMedia(container).forEach(trackElement);
      updateProgress();
      checkDone();
    };

    const start = () => {
      scan();

      if (tracked.size === 0) {
        finish();
        return;
      }

      if (pending.size === 0) {
        finish();
        return;
      }

      observer = new MutationObserver(scan);
      observer.observe(container, { childList: true, subtree: true });

      pollId = setInterval(() => {
        pending.forEach((el) => {
          if (isMediaLoaded(el)) pending.delete(el);
        });
        updateProgress();
        checkDone();
      }, 200);

      maxWaitId = setTimeout(finish, LOAD_TIMEOUT_MS);
    };

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(start);
    });

    return () => {
      abort.abort();
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      if (pollId) clearInterval(pollId);
      if (maxWaitId) clearTimeout(maxWaitId);
    };
  }, [pathname, containerRef, reduceMotion]);

  return (
    <MosaicLoadContext.Provider value={{ progress, complete }}>
      {children}
    </MosaicLoadContext.Provider>
  );
}
