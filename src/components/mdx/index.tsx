import { Callout, Note, InfoCallout, Warning, Danger, Tip, Success } from './Callout';
import { CodeBlock, Pre, CopyButton } from './CodeBlock';
import { Tabs, TabList, TabTrigger, Tab, CodeGroup } from './Tabs';
import { Accordion, AccordionGroup } from './Accordion';
import { Card, CardGroup } from './Card';
import { Steps, Step } from './Steps';
import { Frame } from './Frame';
import { Phone, PhoneGroup } from './Phone';
import { Columns, Column } from './Columns';
import { Tooltip } from './Tooltip';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { Tile, TileGroup } from './Tiles';
import { ParamField, ResponseField, Expandable, ApiExample, RequestExample, ResponseExample } from './ApiComponents';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

// Code figure wrapper with copy button
function CodeFigure({ children, ...props }: { children?: ReactNode; 'data-rehype-pretty-code-figure'?: string }) {
  return (
    <figure className="group relative my-4" {...props}>
      {children}
    </figure>
  );
}

// MDX components mapping
export const mdxComponents = {
  // Custom components
  Callout,
  Note,
  Info: InfoCallout,
  Warning,
  Danger,
  Tip,
  Success,
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

  // Code figure from rehype-pretty-code
  figure: CodeFigure,

  // Override default HTML elements
  pre: (props: ComponentPropsWithoutRef<'pre'> & { 'data-language'?: string }) => {
    // Let rehype-pretty-code handle the styling
    return <Pre {...props} />;
  },

  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1
      className="text-3xl font-bold tracking-tight mt-8 mb-4 scroll-mt-20"
      {...props}
    />
  ),

  h2: (props: ComponentPropsWithoutRef<'h2'>) => {
    const id = typeof props.children === 'string'
      ? props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : undefined;
    return (
      <h2
        id={id}
        className="text-xl font-semibold tracking-tight mt-8 mb-3 scroll-mt-20 pb-2 border-b border-border"
        {...props}
      />
    );
  },

  h3: (props: ComponentPropsWithoutRef<'h3'>) => {
    const id = typeof props.children === 'string'
      ? props.children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : undefined;
    return (
      <h3
        id={id}
        className="text-lg font-semibold tracking-tight mt-6 mb-2 scroll-mt-20"
        {...props}
      />
    );
  },

  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="text-base font-semibold tracking-tight mt-4 mb-2 scroll-mt-20"
      {...props}
    />
  ),

  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-[15px] leading-7 [&:not(:first-child)]:mt-4 text-foreground-muted" {...props} />
  ),

  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      className="text-primary-500 hover:text-primary-400 underline underline-offset-2 decoration-primary-500/40 hover:decoration-primary-500 transition-colors"
      {...props}
    />
  ),

  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-1.5 text-[15px]" {...props} />
  ),

  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-1.5 text-[15px]" {...props} />
  ),

  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-foreground-muted leading-7" {...props} />
  ),

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-4 border-l-2 border-primary-500 pl-4 text-[15px] text-foreground-muted"
      {...props}
    />
  ),

  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-8 border-border" {...props} />
  ),

  // Table components with proper styling
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-4 w-full overflow-hidden rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" {...props} />
      </div>
    </div>
  ),

  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-background-muted" {...props} />
  ),

  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className="divide-y divide-border" {...props} />
  ),

  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="border-b border-border last:border-b-0" {...props} />
  ),

  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="px-3 py-2 text-left text-xs font-semibold text-foreground-muted uppercase tracking-wider"
      {...props}
    />
  ),

  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-3 py-2 text-foreground-muted" {...props} />
  ),

  code: (props: ComponentPropsWithoutRef<'code'>) => {
    // Check if it has data attributes from rehype-pretty-code
    if ('data-language' in props) {
      return <code {...props} />;
    }
    // Inline code
    return (
      <code
        className="relative rounded bg-background-muted px-[0.4em] py-[0.15em] font-mono text-[0.9em] text-foreground"
        {...props}
      />
    );
  },

  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg border border-border my-4 max-w-full"
      alt={props.alt || ''}
      {...props}
    />
  ),

  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),

  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic" {...props} />
  ),
};

export {
  Callout,
  Note,
  InfoCallout,
  InfoCallout as Info,
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
};
