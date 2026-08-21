'use client';

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolumeOff,
} from '@tabler/icons-react';
import { useCallback, useEffect, useRef, useState } from 'react';

const TRACK = {
  title: 'Ghost!',
  artist: 'Kid Cudi',
  src: encodeURI('/Kid Cudi-Ghost!.mp3'),
};

const BAR_COUNT = 72;

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const SpotifyPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const durationRef = useRef(0);
  const progressInputRef = useRef<HTMLInputElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const durationLabelRef = useRef<HTMLSpanElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const freqDataRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const graphReadyRef = useRef(false);
  const userPausedRef = useRef(false);
  const isPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const player = playerRef.current;
    const panel = player?.closest('.bg-zinc-900') as HTMLElement | null;
    if (!player || !panel) return;

    const syncToMain = () => {
      const rect = panel.getBoundingClientRect();
      player.style.left = `${rect.left}px`;
      player.style.width = `${rect.width}px`;
      player.style.right = 'auto';
    };

    syncToMain();
    const observer = new ResizeObserver(syncToMain);
    observer.observe(panel);
    window.addEventListener('resize', syncToMain);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncToMain);
    };
  }, []);

  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || graphReadyRef.current) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    freqDataRef.current = new Uint8Array(
      analyser.frequencyBinCount,
    ) as Uint8Array;
    graphReadyRef.current = true;
  }, []);

  const drawVisualizer = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    if (
      canvas.width !== Math.floor(width * dpr) ||
      canvas.height !== Math.floor(height * dpr)
    ) {
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const analyser = analyserRef.current;
    const freqs = freqDataRef.current;
    const playing = Boolean(analyser && freqs && isPlayingRef.current);

    if (playing && analyser && freqs) {
      analyser.getByteFrequencyData(freqs as Uint8Array<ArrayBuffer>);
    }

    const duration = durationRef.current;
    const time = audioRef.current?.currentTime ?? 0;
    const progress = duration > 0 ? time / duration : 0;
    const gap = 2;
    const barWidth = Math.max(1.5, (width - gap * (BAR_COUNT - 1)) / BAR_COUNT);

    for (let i = 0; i < BAR_COUNT; i++) {
      const rest =
        0.2 + Math.abs(Math.sin(i * 0.37) * 0.38 + Math.sin(i * 0.11) * 0.3);

      let level = rest * 0.55;
      if (playing && freqs) {
        const bin = Math.min(
          freqs.length - 1,
          Math.floor((i / BAR_COUNT) * freqs.length * 0.65),
        );
        const energy = freqs[bin] / 255;
        level = Math.max(0.12, rest * 0.22 + energy * 0.82);
      }

      const barHeight = Math.max(4, level * height);
      const x = i * (barWidth + gap);
      const y = (height - barHeight) / 2;
      const played = i / BAR_COUNT <= progress;

      ctx.fillStyle = played ? '#1DB954' : '#4d4d4d';
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, barWidth, barHeight, 1);
      } else {
        ctx.rect(x, y, barWidth, barHeight);
      }
      ctx.fill();
    }
  }, []);

  const updateProgress = (time: number) => {
    if (progressInputRef.current) progressInputRef.current.value = String(time);
    if (currentTimeRef.current) {
      currentTimeRef.current.textContent = formatTime(time);
    }
    if (!isPlayingRef.current) {
      drawVisualizer();
    }
  };

  const stopVisualizer = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    drawVisualizer();
  }, [drawVisualizer]);

  const startVisualizer = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      drawVisualizer();
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();
  }, [drawVisualizer]);

  const connectAndPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const unlockAudio = useCallback(async () => {
    ensureAudioGraph();
    if (audioCtxRef.current?.state === 'suspended') {
      await audioCtxRef.current.resume();
    }
    await connectAndPlay();
  }, [connectAndPlay, ensureAudioGraph]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const start = () => {
      void connectAndPlay();
    };

    if (audio.readyState >= 2) {
      start();
    } else {
      audio.addEventListener('canplay', start, { once: true });
    }

    const unlock = () => {
      void unlockAudio();
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    const onResize = () => drawVisualizer();
    window.addEventListener('resize', onResize);
    requestAnimationFrame(() => drawVisualizer());

    return () => {
      audio.removeEventListener('canplay', start);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
      void audioCtxRef.current?.close();
      audioCtxRef.current = null;
      analyserRef.current = null;
      graphReadyRef.current = false;
    };
  }, [connectAndPlay, drawVisualizer, unlockAudio]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      await unlockAudio();
    } else {
      userPausedRef.current = true;
      audio.pause();
    }
  }, [unlockAudio]);

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    updateProgress(value);
  };

  const changeVolume = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = value;
    setVolume(value);
    if (value > 0 && muted) {
      audio.muted = false;
      setMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
  };

  const volumePercent = muted ? 0 : volume * 100;

  return (
    <div
      ref={playerRef}
      role="region"
      aria-label="Now playing Ghost! by Kid Cudi"
      className="fixed bottom-0 left-0 right-0 z-[80] border-t border-white/10 bg-[#181818]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:left-[14rem]"
    >
      <div className="mx-auto flex h-[72px] max-w-screen-2xl items-center gap-3 px-3 md:gap-4 md:px-4">
        <div className="flex min-w-0 items-center gap-3 md:w-[22%]">
          <AlbumArt />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {TRACK.title}
            </p>
            <p className="truncate text-xs text-zinc-400">{TRACK.artist}</p>
          </div>
        </div>

        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:scale-105 hover:bg-zinc-100"
        >
          {isPlaying ? (
            <IconPlayerPauseFilled className="h-4 w-4" />
          ) : (
            <IconPlayerPlayFilled className="ml-0.5 h-4 w-4" />
          )}
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span
            ref={currentTimeRef}
            className="hidden w-10 shrink-0 text-right text-[11px] tabular-nums text-zinc-400 sm:block"
          >
            0:00
          </span>
          <div className="group relative flex h-9 min-w-0 flex-1 items-center">
            <canvas ref={canvasRef} className="h-9 w-full" aria-hidden />
            <input
              ref={progressInputRef}
              type="range"
              min={0}
              max={0}
              step={0.1}
              defaultValue={0}
              aria-label="Seek"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(event) => seek(Number(event.target.value))}
            />
          </div>
          <span
            ref={durationLabelRef}
            className="hidden w-10 shrink-0 text-[11px] tabular-nums text-zinc-400 sm:block"
          >
            0:00
          </span>
        </div>

        <div className="hidden shrink-0 items-center justify-end gap-2 md:flex">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted || volume === 0 ? 'Unmute' : 'Mute'}
            className="text-zinc-400 transition hover:text-white"
          >
            {muted || volume === 0 ? (
              <IconVolumeOff className="h-4 w-4" />
            ) : (
              <IconVolume className="h-4 w-4" />
            )}
          </button>
          <div className="group relative flex h-3 w-24 items-center">
            <div className="absolute inset-x-0 h-1 rounded-full bg-[#4d4d4d]" />
            <div
              className="absolute left-0 h-1 rounded-full bg-white group-hover:bg-[#1DB954]"
              style={{ width: `${volumePercent}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow group-hover:opacity-100"
              style={{ left: `${volumePercent}%` }}
            />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              aria-label="Volume"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(event) => changeVolume(Number(event.target.value))}
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={TRACK.src}
        preload="auto"
        autoPlay
        loop
        playsInline
        crossOrigin="anonymous"
        onPlay={() => {
          isPlayingRef.current = true;
          setIsPlaying(true);
          startVisualizer();
        }}
        onPause={() => {
          isPlayingRef.current = false;
          setIsPlaying(false);
          stopVisualizer();
        }}
        onTimeUpdate={(event) =>
          updateProgress(event.currentTarget.currentTime)
        }
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          const duration = String(audio.duration);
          durationRef.current = audio.duration;
          audio.volume = volume;
          if (progressInputRef.current) progressInputRef.current.max = duration;
          if (durationLabelRef.current) {
            durationLabelRef.current.textContent = formatTime(audio.duration);
          }
          drawVisualizer();
        }}
      />
    </div>
  );
};

const AlbumArt = () => {
  return (
    <div
      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm shadow-lg ring-1 ring-white/10"
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-full w-full">
        <defs>
          <radialGradient id="ghost-sky" cx="50%" cy="80%" r="80%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="55%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#09090b" />
          </radialGradient>
        </defs>
        <rect width="64" height="64" fill="url(#ghost-sky)" />
        <circle cx="14" cy="12" r="0.8" fill="white" opacity="0.7" />
        <circle cx="28" cy="8" r="0.6" fill="white" opacity="0.5" />
        <circle cx="50" cy="16" r="0.7" fill="white" opacity="0.6" />
        <circle cx="44" cy="6" r="0.5" fill="white" opacity="0.4" />
        <circle cx="10" cy="24" r="0.5" fill="white" opacity="0.45" />
        <circle cx="46" cy="28" r="18" fill="#e4e4e7" />
        <circle cx="54" cy="24" r="14" fill="#1e1b4b" />
      </svg>
    </div>
  );
};
