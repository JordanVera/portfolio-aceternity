import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Products } from '@/components/Products';
import { SpotifyPlayer } from '@/components/SpotifyPlayer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Jordan Vera',
  description:
    'John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Projects() {
  return (
    <>
      <Container>
        <span className="text-4xl">⚡</span>
        <Heading className="font-black mb-10">
          {' '}
          What I&apos;ve been working on
        </Heading>

        <Products />
      </Container>
      <div className="h-[calc(72px+env(safe-area-inset-bottom))]" aria-hidden />
      <SpotifyPlayer
        track={{
          title: 'Dancin (KRONO Remix)',
          artist: 'Aaron Smith',
          src: '/music/Aaron Smith - Dancin (KRONO Remix) - Lyrics.mp3',
          cover: 'dancin',
        }}
      />
    </>
  );
}
