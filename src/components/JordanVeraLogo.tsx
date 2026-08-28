import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const LOGOS = [
  {
    src: '/images/logo-white.png',
    className: 'jordan-vera-logo-white',
  },
  {
    src: '/images/logo-black.png',
    className: 'jordan-vera-logo-black',
  },
  {
    src: '/images/logo-gold.png',
    className: 'jordan-vera-logo-gold',
  },
] as const;

export const JordanVeraLogo = ({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) => {
  return (
    <span className={twMerge('relative inline-block', className)}>
      {LOGOS.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt="Jordan Vera"
          width={1536}
          height={1024}
          priority={priority}
          className={twMerge('h-full w-auto max-w-full', logo.className)}
        />
      ))}
    </span>
  );
};
