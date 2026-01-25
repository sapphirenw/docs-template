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
    <div className="mt-16 pt-8 border-t border-border">
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            href={`/docs/${prev.slug}`}
            className={clsx(
              'group flex flex-col gap-2 p-4 rounded-xl border border-border',
              'hover:border-primary-500/50 hover:bg-background-soft',
              'transition-all duration-200 flex-1 max-w-xs'
            )}
          >
            <span className="text-sm text-foreground-muted flex items-center gap-1">
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Previous
            </span>
            <span className="font-medium text-foreground truncate">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/docs/${next.slug}`}
            className={clsx(
              'group flex flex-col gap-2 p-4 rounded-xl border border-border text-right',
              'hover:border-primary-500/50 hover:bg-background-soft',
              'transition-all duration-200 flex-1 max-w-xs ml-auto'
            )}
          >
            <span className="text-sm text-foreground-muted flex items-center gap-1 justify-end">
              Next
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
            <span className="font-medium text-foreground truncate">{next.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
