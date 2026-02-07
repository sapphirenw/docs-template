import { getConfig } from '../lib/config';
import { DocsShell } from '../components/layout/DocsShell';

export function createDocLayout() {
  function DocLayout({ children }: { children: React.ReactNode }) {
    const config = getConfig();
    return <DocsShell config={config}>{children}</DocsShell>;
  }

  return { DocLayout };
}
