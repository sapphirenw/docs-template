import { Metadata } from 'next';
import { ThemeProvider } from '../components/ui/ThemeProvider';
import { getConfig } from '../lib/config';

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '30 144 255';
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

interface CreateRootLayoutOptions {
  fontClassNames?: string;
}

export function createRootLayout(options?: CreateRootLayoutOptions) {
  async function generateMetadata(): Promise<Metadata> {
    const config = getConfig();
    return {
      title: {
        default: config.name,
        template: `%s | ${config.name}`,
      },
      description: config.description,
    };
  }

  function RootLayout({ children }: { children: React.ReactNode }) {
    const config = getConfig();
    const primaryRgb = hexToRgb(config.colors.primary);
    const backgroundRgb = config.colors.background
      ? hexToRgb(config.colors.background)
      : null;
    const darkBackgroundRgb = config.colors.darkBackground
      ? hexToRgb(config.colors.darkBackground)
      : null;
    const customFont = config.font;

    let dynamicCss = `:root { --primary: ${primaryRgb};`;
    if (backgroundRgb) {
      dynamicCss += ` --background: ${backgroundRgb};`;
    }
    if (customFont) {
      dynamicCss += ` --font-inter: "${customFont}", ui-sans-serif, system-ui, sans-serif;`;
    }
    dynamicCss += ` }`;

    dynamicCss += ` .dark { --primary: ${primaryRgb};`;
    if (darkBackgroundRgb) {
      dynamicCss += ` --background: ${darkBackgroundRgb};`;
    }
    if (customFont) {
      dynamicCss += ` --font-inter: "${customFont}", ui-sans-serif, system-ui, sans-serif;`;
    }
    dynamicCss += ` }`;

    const googleFontUrl = customFont
      ? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(customFont)}:wght@400;500;600;700&display=swap`
      : null;

    const fontClasses = options?.fontClassNames || '';

    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          {googleFontUrl && <link rel="stylesheet" href={googleFontUrl} />}
          <style dangerouslySetInnerHTML={{ __html: dynamicCss }} />
        </head>
        <body className={`${fontClasses} font-sans`}>
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    );
  }

  return { RootLayout, generateMetadata };
}
