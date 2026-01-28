# Documentation Platform - Project Plan

## Overview

A modern documentation visualization tool inspired by Mintlify/GitBook, powered by local markdown (MD) and MDX files.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS
- **Content**: MDX with custom components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theming**: next-themes

## Key Features

### Core

- [x] Project setup with Next.js, TypeScript, pnpm
- [x] MDX file processing and rendering
- [x] File-based routing for docs
- [x] Frontmatter support (title, description, icon)
- [x] Configuration file (docs.config.json)

### Layout

- [x] Main documentation layout
- [x] Responsive sidebar navigation
- [x] Table of contents (right sidebar)
- [x] Previous/Next navigation
- [x] Mobile-friendly responsive design

### Styling

- [x] Dark/Light mode toggle
- [x] Mintlify-inspired color scheme (teal/green accent)
- [x] Modern typography with Inter font
- [x] Smooth transitions and animations
- [x] Glassmorphism effects on navigation

### Components

- [x] Callouts (Note, Warning, Tip, Info, Success, Danger)
- [x] Code blocks with copy functionality
- [x] Code groups (tabbed code examples)
- [x] Tabs
- [x] Accordions
- [x] Cards/Card Groups
- [x] Steps
- [x] Frame for images

### Navigation

- [x] Search functionality with modal
- [x] Keyboard shortcuts (⌘K for search)
- [x] Nested navigation groups
- [x] External links support

## Running the Project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Directory Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── docs/               # Docs routes
│   │       ├── layout.tsx      # Docs layout
│   │       └── [...slug]/      # Catch-all for doc pages
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── SearchModal.tsx
│   │   │   └── DocNavigation.tsx
│   │   ├── mdx/                # MDX components
│   │   │   ├── Callout.tsx
│   │   │   ├── CodeBlock.tsx
│   │   │   ├── Tabs.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Steps.tsx
│   │   │   ├── Frame.tsx
│   │   │   └── index.tsx
│   │   └── ui/                 # UI primitives
│   │       ├── ThemeToggle.tsx
│   │       └── ThemeProvider.tsx
│   ├── lib/
│   │   ├── mdx.ts              # MDX processing
│   │   └── config.ts           # Config loading
│   └── styles/
│       └── globals.css
├── content/                    # Documentation content
│   └── docs/
│       ├── getting-started/
│       │   ├── introduction.mdx
│       │   ├── quickstart.mdx
│       │   └── installation.mdx
│       ├── components/
│       │   ├── overview.mdx
│       │   ├── callouts.mdx
│       │   ├── code-blocks.mdx
│       │   ├── tabs.mdx
│       │   ├── accordions.mdx
│       │   └── cards.mdx
│       └── guides/
│           ├── customization.mdx
│           └── deployment.mdx
├── docs.config.json            # Site configuration
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## Configuration Format (docs.config.json)

```json
{
	"name": "Documentation",
	"logo": {
		"light": "/logo-light.svg",
		"dark": "/logo-dark.svg"
	},
	"colors": {
		"primary": "#18E299",
		"accent": "#0D9373"
	},
	"navigation": [
		{
			"group": "Getting Started",
			"pages": [
				"getting-started/introduction",
				"getting-started/quickstart"
			]
		}
	],
	"topbarLinks": [],
	"footerSocials": {}
}
```

## Status: Complete

All major features have been implemented:

- Full MDX support with custom components
- Modern, Mintlify-inspired UI design
- Dark/light mode support
- Responsive layout with sidebar and TOC
- Search functionality with keyboard shortcuts
- Rich component library for documentation
