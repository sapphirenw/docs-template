'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';

interface CopyButtonProps {
  text: string;
  floating?: boolean;
}

export function CopyButton({ text, floating = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'p-1.5 rounded-md transition-all duration-150',
        'hover:bg-white/10',
        floating && 'absolute top-3 right-3 z-10 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100',
        'focus:opacity-100 focus:outline-none',
        copied && 'opacity-100'
      )}
      aria-label={copied ? 'Copied!' : 'Copy code'}
    >
      {copied ? (
        <Check className="w-4 h-4 text-primary-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );
}

// Language display names
const languageNames: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TypeScript',
  jsx: 'JavaScript',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  zsh: 'Shell',
  python: 'Python',
  py: 'Python',
  go: 'Go',
  rust: 'Rust',
  rs: 'Rust',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  cs: 'C#',
  ruby: 'Ruby',
  rb: 'Ruby',
  php: 'PHP',
  swift: 'Swift',
  kotlin: 'Kotlin',
  scala: 'Scala',
  sql: 'SQL',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  xml: 'XML',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  sass: 'Sass',
  less: 'Less',
  markdown: 'Markdown',
  md: 'Markdown',
  mdx: 'MDX',
  graphql: 'GraphQL',
  dockerfile: 'Dockerfile',
  docker: 'Dockerfile',
  plaintext: 'Text',
  text: 'Text',
};

// Pre component wrapper that adds copy functionality
export function Pre({ children, ...props }: { children?: ReactNode; 'data-language'?: string; 'data-theme'?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [codeText, setCodeText] = useState('');
  const language = props['data-language'] || '';
  const displayLanguage = languageNames[language] || language.toUpperCase();

  useEffect(() => {
    if (preRef.current) {
      setCodeText(preRef.current.textContent || '');
    }
  }, [children]);

  const showHeader = language && language !== 'plaintext' && language !== 'text';

  return (
    <div className="group relative my-4 rounded-lg border border-border/50 overflow-hidden">
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-[#161618] border-b border-border/50">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{displayLanguage}</span>
          <CopyButton text={codeText} />
        </div>
      )}
      {!showHeader && <CopyButton text={codeText} floating />}
      <pre
        ref={preRef}
        className={clsx(
          'overflow-x-auto',
          'bg-gray-50 dark:bg-[#0a0a0c]',
          'py-4 px-4 text-sm leading-relaxed',
          '!border-0 !rounded-none !my-0'
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

// Legacy CodeBlock for custom usage
interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopy = async () => {
    const text = codeRef.current?.textContent || '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const language = className?.replace('language-', '') || 'text';

  return (
    <div className="group relative my-4">
      {title && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-b-0 border-border rounded-t-lg text-xs text-gray-400 font-mono">
          {title}
        </div>
      )}
      <div className="relative">
        <button
          onClick={handleCopy}
          className={clsx(
            'absolute top-3 right-3 z-10 p-1.5 rounded-md transition-all duration-150',
            'bg-white/10 hover:bg-white/20',
            'opacity-0 group-hover:opacity-100',
            'focus:opacity-100 focus:outline-none',
            copied && 'opacity-100'
          )}
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary-400" />
          ) : (
            <Copy className="w-4 h-4 text-gray-400" />
          )}
        </button>
        <pre
          className={clsx(
            'overflow-x-auto rounded-lg border border-border',
            'bg-[#0d1117]',
            'py-4 px-4 text-sm leading-relaxed',
            title && 'rounded-t-none'
          )}
        >
          <code ref={codeRef} className={clsx(className, 'font-mono')}>
            {children}
          </code>
        </pre>
        {language !== 'text' && language !== 'plaintext' && (
          <span className="absolute bottom-3 right-3 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            {language}
          </span>
        )}
      </div>
    </div>
  );
}
