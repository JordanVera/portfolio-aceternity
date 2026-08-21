import { NotFoundGlitch } from '@/components/NotFoundGlitch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Jordan Vera',
  description: 'This page does not exist.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function NotFound() {
  return <NotFoundGlitch />;
}
