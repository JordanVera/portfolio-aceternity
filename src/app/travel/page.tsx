import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { SpotifyPlayer } from '@/components/SpotifyPlayer';
import { TravelGallery } from '@/components/TravelGallery';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel | Jordan Vera',
  description:
    'Photos and short clips from places I have been — concerts, stadiums, and trips out of Houston.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function TravelPage() {
  return (
    <>
      <Container>
        <span className="text-4xl">✈️</span>
        <Heading className="font-black">Places I&apos;ve been</Heading>
        <Paragraph className="max-w-xl mt-4 mb-10">
          Beyond the keyboard I like <Highlight>getting out of Houston</Highlight>{' '}
          — live music, football games, and whatever city I can get to next. A few
          snapshots from the road.
        </Paragraph>
        <TravelGallery />
      </Container>
      <div
        className="h-[calc(72px+env(safe-area-inset-bottom))]"
        aria-hidden
      />
      <SpotifyPlayer />
    </>
  );
}
