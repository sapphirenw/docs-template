'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SearchModal } from './SearchModal';
import { DocsConfig } from '../../lib/config';

interface DocsShellProps {
	children: React.ReactNode;
	config: DocsConfig;
}

// Create search index from navigation
function createSearchIndex(config: DocsConfig) {
	const index: Array<{
		slug: string;
		title: string;
		group: string;
	}> = [];

	for (const group of config.navigation) {
		for (const page of group.pages) {
			const title = page
				.split('/')
				.pop()!
				.replace(/-/g, ' ')
				.replace(/\b\w/g, (l) => l.toUpperCase());

			index.push({
				slug: page,
				title,
				group: group.group,
			});
		}
	}

	return index;
}

// Create doc titles from navigation
function createDocTitles(config: DocsConfig) {
	const titles: Record<string, string> = {};

	for (const group of config.navigation) {
		for (const page of group.pages) {
			titles[page] = page
				.split('/')
				.pop()!
				.replace(/-/g, ' ')
				.replace(/\b\w/g, (l) => l.toUpperCase());
		}
	}

	return titles;
}

export function DocsShell({ children, config }: DocsShellProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);

	const searchIndex = createSearchIndex(config);
	const docTitles = createDocTitles(config);

	// Handle cmd+k shortcut
	const handleKeyDown = useCallback((e: KeyboardEvent) => {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			setSearchOpen(true);
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<div className="min-h-screen bg-background">
			<Header
				siteName={config.name}
				logo={config.logo}
				topbarLinks={config.topbarLinks}
				onMenuClick={() => setSidebarOpen(!sidebarOpen)}
				onSearchClick={() => setSearchOpen(true)}
			/>

			<div className="mx-auto flex max-w-screen-2xl">
				<Sidebar
					config={config}
					navigation={config.navigation}
					docTitles={docTitles}
					isOpen={sidebarOpen}
					onClose={() => setSidebarOpen(false)}
				/>

				<div className="min-w-0 flex-1">{children}</div>
			</div>

			<SearchModal
				isOpen={searchOpen}
				onClose={() => setSearchOpen(false)}
				searchIndex={searchIndex}
			/>
		</div>
	);
}
