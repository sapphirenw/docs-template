'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, X } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { NavItem } from '@/lib/config';

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

        <nav className="h-full overflow-y-auto py-6 px-4 scrollbar-none">
          {navigation.map((group) => (
            <NavGroup
              key={group.group}
              group={group}
              docTitles={docTitles}
              onNavigate={onClose}
            />
          ))}
        </nav>
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
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm font-semibold text-foreground hover:text-foreground-muted transition-colors"
      >
        <ChevronRight
          className={clsx(
            'w-4 h-4 text-foreground-soft transition-transform duration-200',
            isExpanded && 'rotate-90'
          )}
        />
        {group.group}
      </button>

      {isExpanded && (
        <div className="ml-4 mt-1 space-y-1">
          {group.pages.map((page) => {
            const href = `/docs/${page}`;
            const isActive = pathname === href;
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
                <FileText className="w-4 h-4 flex-shrink-0" />
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
