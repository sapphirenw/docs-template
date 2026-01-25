'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface FrameProps {
  children: ReactNode;
  caption?: string;
  className?: string;
}

export function Frame({ children, caption, className }: FrameProps) {
  return (
    <figure className={clsx('my-6', className)}>
      <div className="overflow-hidden rounded-xl border border-border bg-background-soft">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-foreground-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
