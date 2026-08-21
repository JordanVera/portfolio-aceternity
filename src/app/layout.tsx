import './globals.css';
import { Footer } from '@/components/Footer';
import { PageTransition } from '@/components/PageTransition';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { twMerge } from 'tailwind-merge';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <body
        className={twMerge(
          inter.className,
          'flex antialiased h-screen overflow-hidden bg-background text-foreground',
        )}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <ThemeProvider>
          <Sidebar />
          <PageTransition>
            <div className="js-main-panel flex flex-col flex-1 bg-surface min-h-screen lg:rounded-tl-xl overflow-y-auto">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </PageTransition>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
