import fs from 'fs';
import path from 'path';

export interface NavItem {
	group: string;
	pages: string[];
}

export interface DocsConfig {
	name: string;
	description: string;
	logo: {
		light: string;
		dark: string;
	};
	colors: {
		primary: string;
		accent: string;
		/** Background color for light mode (hex format). Defaults to white. */
		background?: string;
		/** Background color for dark mode (hex format). Defaults to zinc-950. */
		darkBackground?: string;
	};
	/** Google Font name for the primary sans-serif font (e.g., "Roboto", "Open Sans"). Defaults to Inter. */
	font?: string;
	navigation: NavItem[];
	topbarLinks: Array<{
		name: string;
		url: string;
	}>;
	footerSocials: Record<string, string>;
	/** Path to content directory, relative to project root. Defaults to 'content/docs' */
	contentPath?: string;
	/** The doc page to show at the root URL (/). Defaults to first page in navigation. */
	rootPage?: string;
}

let configCache: DocsConfig | null = null;

/**
 * Resolve the config file path.
 * Priority:
 * 1. DOCS_CONFIG_PATH env var (absolute or relative to cwd)
 * 2. docs.config.local.json (gitignored, for local overrides)
 * 3. docs.config.json (default, committed to repo)
 */
function resolveConfigPath(): string {
	// 1. Check environment variable
	if (process.env.DOCS_CONFIG_PATH) {
		const envPath = process.env.DOCS_CONFIG_PATH;
		// Support both absolute and relative paths
		return path.isAbsolute(envPath)
			? envPath
			: path.join(process.cwd(), envPath);
	}

	// 2. Check for local config override
	const localConfigPath = path.join(process.cwd(), 'docs.config.local.json');
	if (fs.existsSync(localConfigPath)) {
		return localConfigPath;
	}

	// 3. Default config
	return path.join(process.cwd(), 'docs.config.json');
}

export function getConfig(): DocsConfig {
	// Only cache in production for performance
	if (process.env.NODE_ENV === 'production' && configCache) {
		return configCache;
	}

	const configPath = resolveConfigPath();
	const configContent = fs.readFileSync(configPath, 'utf-8');
	const config = JSON.parse(configContent) as DocsConfig;

	if (process.env.NODE_ENV === 'production') {
		configCache = config;
	}

	return config;
}

/**
 * Get the content directory path, resolved from config or default
 */
export function getContentDir(): string {
	const config = getConfig();
	const contentPath = config.contentPath || 'content/docs';
	return path.join(process.cwd(), contentPath);
}

export function getNavigationItems(): NavItem[] {
	const config = getConfig();
	return config.navigation;
}

export function getAllDocSlugs(): string[] {
	const config = getConfig();
	const slugs: string[] = [];

	for (const group of config.navigation) {
		for (const page of group.pages) {
			slugs.push(page);
		}
	}

	return slugs;
}

/**
 * Get the root page slug (for / route).
 * Uses config.rootPage or falls back to first page in navigation.
 */
export function getRootPageSlug(): string {
	const config = getConfig();

	if (config.rootPage) {
		return config.rootPage;
	}

	// Default to first page in navigation
	if (config.navigation.length > 0 && config.navigation[0].pages.length > 0) {
		return config.navigation[0].pages[0];
	}

	return 'getting-started/introduction';
}
