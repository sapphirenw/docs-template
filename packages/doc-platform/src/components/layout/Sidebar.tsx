'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, X, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { NavItem, DocsConfig } from '../../lib/config';

interface SidebarProps {
	config: DocsConfig;
	navigation: NavItem[];
	docTitles: Record<string, string>;
	isOpen: boolean;
	onClose: () => void;
}

export function Sidebar({
	config,
	navigation,
	docTitles,
	isOpen,
	onClose,
}: SidebarProps) {
	// Get the root page slug from config or default to first page
	const rootPage =
		config.rootPage ||
		(navigation.length > 0 && navigation[0].pages.length > 0
			? navigation[0].pages[0]
			: '');

	return (
		<>
			{/* Mobile overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={clsx(
					'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 border-r border-border bg-background',
					'transform transition-transform duration-300 ease-in-out',
					'lg:sticky lg:top-16 lg:translate-x-0',
					'flex flex-col',
					isOpen ? 'translate-x-0' : '-translate-x-full'
				)}
			>
				{/* Mobile close button */}
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-lg p-2 hover:bg-background-muted lg:hidden"
					aria-label="Close sidebar"
				>
					<X className="h-5 w-5" />
				</button>

				<nav className="scrollbar-none flex-1 overflow-y-auto px-4 py-6">
					{navigation.map((group) => (
						<NavGroup
							key={group.group}
							group={group}
							docTitles={docTitles}
							rootPage={rootPage}
							onNavigate={onClose}
						/>
					))}
				</nav>

				{/* Powered by watermark */}
				<div className="shrink-0 border-t border-border px-4 py-4">
					<a
						href="https://sapphirenw.com"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 text-xs text-foreground-muted/60 transition-colors hover:text-foreground-muted"
					>
						<Zap className="h-3.5 w-3.5 text-primary-500/60 transition-colors group-hover:text-primary-500" />
						<span>
							Powered by{' '}
							<span className="font-medium">Sapphire NW</span>
						</span>
					</a>
				</div>
			</aside>
		</>
	);
}

interface NavGroupProps {
	group: NavItem;
	docTitles: Record<string, string>;
	rootPage: string;
	onNavigate: () => void;
}

function NavGroup({ group, docTitles, rootPage, onNavigate }: NavGroupProps) {
	const [isExpanded, setIsExpanded] = useState(true);
	const pathname = usePathname();

	return (
		<div className="mb-4">
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex w-full items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-soft transition-colors hover:text-foreground"
			>
				<ChevronRight
					className={clsx(
						'h-3 w-3 transition-transform duration-200',
						isExpanded && 'rotate-90'
					)}
				/>
				{group.group}
			</button>

			{isExpanded && (
				<div className="ml-1 mt-1 space-y-0.5 border-l border-border pl-3">
					{group.pages.map((page) => {
						const href = `/${page}`;
						const isActive =
							pathname === href ||
							(pathname === '/' && page === rootPage);
						const title = docTitles[page] || formatTitle(page);

						return (
							<Link
								key={page}
								href={href}
								onClick={onNavigate}
								className={clsx(
									'sidebar-link',
									isActive && 'active'
								)}
							>
								<span className="truncate">{title}</span>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}

function formatTitle(slug: string): string {
	return slug
		.split('/')
		.pop()!
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (l) => l.toUpperCase());
}
