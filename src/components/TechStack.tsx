import Image from 'next/image';
import React from 'react';
import { Heading } from './Heading';
import { twMerge } from 'tailwind-merge';

type TechItem = {
  title: string;
  src: string;
  link: string;
  invert?: boolean;
};

type TechCategory = {
  name: string;
  items: TechItem[];
};

const categories: TechCategory[] = [
  {
    name: 'Front End',
    items: [
      {
        title: 'Javascript',
        src: '/images/logos/javascript.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        title: 'TypeScript',
        src: '/images/logos/typescript-colored.svg',
        link: 'https://www.typescriptlang.org/',
      },
      {
        title: 'React',
        src: '/images/logos/react-colored.svg',
        link: 'https://react.dev/',
      },
      {
        title: 'React Native',
        src: '/images/logos/react-native.svg',
        link: 'https://reactnative.dev/',
      },
      {
        title: 'Expo.js',
        src: '/images/logos/expo.svg',
        link: 'https://expo.dev/',
      },
      {
        title: 'Redux',
        src: '/images/logos/redux-colored.svg',
        link: 'https://redux.js.org/',
      },
      {
        title: 'Next.js',
        src: '/images/logos/nextjs.png',
        link: 'https://nextjs.org/',
        invert: true,
      },
      {
        title: 'Vite',
        src: 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg',
        link: 'https://vitejs.dev/',
      },
      {
        title: 'Sass',
        src: '/images/logos/sass-colored.svg',
        link: 'https://sass-lang.com/',
      },
      {
        title: 'Tailwind',
        src: '/images/logos/tailwind.png',
        link: 'https://tailwindcss.com/',
      },
      {
        title: 'Bootstrap',
        src: '/images/logos/bootstrap-colored.svg',
        link: 'https://getbootstrap.com/',
      },
      {
        title: 'Html',
        src: '/images/logos/html5-colored.svg',
        link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      {
        title: 'Material UI',
        src: '/images/logos/materialui-colored.svg',
        link: 'https://mui.com/',
      },
    ],
  },
  {
    name: 'Back End',
    items: [
      {
        title: 'Node JS',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464816/kenjimmy.me/nodejs_ymmm0h.png',
        link: 'https://nodejs.org/en',
      },
      {
        title: 'tRPC',
        src: '/images/logos/trpc.svg',
        link: 'https://trpc.io/',
      },
      {
        title: 'Express',
        src: '/images/logos/express-colored.svg',
        link: 'https://expressjs.com/',
        invert: true,
      },
      {
        title: 'MongoDB',
        src: '/images/logos/mongodb-colored.svg',
        link: 'https://www.mongodb.com/',
      },
      {
        title: 'Mongoose',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464817/kenjimmy.me/mongoose_fmvf1q.png',
        link: 'https://mongoosejs.com/',
      },
      {
        title: 'MySQL',
        src: 'https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg',
        link: 'https://www.mysql.com/',
      },
      {
        title: 'Prisma',
        src: '/images/logos/prisma.png',
        link: 'https://www.prisma.io/',
        invert: true,
      },
      {
        title: 'Java',
        src: '/images/logos/java.png',
        link: 'https://www.java.com/en/',
      },
      {
        title: 'Spring Boot',
        src: '/images/logos/spring-boot.png',
        link: 'https://spring.io/projects/spring-boot',
      },
    ],
  },
  {
    name: 'AI & ML',
    items: [
      {
        title: 'Vercel AI SDK',
        src: '/images/logos/vercel.svg',
        link: 'https://sdk.vercel.ai/',
      },
      {
        title: 'LangChain',
        src: '/images/logos/langchain.svg',
        link: 'https://www.langchain.com/',
      },
      {
        title: 'LangGraph',
        src: '/images/logos/langgraph.svg',
        link: 'https://www.langchain.com/langgraph',
      },
      {
        title: 'LlamaIndex',
        src: '/images/logos/llamaindex.svg',
        link: 'https://www.llamaindex.ai/',
      },
      {
        title: 'OpenRouter',
        src: '/images/logos/openrouter.svg',
        link: 'https://openrouter.ai/',
      },
      {
        title: 'Chutes',
        src: '/images/logos/chutes.png',
        link: 'https://chutes.ai/',
      },
      {
        title: 'Hugging Face',
        src: '/images/logos/huggingface.svg',
        link: 'https://huggingface.co/',
      },
      {
        title: 'Model Context Protocol',
        src: '/images/logos/mcp.svg',
        link: 'https://modelcontextprotocol.io/',
      },
    ],
  },
  {
    name: 'Infrastructure & Services',
    items: [
      {
        title: 'Docker',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653462522/kenjimmy.me/kisspng-using-docker-developing-and-deploying-software-wi-poznaj-aplikacjdocker-drupal-w-15-minut-docke-5b81de1974da70.1534794815352376574786_dcdmie.png',
        link: 'https://www.docker.com/',
      },
      {
        title: 'AWS',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653463600/kenjimmy.me/kisspng-logo-amazon-web-services-amazon-com-portable-netwo-5c57904c50a156.9772938415492424443303_rfhji1.png',
        link: 'https://aws.amazon.com/',
      },
      {
        title: 'Vercel',
        src: '/images/logos/vercel.svg',
        link: 'https://vercel.com/',
      },
      {
        title: 'Railway',
        src: '/images/logos/railway.svg',
        link: 'https://railway.app/',
      },
      {
        title: 'Stripe',
        src: '/images/logos/stripe.svg',
        link: 'https://stripe.com/',
      },
      {
        title: 'Upstash',
        src: '/images/logos/upstash.svg',
        link: 'https://upstash.com/',
      },
    ],
  },
  {
    name: 'Others',
    items: [
      {
        title: 'npm',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/npm_c4lqfw.png',
        link: 'https://www.npmjs.com/',
      },
      {
        title: 'Git',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464815/kenjimmy.me/git_fmjpe4.png',
        link: 'https://git-scm.com/',
      },
      {
        title: 'Docker',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653462522/kenjimmy.me/kisspng-using-docker-developing-and-deploying-software-wi-poznaj-aplikacjdocker-drupal-w-15-minut-docke-5b81de1974da70.1534794815352376574786_dcdmie.png',
        link: 'https://www.docker.com/',
      },
      {
        title: 'AWS',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653463600/kenjimmy.me/kisspng-logo-amazon-web-services-amazon-com-portable-netwo-5c57904c50a156.9772938415492424443303_rfhji1.png',
        link: 'https://aws.amazon.com/',
      },
      {
        title: 'Github',
        src: '/images/logos/github.svg',
        link: 'https://github.com/',
        invert: true,
      },
      {
        title: 'Heroku',
        src: '/images/logos/heroku-colored.svg',
        link: 'https://www.heroku.com/',
      },
      {
        title: 'Webpack',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464819/kenjimmy.me/webpack_xjsy5q.png',
        link: 'https://webpack.js.org/',
      },
      {
        title: 'Postman',
        src: 'https://res.cloudinary.com/dwa1jtluu/image/upload/q_auto,f_auto/v1653464818/kenjimmy.me/postman_thyot5.png',
        link: 'https://www.postman.com/',
      },
    ],
  },
  {
    name: 'AI Tools',
    items: [
      {
        title: 'Claude Code',
        src: '/images/logos/claude-code.svg',
        link: 'https://docs.anthropic.com/en/docs/claude-code',
      },
      {
        title: 'Cursor',
        src: '/images/logos/cursor.svg',
        link: 'https://cursor.com/',
      },
      {
        title: 'Codex',
        src: '/images/logos/openai.svg',
        link: 'https://openai.com/codex/',
      },
      {
        title: 'Gemini',
        src: '/images/logos/gemini.svg',
        link: 'https://gemini.google.com/',
      },
    ],
  },
];

export const TechStack = () => {
  return (
    <div className="relative z-10">
      <Heading
        as="h2"
        className="font-black text-3xl md:text-4xl lg:text-4xl mt-8 mb-8"
      >
        Tech Stack
      </Heading>
      <div className="divide-y divide-zinc-800 border-t border-zinc-800">
        {categories.map((category) => (
          <section
            key={category.name}
            className="grid grid-cols-1 sm:grid-cols-[11.5rem_1fr] gap-3 sm:gap-6 py-5"
          >
            <h3 className="text-sm text-zinc-400 pt-1.5">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <a
                  key={`${category.name}-${item.title}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.title}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-sm text-white transition-colors hover:bg-zinc-900"
                >
                  <Image
                    src={item.src}
                    width={20}
                    height={20}
                    alt=""
                    className={twMerge(
                      'h-4 w-4 object-contain',
                      item.invert && 'brightness-0 invert',
                    )}
                  />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
