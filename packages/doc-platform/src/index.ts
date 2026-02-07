// Types
export type { DocsConfig, NavItem } from './lib/config';
export type { DocFrontmatter, DocContent, Heading } from './lib/mdx';

// Config utilities
export {
  getConfig,
  getContentDir,
  getNavigationItems,
  getAllDocSlugs,
  getRootPageSlug,
} from './lib/config';

// MDX utilities
export { getDocBySlug, getAllDocs, getDocTitle } from './lib/mdx';

// Layout components
export { DocsShell } from './components/layout/DocsShell';
export { Header } from './components/layout/Header';
export { Sidebar } from './components/layout/Sidebar';
export { SearchModal } from './components/layout/SearchModal';
export { TableOfContents } from './components/layout/TableOfContents';
export { DocNavigation } from './components/layout/DocNavigation';

// UI components
export { ThemeProvider } from './components/ui/ThemeProvider';
export { ThemeToggle } from './components/ui/ThemeToggle';

// MDX components
export { mdxComponents } from './components/mdx';
export {
  Callout,
  Note,
  InfoCallout,
  Info,
  Warning,
  Danger,
  Tip,
  Success,
  CodeBlock,
  Pre,
  CopyButton,
  Tabs,
  TabList,
  TabTrigger,
  Tab,
  CodeGroup,
  Accordion,
  AccordionGroup,
  Card,
  CardGroup,
  Steps,
  Step,
  Frame,
  Phone,
  PhoneGroup,
  Columns,
  Column,
  Tooltip,
  Badge,
  Icon,
  Tile,
  TileGroup,
  ParamField,
  ResponseField,
  Expandable,
  ApiExample,
  RequestExample,
  ResponseExample,
} from './components/mdx';
