'use client';

import Link from 'next/link';
import { Menu, Search, Github, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
	siteName: string;
	logo?: {
		light: string;
		dark: string;
	};
	topbarLinks?: Array<{ name: string; url: string }>;
	onMenuClick: () => void;
	onSearchClick: () => void;
}

export function Header({
	siteName,
	logo,
	topbarLinks = [],
	onMenuClick,
	onSearchClick,
}: HeaderProps) {
	return (
		<header className="glass sticky top-0 z-50 h-16 border-b border-border">
			<div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-4">
				{/* Left section */}
				<div className="flex items-center gap-4">
					{/* Mobile menu button */}
					<button
						onClick={onMenuClick}
						className="rounded-lg p-2 hover:bg-background-muted lg:hidden"
						aria-label="Toggle sidebar"
					>
						<Menu className="h-5 w-5" />
					</button>

					{/* Logo */}
					<Link
						href="/"
						className="flex items-center gap-2 text-lg font-semibold transition-opacity hover:opacity-80"
					>
						{logo ? (
							<>
								<img
									src={logo.light}
									alt=""
									className="h-8 w-8 dark:hidden"
								/>
								<img
									src={logo.dark}
									alt=""
									className="hidden h-8 w-8 dark:block"
								/>
							</>
						) : (
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-bold text-white">
								{siteName.charAt(0)}
							</div>
						)}
						<span className="hidden sm:inline">{siteName}</span>
					</Link>
				</div>

				{/* Center section - Search */}
				<button
					onClick={onSearchClick}
					className={clsx(
						'flex items-center gap-3 rounded-lg px-3 py-1.5',
						'border border-border/50 bg-background-muted/50',
						'text-sm text-foreground-soft',
						'hover:border-border hover:bg-background-muted hover:text-foreground-muted',
						'transition-all duration-150',
						'w-56 lg:w-72'
					)}
				>
					<Search className="h-4 w-4 shrink-0" />
					<span className="flex-1 text-left text-[13px]">
						Search...
					</span>
					<kbd className="hidden items-center gap-0.5 rounded-sm border border-border/50 bg-background px-1.5 py-0.5 text-[11px] font-medium text-foreground-soft sm:inline-flex">
						<span>⌘</span>K
					</kbd>
				</button>

				{/* Right section */}
				<div className="flex items-center gap-2">
					{/* Topbar links */}
					{topbarLinks.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className={clsx(
								'hidden items-center gap-1 rounded-lg px-3 py-2 sm:flex',
								'text-sm text-foreground-muted hover:bg-background-muted hover:text-foreground',
								'transition-colors duration-200'
							)}
						>
							{link.name.toLowerCase() === 'github' ? (
								<Github className="h-4 w-4" />
							) : (
								<>
									{link.name}
									<ExternalLink className="h-3 w-3" />
								</>
							)}
						</a>
					))}

					{/* Theme toggle */}
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
