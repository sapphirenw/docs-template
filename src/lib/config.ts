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
}

let configCache: DocsConfig | null = null;

export function getConfig(): DocsConfig {
  if (configCache) {
    return configCache;
  }

  const configPath = path.join(process.cwd(), 'docs.config.json');
  const configContent = fs.readFileSync(configPath, 'utf-8');
  configCache = JSON.parse(configContent) as DocsConfig;

  return configCache;
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
