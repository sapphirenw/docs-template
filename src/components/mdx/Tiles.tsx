'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { icons } from 'lucide-react';
import { clsx } from 'clsx';

interface TileProps {
  title: string;
  description?: string;
  href?: string;
  icon?: string;
}

export function Tile({ title, description, href, icon }: TileProps) {
  // Convert icon name to PascalCase for Lucide icon lookup
  const iconName = icon
    ?.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('') as keyof typeof icons | undefined;

  const IconComponent = iconName ? icons[iconName] : null;

  const content = (
    <div
      className={clsx(
        'group flex flex-col items-center text-center p-6 rounded-xl border border-border',
        'transition-all duration-150',
        href && 'hover:border-primary-500/50 hover:bg-background-soft cursor-pointer'
      )}
    >
      {IconComponent && (
        <div className="mb-3 p-3 rounded-lg bg-primary-500/10 text-primary-500">
          <IconComponent className="w-6 h-6" />
        </div>
      )}
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 text-xs text-foreground-muted">{description}</p>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

interface TileGroupProps {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}

export function TileGroup({ children, cols = 3 }: TileGroupProps) {
  return (
    <div
      className={clsx(
        'my-6 grid gap-4',
        cols === 2 && 'grid-cols-1 sm:grid-cols-2',
        cols === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        cols === 4 && 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
      )}
    >
      {children}
    </div>
  );
}
