import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { WorkHistory } from '@/components/WorkHistory';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Jordan Vera',
  description:
    'John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black">Work History</Heading>
      <Paragraph className="max-w-xl mt-4">
        I&apos;m a full-stack developer that loves{' '}
        <Highlight>building products</Highlight> and web apps that can impact
        millions of lives
      </Paragraph>
      <WorkHistory />

      <button className="text-black font-bold bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 w-full p-2 rounded-lg ">
        Download Resume
      </button>
    </Container>
  );
}
