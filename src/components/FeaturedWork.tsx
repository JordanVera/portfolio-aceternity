'use client';

import { ElectricHover } from '@/components/ElectricBorder';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { products } from '@/constants/products';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

const FEATURED_SLUGS = ['legendary-barber', 'exterior-pro-stack'];

export const FeaturedWork = () => {
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const match = products.find((product) => product.slug === slug);
    return match ? [match] : [];
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {featured.map((product, idx) => (
        <motion.div
          key={product.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.08 }}
        >
          <ElectricHover borderRadius={12} className="h-full rounded-xl">
            <Link
              href={`/projects/${product.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl ring-1 ring-white/10"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-zinc-800">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-200 group-hover:scale-[1.03]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-1 flex-col bg-zinc-800/40 p-4">
                <Heading
                  as="h3"
                  className="font-black text-base md:text-lg lg:text-lg"
                >
                  {product.title}
                </Heading>
                <Paragraph className="mt-1.5 line-clamp-2 text-xs md:text-sm lg:text-sm">
                  {product.description}
                </Paragraph>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.stack?.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-sm bg-zinc-700 px-1.5 py-0.5 text-[10px] text-white md:text-xs"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </ElectricHover>
        </motion.div>
      ))}
    </div>
  );
};
