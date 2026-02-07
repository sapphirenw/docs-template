'use client';

import { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
	children: ReactNode;
	tip: string;
}

export function Tooltip({ children, tip }: TooltipProps) {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<span
			className="relative inline-block"
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
		>
			<span className="cursor-help border-b border-dashed border-foreground-soft">
				{children}
			</span>
			<span
				className={clsx(
					'absolute bottom-full left-1/2 mb-2 -translate-x-1/2 px-2 py-1',
					'whitespace-nowrap rounded-md bg-gray-900 text-xs text-white dark:bg-gray-700',
					'pointer-events-none z-50 transition-opacity duration-150',
					isVisible ? 'opacity-100' : 'opacity-0'
				)}
			>
				{tip}
				<span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
			</span>
		</span>
	);
}
