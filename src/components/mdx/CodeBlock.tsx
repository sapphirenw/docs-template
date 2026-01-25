'use client';

import { ReactNode, useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const language = className?.replace('language-', '') || 'text';

  const handleCopy = async () => {
    const codeElement = document.querySelector(`[data-code-block="${title || 'code'}"]`);
    const text = codeElement?.textContent || '';

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-6 group">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2 bg-background-muted border-b border-border text-sm text-foreground-muted">
          <Terminal className="w-4 h-4" />
          <span>{title}</span>
        </div>
      )}
      <div className="relative">
        <pre
          className={clsx(
            'bg-background-soft border border-border rounded-xl overflow-x-auto',
            title && 'rounded-t-none border-t-0'
          )}
        >
          <code
            className={clsx(className, 'block p-4 text-sm')}
            data-code-block={title || 'code'}
          >
            {children}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className={clsx(
            'absolute top-3 right-3 p-2 rounded-lg transition-all duration-200',
            'bg-background-muted/80 hover:bg-background-muted',
            'opacity-0 group-hover:opacity-100',
            'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50'
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary-500" />
          ) : (
            <Copy className="w-4 h-4 text-foreground-muted" />
          )}
        </button>
      </div>
      {language !== 'text' && (
        <div className="absolute bottom-3 right-3 text-xs text-foreground-soft opacity-50">
          {language}
        </div>
      )}
    </div>
  );
}

// Pre component for MDX
export function Pre({ children, ...props }: { children?: ReactNode }) {
  return (
    <div className="code-block my-6 group relative">
      <pre
        className="bg-background-soft border border-border rounded-xl overflow-x-auto"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
