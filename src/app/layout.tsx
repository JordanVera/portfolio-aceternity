import { Sidebar } from '@/components/Sidebar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import { Footer } from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'John Doe - Developer',
  description:
    'John Doe is a developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          'flex antialiased h-screen overflow-hidden bg-zinc-800'
        )}
      >
        <Sidebar />
        <div className="lg:pl-2 lg:pt-2 bg-zinc-800 flex-1 overflow-y-auto">
          <div className="flex-1 bg-zinc-900 min-h-screen lg:rounded-tl-xl  overflow-y-auto">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
