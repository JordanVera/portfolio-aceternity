'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { ElectricBorder } from './ElectricBorder';

interface AvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function Avatar({ src, alt, size = 80, className }: AvatarProps) {
  return (
    <ElectricBorder
      chaos={0.03}
      borderRadius={999}
      color="#0ea5e9"
      active
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
  );
}
