import { BeyondTheKeyboard } from '@/components/BeyondTheKeyboard';
import { Container } from '@/components/Container';
import { ElectricHover } from '@/components/ElectricBorder';
import { ExperienceSnapshot } from '@/components/ExperienceSnapshot';
import { FeaturedWork } from '@/components/FeaturedWork';
import { Heading } from '@/components/Heading';
import { HomeHero } from '@/components/HomeHero';
import { HomeStats } from '@/components/HomeStats';
import { Paragraph } from '@/components/Paragraph';
import { SectionHeading } from '@/components/SectionHeading';
import { TechMarquee } from '@/components/TechMarquee';
import { TravelTeaser } from '@/components/TravelTeaser';
import { WhatIDo } from '@/components/WhatIDo';
import { IconMail, IconScript } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';

const CONTACT_EMAIL = 'verawebdev@protonmail.com';

const ctaClass =
  'inline-flex items-center gap-2 rounded-md bg-surface-elevated px-3 py-2 text-sm text-heading-to ring-1 ring-foreground/10 transition hover:bg-gradient-to-br hover:from-cta-from hover:to-cta-to hover:text-cta-fg hover:ring-transparent';

export const metadata: Metadata = {
  title: {
    absolute: 'Jordan Vera - Fullstack Developer in Houston',
  },
  description:
    'Jordan Vera is a fullstack developer in Houston building web and native products like Legendary Barber Competition and Exterior Pro Stack with Next.js, React Native, and Node.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Home() {
  return (
    <Container>
      <HomeHero />

      <section className="mt-16">
        <HomeStats />
      </section>

      <section className="mt-20">
        <SectionHeading
          title="What I do"
          description="I work across the whole stack, which usually means I can take a feature from a sketch to something running in production without a handoff."
        />
        <WhatIDo />
      </section>

      <section id="featured" className="mt-20 scroll-mt-8">
        <SectionHeading
          title="Selected work"
          description="Two products I have spent the most time on recently."
          actionHref="/projects"
          actionLabel="See all projects"
        />
        <FeaturedWork />
      </section>

      <section className="mt-20">
        <SectionHeading
          title="Tools I reach for"
          description="The stack I am fastest in, plus whatever the problem actually needs."
          actionHref="/about"
          actionLabel="Full tech stack"
        />
        <TechMarquee />
      </section>

      <section className="mt-20">
        <SectionHeading
          title="Where I have worked"
          actionHref="/resume"
          actionLabel="Full resume"
        />
        <ExperienceSnapshot />
      </section>

      <section className="mt-20">
        <SectionHeading
          title="Beyond the keyboard"
          description="The stuff that makes up the rest of my week."
          actionHref="/about"
          actionLabel="More about me"
        />
        <BeyondTheKeyboard />
      </section>

      <section className="mt-20">
        <SectionHeading
          title="From the road"
          actionHref="/travel"
          actionLabel="See all"
        />
        <TravelTeaser />
      </section>

      <section className="mt-20">
        <ElectricHover borderRadius={12} className="rounded-xl">
          <div className="rounded-xl bg-surface-elevated/40 p-6 ring-1 ring-foreground/10 md:p-8">
            <Heading
              as="h2"
              className="font-black text-lg md:text-xl lg:text-2xl"
            >
              Let&apos;s build something
            </Heading>
            <Paragraph className="mt-3 max-w-xl">
              Have a project in mind? Tell me what you are building and I will
              get back to you with next steps. Reach me at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </Paragraph>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/contact" className={ctaClass}>
                <IconMail className="h-4 w-4" />
                Start a project
              </Link>
              <Link href="/resume" className={ctaClass}>
                <IconScript className="h-4 w-4" />
                Read my resume
              </Link>
            </div>
          </div>
        </ElectricHover>
      </section>
    </Container>
  );
}
