'use client';

import { ElectricHover } from '@/components/ElectricBorder';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { socials } from '@/constants/socials';
import {
  IconBriefcase2,
  IconMail,
  IconMapPin,
  IconScript,
} from '@tabler/icons-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const BUILDS = [
  'web apps',
  'native apps',
  'APIs',
  'brands',
  'things that ship',
];

const ctaClass =
  'inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2 text-sm text-heading-to ring-1 ring-foreground/10 transition hover:bg-gradient-to-br hover:from-cta-from hover:to-cta-to hover:text-cta-fg hover:ring-transparent';

const RotatingBuild = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setIndex((current) => (current + 1) % BUILDS.length),
      2400,
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={BUILDS[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="whitespace-nowrap text-accent"
        >
          {BUILDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const HomeHero = () => {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
      <div className="min-w-0 flex-1">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 rounded-full bg-surface-elevated px-3 py-1 text-xs text-foreground-muted ring-1 ring-foreground/10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Open to new projects and roles
        </motion.span>

        <span className="mt-4 block text-4xl">👋</span>
        <Heading className="font-black">Hello there! I&apos;m Jordan</Heading>

        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-subtle">
          <span>Fullstack Developer</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <IconMapPin className="h-3.5 w-3.5" />
            Houston, TX
          </span>
        </p>

        <Heading
          as="p"
          className="mt-6 text-lg md:text-xl lg:text-2xl font-black"
        >
          I build <RotatingBuild />
        </Heading>

        <Paragraph className="mt-4 max-w-xl">
          I&apos;m a fullstack developer who likes owning the whole slice of a
          product — the interface people touch, the API underneath it, and the
          database behind that. Most recently that&apos;s meant{' '}
          <Link
            href="/projects/legendary-barber"
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            Legendary Barber Competition
          </Link>
          , a branded event site for NFL quarterback Shedeur Sanders, and{' '}
          <Link
            href="/projects/exterior-pro-stack"
            className="text-accent underline underline-offset-2 hover:text-accent-hover"
          >
            Exterior Pro Stack
          </Link>
          , a two-sided marketplace spanning web, native, and Stripe-powered
          payouts.
        </Paragraph>
        <Paragraph className="mt-4 max-w-xl">
          Day to day I live in <Highlight>TypeScript</Highlight>,{' '}
          <Highlight>Next.js</Highlight>, <Highlight>React Native</Highlight>,
          and <Highlight>Node</Highlight>. I got started at the UT Austin coding
          bootcamp in 2018, and I&apos;ve been shipping production apps in
          churches, publishing, and disaster recovery ever since.
        </Paragraph>
        <Paragraph className="mt-4 max-w-xl">
          Away from the keyboard: live music, traveling with a camera, and LSU
          football on Saturdays.
        </Paragraph>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ElectricHover borderRadius={6} className="rounded-md">
            <Link href="#featured" className={ctaClass}>
              <IconBriefcase2 className="h-4 w-4" />
              See work
            </Link>
          </ElectricHover>
          <ElectricHover borderRadius={6} className="rounded-md">
            <Link href="/contact" className={ctaClass}>
              <IconMail className="h-4 w-4" />
              Contact
            </Link>
          </ElectricHover>
          <ElectricHover borderRadius={6} className="rounded-md">
            <Link href="/resume" className={ctaClass}>
              <IconScript className="h-4 w-4" />
              Resume
            </Link>
          </ElectricHover>
        </div>

        <div className="mt-6 flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-foreground-subtle transition hover:text-accent"
            >
              <social.icon className="h-4 w-4" />
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="order-first shrink-0 md:order-none md:pt-10"
      >
        <ElectricHover borderRadius={12} className="rounded-xl">
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            <Image
              src="/images/travel/2993DA8B-15E9-4C03-B18D-A32647CB180E_1_102_o.jpeg"
              alt="Jordan Vera"
              width={480}
              height={600}
              priority
              className="h-56 w-full object-cover object-center transition duration-300 hover:scale-[1.03] md:h-72 md:w-56"
            />
          </div>
        </ElectricHover>
      </motion.div>
    </div>
  );
};
