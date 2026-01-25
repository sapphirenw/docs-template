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

export function SearchModal({ isOpen, onClose, searchIndex }: SearchModalProps) {
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
      const searchText = `${item.title} ${item.description || ''} ${item.group}`.toLowerCase();
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
          setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(`/docs/${results[selectedIndex].slug}`);
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal - Centered with flexbox */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="w-full max-w-[560px]"
            >
              <div className="rounded-xl border border-border bg-background shadow-2xl shadow-black/20 overflow-hidden">
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 border-b border-border">
                  <Search className="w-4 h-4 text-foreground-soft flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search documentation..."
                    className="flex-1 py-3 bg-transparent text-[15px] text-foreground placeholder:text-foreground-soft outline-none"
                  />
                  <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-1 rounded bg-background-muted text-[11px] text-foreground-soft font-medium">
                    <Command className="w-3 h-3" />K
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[320px] overflow-y-auto overscroll-contain">
                  {query && results.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-foreground-muted text-sm">
                        No results found for &quot;{query}&quot;
                      </p>
                    </div>
                  ) : results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <button
                          key={result.slug}
                          onClick={() => {
                            router.push(`/docs/${result.slug}`);
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={clsx(
                            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                            selectedIndex === index
                              ? 'bg-primary-500/10'
                              : 'hover:bg-background-muted'
                          )}
                        >
                          <div className={clsx(
                            'flex-shrink-0 p-1.5 rounded-md',
                            selectedIndex === index
                              ? 'bg-primary-500/20 text-primary-500'
                              : 'bg-background-muted text-foreground-soft'
                          )}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={clsx(
                              'text-sm font-medium truncate',
                              selectedIndex === index ? 'text-primary-500' : 'text-foreground'
                            )}>
                              {result.title}
                            </div>
                            <div className="text-xs text-foreground-soft truncate">
                              {result.group}
                            </div>
                          </div>
                          <ArrowRight
                            className={clsx(
                              'w-4 h-4 flex-shrink-0 transition-all',
                              selectedIndex === index
                                ? 'opacity-100 text-primary-500 translate-x-0'
                                : 'opacity-0 -translate-x-1'
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-foreground-soft text-sm">
                        Start typing to search...
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-background-soft/50 text-xs text-foreground-soft">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-medium">↑</kbd>
                      <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-medium">↓</kbd>
                      <span className="ml-1">navigate</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-medium">↵</kbd>
                      <span className="ml-1">select</span>
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-medium">esc</kbd>
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
