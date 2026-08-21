'use client';

import { ElectricHover } from '@/components/ElectricBorder';
import { travelMedia } from '@/constants/travel';
import Image from 'next/image';
import Link from 'next/link';

const teaserImages = travelMedia
  .filter((item) => item.type === 'image')
  .slice(0, 4);

export const TravelTeaser = () => {
  return (
    <Link
      href="/travel"
      className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5"
    >
      {teaserImages.map((item) => (
        <ElectricHover
          key={item.src}
          borderRadius={6}
          className="group rounded-md"
        >
          <div className="overflow-hidden rounded-md ring-1 ring-foreground/10">
            <Image
              src={item.src}
              alt="Travel photo"
              width={400}
              height={300}
              className="h-28 w-full object-cover transition duration-200 group-hover:scale-[1.03] md:h-36"
            />
          </div>
        </ElectricHover>
      ))}
    </Link>
  );
};
