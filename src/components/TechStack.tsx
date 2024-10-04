import Image from 'next/image';
import React from 'react';
import { Heading } from './Heading';
import { twMerge } from 'tailwind-merge';

export const TechStack = () => {
  const frontEnd = [
    {
      title: 'Javascript',
      src: '/images/logos/javascript.svg',

      className: 'h-10 w-10',
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
      title: 'Next.js',
      src: '/images/logos/nextjs.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Vite',
      src: 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Sass',
      src: '/images/logos/sass-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Tailwind',
      src: '/images/logos/tailwind.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Bootstrap',
      src: '/images/logos/bootstrap-colored.svg',

      className: 'h-10 w-10',
    },

    {
      title: 'Html',
      src: '/images/logos/html5-colored.svg',

      className: 'h-10 w-10',
    },

    {
      title: 'Material UI',
      src: '/images/logos/materialui-colored.svg',

      className: 'h-10 w-10',
    },
  ];

  const backEnd = [
    {
      title: 'Node JS',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464816/kenjimmy.me/nodejs_ymmm0h.png',
      className: 'h-10 w-10',
    },
    {
      title: 'Express',
      src: '/images/logos/express-colored.svg',
      className: 'h-10 w-10 bg-zinc-700 rounded-full p-1',
    },
    {
      title: 'Java',
      src: '/images/logos/java.png',
      className: 'h-10 w-10',
    },
    {
      title: 'MongoDB',
      src: '/images/logos/mongodb-colored.svg',

      className: 'h-10 w-10',
    },
    {
      title: 'Mongoose',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464817/kenjimmy.me/mongoose_fmvf1q.png',
      className: 'h-12 w-12',
    },
    {
      title: 'MySQL',
      src: 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg',

      className: 'h-10 w-16',
    },
    {
      title: 'Prisma',
      src: '/images/logos/prisma.png',

      className: 'h-10 w-16',
    },
    {
      title: 'Java',
      src: '/images/logos/java.png',

      className: 'h-10 w-16',
    },

    {
      title: 'Spring Boot',
      src: '/images/logos/spring-boot.png',

      className: 'h-10 w-10',
    },
  ];

  const others = [
    {
      title: 'npm',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/npm_c4lqfw.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Git',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/git_fmjpe4.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Github',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/github_cctzbu.png',

      className: 'h-10 w-10',
    },
    {
      title: 'Docker',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/github_cctzbu.png',

      className: 'h-10 w-10',
    },
    {
      title: 'AWS',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653463600/kenjimmy.me/kisspng-logo-amazon-web-services-amazon-com-portable-netwo-5c57904c50a156.9772938415492424443303_rfhji1.png',

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
  ];

  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Tech Stack
      </Heading>
      <section>
        <h3 className="text-sm font-bold text-white">Front End</h3>
        <div className="flex flex-wrap">
          {frontEnd.map((item) => (
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
      </section>
      <section>
        <h3 className="text-sm font-bold text-white">Back End</h3>
        <div className="flex flex-wrap">
          {backEnd.map((item) => (
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
      </section>
    </div>
  );
};
