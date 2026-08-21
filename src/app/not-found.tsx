import { NotFoundGlitch } from '@/components/NotFoundGlitch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404',
  description:
    "This page does not exist. Head back to Jordan Vera's portfolio.",
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function NotFound() {
  return <NotFoundGlitch />;
}
