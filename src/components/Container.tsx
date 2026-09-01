import React from 'react';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-20 md:px-10">
      {children}
    </main>
  );
};
