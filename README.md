# Documentation Platform

A modern, Mintlify-inspired documentation platform powered by Next.js 14 and MDX. Build beautiful documentation sites with rich components, syntax highlighting, and dark mode support.

## Features

- **MDX Support** - Write documentation in Markdown with JSX components
- **Rich Components** - Callouts, tabs, code groups, accordions, cards, steps, and more
- **Mobile Components** - Phone mockups and frames for app documentation
- **Syntax Highlighting** - Powered by Shiki with dual-theme support
- **Dark Mode** - Automatic theme switching with system preference detection
- **Search** - Cmd+K search across all documentation
- **Responsive** - Mobile-first design with collapsible sidebar
- **Docker Ready** - Optimized multi-stage builds (~180MB images)
- **Submodule Support** - Use as a git submodule in existing projects

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/doc-hosting-platform.git
cd doc-hosting-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your docs.

## Project Structure

```
├── content/docs/          # Documentation content (MDX files)
├── public/                # Static assets
├── src/
│   ├── app/               # Next.js app router
│   ├── components/
│   │   ├── layout/        # Header, sidebar, layout components
│   │   └── mdx/           # MDX components (Callout, Tabs, etc.)
│   ├── lib/               # Utilities (config, MDX processing)
│   └── styles/            # Global styles
├── docs.config.json       # Site configuration
└── Dockerfile             # Production Docker build
```

## Configuration

Edit `docs.config.json` to customize your site:

```json
{
  "name": "My Docs",
  "description": "Documentation for My Project",
  "contentPath": "content/docs",
  "logo": {
    "light": "/logo.svg",
    "dark": "/logo-dark.svg"
  },
  "colors": {
    "primary": "#18E299",
    "accent": "#0d9373"
  },
  "navigation": [
    {
      "group": "Getting Started",
      "pages": ["getting-started/introduction", "getting-started/quickstart"]
    }
  ],
  "topbarLinks": [
    { "name": "GitHub", "url": "https://github.com/your-org/your-repo" }
  ],
  "footerSocials": {
    "github": "https://github.com/your-org"
  }
}
```

## Components

### Callouts

```mdx
<Note>This is a note callout.</Note>
<Warning>This is a warning.</Warning>
<Tip>This is a helpful tip.</Tip>
```

### Tabs & Code Groups

```mdx
<Tabs>
  <Tab title="npm">npm install package</Tab>
  <Tab title="pnpm">pnpm add package</Tab>
</Tabs>

<CodeGroup>
```js title="example.js"
console.log('Hello');
```
</CodeGroup>
```

### Cards

```mdx
<CardGroup cols={2}>
  <Card title="Getting Started" icon="rocket" href="/docs/quickstart">
    Learn the basics
  </Card>
  <Card title="API Reference" icon="code" href="/docs/api">
    Explore the API
  </Card>
</CardGroup>
```

### Steps

```mdx
<Steps>
  <Step title="Install dependencies">
    Run `pnpm install` to install all dependencies.
  </Step>
  <Step title="Start the server">
    Run `pnpm dev` to start the development server.
  </Step>
</Steps>
```

### Mobile Components

```mdx
<Phone variant="dark" caption="Home screen">
  <img src="/screenshots/home.png" alt="Home" />
</Phone>

<Frame hint="Click to expand" caption="Dashboard view">
  <img src="/screenshots/dashboard.png" alt="Dashboard" />
</Frame>
```

See the [components documentation](/docs/components) for the full list.

## Deployment

### Docker

```bash
# Build and run
docker compose up --build -d

# Or build manually
docker build -t docs:latest .
docker run -d -p 3000:3000 docs:latest
```

### As a Git Submodule

For existing projects, add as a submodule:

```bash
cd your-monorepo
git submodule add https://github.com/your-org/doc-hosting-platform.git packages/docs
```

Create `docs.config.local.json` (gitignored) to override configuration:

```json
{
  "name": "My Project Docs",
  "contentPath": "../../docs-content",
  "navigation": [...]
}
```

The platform loads `docs.config.local.json` first if it exists, allowing you to:
- Keep your content outside the submodule
- Pull platform updates without conflicts
- Maintain separate configuration

See the [deployment guide](/docs/guides/deployment) for detailed instructions.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## License

MIT
