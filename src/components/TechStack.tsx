import Image from 'next/image';
import React from 'react';
import { Heading } from './Heading';
import { twMerge } from 'tailwind-merge';

export const TechStack = () => {
  const frontEnd = [
    {
      title: 'Javascript',
      src: '/images/logos/javascript.svg',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      className: 'h-10 w-10',
    },
    {
      title: 'React',
      src: '/images/logos/react-colored.svg',
      link: 'https://react.dev/',
      className: 'h-10 w-10',
    },
    {
      title: 'Redux',
      src: '/images/logos/redux-colored.svg',
      link: 'https://redux.js.org/',
      className: 'h-10 w-10',
    },
    {
      title: 'Next.js',
      src: '/images/logos/nextjs.png',
      link: 'https://nextjs.org/',
      className: 'h-10 w-10',
    },
    {
      title: 'Vite',
      src: 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg',
      link: 'https://vitejs.dev/',
      className: 'h-10 w-10',
    },
    {
      title: 'Sass',
      src: '/images/logos/sass-colored.svg',
      link: 'https://sass-lang.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'Tailwind',
      src: '/images/logos/tailwind.png',
      link: 'https://tailwindcss.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'Bootstrap',
      src: '/images/logos/bootstrap-colored.svg',
      link: 'https://getbootstrap.com/',
      className: 'h-10 w-10',
    },

    {
      title: 'Html',
      src: '/images/logos/html5-colored.svg',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      className: 'h-10 w-10',
    },

    {
      title: 'Material UI',
      src: '/images/logos/materialui-colored.svg',
      link: 'https://mui.com/',
      className: 'h-10 w-10',
    },
  ];

  const backEnd = [
    {
      title: 'Node JS',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464816/kenjimmy.me/nodejs_ymmm0h.png',
      link: 'https://nodejs.org/en',
      className: 'h-10 w-10',
    },
    {
      title: 'Express',
      src: '/images/logos/express-colored.svg',
      link: 'https://expressjs.com/',
      className: 'h-10 w-10 bg-zinc-700 rounded-full p-1',
    },
    {
      title: 'MongoDB',
      src: '/images/logos/mongodb-colored.svg',
      link: 'https://www.mongodb.com/',

      className: 'h-10 w-10',
    },
    {
      title: 'Mongoose',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464817/kenjimmy.me/mongoose_fmvf1q.png',
      link: 'https://mongoosejs.com/',
      className: 'h-12 w-12',
    },
    {
      title: 'MySQL',
      src: 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg',
      link: 'https://www.mysql.com/',

      className: 'h-10 w-16',
    },
    {
      title: 'Prisma',
      src: '/images/logos/prisma.png',
      link: 'https://www.prisma.io/',

      className: 'h-10 w-16',
    },
    {
      title: 'Java',
      src: '/images/logos/java.png',
      link: 'https://www.java.com/en/',

      className: 'h-10 w-16',
    },

    {
      title: 'Spring Boot',
      src: '/images/logos/spring-boot.png',
      link: 'https://spring.io/projects/spring-boot',

      className: 'h-10 w-10',
    },
  ];

  const others = [
    {
      title: 'npm',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/npm_c4lqfw.png',
      link: 'https://www.npmjs.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'Git',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/git_fmjpe4.png',
      link: 'https://git-scm.com/',
      className: 'h-10 w-10',
    },

    {
      title: 'Docker',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653462522/kenjimmy.me/kisspng-using-docker-developing-and-deploying-software-wi-poznaj-aplikacjdocker-drupal-w-15-minut-docke-5b81de1974da70.1534794815352376574786_dcdmie.png',
      link: 'https://www.docker.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'AWS',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653463600/kenjimmy.me/kisspng-logo-amazon-web-services-amazon-com-portable-netwo-5c57904c50a156.9772938415492424443303_rfhji1.png',
      link: 'https://aws.amazon.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'Github',
      src: '/images/logos/github.svg',
      link: 'https://github.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'Heroku',
      src: '/images/logos/heroku-colored.svg',
      link: 'https://www.heroku.com/',
      className: 'h-10 w-10',
    },
    {
      title: 'Webpack',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464819/kenjimmy.me/webpack_xjsy5q.png',
      link: 'https://webpack.js.org/',
      className: 'h-10 w-10',
    },
    {
      title: 'Postman',
      src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464818/kenjimmy.me/postman_thyot5.png',
      link: 'https://www.postman.com/',
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
        <div className="flex flex-wrap gap-4">
          {frontEnd.map((item) => (
            <a
              key={item.src}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer"
            >
              <Image
                src={item.src}
                width={`200`}
                height={`200`}
                alt={item.title}
                className={twMerge('object-contain mr-4 mb-4', item.className)}
              />
            </a>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-sm font-bold text-white">Back End</h3>
        <div className="flex flex-wrap gap-4">
          {backEnd.map((item) => (
            <a
              key={item.src}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer"
            >
              <Image
                src={item.src}
                width={`200`}
                height={`200`}
                alt={item.title}
                className={twMerge('object-contain mr-4 mb-4', item.className)}
              />
            </a>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-sm font-bold text-white">Others</h3>
        <div className="flex flex-wrap gap-4">
          {others.map((item) => (
            <a
              key={item.src}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-all duration-300 ease-in-out hover:cursor-pointer"
            >
              <Image
                src={item.src}
                width={`200`}
                height={`200`}
                alt={item.title}
                className={twMerge('object-contain mr-4 mb-4', item.className)}
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
