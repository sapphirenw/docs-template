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
  };
  navigation: NavItem[];
  topbarLinks: Array<{
    name: string;
    url: string;
  }>;
  footerSocials: Record<string, string>;
  /** Path to content directory, relative to project root. Defaults to 'content/docs' */
  contentPath?: string;
}

let configCache: DocsConfig | null = null;

export function getConfig(): DocsConfig {
  if (configCache) {
    return configCache;
  }

  // Try local config first (for submodule/monorepo use), then fall back to default
  const localConfigPath = path.join(process.cwd(), 'docs.config.local.json');
  const defaultConfigPath = path.join(process.cwd(), 'docs.config.json');

  let configPath: string;
  if (fs.existsSync(localConfigPath)) {
    configPath = localConfigPath;
  } else {
    configPath = defaultConfigPath;
  }

  const configContent = fs.readFileSync(configPath, 'utf-8');
  configCache = JSON.parse(configContent) as DocsConfig;

  return configCache;
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
