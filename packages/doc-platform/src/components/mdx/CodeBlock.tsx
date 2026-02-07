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
				'rounded-md p-1.5 transition-all duration-150',
				'hover:bg-white/10',
				floating &&
					'absolute right-3 top-3 z-10 bg-white/10 opacity-0 backdrop-blur-xs group-hover:opacity-100',
				'focus:opacity-100 focus:outline-hidden',
				copied && 'opacity-100'
			)}
			aria-label={copied ? 'Copied!' : 'Copy code'}
		>
			{copied ? (
				<Check className="h-4 w-4 text-primary-400" />
			) : (
				<Copy className="h-4 w-4 text-gray-400" />
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
export function Pre({
	children,
	...props
}: {
	children?: ReactNode;
	'data-language'?: string;
	'data-theme'?: string;
}) {
	const preRef = useRef<HTMLPreElement>(null);
	const [codeText, setCodeText] = useState('');
	const language = props['data-language'] || '';
	const displayLanguage = languageNames[language] || language.toUpperCase();

	useEffect(() => {
		if (preRef.current) {
			setCodeText(preRef.current.textContent || '');
		}
	}, [children]);

	const showHeader =
		language && language !== 'plaintext' && language !== 'text';

	return (
		<div className="group relative my-4 overflow-hidden rounded-lg border border-border/50">
			{showHeader && (
				<div className="flex items-center justify-between border-b border-border/50 bg-gray-100 px-4 py-2 dark:bg-[#161618]">
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
						{displayLanguage}
					</span>
					<CopyButton text={codeText} />
				</div>
			)}
			{!showHeader && <CopyButton text={codeText} floating />}
			<pre
				ref={preRef}
				className={clsx(
					'overflow-x-auto',
					'bg-gray-50 dark:bg-[#0a0a0c]',
					'px-4 py-4 text-sm leading-relaxed',
					'!my-0 !rounded-none !border-0'
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
				<div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-border bg-[#161b22] px-4 py-2 font-mono text-xs text-gray-400">
					{title}
				</div>
			)}
			<div className="relative">
				<button
					onClick={handleCopy}
					className={clsx(
						'absolute right-3 top-3 z-10 rounded-md p-1.5 transition-all duration-150',
						'bg-white/10 hover:bg-white/20',
						'opacity-0 group-hover:opacity-100',
						'focus:opacity-100 focus:outline-hidden',
						copied && 'opacity-100'
					)}
					aria-label={copied ? 'Copied!' : 'Copy code'}
				>
					{copied ? (
						<Check className="h-4 w-4 text-primary-400" />
					) : (
						<Copy className="h-4 w-4 text-gray-400" />
					)}
				</button>
				<pre
					className={clsx(
						'overflow-x-auto rounded-lg border border-border',
						'bg-[#0d1117]',
						'px-4 py-4 text-sm leading-relaxed',
						title && 'rounded-t-none'
					)}
				>
					<code
						ref={codeRef}
						className={clsx(className, 'font-mono')}
					>
						{children}
					</code>
				</pre>
				{language !== 'text' && language !== 'plaintext' && (
					<span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wider text-gray-500">
						{language}
					</span>
				)}
			</div>
		</div>
	);
}
