'use client';

import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

type MosaicLoadContextValue = {
  progress: number;
  complete: boolean;
  loading: boolean;
};

const MosaicLoadContext = createContext<MosaicLoadContextValue>({
  progress: 100,
  complete: true,
  loading: false,
});

export function useMosaicLoad() {
  return useContext(MosaicLoadContext);
}

const MEDIA_SELECTOR = 'img, video, audio';
const LOAD_TIMEOUT_MS = 12000;
const MIN_DISPLAY_MS = 600;

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
  const [loading, setLoading] = useState(true);
  const routeStartedAtRef = useRef(Date.now());

  useLayoutEffect(() => {
    routeStartedAtRef.current = Date.now();
    setLoading(true);
    setProgress(0);
    setComplete(false);
  }, [pathname]);

  useEffect(() => {
    const container = containerRef.current;
    const abort = new AbortController();
    const { signal } = abort;

    const finish = async () => {
      if (signal.aborted) return;

      const elapsed = Date.now() - routeStartedAtRef.current;
      const remaining = MIN_DISPLAY_MS - elapsed;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      if (signal.aborted) return;

      setProgress(100);
      setComplete(true);
      setLoading(false);
    };

    if (!container) {
      void finish();
      return () => abort.abort();
    }

    if (reduceMotion) {
      setProgress(100);
      setComplete(true);
      setLoading(false);
      return () => abort.abort();
    }

    let observer: MutationObserver | undefined;
    let pollId: ReturnType<typeof setInterval> | undefined;
    let maxWaitId: ReturnType<typeof setTimeout> | undefined;
    let mediaReady = false;

    const tracked = new Set<MediaElement>();
    const pending = new Set<MediaElement>();

    const updateProgress = () => {
      if (signal.aborted) return;

      const total = tracked.size;
      if (total === 0) {
        setProgress((current) => (current === 0 ? 12 : current));
        return;
      }

      const loaded = total - pending.size;
      const next = Math.min(99, Math.round((loaded / total) * 100));
      setProgress((current) => Math.max(current, next));
    };

    const tryFinish = () => {
      if (signal.aborted || !mediaReady) return;

      observer?.disconnect();
      if (pollId) clearInterval(pollId);
      if (maxWaitId) clearTimeout(maxWaitId);
      void finish();
    };

    const checkDone = () => {
      if (signal.aborted) return;

      if (tracked.size === 0 || pending.size === 0) {
        mediaReady = true;
        setProgress((current) => Math.max(current, 99));
        tryFinish();
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

      observer = new MutationObserver(scan);
      observer.observe(container, { childList: true, subtree: true });

      pollId = setInterval(() => {
        pending.forEach((el) => {
          if (isMediaLoaded(el)) pending.delete(el);
        });
        updateProgress();
        checkDone();
      }, 200);

      maxWaitId = setTimeout(() => {
        mediaReady = true;
        tryFinish();
      }, LOAD_TIMEOUT_MS);
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
    <MosaicLoadContext.Provider value={{ progress, complete, loading }}>
      {children}
    </MosaicLoadContext.Provider>
  );
}
