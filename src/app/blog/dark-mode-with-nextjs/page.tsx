import type { Metadata } from 'next';
import Content, { meta } from './content.mdx';

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function Page() {
  return <Content />;
}
