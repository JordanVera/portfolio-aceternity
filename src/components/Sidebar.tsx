'use client';
import { navlinks } from '@/constants/navlinks';
import { Navlink } from '@/types/navlink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Heading } from './Heading';
import { socials } from '@/constants/socials';
import { Avatar } from './Avatar';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { AnimatePresence, motion } from 'motion/react';
import { IconMenu } from '@tabler/icons-react';
import { isMobile } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Sidebar = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [open, setOpen] = useState(isLargeScreen);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isLargeScreen &&
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLargeScreen, open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => !isLargeScreen && setOpen(false)}
            />

            <motion.div
              ref={sidebarRef}
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
              exit={{ x: -200 }}
              className="px-6 bg-background z-[100] pt-6  max-w-[14rem] lg:w-fit  fixed lg:relative  h-screen left-0 flex flex-col justify-between"
            >
              <div className="flex-1 overflow-auto">
                <SidebarHeader />
                <Navigation setOpen={setOpen} />
              </div>
              <div>
                <div onClick={(event) => event.stopPropagation()}>
                  <ThemeSwitcher />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden top-4 left-4 h-8 w-8 rounded-full backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setOpen(!open)}
      >
        <IconMenu className="h-6 w-6 text-foreground" />
      </button>
    </>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10 relative z-[100]">
      {navlinks.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            'text-foreground-muted hover:text-foreground transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm',
            isActive(link.href) &&
              'bg-surface-elevated shadow-lg text-foreground',
          )}
        >
          <link.icon
            className={twMerge(
              'h-4 w-4 flex-shrink-0',
              isActive(link.href) && 'text-accent-strong',
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Socials
      </Heading>
      {socials.map((link: Navlink) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={twMerge(
            'text-foreground-muted hover:text-foreground transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm',
          )}
        >
          <link.icon
            className={twMerge(
              'h-4 w-4 flex-shrink-0',
              isActive(link.href) && 'text-accent-strong',
            )}
          />
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
};

const SidebarHeader = () => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar src="/images/avatar.png" alt="Jordan Vera" size={50} />
      <div className="flex text-sm flex-col">
        <p className="font-bold text-foreground">Jordan Vera</p>
        <p className="font-light text-foreground-muted text-xs">
          Fullstack Developer
        </p>
      </div>
    </div>
  );
};
