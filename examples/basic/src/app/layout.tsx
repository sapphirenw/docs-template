import { createRootLayout } from 'doc-platform/handlers/root-layout';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const { RootLayout, generateMetadata } = createRootLayout({
  fontClassNames: `${inter.variable} ${mono.variable}`,
});

export { generateMetadata };
export default RootLayout;
