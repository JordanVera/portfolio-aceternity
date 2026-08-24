'use client';

import { ElectricHover } from '@/components/ElectricBorder';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import {
  IconBallAmericanFootball,
  IconMusic,
  IconPlaneTilt,
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const interests = [
  {
    icon: IconMusic,
    title: 'Live music',
    description:
      'Most of my free weekends end up at a show. Every page here has a small player in the corner with whatever I have had on repeat.',
  },
  {
    icon: IconPlaneTilt,
    title: 'Traveling with a camera',
    description:
      'Paris, Texas back roads, and everywhere in between. The travel page is the photo dump.',
    href: '/travel',
  },
  {
    icon: IconBallAmericanFootball,
    title: 'LSU football',
    description:
      'Saturdays in the fall belong to the Tigers. There is a purple and gold theme in the sidebar if you know, you know.',
  },
];

export const BeyondTheKeyboard = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {interests.map((interest, idx) => {
        const body = (
          <div className="flex h-full flex-col rounded-xl bg-surface-elevated/40 p-5 ring-1 ring-foreground/10">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-accent">
              <interest.icon className="h-5 w-5" />
            </span>
            <Heading
              as="h3"
              className="mt-4 font-black text-base md:text-base lg:text-base"
            >
              {interest.title}
            </Heading>
            <Paragraph className="mt-2 text-xs md:text-sm lg:text-sm">
              {interest.description}
            </Paragraph>
          </div>
        );

        return (
          <motion.div
            key={interest.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.25, delay: idx * 0.06 }}
          >
            <ElectricHover borderRadius={12} className="h-full rounded-xl">
              {interest.href ? (
                <Link href={interest.href} className="block h-full">
                  {body}
                </Link>
              ) : (
                body
              )}
            </ElectricHover>
          </motion.div>
        );
      })}
    </div>
  );
};
