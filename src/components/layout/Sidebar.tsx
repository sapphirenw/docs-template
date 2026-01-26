'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, X, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { NavItem } from '@/lib/config';
import docsConfig from '../../../docs.config.json';

// Get the root page slug from config or default to first page
function getRootPage(): string {
  if ((docsConfig as { rootPage?: string }).rootPage) {
    return (docsConfig as { rootPage?: string }).rootPage!;
  }
  if (docsConfig.navigation.length > 0 && docsConfig.navigation[0].pages.length > 0) {
    return docsConfig.navigation[0].pages[0];
  }
  return '';
}

interface SidebarProps {
  navigation: NavItem[];
  docTitles: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ navigation, docTitles, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-background border-r border-border',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:sticky lg:top-16',
          'flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-background-muted lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-none">
          {navigation.map((group) => (
            <NavGroup
              key={group.group}
              group={group}
              docTitles={docTitles}
              onNavigate={onClose}
            />
          ))}
        </nav>

        {/* Powered by watermark */}
        <div className="shrink-0 border-t border-border px-4 py-4">
          <a
            href="https://landersweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-foreground-muted/60 hover:text-foreground-muted transition-colors group"
          >
            <Zap className="w-3.5 h-3.5 text-primary-500/60 group-hover:text-primary-500 transition-colors" />
            <span>Powered by <span className="font-medium">LandersWeb</span></span>
          </a>
        </div>
      </aside>
    </>
  );
}

interface NavGroupProps {
  group: NavItem;
  docTitles: Record<string, string>;
  onNavigate: () => void;
}

function NavGroup({ group, docTitles, onNavigate }: NavGroupProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-soft hover:text-foreground transition-colors"
      >
        <ChevronRight
          className={clsx(
            'w-3 h-3 transition-transform duration-200',
            isExpanded && 'rotate-90'
          )}
        />
        {group.group}
      </button>

      {isExpanded && (
        <div className="mt-1 ml-1 border-l border-border pl-3 space-y-0.5">
          {group.pages.map((page) => {
            const href = `/${page}`;
            const rootPage = getRootPage();
            const isActive = pathname === href || (pathname === '/' && page === rootPage);
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
