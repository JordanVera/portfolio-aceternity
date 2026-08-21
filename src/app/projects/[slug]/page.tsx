import { Container } from '@/components/Container';
import { Heading } from '@/components/Heading';
import { Highlight } from '@/components/Highlight';
import { Paragraph } from '@/components/Paragraph';
import { SingleProduct } from '@/components/Product';
import { Products } from '@/components/Products';
import { products } from '@/constants/products';
import { Product } from '@/types/products';
import { Metadata } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug) as Product | undefined;
  if (product) {
    return {
      title: product.title,
      description: product.description,
      icons: {
        icon: '/images/logoWhite.svg',
      },
    };
  }

  return {
    title: 'Projects',
    description:
      'Web apps and products by Jordan Vera, including Legendary Barber Competition, Exterior Pro Stack, NFL Last Longer, and more.',
    icons: {
      icon: '/images/logoWhite.svg',
    },
  };
}

export default function SingleProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    redirect('/projects');
  }
  return (
    <Container>
      <SingleProduct product={product} />
    </Container>
  );
}
