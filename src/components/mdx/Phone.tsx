'use client';

import React from 'react';
import clsx from 'clsx';

interface PhoneProps {
	children: React.ReactNode;
	variant?: 'dark' | 'light' | 'gold' | 'blue';
	caption?: string;
	className?: string;
}

const variantStyles = {
	dark: {
		frame: 'bg-[#1a1a1a]',
		bezel: 'bg-[#0a0a0a]',
		button: 'bg-[#2a2a2a]',
	},
	light: {
		frame: 'bg-[#e8e8e8]',
		bezel: 'bg-[#f5f5f5]',
		button: 'bg-[#d0d0d0]',
	},
	gold: {
		frame: 'bg-[#d4c4a8]',
		bezel: 'bg-[#e8dcc8]',
		button: 'bg-[#c4b498]',
	},
	blue: {
		frame: 'bg-[#1e3a5f]',
		bezel: 'bg-[#2a4a6f]',
		button: 'bg-[#0e2a4f]',
	},
};

export function Phone({
	children,
	variant = 'dark',
	caption,
	className,
}: PhoneProps) {
	const styles = variantStyles[variant];

	return (
		<figure className={clsx('my-6 flex flex-col items-center', className)}>
			{/* iPhone Frame */}
			<div
				className={clsx(
					'relative',
					'w-[280px]',
					'rounded-[3rem]',
					'p-3',
					styles.frame,
					'shadow-xl',
					'border border-black/10 dark:border-white/10'
				)}
			>
				{/* Side buttons - Volume */}
				<div
					className={clsx(
						'absolute -left-[3px] top-[100px] h-[30px] w-[3px] rounded-l-sm',
						styles.button
					)}
				/>
				<div
					className={clsx(
						'absolute -left-[3px] top-[140px] h-[55px] w-[3px] rounded-l-sm',
						styles.button
					)}
				/>
				<div
					className={clsx(
						'absolute -left-[3px] top-[205px] h-[55px] w-[3px] rounded-l-sm',
						styles.button
					)}
				/>
				{/* Side button - Power */}
				<div
					className={clsx(
						'absolute -right-[3px] top-[160px] h-[80px] w-[3px] rounded-r-sm',
						styles.button
					)}
				/>

				{/* Inner bezel */}
				<div
					className={clsx(
						'relative',
						'rounded-[2.25rem]',
						'overflow-hidden',
						styles.bezel,
						'p-[2px]'
					)}
				>
					{/* Screen */}
					<div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-black">
						{/* Dynamic Island */}
						<div className="absolute left-1/2 top-3 z-10 -translate-x-1/2">
							<div className="flex h-[28px] w-[90px] items-center justify-center rounded-full bg-black">
								<div className="mr-6 h-3 w-3 rounded-full bg-[#1a1a1a]" />
							</div>
						</div>

						{/* Content */}
						<div className="absolute inset-0 [&>p]:m-0 [&>p]:h-full [&_img]:m-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_video]:h-full [&_video]:w-full [&_video]:object-cover">
							{children}
						</div>

						{/* Home indicator */}
						<div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/30" />
					</div>
				</div>
			</div>

			{caption && (
				<figcaption className="mt-4 text-center text-sm text-foreground-muted">
					{caption}
				</figcaption>
			)}
		</figure>
	);
}

interface PhoneGroupProps {
	children: React.ReactNode;
	className?: string;
}

export function PhoneGroup({ children, className }: PhoneGroupProps) {
	return (
		<div
			className={clsx(
				'my-6 flex flex-wrap items-start justify-center gap-8',
				className
			)}
		>
			{children}
		</div>
	);
}
