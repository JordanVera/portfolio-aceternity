import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Metadata } from 'next';

import About from '@/components/About';
import { TechStack } from '@/components/TechStack';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Jordan Vera is a fullstack developer from Houston. UT Austin Coding Bootcamp alum, currently building products like Legendary Barber Competition and Exterior Pro Stack.',
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
        <TechStack />
      </Container>
    </div>
  );
}
