import { source } from '@/lib/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const slug = params.slug?.join('/') ?? '';

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      url: `/docs/${slug}`,
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const isRoot = !params.slug || params.slug.length === 0;

  if (isRoot) {
    return (
      <DocsPage
        toc={[
          { title: "What You'll Find Here", depth: 2, url: '#what-youll-find-here' },
          { title: 'Quick Install', depth: 2, url: '#quick-install' },
        ]}
      >
        <DocsHome />
      </DocsPage>
    );
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc}>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

const ORANGE = '#f97316';
const ORANGE_TINT = 'rgba(249, 115, 22, 0.08)';
const ORANGE_RING = 'rgba(249, 115, 22, 0.20)';
const MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace';

function DocsHome() {
  return (
    <div
      className="not-prose docs-home"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        color: 'var(--color-fd-foreground)',
      }}
    >
      <Hero />
      <FindHere />
      <QuickInstall />
    </div>
  );
}

function Hero() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <span
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '9999px',
          background: ORANGE_TINT,
          border: `1px solid ${ORANGE_RING}`,
          color: ORANGE,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '1px',
        }}
      >
        <SvgIcon name="book" size={12} />
        DOCUMENTATION
      </span>
      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(2rem, 4.5vw, 2.75rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        }}
      >
        open-swaggo Documentation
      </h1>
      <p
        style={{
          margin: 0,
          color: 'var(--color-fd-muted-foreground)',
          fontSize: 17,
          lineHeight: 1.6,
        }}
      >
        A Go library to generate OpenAPI 3 / Swagger 2 specifications directly from your source
        code annotations — no runtime overhead, idiomatic Go, and compatible with any HTTP
        framework.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          color: 'var(--color-fd-muted-foreground)',
          fontSize: 12,
        }}
      >
        <Meta icon="timer" label="3 min read" />
        <Meta icon="tag" label="v1.1.1" />
        <Meta icon="calendar" label="Updated Apr 2026" />
      </div>
    </section>
  );
}

function Meta({ icon, label }: { icon: 'timer' | 'tag' | 'calendar'; label: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <SvgIcon name={icon} size={12} />
      {label}
    </span>
  );
}

const findItems = [
  {
    icon: 'type',
    title: 'Annotation-Driven Generation',
    description:
      'Add concise comment directives above your Go handlers to describe routes, parameters, and responses — open-swaggo parses them into a complete OpenAPI spec.',
  },
  {
    icon: 'zap',
    title: 'Zero Runtime Overhead',
    description:
      'Specs are generated at build time as static JSON/YAML files — nothing runs in your hot path, and you ship the same binary to production.',
  },
  {
    icon: 'puzzle',
    title: 'Framework-Agnostic',
    description:
      'First-class adapters for Gin, Echo, Fiber, Chi, and net/http — drop it into an existing codebase without refactoring your router.',
  },
  {
    icon: 'terminal',
    title: 'Powerful CLI',
    description:
      'A single open-swaggo init scaffolds config; open-swaggo gen produces both Swagger UI-ready JSON and OpenAPI 3.1 YAML on every build.',
  },
] as const;

function FindHere() {
  return (
    <section
      id="what-youll-find-here"
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>
        What You&apos;ll Find Here
      </h2>
      <p
        style={{
          margin: 0,
          color: 'var(--color-fd-muted-foreground)',
          fontSize: 15,
          lineHeight: 1.6,
        }}
      >
        This documentation walks you through every layer of open-swaggo — from installing the
        CLI and writing your first annotations, to generating production-grade OpenAPI specs
        for complex Go services.
      </p>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {findItems.map((item) => (
          <li
            key={item.title}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}
          >
            <span
              style={{
                flexShrink: 0,
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: ORANGE_TINT,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: ORANGE,
              }}
            >
              <SvgIcon name={item.icon} size={16} />
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--color-fd-foreground)',
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  color: 'var(--color-fd-muted-foreground)',
                  fontSize: 14,
                  lineHeight: 1.55,
                }}
              >
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuickInstall() {
  return (
    <section id="quick-install" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: ORANGE_TINT,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ORANGE,
          }}
        >
          <SvgIcon name="download" size={18} />
        </span>
        <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em' }}>
          Quick Install
        </h2>
      </div>
      <p
        style={{
          margin: 0,
          color: 'var(--color-fd-muted-foreground)',
          fontSize: 15,
          lineHeight: 1.55,
        }}
      >
        Add open-swaggo to your project with a single <code>go install</code> command. No extra
        configuration needed.
      </p>
      <DocsCodeBlock />
    </section>
  );
}

