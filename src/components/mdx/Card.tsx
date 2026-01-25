'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  AlertCircle,
  Book,
  Code,
  Settings,
  Blocks,
  Zap,
  Shield,
  Download,
  Rocket,
  Star,
  Heart,
  Sparkles,
  Maximize,
  Link as LinkIcon,
  Search,
  BarChart,
  Gauge,
  ChevronDown,
  Columns,
  LayoutGrid,
  ListOrdered,
  FileText,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import { clsx } from 'clsx';

// Map of available icons
const iconMap: Record<string, LucideIcon> = {
  AlertCircle,
  Book,
  Code,
  Settings,
  Blocks,
  Zap,
  Shield,
  Download,
  Rocket,
  Star,
  Heart,
  Sparkles,
  Maximize,
  Link: LinkIcon,
  Search,
  BarChart,
  Gauge,
  ChevronDown,
  Columns,
  LayoutGrid,
  ListOrdered,
  FileText,
  Terminal,
};

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  icon?: string;
  children?: ReactNode;
}

export function Card({ title, description, href, icon, children }: CardProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  const content = (
    <div
      className={clsx(
        'group relative p-3 rounded-lg border border-border',
        'transition-all duration-150',
        href && 'hover:border-primary-500/50 hover:bg-background-soft cursor-pointer'
      )}
    >
      <div className="flex items-center gap-3">
        {IconComponent && (
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-primary-500/10 text-primary-500">
            <IconComponent className="w-4 h-4" />
          </div>
        )}
        <span className="font-medium text-sm text-foreground">
          {title}
        </span>
        {href && (
          <ArrowRight
            className={clsx(
              'w-3.5 h-3.5 text-foreground-soft transition-all duration-150 ml-auto',
              'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-500'
            )}
          />
        )}
      </div>
      {(description || children) && (
        <div className={clsx('text-[13px] leading-snug text-foreground-muted mt-2', IconComponent && 'ml-11')}>
          {description || children}
        </div>
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

interface CardGroupProps {
  children: ReactNode;
  cols?: 1 | 2 | 3;
}

export function CardGroup({ children, cols = 2 }: CardGroupProps) {
  return (
    <div
      className={clsx(
        'my-4 grid gap-2',
        cols === 1 && 'grid-cols-1',
        cols === 2 && 'grid-cols-1 sm:grid-cols-2',
        cols === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {children}
    </div>
  );
}
