'use client';

import { usePathname } from 'next/navigation';
import { useReducedMotion } from 'motion/react';
import {
  createContext,
  useCallback,
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
  registerAsset: (id: string, promise: Promise<void>) => () => void;
};

const MosaicLoadContext = createContext<MosaicLoadContextValue | null>(null);

export function useMosaicLoad() {
  const context = useContext(MosaicLoadContext);
  if (!context) {
    throw new Error('useMosaicLoad must be used within MosaicLoadProvider');
  }
  return context;
}

export function useMosaicAsset(
  id: string,
  factory: () => Promise<void>,
  active = true,
) {
  const { registerAsset } = useMosaicLoad();

  useEffect(() => {
    if (!active) return;
    return registerAsset(id, factory());
  }, [id, active, factory, registerAsset]);
}

export function preloadAudio(
  src: string,
  signal?: AbortSignal,
): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }

    const audio = document.createElement('audio');

    const finish = () => {
      signal?.removeEventListener('abort', onAbort);
      audio.removeEventListener('canplay', finish);
      audio.removeEventListener('error', finish);
      audio.src = '';
      audio.load();
      resolve();
    };

    const onAbort = () => finish();

    signal?.addEventListener('abort', onAbort, { once: true });
    audio.preload = 'auto';
    audio.addEventListener('canplay', finish, { once: true });
    audio.addEventListener('error', finish, { once: true });
    audio.src = encodeURI(src);
    audio.load();
  });
}

const MEDIA_SELECTOR = 'img, video, audio';
const LOAD_TIMEOUT_MS = 12000;
const MIN_DISPLAY_MS = 600;

type MediaElement = HTMLImageElement | HTMLVideoElement | HTMLAudioElement;

function isVideoMetadataReady(el: HTMLVideoElement): boolean {
  return el.readyState >= HTMLMediaElement.HAVE_METADATA;
}

function isMediaLoaded(el: MediaElement): boolean {
  if (el instanceof HTMLImageElement) {
    return el.complete && el.naturalWidth > 0;
  }

  if (el instanceof HTMLVideoElement) {
    if (el.dataset.mosaicPreload === 'metadata') {
      return isVideoMetadataReady(el);
    }
    return el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
  }

  return el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
}

function getMediaSrc(el: MediaElement): string {
  if (el instanceof HTMLImageElement) {
    return el.currentSrc || el.src;
  }
  return el.currentSrc || el.src;
}

function isNearViewport(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight + 240 && rect.bottom > -240;
}

function ensureImageLoading(el: HTMLImageElement) {
  if (!el.complete && el.loading === 'lazy' && isNearViewport(el)) {
    el.loading = 'eager';
  }
}

function shouldTrackImage(el: HTMLImageElement): boolean {
  if (el.complete) return true;
  if (el.loading !== 'lazy') return true;
  return isNearViewport(el);
}

function ensureVideoMetadataLoad(el: HTMLVideoElement) {
  if (el.dataset.mosaicPreload !== 'metadata') return;
  if (el.preload === 'none') {
    el.preload = 'metadata';
  }
  if (!isVideoMetadataReady(el)) {
    el.load();
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
      return;
    }

    if (el instanceof HTMLVideoElement && el.dataset.mosaicPreload === 'metadata') {
      el.addEventListener('loadedmetadata', finish, { once: true });
      el.addEventListener('error', finish, { once: true });
      ensureVideoMetadataLoad(el);
      return;
    }

    el.addEventListener('loadeddata', finish, { once: true });
    el.addEventListener('canplay', finish, { once: true });
    el.addEventListener('error', finish, { once: true });
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
      if (!shouldTrackImage(node)) return;
      ensureImageLoading(node);
    }

    if (node instanceof HTMLVideoElement) {
      ensureVideoMetadataLoad(node);
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
  const [assetVersion, setAssetVersion] = useState(0);
  const routeStartedAtRef = useRef(Date.now());
  const assetsRef = useRef<Map<string, Promise<void>>>(new Map());

  const registerAsset = useCallback((id: string, promise: Promise<void>) => {
    assetsRef.current.set(id, promise);
    setAssetVersion((current) => current + 1);

    void promise.finally(() => {
      assetsRef.current.delete(id);
      setAssetVersion((current) => current + 1);
    });

    return () => {
      assetsRef.current.delete(id);
      setAssetVersion((current) => current + 1);
    };
  }, []);

  useLayoutEffect(() => {
    routeStartedAtRef.current = Date.now();
    assetsRef.current.clear();
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
    const trackedAssets = new Set<string>();
    const pendingAssets = new Set<string>();

    const updateProgress = () => {
      if (signal.aborted) return;

      const domTotal = tracked.size;
      const domLoaded = domTotal - pending.size;
      const assetTotal = trackedAssets.size;
      const assetLoaded = assetTotal - pendingAssets.size;
      const total = domTotal + assetTotal;

      if (total === 0) {
        setProgress((current) => (current === 0 ? 12 : current));
        return;
      }

      const next = Math.min(
        99,
        Math.round(((domLoaded + assetLoaded) / total) * 100),
      );
      setProgress((current) => Math.max(current, next));
    };

    const checkDone = () => {
      if (signal.aborted) return;

      if (pending.size === 0 && pendingAssets.size === 0) {
        mediaReady = true;
        setProgress((current) => Math.max(current, 99));
        tryFinish();
      }
    };

    const trackAsset = (id: string, promise: Promise<void>) => {
      if (trackedAssets.has(id)) return;

      trackedAssets.add(id);
      pendingAssets.add(id);
      updateProgress();

      void promise.finally(() => {
        if (signal.aborted) return;
        pendingAssets.delete(id);
        updateProgress();
        checkDone();
      });
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
      assetsRef.current.forEach((promise, id) => trackAsset(id, promise));
      updateProgress();
      checkDone();
    };

    const tryFinish = () => {
      if (signal.aborted || !mediaReady) return;

      observer?.disconnect();
      if (pollId) clearInterval(pollId);
      if (maxWaitId) clearTimeout(maxWaitId);
      void finish();
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
  }, [pathname, containerRef, reduceMotion, assetVersion]);

  return (
    <MosaicLoadContext.Provider
      value={{ progress, complete, loading, registerAsset }}
    >
      {children}
    </MosaicLoadContext.Provider>
  );
}
