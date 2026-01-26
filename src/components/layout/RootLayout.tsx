'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { SearchModal } from '@/components/layout/SearchModal';
import docsConfig from '../../../docs.config.json';

interface RootLayoutProps {
  children: React.ReactNode;
}

// Create search index from navigation
function createSearchIndex() {
  const index: Array<{
    slug: string;
    title: string;
    group: string;
  }> = [];

  for (const group of docsConfig.navigation) {
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
function createDocTitles() {
  const titles: Record<string, string> = {};

  for (const group of docsConfig.navigation) {
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

export function RootLayout({ children }: RootLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const searchIndex = createSearchIndex();
  const docTitles = createDocTitles();

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
        siteName={docsConfig.name}
        topbarLinks={docsConfig.topbarLinks}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onSearchClick={() => setSearchOpen(true)}
      />

      <div className="flex max-w-screen-2xl mx-auto">
        <Sidebar
          navigation={docsConfig.navigation}
          docTitles={docTitles}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchIndex={searchIndex}
      />
    </div>
  );
}
