import Link from 'next/link';
import { ArrowRight, Book, Sparkles, Zap, Palette } from 'lucide-react';
import { getConfig } from '@/lib/config';

export default function HomePage() {
  const config = getConfig();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            {config.name}
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/docs/getting-started/introduction"
              className="text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Modern Documentation Platform
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
            Beautiful docs made{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              simple
            </span>
          </h1>

          <p className="text-xl text-foreground-muted mb-10 max-w-2xl mx-auto">
            Create stunning documentation powered by MDX. Write in Markdown,
            enhance with React components, and deploy anywhere.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/docs/getting-started/introduction"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs/components/overview"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-background-muted transition-colors"
            >
              View Components
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 bg-background-soft border-y border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for great docs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Book className="w-6 h-6" />}
              title="MDX Powered"
              description="Write your content in Markdown and enhance it with React components for interactive documentation."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="Built on Next.js with static generation for blazing fast page loads and optimal SEO."
            />
            <FeatureCard
              icon={<Palette className="w-6 h-6" />}
              title="Beautiful by Default"
              description="A carefully crafted design with dark mode, smooth animations, and stunning typography."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-sm text-foreground-muted">
            Built with Next.js and MDX
          </p>
          <p className="text-sm text-foreground-muted">
            Documentation Platform
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-background hover:border-primary-500/50 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-foreground-muted">{description}</p>
    </div>
  );
}
