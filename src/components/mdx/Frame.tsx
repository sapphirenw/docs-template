'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface FrameProps {
  children: ReactNode;
  caption?: string;
  hint?: string;
  className?: string;
}

export function Frame({ children, caption, hint, className }: FrameProps) {
  return (
    <figure className={clsx('my-6', className)}>
      {hint && (
        <div className="flex items-center gap-2 px-4 py-2 text-sm text-foreground-muted bg-gray-100 dark:bg-gray-800 border border-b-0 border-border/50 rounded-t-lg">
          {hint}
        </div>
      )}
      <div
        className={clsx(
          'overflow-hidden',
          hint ? 'rounded-b-lg' : 'rounded-lg',
          '[&_img]:w-full [&_img]:h-auto [&_img]:block [&_img]:m-0',
          '[&_video]:w-full [&_video]:h-auto [&_video]:block',
          '[&>p]:m-0'
        )}
      >
        {children}
      </div>
      {caption && (
        <figcaption className="text-sm text-foreground-muted text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
