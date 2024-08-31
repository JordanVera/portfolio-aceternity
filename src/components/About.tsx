'use client';
import { Paragraph } from '@/components/Paragraph';
import Image from 'next/image';

import { motion } from 'framer-motion';

export default function About() {
  const images = [
    '/images/selfie.jpg',
    '/images/texas.jpg',
    '/images/paris.jpg',
    '/images/code.jpeg',
  ];
  return (
    <div>
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
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl">
        <Paragraph className=" mt-4">
          My name is Jordan Vera, I am a 26 year old fullstack web developer
          from Houston, TX. I am a very ambitious person and really love the
          world of web dev and tech.
        </Paragraph>
        <Paragraph className=" mt-4">
          In 2018, I successfully graduated from the UT Austin Coding Bootcamp,
          where I gained a solid foundation in web development. Since then, I
          have dedicated myself to refining my skills and staying up to date
          with the latest industry trends. Recently, I have been immersing
          myself in the world of data visualization, MERN (MongoDB, Express.js,
          React.js, Node.js) development, and have even ventured into the
          exciting realm of machine learning using tensorflow.js.
        </Paragraph>

        <Paragraph className=" mt-4">
          I invite you to explore my website's projects section, where you'll
          find my standout creations. Among them, I am particularly proud of PGA
          Alpha and NFL Last Longer, which I consider to be my featured
          projects. These applications have been the focal point of my efforts
          and have allowed me to showcase my skills and dedication.
        </Paragraph>
        <Paragraph className=" mt-4">
          Thank you for taking the time to learn more about me. I am eager to
          contribute my expertise, collaborate with like-minded individuals, and
          continue pushing the boundaries of web development.
        </Paragraph>
      </div>
    </div>
  );
}
