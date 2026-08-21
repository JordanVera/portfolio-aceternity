import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Highlight = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span className={twMerge('bg-muted px-1 py-0.5 rounded-md', className)}>
      {children}
    </span>
  );
};
