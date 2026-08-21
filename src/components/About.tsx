'use client';
import { Paragraph } from '@/components/Paragraph';
import { ElectricBorder } from '@/components/ElectricBorder';
import { SpotifyPlayer } from '@/components/SpotifyPlayer';
import Image from 'next/image';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const RIOT_TRACK = {
  title: 'Riot!',
  artist: 'Earl Sweatshirt',
  src: '/music/Earl Sweatshirt-Riot!.mp3',
  cover: 'riot' as const,
};

function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassedThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassedThisYear) {
    age--;
  }

  return age;
}

export default function About() {
  const age = getAge(new Date(1996, 3, 24));
  const skylineRef = useRef<HTMLDivElement>(null);
  const images = [
    '/images/selfie.jpg',
    '/images/texas.jpg',
    '/images/paris.jpg',
    '/images/code.jpeg',
  ];

  useEffect(() => {
    const skyline = skylineRef.current;
    const panel = skyline?.closest('.js-main-panel') as HTMLElement | null;
    if (!skyline || !panel) return;

    const syncToMain = () => {
      const rect = panel.getBoundingClientRect();
      skyline.style.left = `${rect.left}px`;
      skyline.style.width = `${rect.width}px`;
      skyline.style.right = 'auto';
    };

    syncToMain();
    const observer = new ResizeObserver(syncToMain);
    observer.observe(panel);
    window.addEventListener('resize', syncToMain);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncToMain);
    };
  }, []);

  return (
    <>
      <div className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
          {images.map((image, index) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: -50,
                rotate: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: index % 2 === 0 ? 3 : -3,
              }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <ElectricBorder
                chaos={0.03}
                borderRadius={6}
                className="rounded-md"
              >
                <Image
                  src={image}
                  width={200}
                  height={400}
                  alt="about"
                  className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
                />
              </ElectricBorder>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl">
          <Paragraph className=" mt-4">
            My name is Jordan Vera, I am a {age} year old fullstack web
            developer from Houston, TX. I am a very ambitious person and really
            love the world of web dev and tech.
          </Paragraph>
          <Paragraph className=" mt-4">
            In 2018, I successfully graduated from the UT Austin Coding
            Bootcamp, where I gained a solid foundation in web development.
            Since then, I have dedicated myself to refining my skills and
            staying up to date with the latest industry trends. Recently, I have
            been immersing myself in the world of data visualization, MERN
            (MongoDB, Express.js, React.js, Node.js) development, and have even
            ventured into the exciting realm of machine learning using
            tensorflow.js.
          </Paragraph>

          <Paragraph className="mt-4">
            I invite you to explore my website&apos;s{' '}
            <Link
              href="/projects"
              className="text-accent hover:text-accent-hover"
            >
              projects section
            </Link>
            , where you&apos;ll find my standout creations. Among them, I am
            particularly proud of Legendary Barber Competition and Exterior Pro
            Stack, which I consider to be my featured projects. These
            applications have been the focal point of my efforts and have
            allowed me to showcase my skills and dedication.
          </Paragraph>
          <Paragraph className=" mt-4">
            Thank you for taking the time to learn more about me. I am eager to
            contribute my expertise, collaborate with like-minded individuals,
            and continue pushing the boundaries of web development.
          </Paragraph>
        </div>
      </div>
      <motion.div
        ref={skylineRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.45 }}
        className="pointer-events-none fixed bottom-[calc(72px+env(safe-area-inset-bottom))] left-0 right-0 z-0 select-none lg:left-[14rem]"
        aria-hidden
      >
        <Image
          src="/houston-skyline.png"
          alt=""
          width={350}
          height={133}
          className="skyline-art block h-auto w-full opacity-50"
        />
      </motion.div>
      <div className="h-[calc(72px+env(safe-area-inset-bottom))]" aria-hidden />
      <SpotifyPlayer track={RIOT_TRACK} />
    </>
  );
}
