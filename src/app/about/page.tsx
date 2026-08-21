import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { Metadata } from 'next';
import Image from 'next/image';

import { motion } from 'motion/react';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'About | Jordan Vera',
  description:
    'John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-full overflow-x-hidden">
      <Container>
        <span className="text-4xl">💬</span>
        <Heading className="font-black">About Me</Heading>
        <About />
      </Container>
    </div>
  );
}
