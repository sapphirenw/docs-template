'use client';

import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionProps {
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
	icon?: ReactNode;
}

export function Accordion({
	title,
	children,
	defaultOpen = false,
	icon,
}: AccordionProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		<div className="my-4 overflow-hidden rounded-xl border border-border">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={clsx(
					'flex w-full items-center justify-between gap-4 p-4 text-left',
					'transition-colors duration-200 hover:bg-background-muted',
					isOpen && 'bg-background-muted'
				)}
			>
				<div className="flex items-center gap-3">
					{icon && (
						<span className="text-foreground-muted">{icon}</span>
					)}
					<span className="font-medium">{title}</span>
				</div>
				<ChevronDown
					className={clsx(
						'h-5 w-5 text-foreground-muted transition-transform duration-200',
						isOpen && 'rotate-180'
					)}
				/>
			</button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}
					>
						<div className="p-4 pt-0 text-foreground-muted">
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

interface AccordionGroupProps {
	children: ReactNode;
}

export function AccordionGroup({ children }: AccordionGroupProps) {
	return <div className="my-6 space-y-2 [&>.border]:my-0">{children}</div>;
}
