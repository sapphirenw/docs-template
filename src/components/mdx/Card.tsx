'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
	ArrowRight,
	AlertCircle,
	Book,
	Code,
	Settings,
	Blocks,
	Zap,
	Shield,
	Download,
	Rocket,
	Star,
	Heart,
	Sparkles,
	Maximize,
	Link as LinkIcon,
	Search,
	BarChart,
	Gauge,
	ChevronDown,
	Columns,
	LayoutGrid,
	ListOrdered,
	FileText,
	Terminal,
	type LucideIcon,
} from 'lucide-react';
import { clsx } from 'clsx';

// Map of available icons
const iconMap: Record<string, LucideIcon> = {
	AlertCircle,
	Book,
	Code,
	Settings,
	Blocks,
	Zap,
	Shield,
	Download,
	Rocket,
	Star,
	Heart,
	Sparkles,
	Maximize,
	Link: LinkIcon,
	Search,
	BarChart,
	Gauge,
	ChevronDown,
	Columns,
	LayoutGrid,
	ListOrdered,
	FileText,
	Terminal,
};

interface CardProps {
	title: string;
	description?: string;
	href?: string;
	icon?: string;
	children?: ReactNode;
}

export function Card({ title, description, href, icon, children }: CardProps) {
	const IconComponent = icon ? iconMap[icon] : null;

	const content = (
		<div
			className={clsx(
				'group relative rounded-lg border border-border p-3',
				'transition-all duration-150',
				href &&
					'cursor-pointer hover:border-primary-500/50 hover:bg-background-soft'
			)}
		>
			<div className="flex items-center gap-3">
				{IconComponent && (
					<div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary-500/10 text-primary-500">
						<IconComponent className="h-4 w-4" />
					</div>
				)}
				<span className="text-sm font-medium text-foreground">
					{title}
				</span>
				{href && (
					<ArrowRight
						className={clsx(
							'ml-auto h-3.5 w-3.5 text-foreground-soft transition-all duration-150',
							'-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:text-primary-500 group-hover:opacity-100'
						)}
					/>
				)}
			</div>
			{(description || children) && (
				<div
					className={clsx(
						'mt-2 text-[13px] leading-snug text-foreground-muted',
						IconComponent && 'ml-11'
					)}
				>
					{description || children}
				</div>
			)}
		</div>
	);

	if (href) {
		return (
			<Link href={href} className="block no-underline">
				{content}
			</Link>
		);
	}

	return content;
}

interface CardGroupProps {
	children: ReactNode;
	cols?: 1 | 2 | 3;
}

export function CardGroup({ children, cols = 2 }: CardGroupProps) {
	return (
		<div
			className={clsx(
				'my-4 grid gap-2',
				cols === 1 && 'grid-cols-1',
				cols === 2 && 'grid-cols-1 sm:grid-cols-2',
				cols === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
			)}
		>
			{children}
		</div>
	);
}
