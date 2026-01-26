'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface DocNavigationProps {
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
}

export function DocNavigation({ prev, next }: DocNavigationProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-12 pt-6 border-t border-border">
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            href={`/${prev.slug}`}
            className={clsx(
              'group flex flex-col gap-1 py-3 px-4 rounded-lg border border-border/50',
              'hover:border-primary-500/40 hover:bg-primary-500/5',
              'transition-all duration-150 flex-1 max-w-[280px]'
            )}
          >
            <span className="text-xs text-foreground-soft flex items-center gap-1">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-150" />
              Previous
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary-500 transition-colors truncate">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/${next.slug}`}
            className={clsx(
              'group flex flex-col gap-1 py-3 px-4 rounded-lg border border-border/50 text-right',
              'hover:border-primary-500/40 hover:bg-primary-500/5',
              'transition-all duration-150 flex-1 max-w-[280px] ml-auto'
            )}
          >
            <span className="text-xs text-foreground-soft flex items-center gap-1 justify-end">
              Next
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-150" />
            </span>
            <span className="text-sm font-medium text-foreground group-hover:text-primary-500 transition-colors truncate">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
