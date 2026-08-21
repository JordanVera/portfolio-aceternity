import { Container } from '@/components/Container';
import { ElectricHover } from '@/components/ElectricBorder';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { SpotifyPlayer } from '@/components/SpotifyPlayer';
import { WorkHistory } from '@/components/WorkHistory';
import { Metadata } from 'next';
import Link from 'next/link';
import { TechStack } from '@/components/TechStack';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Work history and tech stack for Jordan Vera, a fullstack developer in Houston. Roles at The Lighthouse Church, Digital Publishing Inc., and Frontier Services Group.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Home() {
  return (
    <>
      <Container>
        <span className="text-4xl">💼</span>
        <Heading className="font-black">Work History</Heading>
        <Paragraph className="max-w-xl mt-4">
          I&apos;m a full-stack developer that loves{' '}
          <Highlight>building products</Highlight> and web apps that can impact
          millions of lives
        </Paragraph>
        <WorkHistory />
        <ElectricHover borderRadius={8} className="w-full rounded-lg">
          <Link
            href="/webDevResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center text-cta-fg font-bold bg-gradient-to-br from-cta-from to-cta-to w-full p-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Download Full Resume
          </Link>
        </ElectricHover>
        {/* <TechStack /> */}
      </Container>
      <div className="h-[calc(72px+env(safe-area-inset-bottom))]" aria-hidden />
      <SpotifyPlayer
        track={{
          title: 'Aruarian Dance',
          artist: 'Nujabes',
          src: '/music/Nujabes - Aruarian Dance (Samurai Champloo OST) . Track 03.mp3',
          cover: 'aruarian',
        }}
      />
    </>
  );
}
