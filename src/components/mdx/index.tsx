import { Callout, Note, InfoCallout, Warning, Danger, Tip, Success } from './Callout';
import { CodeBlock, Pre } from './CodeBlock';
import { Tabs, TabList, TabTrigger, Tab, CodeGroup } from './Tabs';
import { Accordion, AccordionGroup } from './Accordion';
import { Card, CardGroup } from './Card';
import { Steps, Step } from './Steps';
import { Frame } from './Frame';
import { ComponentPropsWithoutRef } from 'react';

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

  // Override default HTML elements
  pre: (props: ComponentPropsWithoutRef<'pre'>) => <Pre {...props} />,

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
        className="text-2xl font-semibold tracking-tight mt-10 mb-4 scroll-mt-20 border-b border-border pb-2"
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
        className="text-xl font-semibold tracking-tight mt-8 mb-3 scroll-mt-20"
        {...props}
      />
    );
  },

  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4
      className="text-lg font-semibold tracking-tight mt-6 mb-2 scroll-mt-20"
      {...props}
    />
  ),

  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
  ),

  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      className="text-primary-500 hover:text-primary-600 underline underline-offset-4 decoration-primary-500/30 hover:decoration-primary-500 transition-colors"
      {...props}
    />
  ),

  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),

  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),

  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-foreground-muted" {...props} />
  ),

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-6 border-l-4 border-primary-500 pl-4 italic text-foreground-muted"
      {...props}
    />
  ),

  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-8 border-border" {...props} />
  ),

  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),

  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="border border-border bg-background-muted px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),

  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),

  code: (props: ComponentPropsWithoutRef<'code'>) => {
    // Check if it's inline code (not in a pre block)
    const isInline = !props.className?.includes('language-');
    if (isInline) {
      return (
        <code
          className="relative rounded bg-background-muted px-[0.4em] py-[0.2em] font-mono text-sm text-foreground"
          {...props}
        />
      );
    }
    return <code className="font-mono text-sm" {...props} />;
  },

  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-xl border border-border my-6"
      alt={props.alt || ''}
      {...props}
    />
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
};
