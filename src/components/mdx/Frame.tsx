'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface FrameProps {
	children: ReactNode;
	caption?: string;
	hint?: string;
	className?: string;
}

export function Frame({ children, caption, hint, className }: FrameProps) {
	return (
		<figure className={clsx('my-6', className)}>
			{hint && (
				<div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border/50 bg-gray-100 px-4 py-2 text-sm text-foreground-muted dark:bg-gray-800">
					{hint}
				</div>
			)}
			<div
				className={clsx(
					'overflow-hidden',
					hint ? 'rounded-b-lg' : 'rounded-lg',
					'[&_img]:m-0 [&_img]:block [&_img]:h-auto [&_img]:w-full',
					'[&_video]:block [&_video]:h-auto [&_video]:w-full',
					'[&>p]:m-0'
				)}
			>
				{children}
			</div>
			{caption && (
				<figcaption className="mt-3 text-center text-sm text-foreground-muted">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}
