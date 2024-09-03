'use client';
import React from 'react';

export const Footer = () => {
  return (
    <div className="p-4 text-center justify-center text-xs text-zinc-300 border-t border-zinc-800">
      <span className="font-semibold">{new Date().getFullYear()} </span>
      &#8212; Built by{' '}
      <a
        href="https://github.com/JordanVera"
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 hover:text-blue-600"
      >
        Jordan Vera
      </a>
    </div>
  );
};
