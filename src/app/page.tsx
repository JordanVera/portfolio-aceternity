import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { TechStack } from '@/components/TechStack';
import Image from 'next/image';

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">Hello there! I&apos;m Jordan</Heading>
      <Paragraph className="max-w-xl mt-4">
        Hi, I'm Jordan Vera, a passionate software engineer with a knack for
        creating simple solutions through code. I thrive on the excitement of
        bringing ideas to life and transforming them into tangible, functional
        products.
      </Paragraph>
      <Paragraph className="max-w-xl mt-4">
        Beyond coding, I like listening to live music, traveling, and watching
        football (specifically the Kansas City Chiefs).
      </Paragraph>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <Products />
      <TechStack />
    </Container>
  );
}
