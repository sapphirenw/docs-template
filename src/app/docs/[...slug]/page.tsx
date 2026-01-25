import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDocBySlug, getDocTitle } from '@/lib/mdx';
import { getConfig, getAllDocSlugs } from '@/lib/config';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { DocNavigation } from '@/components/layout/DocNavigation';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    return { title: 'Not Found' };
  }

  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join('/');
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    notFound();
  }

  const config = getConfig();
  const allSlugs = getAllDocSlugs();
  const currentIndex = allSlugs.indexOf(slugPath);

  const prev = currentIndex > 0 ? {
    slug: allSlugs[currentIndex - 1],
    title: getDocTitle(allSlugs[currentIndex - 1]),
  } : null;

  const next = currentIndex < allSlugs.length - 1 ? {
    slug: allSlugs[currentIndex + 1],
    title: getDocTitle(allSlugs[currentIndex + 1]),
  } : null;

  return (
    <div className="flex">
      {/* Main content */}
      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {doc.frontmatter.title}
            </h1>
            {doc.frontmatter.description && (
              <p className="text-xl text-foreground-muted">
                {doc.frontmatter.description}
              </p>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {doc.content}
          </div>

          {/* Navigation */}
          <DocNavigation prev={prev} next={next} />
        </article>
      </main>

      {/* Table of Contents */}
      <TableOfContents headings={doc.headings} />
    </div>
  );
}
