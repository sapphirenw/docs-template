import { Metadata } from 'next';
import { getDocBySlug, getDocTitle } from '@/lib/mdx';
import { getConfig, getRootPageSlug, getAllDocSlugs } from '@/lib/config';
import { TableOfContents } from '@/components/layout/TableOfContents';
import { DocNavigation } from '@/components/layout/DocNavigation';
import { DocsShell } from '@/components/layout/DocsShell';

export async function generateMetadata(): Promise<Metadata> {
	const rootSlug = getRootPageSlug();
	const doc = await getDocBySlug(rootSlug);

	if (!doc) {
		return { title: 'Documentation' };
	}

	return {
		title: doc.frontmatter.title,
		description: doc.frontmatter.description,
	};
}

export default async function HomePage() {
	const config = getConfig();
	const rootSlug = getRootPageSlug();
	const doc = await getDocBySlug(rootSlug);

	if (!doc) {
		return (
			<DocsShell config={config}>
				<div className="flex min-h-[50vh] items-center justify-center">
					<p className="text-foreground-muted">
						No root page configured.
					</p>
				</div>
			</DocsShell>
		);
	}

	const allSlugs = getAllDocSlugs();
	const currentIndex = allSlugs.indexOf(rootSlug);

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
		<DocsShell config={config}>
			<div className="flex">
				{/* Main content */}
				<main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
					<article className="mx-auto max-w-3xl">
						{/* Header */}
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

						{/* Content */}
						<div className="prose prose-slate max-w-none dark:prose-invert">
							{doc.content}
						</div>

						{/* Navigation */}
						<DocNavigation prev={prev} next={next} />
					</article>
				</main>

				{/* Table of Contents */}
				<TableOfContents headings={doc.headings} />
			</div>
		</DocsShell>
	);
}
