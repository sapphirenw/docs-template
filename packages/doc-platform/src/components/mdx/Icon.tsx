'use client';

import { icons } from 'lucide-react';
import { clsx } from 'clsx';

interface IconProps {
	name: string;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export function Icon({ name, size = 'md', className }: IconProps) {
	// Convert name to PascalCase for Lucide icon lookup
	const iconName = name
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('') as keyof typeof icons;

	const IconComponent = icons[iconName];

	if (!IconComponent) {
		console.warn(`Icon "${name}" not found`);
		return null;
	}

	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6',
	};

	return (
		<IconComponent
			className={clsx(sizeClasses[size], 'inline-block', className)}
		/>
	);
}
