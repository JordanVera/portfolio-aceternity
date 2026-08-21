'use client';
import React from 'react';

export const Footer = () => {
  return (
    <div className="p-4 text-center justify-center text-xs text-foreground-muted border-t border-border">
      <span className="font-semibold">{new Date().getFullYear()} </span>
      &#8212; Built by{' '}
      <a
        href="https://github.com/JordanVera"
        target="_blank"
        rel="noreferrer"
        className="text-accent hover:text-accent-hover"
      >
        Jordan Vera
      </a>
    </div>
  );
};
