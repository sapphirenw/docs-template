import { defineConfig } from 'tsup';

export default defineConfig([
  // Client-side components bundle
  {
    entry: {
      index: 'src/index.ts',
    },
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    external: ['next', 'react', 'react-dom', 'next/font', 'next/font/google'],
    banner: {
      js: `"use client";`,
    },
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
  // Server-side handlers (no "use client" banner)
  {
    entry: {
      'handlers/root-layout': 'src/handlers/root-layout.tsx',
      'handlers/home-page': 'src/handlers/home-page.tsx',
      'handlers/doc-page': 'src/handlers/doc-page.tsx',
      'handlers/doc-layout': 'src/handlers/doc-layout.tsx',
    },
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: false,
    external: ['next', 'react', 'react-dom', 'next/font', 'next/font/google'],
    esbuildOptions(options) {
      options.jsx = 'automatic';
    },
  },
]);
