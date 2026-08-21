'use client';

import { ElectricBorder } from '@/components/ElectricBorder';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Container } from '@/components/Container';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const IDLE_CHAOS = 0.02;

export const NotFoundGlitch = () => {
  const [chaos, setChaos] = useState(IDLE_CHAOS);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let burstTimer: ReturnType<typeof setTimeout>;
    let settleTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const schedule = () => {
      burstTimer = setTimeout(
        () => {
          if (cancelled) return;
          setChaos(0.1 + Math.random() * 0.12);
          setGlitching(true);

          settleTimer = setTimeout(
            () => {
              if (cancelled) return;
              setChaos(IDLE_CHAOS);
              setGlitching(false);
              schedule();
            },
            90 + Math.random() * 180,
          );
        },
        700 + Math.random() * 2000,
      );
    };

    schedule();

    return () => {
      cancelled = true;
      clearTimeout(burstTimer);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <Container>
      <div className="flex min-h-[70vh] items-center justify-center py-10">
        <ElectricBorder
          chaos={chaos}
          borderRadius={16}
          active
          className="w-full max-w-lg rounded-2xl"
        >
          <div className="rounded-2xl bg-surface px-8 py-12 text-center sm:px-12">
            <div className="relative mx-auto mb-4 inline-block">
              <motion.span
                aria-hidden
                animate={{
                  opacity: glitching ? 0.85 : 0,
                  x: glitching ? -4 : 0,
                }}
                className="absolute inset-0 select-none text-7xl font-black text-rose-500 md:text-8xl"
              >
                404
              </motion.span>
              <motion.span
                aria-hidden
                animate={{
                  opacity: glitching ? 0.85 : 0,
                  x: glitching ? 4 : 0,
                }}
                className="absolute inset-0 select-none text-7xl font-black text-accent md:text-8xl"
              >
                404
              </motion.span>
              <motion.h1
                animate={{
                  x: glitching ? [-2, 3, -1, 0] : 0,
                  skewX: glitching ? [-8, 6, -3, 0] : 0,
                }}
                transition={{ duration: 0.18 }}
                className="relative text-7xl font-black tracking-tight text-foreground md:text-8xl"
              >
                404
              </motion.h1>
            </div>

            <Heading as="h2" className="text-xl md:text-2xl lg:text-2xl">
              Lost the signal
            </Heading>
            <Paragraph className="mx-auto mt-3 max-w-sm">
              That page fried the circuit. It doesn&apos;t exist — or it
              wandered off the map.
            </Paragraph>

            <div className="mt-8 flex justify-center">
              <HoverBorderGradient
                as={Link}
                href="/"
                containerClassName="rounded-full"
                className="bg-background text-foreground flex items-center space-x-2"
              >
                <span>Back home</span>
              </HoverBorderGradient>
            </div>
          </div>
        </ElectricBorder>
      </div>
    </Container>
  );
};
