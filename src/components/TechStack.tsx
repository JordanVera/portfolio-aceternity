import Image from 'next/image';
import React from 'react';
import { Heading } from './Heading';
import { twMerge } from 'tailwind-merge';

export const TechStack = () => {
  const stack = [
    {
      title: 'Next.js',
      src: '/images/logos/nextjs.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Bootstrap',
      src: '/images/logos/bootstrap-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'AWS',
      src: '/images/logos/aws.webp',

      className: 'h-10 w-10',
    },
    {
      title: 'Express',
      src: '/images/logos/express-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Github',
      src: '/images/logos/github.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Heroku',
      src: '/images/logos/heroku-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Html',
      src: '/images/logos/html5-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Java',
      src: '/images/logos/java.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Javascript',
      src: '/images/logos/javascript.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Material UI',
      src: '/images/logos/materialui-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'MongoDB',
      src: '/images/logos/mongodb-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Prisma',
      src: '/images/logos/prisma.png',

      className: 'h-10 w-16',
    },
    {
      title: 'React',
      src: '/images/logos/react-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Redux',
      src: '/images/logos/redux-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Sass',
      src: '/images/logos/sass-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Spring Boot',
      src: '/images/logos/spring-boot.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Tailwind',
      src: '/images/logos/tailwind.png',

      className: 'h-10 w-10',
    },
  ];
  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <div className="flex flex-wrap">
        {stack.map((item) => (
          <Image
            src={item.src}
            key={item.src}
            width={`200`}
            height={`200`}
            alt={item.title}
            className={twMerge('object-contain mr-4 mb-4', item.className)}
          />
        ))}
      </div>
    </div>
  );
};
