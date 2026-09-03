import { Contact } from '@/components/Contact';
import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire me',
  description:
    'Hire Jordan Vera for a freelance web, native, or API project. Tell me what you are building, or email verawebdev@protonmail.com.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function HirePage() {
  return (
    <Container>
      <span className="text-4xl">✉️</span>
      <Heading className="font-black mb-2">Hire Me</Heading>
      <Paragraph className="mb-10 max-w-xl">
        Tell me about the project — what you are building, when you need it, and
        the budget you have in mind. Attach logos or references if you have
        them. I will reply with next steps. Prefer email? Reach me at{' '}
        <a
          href="mailto:verawebdev@protonmail.com"
          className="text-accent hover:text-accent-hover underline underline-offset-2"
        >
          verawebdev@protonmail.com
        </a>
        .
      </Paragraph>
      <Contact />
    </Container>
  );
}
