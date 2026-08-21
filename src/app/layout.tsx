import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    default: 'Jordan Vera - Developer',
    template: '%s | Jordan Vera',
  },
  description:
    'Jordan Vera is a fullstack developer in Houston building products like Legendary Barber Competition and Exterior Pro Stack.',
  icons: {
    icon: '/images/logoWhite.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={twMerge(
          inter.className,
          'flex antialiased h-screen overflow-hidden bg-black',
        )}
      >
        <Sidebar />
        <PageTransition>
          <div className="flex flex-col flex-1 bg-zinc-900 min-h-screen lg:rounded-tl-xl overflow-y-auto">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </PageTransition>
      </body>
    </html>
  );
}
