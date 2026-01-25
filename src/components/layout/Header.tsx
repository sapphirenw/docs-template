'use client';

import Link from 'next/link';
import { Menu, Search, Github, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
  siteName: string;
  topbarLinks?: Array<{ name: string; url: string }>;
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function Header({ siteName, topbarLinks = [], onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border glass">
      <div className="flex items-center justify-between h-full px-4 max-w-screen-2xl mx-auto">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-background-muted lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <span className="hidden sm:inline">{siteName}</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <button
          onClick={onSearchClick}
          className={clsx(
            'flex items-center gap-3 px-4 py-2 rounded-xl',
            'bg-background-soft border border-border',
            'text-sm text-foreground-muted',
            'hover:border-foreground-soft hover:text-foreground',
            'transition-all duration-200',
            'w-64 lg:w-80'
          )}
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search documentation...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background-muted text-xs font-medium">
            <span className="text-base">⌘</span>K
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
                'hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg',
                'text-sm text-foreground-muted hover:text-foreground hover:bg-background-muted',
                'transition-colors duration-200'
              )}
            >
              {link.name.toLowerCase() === 'github' ? (
                <Github className="w-4 h-4" />
              ) : (
                <>
                  {link.name}
                  <ExternalLink className="w-3 h-3" />
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
