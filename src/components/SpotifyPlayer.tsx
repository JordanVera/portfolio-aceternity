'use client';

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconVolume,
  IconVolumeOff,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type WaveSurfer from 'wavesurfer.js';

const WavesurferPlayer = dynamic(() => import('@wavesurfer/react'), {
  ssr: false,
});

export type SpotifyTrack = {
  title: string;
  artist: string;
  src: string;
  cover?: 'ghost' | 'riot';
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const SpotifyPlayer = ({ track }: { track: SpotifyTrack }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);
  const durationLabelRef = useRef<HTMLSpanElement>(null);
  const userPausedRef = useRef(false);
  const volumeRef = useRef(0.8);
  const mutedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  volumeRef.current = volume;
  mutedRef.current = muted;

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

  const tryPlay = useCallback(async () => {
    const wavesurfer = wavesurferRef.current;
    if (!wavesurfer || userPausedRef.current) return;

    try {
      await wavesurfer.play();
    } catch {
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    const unlock = () => {
      void tryPlay();
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [tryPlay]);

  useEffect(() => {
    wavesurferRef.current?.setVolume(muted ? 0 : volume);
  }, [muted, volume]);

  const onReady = useCallback(
    (wavesurfer: WaveSurfer) => {
      wavesurferRef.current = wavesurfer;
      wavesurfer.setVolume(mutedRef.current ? 0 : volumeRef.current);

      if (durationLabelRef.current) {
        durationLabelRef.current.textContent = formatTime(
          wavesurfer.getDuration(),
        );
      }

      void tryPlay();
    },
    [tryPlay],
  );

  const togglePlay = useCallback(async () => {
    const wavesurfer = wavesurferRef.current;
    if (!wavesurfer) return;

    if (wavesurfer.isPlaying()) {
      userPausedRef.current = true;
      wavesurfer.pause();
      return;
    }

    userPausedRef.current = false;
    await tryPlay();
  }, [tryPlay]);

  const changeVolume = (value: number) => {
    setVolume(value);
    if (value > 0 && muted) setMuted(false);
  };

  const volumePercent = muted ? 0 : volume * 100;

  return (
    <div
      ref={playerRef}
      role="region"
      aria-label={`Now playing ${track.title} by ${track.artist}`}
      className="fixed bottom-0 left-0 right-0 z-[80] border-t border-white/10 bg-[#181818]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:left-[14rem]"
    >
      <div className="mx-auto flex h-[72px] max-w-screen-2xl items-center gap-3 px-3 md:gap-4 md:px-4">
        <div className="flex min-w-0 items-center gap-3 md:w-[22%]">
          <AlbumArt variant={track.cover ?? 'ghost'} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {track.title}
            </p>
            <p className="truncate text-xs text-zinc-400">{track.artist}</p>
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
          <div className="h-9 min-w-0 flex-1">
            <WavesurferPlayer
              url={encodeURI(track.src)}
              height={36}
              barWidth={2}
              barGap={2}
              barRadius={2}
              barMinHeight={1}
              normalize
              dragToSeek
              hideScrollbar
              waveColor="#4d4d4d"
              progressColor="#1DB954"
              cursorColor="#ffffff"
              cursorWidth={1}
              onReady={onReady}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeupdate={(_, time) => {
                if (currentTimeRef.current) {
                  currentTimeRef.current.textContent = formatTime(time);
                }
              }}
              onFinish={(wavesurfer) => {
                void wavesurfer.play();
              }}
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
            onClick={() => setMuted((current) => !current)}
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
    </div>
  );
};

const AlbumArt = ({ variant }: { variant: 'ghost' | 'riot' }) => {
  const gradientId = `album-sky-${useId().replace(/:/g, '')}`;

  return (
    <div
      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm shadow-lg ring-1 ring-white/10"
      aria-hidden
    >
      {variant === 'riot' ? (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <defs>
            <radialGradient id={gradientId} cx="50%" cy="80%" r="80%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="55%" stopColor="#450a0a" />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
          </defs>
          <rect width="64" height="64" fill={`url(#${gradientId})`} />
          <circle cx="32" cy="38" r="16" fill="#f97316" />
          <circle cx="32" cy="38" r="10" fill="#facc15" />
          <path
            d="M20 28 C24 18 30 14 32 8 C34 16 40 20 44 28 C38 26 34 30 32 36 C30 30 26 26 20 28 Z"
            fill="#ef4444"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <defs>
            <radialGradient id={gradientId} cx="50%" cy="80%" r="80%">
              <stop offset="0%" stopColor="#312e81" />
              <stop offset="55%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#09090b" />
            </radialGradient>
          </defs>
          <rect width="64" height="64" fill={`url(#${gradientId})`} />
          <circle cx="14" cy="12" r="0.8" fill="white" opacity="0.7" />
          <circle cx="28" cy="8" r="0.6" fill="white" opacity="0.5" />
          <circle cx="50" cy="16" r="0.7" fill="white" opacity="0.6" />
          <circle cx="44" cy="6" r="0.5" fill="white" opacity="0.4" />
          <circle cx="10" cy="24" r="0.5" fill="white" opacity="0.45" />
          <circle cx="46" cy="28" r="18" fill="#e4e4e7" />
          <circle cx="54" cy="24" r="14" fill="#1e1b4b" />
        </svg>
      )}
    </div>
  );
};
