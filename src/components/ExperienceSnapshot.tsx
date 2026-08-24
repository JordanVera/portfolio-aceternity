'use client';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { timeline } from '@/constants/timeline';
import { motion } from 'motion/react';

export const ExperienceSnapshot = () => {
  return (
    <ol className="mt-2">
      {timeline.map((role, idx) => (
        <motion.li
          key={role.company}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.3, delay: idx * 0.08 }}
          className="relative border-l border-border pb-8 pl-6 last:border-transparent last:pb-0"
        >
          <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-surface" />
          <p className="text-xs text-foreground-subtle">{role.date}</p>
          <Heading
            as="h3"
            className="mt-1 font-black text-base md:text-lg lg:text-lg"
          >
            {role.company}
          </Heading>
          <Paragraph className="text-sm font-semibold md:text-sm lg:text-sm">
            {role.title}
          </Paragraph>
          <Paragraph className="mt-1 text-xs md:text-sm lg:text-sm">
            {role.responsibilities[0]}.
          </Paragraph>
        </motion.li>
      ))}
    </ol>
  );
};
