'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

type BadgeVariant = 'default' | 'info' | 'warning' | 'success' | 'danger';

interface BadgeProps {
	children: ReactNode;
	variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
	default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
	info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
	warning:
		'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
	success:
		'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
	danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
	return (
		<span
			className={clsx(
				'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
				variantStyles[variant]
			)}
		>
			{children}
		</span>
	);
}
