'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ParamFieldProps {
  name: string;
  type?: string;
  required?: boolean;
  default?: string;
  children?: ReactNode;
}

export function ParamField({ name, type, required, default: defaultValue, children }: ParamFieldProps) {
  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-2 flex-wrap">
        <code className="text-sm font-semibold text-foreground">{name}</code>
        {type && (
          <span className="text-xs text-foreground-muted font-mono">{type}</span>
        )}
        {required && (
          <span className="text-xs text-red-500 font-medium">required</span>
        )}
        {defaultValue && (
          <span className="text-xs text-foreground-soft">
            default: <code className="text-foreground-muted">{defaultValue}</code>
          </span>
        )}
      </div>
      {children && (
        <div className="mt-1 text-sm text-foreground-muted [&>p]:m-0">
          {children}
        </div>
      )}
    </div>
  );
}

interface ResponseFieldProps {
  name: string;
  type?: string;
  children?: ReactNode;
}

export function ResponseField({ name, type, children }: ResponseFieldProps) {
  return (
    <div className="py-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-2">
        <code className="text-sm font-semibold text-foreground">{name}</code>
        {type && (
          <span className="text-xs text-foreground-muted font-mono">{type}</span>
        )}
      </div>
      {children && (
        <div className="mt-1 text-sm text-foreground-muted [&>p]:m-0">
          {children}
        </div>
      )}
    </div>
  );
}

interface ExpandableProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Expandable({ title, children, defaultOpen = false }: ExpandableProps) {
  return (
    <details className="group my-2" open={defaultOpen}>
      <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground-muted hover:text-foreground transition-colors list-none">
        <svg
          className="w-4 h-4 transition-transform group-open:rotate-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {title}
      </summary>
      <div className="mt-2 ml-6 text-sm text-foreground-muted">
        {children}
      </div>
    </details>
  );
}

interface ApiExampleProps {
  children: ReactNode;
}

export function ApiExample({ children }: ApiExampleProps) {
  return (
    <div className="my-6 grid gap-4 lg:grid-cols-2">
      {children}
    </div>
  );
}

interface RequestExampleProps {
  children: ReactNode;
}

export function RequestExample({ children }: RequestExampleProps) {
  return (
    <div>
      <div className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-2">
        Request
      </div>
      {children}
    </div>
  );
}

interface ResponseExampleProps {
  children: ReactNode;
}

export function ResponseExample({ children }: ResponseExampleProps) {
  return (
    <div>
      <div className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-2">
        Response
      </div>
      {children}
    </div>
  );
}
