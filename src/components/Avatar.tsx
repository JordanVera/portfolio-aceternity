'use client';

import Image from 'next/image';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ElectricBorder } from './ElectricBorder';
import Link from 'next/link';

const IDLE_CHAOS = 0.008;
const HOVER_CHAOS = 0.03;

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, alt, size = 80, className }: AvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/">
      <ElectricBorder
        chaos={isHovered ? HOVER_CHAOS : IDLE_CHAOS}
        borderRadius={999}
        color="#0ea5e9"
        active
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={twMerge('flex-shrink-0 rounded-full', className)}
      >
        <div
          className="relative overflow-hidden rounded-full bg-zinc-700"
          style={{ width: size, height: size }}
        >
          <Image
            src={src}
            alt={alt}
            height={size}
            width={size}
            className="size-full object-cover object-top"
          />
        </div>
      </ElectricBorder>
    </Link>
  );
}
