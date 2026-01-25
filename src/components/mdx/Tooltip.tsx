'use client';

import { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

interface TooltipProps {
  children: ReactNode;
  tip: string;
}

export function Tooltip({ children, tip }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="border-b border-dashed border-foreground-soft cursor-help">
        {children}
      </span>
      <span
        className={clsx(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1',
          'text-xs text-white bg-gray-900 dark:bg-gray-700 rounded-md whitespace-nowrap',
          'transition-opacity duration-150 pointer-events-none z-50',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {tip}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
      </span>
    </span>
  );
}
