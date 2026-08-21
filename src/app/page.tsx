import { Container } from '@/components/Container';
import { ElectricHover } from '@/components/ElectricBorder';
import { FeaturedWork } from '@/components/FeaturedWork';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { TravelTeaser } from '@/components/TravelTeaser';
import { IconBriefcase2, IconMail, IconScript } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';

const CONTACT_EMAIL = 'verawebdev@protonmail.com';

const ctaClass =
  'inline-flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm text-zinc-200 ring-1 ring-white/10 transition hover:bg-gradient-to-br hover:from-cyan-600 hover:to-blue-600 hover:text-white hover:ring-transparent';

export const metadata: Metadata = {
  title: {
    absolute: 'Jordan Vera - Developer',
  },
  description:
    'Jordan Vera is a fullstack developer in Houston building products like Legendary Barber Competition and Exterior Pro Stack.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Home() {
  return (
    <Container>
      <span className="text-4xl">👋</span>
      <Heading className="font-black">Hello there! I&apos;m Jordan</Heading>
      <Paragraph className="mt-4 max-w-xl">
        I&apos;m a fullstack developer in Houston building products like{' '}
        <Highlight>Legendary Barber Competition</Highlight> and{' '}
        <Highlight>Exterior Pro Stack</Highlight> — branded sites, web,
        native, and the APIs underneath.
      </Paragraph>
      <Paragraph className="mt-4 max-w-xl">
        Beyond the keyboard I like live music, traveling, and the Kansas City
        Chiefs.
      </Paragraph>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <ElectricHover borderRadius={6} className="rounded-md">
          <Link href="#featured" className={ctaClass}>
            <IconBriefcase2 className="h-4 w-4" />
            See work
          </Link>
        </ElectricHover>
        <ElectricHover borderRadius={6} className="rounded-md">
          <Link href="/contact" className={ctaClass}>
            <IconMail className="h-4 w-4" />
            Contact
          </Link>
        </ElectricHover>
        <ElectricHover borderRadius={6} className="rounded-md">
          <Link href="/resume" className={ctaClass}>
            <IconScript className="h-4 w-4" />
            Resume
          </Link>
        </ElectricHover>
      </div>

      <section id="featured" className="scroll-mt-8">
        <div className="mb-6 mt-20 flex items-end justify-between gap-4">
          <Heading as="h2" className="font-black text-lg md:text-lg lg:text-lg">
            Selected work
          </Heading>
          <Link
            href="/projects"
            className="shrink-0 text-sm text-sky-400 transition hover:text-sky-300"
          >
            See all projects
          </Link>
        </div>
        <FeaturedWork />
      </section>

      <section className="mt-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <Heading as="h2" className="font-black text-lg md:text-lg lg:text-lg">
            From the road
          </Heading>
          <Link
            href="/travel"
            className="shrink-0 text-sm text-sky-400 transition hover:text-sky-300"
          >
            See all
          </Link>
        </div>
        <TravelTeaser />
      </section>

      <section className="mt-20">
        <Heading as="h2" className="font-black text-lg md:text-lg lg:text-lg">
          Let&apos;s talk
        </Heading>
        <Paragraph className="mt-4 max-w-xl">
          Have a project, a role, or just want to say hi? Email me at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sky-400 underline underline-offset-2 hover:text-sky-300"
          >
            {CONTACT_EMAIL}
          </a>{' '}
          or{' '}
          <Link
            href="/contact"
            className="text-sky-400 underline underline-offset-2 hover:text-sky-300"
          >
            send a message
          </Link>
          .
        </Paragraph>
      </section>
    </Container>
  );
}
