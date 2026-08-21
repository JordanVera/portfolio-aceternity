'use client';
import React, { useState, useEffect } from 'react';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement> &
    Record<string, unknown>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, rgb(var(--foreground) / 0.7) 0%, rgb(var(--foreground) / 0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, rgb(var(--foreground) / 0.7) 0%, rgb(var(--foreground) / 0) 100%)',
    BOTTOM:
      'radial-gradient(20.7% 50% at 50% 100%, rgb(var(--foreground) / 0.7) 0%, rgb(var(--foreground) / 0) 100%)',
    RIGHT:
      'radial-gradient(16.2% 41.199999999999996% at 100% 50%, rgb(var(--foreground) / 0.7) 0%, rgb(var(--foreground) / 0) 100%)',
  };

  const highlight =
    'radial-gradient(75% 181.15942028985506% at 50% 50%, rgb(var(--gradient-highlight)) 0%, rgb(var(--foreground) / 0) 100%)';

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    <Tag
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full border border-transparent bg-foreground/10 p-px decoration-clone transition duration-500 hover:bg-foreground/5',
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          'w-auto text-foreground z-10 bg-background px-4 py-2 rounded-[inherit]',
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          'flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]',
        )}
        style={{
          filter: 'blur(4px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div className="bg-background absolute z-[1] flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
