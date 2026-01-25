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
        'group relative p-6 rounded-xl border border-border bg-background-soft',
        'transition-all duration-200',
        href && 'hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/5 cursor-pointer'
      )}
    >
      <div className="flex items-start gap-4">
        {IconComponent && (
          <div className="flex-shrink-0 p-2 rounded-lg bg-primary-500/10 text-primary-500">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
            {title}
            {href && (
              <ArrowRight
                className={clsx(
                  'w-4 h-4 text-foreground-soft transition-transform duration-200',
                  'group-hover:translate-x-1 group-hover:text-primary-500'
                )}
              />
            )}
          </h3>
          {description && (
            <p className="text-sm text-foreground-muted">{description}</p>
          )}
          {children && (
            <div className="mt-2 text-sm text-foreground-muted">{children}</div>
          )}
        </div>
      </div>
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
        'my-6 grid gap-4',
        cols === 1 && 'grid-cols-1',
        cols === 2 && 'grid-cols-1 md:grid-cols-2',
        cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      )}
    >
      {children}
    </div>
  );
}
