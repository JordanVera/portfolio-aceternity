'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type MarqueeItem = {
  title: string;
  src: string;
  invert?: boolean;
};

const items: MarqueeItem[] = [
  { title: 'TypeScript', src: '/images/logos/typescript-colored.svg' },
  { title: 'React', src: '/images/logos/react-colored.svg' },
  { title: 'Next.js', src: '/images/logos/nextjs.png', invert: true },
  { title: 'React Native', src: '/images/logos/react-native.svg' },
  { title: 'Expo', src: '/images/logos/expo.svg' },
  { title: 'Tailwind', src: '/images/logos/tailwind.png' },
  { title: 'tRPC', src: '/images/logos/trpc.svg' },
  { title: 'Prisma', src: '/images/logos/prisma.png', invert: true },
  { title: 'MongoDB', src: '/images/logos/mongodb-colored.svg' },
  { title: 'Express', src: '/images/logos/express-colored.svg', invert: true },
  { title: 'Spring Boot', src: '/images/logos/spring-boot.png' },
  { title: 'Stripe', src: '/images/logos/stripe.svg' },
  { title: 'Vercel AI SDK', src: '/images/logos/vercel.svg' },
  { title: 'LangGraph', src: '/images/logos/langgraph.svg' },
  { title: 'Upstash', src: '/images/logos/upstash.svg' },
  { title: 'Railway', src: '/images/logos/railway.svg' },
];

const Row = ({ ariaHidden }: { ariaHidden?: boolean }) => (
  <div
    className="flex shrink-0 items-center gap-3 pr-3"
    aria-hidden={ariaHidden}
  >
    {items.map((item) => (
      <span
        key={item.title}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-muted bg-surface-elevated px-2.5 py-1.5 text-sm text-foreground"
      >
        <Image
          src={item.src}
          width={20}
          height={20}
          alt=""
          className={twMerge(
            'h-4 w-4 object-contain',
            item.invert && 'theme-logo-invert',
          )}
        />
        {item.title}
      </span>
    ))}
  </div>
);

export const TechMarquee = () => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="flex flex-wrap gap-3">
        <Row />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        <Row />
        <Row ariaHidden />
      </motion.div>
    </div>
  );
};
