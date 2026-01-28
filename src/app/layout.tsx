import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { getConfig } from '@/lib/config';
import '@/styles/globals.css';

function hexToRgb(hex: string): string {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) return '30 144 255'; // fallback to dodger blue
	return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export async function generateMetadata(): Promise<Metadata> {
	const config = getConfig();
	return {
		title: {
			default: config.name,
			template: `%s | ${config.name}`,
		},
		description: config.description,
	};
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const config = getConfig();
	const primaryRgb = hexToRgb(config.colors.primary);
	const backgroundRgb = config.colors.background
		? hexToRgb(config.colors.background)
		: null;
	const darkBackgroundRgb = config.colors.darkBackground
		? hexToRgb(config.colors.darkBackground)
		: null;
	const customFont = config.font;

	// Build dynamic CSS for config-driven values
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

	// Google Fonts URL for custom font
	const googleFontUrl = customFont
		? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(customFont)}:wght@400;500;600;700&display=swap`
		: null;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{googleFontUrl && (
					<link rel="stylesheet" href={googleFontUrl} />
				)}
				<style
					dangerouslySetInnerHTML={{
						__html: dynamicCss,
					}}
				/>
			</head>
			<body
				className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
			>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
