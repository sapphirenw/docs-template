'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button className="rounded-lg p-2 hover:bg-background-muted">
				<div className="h-5 w-5" />
			</button>
		);
	}

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className={clsx(
				'rounded-lg p-2 transition-colors duration-200',
				'hover:bg-background-muted',
				'focus:outline-none focus:ring-2 focus:ring-primary-500/50'
			)}
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			{theme === 'dark' ? (
				<Sun className="h-5 w-5 text-foreground-muted" />
			) : (
				<Moon className="h-5 w-5 text-foreground-muted" />
			)}
		</button>
	);
}
