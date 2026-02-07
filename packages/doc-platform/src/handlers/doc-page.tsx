import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDocBySlug, getDocTitle } from '../lib/mdx';
import { getAllDocSlugs } from '../lib/config';
import { TableOfContents } from '../components/layout/TableOfContents';
import { DocNavigation } from '../components/layout/DocNavigation';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

interface CreateDocPageOptions {
  customComponents?: Record<string, any>;
}

export function createDocPage(options?: CreateDocPageOptions) {
  async function generateStaticParams() {
    const slugs = getAllDocSlugs();
    return slugs.map((slug) => ({
      slug: slug.split('/'),
    }));
  }

  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const doc = await getDocBySlug(slugPath, options?.customComponents);

    if (!doc) {
      return { title: 'Not Found' };
    }

    return {
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
    };
  }

  async function DocPage({ params }: PageProps) {
    const { slug } = await params;
    const slugPath = slug.join('/');
    const doc = await getDocBySlug(slugPath, options?.customComponents);

    if (!doc) {
      notFound();
    }

    const allSlugs = getAllDocSlugs();
    const currentIndex = allSlugs.indexOf(slugPath);

    const prev =
      currentIndex > 0
        ? {
            slug: allSlugs[currentIndex - 1],
            title: getDocTitle(allSlugs[currentIndex - 1]),
          }
        : null;

    const next =
      currentIndex < allSlugs.length - 1
        ? {
            slug: allSlugs[currentIndex + 1],
            title: getDocTitle(allSlugs[currentIndex + 1]),
          }
        : null;

    return (
      <div className="flex">
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-3xl">
            <header className="mb-8">
              <h1 className="mb-4 text-4xl font-bold tracking-tight">
                {doc.frontmatter.title}
              </h1>
              {doc.frontmatter.description && (
                <p className="text-xl text-foreground-muted">
                  {doc.frontmatter.description}
                </p>
              )}
            </header>
            <div className="prose prose-slate max-w-none dark:prose-invert">
              {doc.content}
            </div>
            <DocNavigation prev={prev} next={next} />
          </article>
        </main>
        <TableOfContents headings={doc.headings} />
      </div>
    );
  }

  return { DocPage, generateStaticParams, generateMetadata };
}
