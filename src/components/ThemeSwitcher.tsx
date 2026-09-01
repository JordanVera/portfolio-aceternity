'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { twMerge } from 'tailwind-merge';
import { useTheme } from './ThemeProvider';
import type { Theme } from '@/lib/theme';

const OPTIONS: { id: Theme; label: string }[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
  { id: 'lsu', label: 'LSU' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="mb-4 flex rounded-lg bg-surface-elevated p-0.5 ring-1 ring-foreground/10"
    >
      {OPTIONS.map((option) => {
        const selected = theme === option.id;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            title={option.label}
            onClick={() => setTheme(option.id)}
            className={twMerge(
              'flex h-8 flex-1 items-center justify-center rounded-md text-[10px] font-black tracking-wide transition',
              selected
                ? 'bg-muted text-foreground shadow-sm'
                : 'text-foreground-subtle hover:text-foreground',
              option.id === 'lsu' && selected && ' bg-[#FDD023] text-[#461D7C]',
            )}
          >
            {option.id === 'dark' && <IconMoon className="h-3.5 w-3.5" />}
            {option.id === 'light' && <IconSun className="h-3.5 w-3.5" />}
            {option.id === 'lsu' && <span>LSU</span>}
          </button>
        );
      })}
    </div>
  );
}