function DocsCodeBlock() {
  const lines: { num: number; text: React.ReactNode }[] = [
    {
      num: 1,
      text: (
        <>
          <CodeKw>go install</CodeKw> github.com/gopackx/open-swag-go@latest
        </>
      ),
    },
    { num: 2, text: <CodeKw>open-swaggo init</CodeKw> },
    { num: 3, text: <CodeKw>open-swaggo gen ./...</CodeKw> },
  ];
  return (
    <div
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        border: '1px solid var(--docs-code-border)',
        background: 'var(--docs-code-bg)',
        color: 'var(--docs-code-fg)',
        fontFamily: MONO,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--docs-code-bar)',
          borderBottom: '1px solid var(--docs-code-border)',
          padding: '10px 14px',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'inline-flex', gap: 6 }}>
            <Dot color="#ff5f57" />
            <Dot color="#febc2e" />
            <Dot color="#28c840" />
          </span>
          <span style={{ color: 'var(--docs-code-bar-fg)', fontFamily: MONO, fontSize: 12 }}>
            terminal.sh
          </span>
        </div>
        <span
          style={{
            color: ORANGE,
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          BASH
        </span>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            background: 'var(--docs-code-bar)',
            borderRight: '1px solid var(--docs-code-border)',
            padding: '16px 12px 16px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            color: 'var(--docs-code-bar-fg)',
            fontFamily: MONO,
            fontSize: 12,
            textAlign: 'right',
            userSelect: 'none',
            opacity: 0.6,
          }}
        >
          {lines.map((l) => (
            <span key={l.num}>{l.num}</span>
          ))}
        </div>
        <pre
          style={{
            margin: 0,
            padding: '16px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            fontFamily: MONO,
            fontSize: 13,
            color: 'var(--docs-code-fg)',
            overflow: 'auto',
            flex: 1,
            background: 'var(--docs-code-bg)',
          }}
        >
          {lines.map((l) => (
            <span key={l.num}>{l.text}</span>
          ))}
        </pre>
      </div>
      <div
        style={{
          background: 'var(--docs-code-bar)',
          borderTop: '1px solid var(--docs-code-border)',
          padding: '6px 14px',
          color: 'var(--docs-code-status-fg)',
          fontFamily: MONO,
          fontSize: 11,
          textAlign: 'right',
        }}
      >
        UTF-8 · LF · bash · {lines.length} lines
      </div>
    </div>
  );
}

/* Theme-aware "keyword" highlight color used for shell commands inside
   the docs Quick Install code block: green-ish on dark plum, darker
   green on white inverted background. */
function CodeKw({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: 'var(--docs-code-kw, #a6e22e)',
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      style={{ width: 10, height: 10, borderRadius: '9999px', background: color, display: 'inline-block' }}
    />
  );
}

function SvgIcon({
  name,
  size = 14,
}: {
  name:
    | 'book'
    | 'timer'
    | 'tag'
    | 'calendar'
    | 'type'
    | 'zap'
    | 'puzzle'
    | 'terminal'
    | 'download';
  size?: number;
}) {
  const c = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'book':
      return (
        <svg {...c}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 'timer':
      return (
        <svg {...c}>
          <line x1="10" x2="14" y1="2" y2="2" />
          <line x1="12" x2="15" y1="14" y2="11" />
          <circle cx="12" cy="14" r="8" />
        </svg>
      );
    case 'tag':
      return (
        <svg {...c}>
          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
          <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...c}>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case 'type':
      return (
        <svg {...c}>
          <polyline points="4 7 4 4 20 4 20 7" />
          <line x1="9" x2="15" y1="20" y2="20" />
          <line x1="12" x2="12" y1="4" y2="20" />
        </svg>
      );
    case 'zap':
      return (
        <svg {...c}>
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      );
    case 'puzzle':
      return (
        <svg {...c}>
          <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.99.99 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...c}>
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" x2="20" y1="19" y2="19" />
        </svg>
      );
    case 'download':
      return (
        <svg {...c}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      );
    default:
      return null;
  }
}
