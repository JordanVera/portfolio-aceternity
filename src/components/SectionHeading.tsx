import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import Link from 'next/link';

export const SectionHeading = ({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) => {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <Heading as="h2" className="font-black text-lg md:text-lg lg:text-lg">
          {title}
        </Heading>
        {description ? (
          <Paragraph className="mt-2 max-w-xl text-xs md:text-sm lg:text-sm">
            {description}
          </Paragraph>
        ) : null}
      </div>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="shrink-0 text-sm text-accent transition hover:text-accent-hover"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
};
