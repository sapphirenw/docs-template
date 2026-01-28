'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, ArrowRight, Command } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResult {
	slug: string;
	title: string;
	description?: string;
	group: string;
}

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	searchIndex: SearchResult[];
}

export function SearchModal({
	isOpen,
	onClose,
	searchIndex,
}: SearchModalProps) {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	// Search logic
	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			return;
		}

		const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
		const filtered = searchIndex.filter((item) => {
			const searchText =
				`${item.title} ${item.description || ''} ${item.group}`.toLowerCase();
			return searchTerms.every((term) => searchText.includes(term));
		});

		setResults(filtered.slice(0, 8));
		setSelectedIndex(0);
	}, [query, searchIndex]);

	// Keyboard navigation
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (!isOpen) return;

			switch (e.key) {
				case 'ArrowDown':
					e.preventDefault();
					setSelectedIndex((i) =>
						Math.min(i + 1, results.length - 1)
					);
					break;
				case 'ArrowUp':
					e.preventDefault();
					setSelectedIndex((i) => Math.max(i - 1, 0));
					break;
				case 'Enter':
					e.preventDefault();
					if (results[selectedIndex]) {
						router.push(`/${results[selectedIndex].slug}`);
						onClose();
					}
					break;
				case 'Escape':
					onClose();
					break;
			}
		},
		[isOpen, results, selectedIndex, router, onClose]
	);

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	// Focus input when modal opens
	useEffect(() => {
		if (isOpen) {
			setQuery('');
			setResults([]);
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [isOpen]);

	// Handle cmd/ctrl+k to open
	useEffect(() => {
		const handleGlobalKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				if (isOpen) {
					onClose();
				}
			}
		};

		window.addEventListener('keydown', handleGlobalKeyDown);
		return () => window.removeEventListener('keydown', handleGlobalKeyDown);
	}, [isOpen, onClose]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1 }}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Modal - Centered with flexbox */}
					<div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
						<motion.div
							initial={{ opacity: 0, scale: 0.96, y: -10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.96, y: -10 }}
							transition={{ duration: 0.15, ease: 'easeOut' }}
							className="w-full max-w-[560px]"
						>
							<div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/20">
								{/* Search input */}
								<div className="flex items-center gap-3 border-b border-border px-4">
									<Search className="h-4 w-4 flex-shrink-0 text-foreground-soft" />
									<input
										ref={inputRef}
										type="text"
										value={query}
										onChange={(e) =>
											setQuery(e.target.value)
										}
										placeholder="Search documentation..."
										className="flex-1 bg-transparent py-3 text-[15px] text-foreground outline-none placeholder:text-foreground-soft"
									/>
									<kbd className="hidden items-center gap-0.5 rounded bg-background-muted px-1.5 py-1 text-[11px] font-medium text-foreground-soft sm:flex">
										<Command className="h-3 w-3" />K
									</kbd>
								</div>

								{/* Results */}
								<div className="max-h-[320px] overflow-y-auto overscroll-contain">
									{query && results.length === 0 ? (
										<div className="py-12 text-center">
											<p className="text-sm text-foreground-muted">
												No results found for &quot;
												{query}&quot;
											</p>
										</div>
									) : results.length > 0 ? (
										<div className="p-2">
											{results.map((result, index) => (
												<button
													key={result.slug}
													onClick={() => {
														router.push(
															`/${result.slug}`
														);
														onClose();
													}}
													onMouseEnter={() =>
														setSelectedIndex(index)
													}
													className={clsx(
														'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
														selectedIndex === index
															? 'bg-primary-500/10'
															: 'hover:bg-background-muted'
													)}
												>
													<div
														className={clsx(
															'flex-shrink-0 rounded-md p-1.5',
															selectedIndex ===
																index
																? 'bg-primary-500/20 text-primary-500'
																: 'bg-background-muted text-foreground-soft'
														)}
													>
														<FileText className="h-4 w-4" />
													</div>
													<div className="min-w-0 flex-1">
														<div
															className={clsx(
																'truncate text-sm font-medium',
																selectedIndex ===
																	index
																	? 'text-primary-500'
																	: 'text-foreground'
															)}
														>
															{result.title}
														</div>
														<div className="truncate text-xs text-foreground-soft">
															{result.group}
														</div>
													</div>
													<ArrowRight
														className={clsx(
															'h-4 w-4 flex-shrink-0 transition-all',
															selectedIndex ===
																index
																? 'translate-x-0 text-primary-500 opacity-100'
																: '-translate-x-1 opacity-0'
														)}
													/>
												</button>
											))}
										</div>
									) : (
										<div className="py-12 text-center">
											<p className="text-sm text-foreground-soft">
												Start typing to search...
											</p>
										</div>
									)}
								</div>

								{/* Footer */}
								<div className="flex items-center justify-between border-t border-border bg-background-soft/50 px-4 py-2.5 text-xs text-foreground-soft">
									<div className="flex items-center gap-3">
										<span className="flex items-center gap-1">
											<kbd className="rounded bg-background-muted px-1.5 py-0.5 font-medium">
												↑
											</kbd>
											<kbd className="rounded bg-background-muted px-1.5 py-0.5 font-medium">
												↓
											</kbd>
											<span className="ml-1">
												navigate
											</span>
										</span>
										<span className="flex items-center gap-1">
											<kbd className="rounded bg-background-muted px-1.5 py-0.5 font-medium">
												↵
											</kbd>
											<span className="ml-1">select</span>
										</span>
									</div>
									<span className="flex items-center gap-1">
										<kbd className="rounded bg-background-muted px-1.5 py-0.5 font-medium">
											esc
										</kbd>
										<span className="ml-1">close</span>
									</span>
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
