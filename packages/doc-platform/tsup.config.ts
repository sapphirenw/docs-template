import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

/**
 * Post-build: prepend "use client" to shared chunks that contain React hooks.
 * tsup's banner option only applies to entry files, not code-split chunks.
 * Handler entries are server code, but their shared chunks may contain
 * client components (DocsShell, ThemeProvider, etc.) that need the directive.
 */
function addUseClientToChunks() {
  const distDir = path.resolve('dist');
  const files = fs.readdirSync(distDir);

  for (const file of files) {
    if (!file.startsWith('chunk-') || !file.endsWith('.mjs')) continue;
    const filePath = path.join(distDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    // If the chunk imports hooks from react, it contains client components
    if (
      content.includes('from "react"') ||
      content.includes("from 'react'")
    ) {
      fs.writeFileSync(filePath, `"use client";\n${content}`);
    }
  }
}

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
  // Server-side handlers (no "use client" banner on entries)
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
    onSuccess: async () => {
      addUseClientToChunks();
    },
  },
]);
