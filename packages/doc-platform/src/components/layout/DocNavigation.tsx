'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface DocNavigationProps {
	prev?: { slug: string; title: string } | null;
	next?: { slug: string; title: string } | null;
}

export function DocNavigation({ prev, next }: DocNavigationProps) {
	if (!prev && !next) return null;

	return (
		<div className="mt-12 border-t border-border pt-6">
			<div className="flex justify-between gap-4">
				{prev ? (
					<Link
						href={`/${prev.slug}`}
						className={clsx(
							'group flex flex-col gap-1 rounded-lg border border-border/50 px-4 py-3',
							'hover:border-primary-500/40 hover:bg-primary-500/5',
							'max-w-[280px] flex-1 transition-all duration-150'
						)}
					>
						<span className="flex items-center gap-1 text-xs text-foreground-soft">
							<ChevronLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
							Previous
						</span>
						<span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary-500">
							{prev.title}
						</span>
					</Link>
				) : (
					<div />
				)}

				{next ? (
					<Link
						href={`/${next.slug}`}
						className={clsx(
							'group flex flex-col gap-1 rounded-lg border border-border/50 px-4 py-3 text-right',
							'hover:border-primary-500/40 hover:bg-primary-500/5',
							'ml-auto max-w-[280px] flex-1 transition-all duration-150'
						)}
					>
						<span className="flex items-center justify-end gap-1 text-xs text-foreground-soft">
							Next
							<ChevronRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
						</span>
						<span className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary-500">
							{next.title}
						</span>
					</Link>
				) : (
					<div />
				)}
			</div>
		</div>
	);
}
