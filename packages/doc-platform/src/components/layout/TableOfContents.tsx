'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { Heading } from '../../lib/mdx';

interface TableOfContentsProps {
	headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>('');

	// Filter to only h2 and h3
	const tocHeadings = headings.filter((h) => h.level === 2 || h.level === 3);

	useEffect(() => {
		if (tocHeadings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: '-80px 0% -80% 0%',
				threshold: 1.0,
			}
		);

		tocHeadings.forEach((heading) => {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, [tocHeadings]);

	if (tocHeadings.length === 0) {
		return null;
	}

	return (
		<aside className="hidden w-56 shrink-0 xl:block">
			<div className="scrollbar-none sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto py-6 pr-4">
				<h4 className="mb-3 pl-3 text-xs font-semibold uppercase tracking-wider text-foreground-soft">
					On this page
				</h4>
				<nav className="border-l border-border">
					{tocHeadings.map((heading, index) => (
						<a
							key={`${heading.id}-${index}`}
							href={`#${heading.id}`}
							onClick={(e) => {
								e.preventDefault();
								const element = document.getElementById(
									heading.id
								);
								if (element) {
									element.scrollIntoView({
										behavior: 'smooth',
									});
									setActiveId(heading.id);
								}
							}}
							className={clsx(
								'toc-link',
								heading.level === 3 && 'pl-6',
								activeId === heading.id && 'active'
							)}
						>
							{heading.text}
						</a>
					))}
				</nav>
			</div>
		</aside>
	);
}
