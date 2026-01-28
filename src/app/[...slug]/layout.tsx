import { getConfig } from '@/lib/config';
import { DocsShell } from '@/components/layout/DocsShell';

interface DocsLayoutProps {
	children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
	const config = getConfig();

	return <DocsShell config={config}>{children}</DocsShell>;
}
