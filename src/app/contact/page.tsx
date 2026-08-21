import { Contact } from '@/components/Contact';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { Products } from '@/components/Products';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Jordan Vera about a project, a role, or a collaboration. Email verawebdev@protonmail.com.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Projects() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">Contact Me</Heading>
      <Paragraph className="mb-10 max-w-xl">
        Reach out over email at{' '}
        <a
          href="mailto:verawebdev@protonmail.com"
          className="text-sky-400 hover:text-sky-300 underline underline-offset-2"
        >
          verawebdev@protonmail.com
        </a>{' '}
        or fill out this form. I will get back to you ASAP — I promise.
      </Paragraph>
      <Contact />
    </Container>
  );
}
