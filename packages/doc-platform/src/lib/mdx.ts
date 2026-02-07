import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '../components/mdx';
import { getContentDir } from './config';

export interface DocFrontmatter {
	title: string;
	description?: string;
	icon?: string;
}

export interface DocContent {
	frontmatter: DocFrontmatter;
	content: React.ReactElement;
	headings: Heading[];
	slug: string;
}

export interface Heading {
	level: number;
	text: string;
	id: string;
}

function extractHeadings(content: string): Heading[] {
	const headingRegex = /^(#{1,6})\s+(.+)$/gm;
	const headings: Heading[] = [];
	let match;

	while ((match = headingRegex.exec(content)) !== null) {
		const level = match[1].length;
		const text = match[2].trim();
		const id = text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');

		headings.push({ level, text, id });
	}

	return headings;
}

// Shiki theme configuration for syntax highlighting
const prettyCodeOptions = {
	theme: {
		dark: 'github-dark',
		light: 'github-light',
	},
	keepBackground: false,
	defaultLang: 'plaintext',
	onVisitLine(node: { children: unknown[] }) {
		// Prevent lines from collapsing in `display: grid` mode
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }];
		}
	},
	onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
		node.properties.className = node.properties.className || [];
		node.properties.className.push('highlighted');
	},
	onVisitHighlightedChars(node: { properties: { className?: string[] } }) {
		node.properties.className = ['highlighted-chars'];
	},
};

export async function getDocBySlug(
	slug: string,
	customComponents?: Record<string, any>
): Promise<DocContent | null> {
	const slugPath = slug.replace(/,/g, '/');
	const filePath = path.join(getContentDir(), `${slugPath}.mdx`);
	const mdFilePath = path.join(getContentDir(), `${slugPath}.md`);

	let fullPath = '';
	if (fs.existsSync(filePath)) {
		fullPath = filePath;
	} else if (fs.existsSync(mdFilePath)) {
		fullPath = mdFilePath;
	} else {
		return null;
	}

	const fileContent = fs.readFileSync(fullPath, 'utf-8');
	const { data, content: rawContent } = matter(fileContent);
	const headings = extractHeadings(rawContent);

	const mergedComponents = customComponents
		? { ...mdxComponents, ...customComponents }
		: mdxComponents;

	const { content } = await compileMDX<DocFrontmatter>({
		source: rawContent,
		options: {
			parseFrontmatter: false,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
			},
		},
		components: mergedComponents,
	});

	return {
		frontmatter: {
			title: data.title || 'Untitled',
			description: data.description,
			icon: data.icon,
		},
		content,
		headings,
		slug: slugPath,
	};
}

export function getAllDocs(): string[] {
	const docs: string[] = [];

	function walkDir(dir: string, prefix = '') {
		const entries = fs.readdirSync(dir, { withFileTypes: true });

		for (const entry of entries) {
			if (entry.isDirectory()) {
				walkDir(path.join(dir, entry.name), `${prefix}${entry.name}/`);
			} else if (
				entry.name.endsWith('.mdx') ||
				entry.name.endsWith('.md')
			) {
				const slug = `${prefix}${entry.name.replace(/\.(mdx|md)$/, '')}`;
				docs.push(slug);
			}
		}
	}

	if (fs.existsSync(getContentDir())) {
		walkDir(getContentDir());
	}

	return docs;
}

export function getDocTitle(slug: string): string {
	const slugPath = slug.replace(/,/g, '/');
	const filePath = path.join(getContentDir(), `${slugPath}.mdx`);
	const mdFilePath = path.join(getContentDir(), `${slugPath}.md`);

	let fullPath = '';
	if (fs.existsSync(filePath)) {
		fullPath = filePath;
	} else if (fs.existsSync(mdFilePath)) {
		fullPath = mdFilePath;
	} else {
		// Return a formatted version of the slug
		return (
			slug
				.split('/')
				.pop()
				?.replace(/-/g, ' ')
				.replace(/\b\w/g, (l) => l.toUpperCase()) || slug
		);
	}

	const fileContent = fs.readFileSync(fullPath, 'utf-8');
	const { data } = matter(fileContent);

	return (
		data.title ||
		slug
			.split('/')
			.pop()
			?.replace(/-/g, ' ')
			.replace(/\b\w/g, (l) => l.toUpperCase()) ||
		slug
	);
}
