interface MDXMeta {
  title: string;
  description: string;
  date: string;
  image: string;
  tags?: string[];
}

declare module '*.mdx' {
  import type { ReactNode } from 'react';

  export const meta: MDXMeta;

  export default function MDXContent(props: {
    children?: ReactNode;
  }): JSX.Element;
}
