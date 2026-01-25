'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, ArrowRight, X } from 'lucide-react';
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 z-50 w-full max-w-xl"
          >
            <div className="mx-4 rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="w-5 h-5 text-foreground-muted" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="flex-1 py-4 bg-transparent text-foreground placeholder-foreground-muted outline-none"
                />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-background-muted"
                >
                  <X className="w-4 h-4 text-foreground-muted" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto">
                {query && results.length === 0 ? (
                  <div className="p-8 text-center text-foreground-muted">
                    No results found for "{query}"
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={result.slug}
                        onClick={() => {
                          router.push(`/docs/${result.slug}`);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={clsx(
                          'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                          selectedIndex === index
                            ? 'bg-primary-500/10 text-primary-500'
                            : 'hover:bg-background-muted'
                        )}
                      >
                        <FileText className="w-5 h-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{result.title}</div>
                          <div className="text-sm text-foreground-muted truncate">
                            {result.group}
                          </div>
                        </div>
                        <ArrowRight
                          className={clsx(
                            'w-4 h-4 flex-shrink-0 transition-opacity',
                            selectedIndex === index ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-foreground-muted text-sm">
                    Type to search...
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-background-soft text-xs text-foreground-muted">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-background-muted">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-background-muted">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-background-muted">↵</kbd>
                    to select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-background-muted">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
