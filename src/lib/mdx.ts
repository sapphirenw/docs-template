import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

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

export async function getDocBySlug(slug: string): Promise<DocContent | null> {
  const slugPath = slug.replace(/,/g, '/');
  const filePath = path.join(CONTENT_DIR, `${slugPath}.mdx`);
  const mdFilePath = path.join(CONTENT_DIR, `${slugPath}.md`);

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

  const { content } = await compileMDX<DocFrontmatter>({
    source: rawContent,
    options: {
      parseFrontmatter: false,
    },
    components: mdxComponents,
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
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        const slug = `${prefix}${entry.name.replace(/\.(mdx|md)$/, '')}`;
        docs.push(slug);
      }
    }
  }

  if (fs.existsSync(CONTENT_DIR)) {
    walkDir(CONTENT_DIR);
  }

  return docs;
}

export function getDocTitle(slug: string): string {
  const slugPath = slug.replace(/,/g, '/');
  const filePath = path.join(CONTENT_DIR, `${slugPath}.mdx`);
  const mdFilePath = path.join(CONTENT_DIR, `${slugPath}.md`);

  let fullPath = '';
  if (fs.existsSync(filePath)) {
    fullPath = filePath;
  } else if (fs.existsSync(mdFilePath)) {
    fullPath = mdFilePath;
  } else {
    // Return a formatted version of the slug
    return slug.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || slug;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { data } = matter(fileContent);

  return data.title || slug.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || slug;
}
