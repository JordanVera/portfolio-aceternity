'use client';

import { ElectricHover } from '@/components/ElectricBorder';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import {
  IconCreditCard,
  IconDeviceMobile,
  IconLayoutNavbar,
  IconSparkles,
} from '@tabler/icons-react';
import { motion } from 'motion/react';

const capabilities = [
  {
    icon: IconLayoutNavbar,
    title: 'Product-grade web apps',
    description:
      'Next.js App Router, TypeScript, and Tailwind — built for real SEO, real page-speed budgets, and interfaces that feel good to use.',
  },
  {
    icon: IconDeviceMobile,
    title: 'Native apps, shared code',
    description:
      'Expo and React Native apps that share types and a tRPC API with the web client, all living in one Turborepo instead of three codebases.',
  },
  {
    icon: IconCreditCard,
    title: 'APIs, data, and payments',
    description:
      'Node, Express, and Java Spring Boot services with Prisma on MySQL, plus Stripe Connect for marketplace payouts and subscriptions.',
  },
  {
    icon: IconSparkles,
    title: 'AI woven into products',
    description:
      'The Vercel AI SDK, LangChain and LangGraph, and MCP servers — used to make features people actually reach for, not demos.',
  },
];

export const WhatIDo = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {capabilities.map((capability, idx) => (
        <motion.div
          key={capability.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.25, delay: idx * 0.06 }}
        >
          <ElectricHover borderRadius={12} className="h-full rounded-xl">
            <div className="flex h-full flex-col rounded-xl bg-surface-elevated/40 p-5 ring-1 ring-foreground/10">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-accent">
                <capability.icon className="h-5 w-5" />
              </span>
              <Heading
                as="h3"
                className="mt-4 font-black text-base md:text-lg lg:text-lg"
              >
                {capability.title}
              </Heading>
              <Paragraph className="mt-2 text-xs md:text-sm lg:text-sm">
                {capability.description}
              </Paragraph>
            </div>
          </ElectricHover>
        </motion.div>
      ))}
    </div>
  );
};
