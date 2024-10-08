'use client';
import { navlinks } from '@/constants/navlinks';
import { Navlink } from '@/types/navlink';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Heading } from './Heading';
import { socials } from '@/constants/socials';
import { Badge } from './Badge';
import { AnimatePresence, motion } from 'framer-motion';
import { IconMenu } from '@tabler/icons-react';
import { isMobile } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const Sidebar = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const [open, setOpen] = useState(isLargeScreen);

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
            exit={{ x: -200 }}
            className="px-6 bg-black z-[100] py-10  max-w-[14rem] lg:w-fit  fixed lg:relative  h-screen left-0 flex flex-col justify-between"
          >
            <div className="flex-1 overflow-auto">
              <SidebarHeader />
              <Navigation setOpen={setOpen} />
            </div>
            <div onClick={() => isMobile() && setOpen(false)}>
              <Badge href="/resume" text="Read Resume" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="fixed lg:hidden top-4 right-6 h-8 w-8 rounded-full backdrop-blur-sm flex items-center justify-center z-50"
        onClick={() => setOpen(!open)}
      >
        <IconMenu className="h-6 w-6 text-white" />
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
            'text-zinc-300 hover:text-white transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm',
            isActive(link.href) && 'bg-zinc-800 shadow-lg text-white'
          )}
        >
          <link.icon
            className={twMerge(
              'h-4 w-4 flex-shrink-0',
              isActive(link.href) && 'text-sky-500'
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
          className={twMerge(
            'text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm'
          )}
        >
          <link.icon
            className={twMerge(
              'h-4 w-4 flex-shrink-0',
              isActive(link.href) && 'text-sky-500'
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
    <div className="flex space-x-2">
      <Image
        src="/images/selfie2.png"
        alt="Avatar"
        height="40"
        width="40"
        className="object-cover object-top rounded-full flex-shrink-0 bg-zinc-700"
      />
      <div className="flex text-sm flex-col">
        <p className="font-bold text-white">Jordan Vera</p>
        <p className="font-light text-zinc-300">Web Developer</p>
      </div>
    </div>
  );
};
