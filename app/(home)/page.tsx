'use client';

import Link from 'next/link';
import { useState } from 'react';

const ORANGE = '#f97316';
const ORANGE_SOFT = '#fff7ed';
const ORANGE_TINT = 'rgba(249, 115, 22, 0.08)';
const ORANGE_RING = 'rgba(249, 115, 22, 0.20)';

const features = [
  {
    icon: 'plug',
    title: '5 Framework Adapters',
    description:
      'First-class support for Chi, Gin, Echo, Fiber, and net/http. Mount docs with a single line of code.',
    href: '/docs/adapters/overview',
  },
  {
    icon: 'lock',
    title: 'Auth Playground',
    description:
      'Test Bearer, Basic, API Key, Cookie, and OAuth2 flows directly in the docs UI.',
    href: '/docs/features/auth-playground',
  },
  {
    icon: 'zap',
    title: 'Try-It Console',
    description:
      'Send live API requests with environment management, request history, and auto-generated code snippets.',
    href: '/docs/features/try-it-console',
  },
  {
    icon: 'fileText',
    title: 'Schema Generation',
    description:
      'Derive OpenAPI schemas from Go structs using standard tags — json, validate, example, and more.',
    href: '/docs/features/schema-generation',
  },
  {
    icon: 'gitCompare',
    title: 'Version Diffing',
    description:
      'Compare spec versions, detect breaking changes, and generate migration guides automatically.',
    href: '/docs/features/version-diffing',
  },
  {
    icon: 'palette',
    title: 'Theming & Scalar UI',
    description:
      'Predefined themes, dark mode, and custom CSS via Scalar integration for beautiful output.',
    href: '/docs/features/theming',
  },
  {
    icon: 'code2',
    title: 'Code Snippets',
    description:
      'Generate ready-to-use code in curl, JavaScript, Go, Python, and PHP for every endpoint.',
    href: '/docs/features/code-snippets',
  },
  {
    icon: 'shieldCheck',
    title: 'Docs Auth',
    description:
      'Protect your documentation with basic auth or API key gates for staging environments.',
    href: '/docs/features/docs-auth',
  },
  {
    icon: 'sparkles',
    title: 'Smart Examples',
    description:
      'Auto-generated request and response examples derived from struct tags and validation rules.',
    href: '/docs/features/example-generator',
  },
] as const;

const steps = [
  {
    n: '1',
    title: 'Define',
    description:
      'Build openswag.Endpoint values from your Go request and response structs — no annotations, no codegen.',
  },
  {
    n: '2',
    title: 'Mount',
    description:
      'Attach the docs handler to your router with one call — Gin, Echo, Fiber, Chi, or net/http.',
  },
  {
    n: '3',
    title: 'Serve',
    description:
      'Start your app — Scalar UI and the live OpenAPI JSON are served straight from /docs.',
  },
];

const stats = [
  { icon: 'star', value: '4', label: 'GitHub Stars' },
  {
    icon: 'tag',
    value: 'v1.1.1',
    label: 'Latest Release',
    href: 'https://github.com/gopackx/open-swag-go/releases/tag/v1.1.1',
  },
  { icon: 'scale', value: 'MIT', label: 'License' },
  { icon: 'gitFork', value: '0', label: 'Forks' },
] as const;

const frameworks = ['Gin', 'Echo', 'Fiber', 'Chi', 'net/http'];

const faqs = [
  {
    q: 'How does open-swaggo differ from swaggo/swag?',
    a: "open-swaggo supports OpenAPI 3.x natively and ships pluggable framework adapters. Endpoints are described with plain Go values and struct tags — no comment-based annotations, no codegen step, no generated YAML in your repo. The spec is built at runtime via reflection.",
  },
  {
    q: 'Which Go frameworks are supported?',
    a: 'Gin, Echo, Fiber, Chi, and net/http are supported out of the box. The adapter system is pluggable, so adding a new framework takes minimal effort.',
  },
  {
    q: 'Can I use it in my CI/CD pipeline?',
    a: 'Yes. The spec is exposed as JSON at /docs/openapi.json, so a test can boot your app, fetch that endpoint, and snapshot or diff it against a checked-in golden file to catch breaking changes on every push.',
  },
  {
    q: 'Is it production-ready?',
    a: "Yes. open-swaggo is used in production by teams worldwide. It's MIT-licensed, actively maintained, and covered by comprehensive tests.",
  },
  {
    q: 'Is it free and open source?',
    a: 'Absolutely. open-swaggo is MIT-licensed and always will be. Contributions are welcome on GitHub.',
  },
];

const footerCols = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '/docs/features/endpoints' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Changelog', href: '/docs/changelog' },
    ],
  },
  {
    heading: 'Community',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/gopackx/open-swag-go',
        external: true,
      },
      {
        label: 'Discussions',
        href: 'https://github.com/gopackx/open-swag-go/discussions',
        external: true,
      },
      { label: 'Contributing', href: '/docs/contributing' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      {
        label: 'MIT License',
        href: 'https://github.com/gopackx/open-swag-go/blob/master/LICENSE',
        external: true,
      },
      { label: 'Privacy', href: '#' },
    ],
  },
] as const;

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "JetBrains Mono", monospace';

function Icon({ name, size = 18, color = 'currentColor', stroke = 2 }: { name: string; size?: number; color?: string; stroke?: number }) {
  const common = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'arrowRight':
      return <svg {...common}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
    case 'github':
      return <svg {...common}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>;
    case 'zap':
      return <svg {...common}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>;
    case 'code':
      return <svg {...common}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>;
    case 'fileText':
      return <svg {...common}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>;
    case 'puzzle':
      return <svg {...common}><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.99.99 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" /></svg>;
    case 'type':
      return <svg {...common}><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" x2="15" y1="20" y2="20" /><line x1="12" x2="12" y1="4" y2="20" /></svg>;
    case 'terminal':
      return <svg {...common}><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>;
    case 'star':
      return <svg {...common} fill={color}><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>;
    case 'tag':
      return <svg {...common}><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" /><circle cx="7.5" cy="7.5" r=".5" fill={color} /></svg>;
    case 'scale':
      return <svg {...common}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" /></svg>;
    case 'download':
      return <svg {...common}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>;
    case 'gitFork':
      return <svg {...common}><circle cx="12" cy="18" r="3" /><circle cx="6" cy="9" r="3" /><circle cx="18" cy="9" r="3" /><path d="M18 12v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1" /><path d="M12 12v3" /></svg>;
    case 'box':
      return <svg {...common}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>;
    case 'check':
      return <svg {...common}><polyline points="20 6 9 17 4 12" /></svg>;
    case 'copy':
      return <svg {...common}><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>;
    case 'chevronDown':
      return <svg {...common}><polyline points="6 9 12 15 18 9" /></svg>;
    case 'plug':
      return <svg {...common}><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" /></svg>;
    case 'lock':
      return <svg {...common}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case 'gitCompare':
      return <svg {...common}><circle cx="5" cy="6" r="3" /><path d="M12 6h5a2 2 0 0 1 2 2v7" /><path d="m15 9-3-3 3-3" /><circle cx="19" cy="18" r="3" /><path d="M12 18H7a2 2 0 0 1-2-2V9" /><path d="m9 15 3 3-3 3" /></svg>;
    case 'palette':
      return <svg {...common}><circle cx="13.5" cy="6.5" r=".5" fill={color} /><circle cx="17.5" cy="10.5" r=".5" fill={color} /><circle cx="8.5" cy="7.5" r=".5" fill={color} /><circle cx="6.5" cy="12.5" r=".5" fill={color} /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>;
    case 'code2':
      return <svg {...common}><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>;
    case 'shieldCheck':
      return <svg {...common}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>;
    case 'sparkles':
      return <svg {...common}><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>;
    default:
      return null;
  }
}

function FaqItem({ q, a, isLast }: { q: string; a: string; isLast?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid var(--color-fd-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          color: 'var(--color-fd-foreground)',
          fontSize: '16px',
          fontWeight: 600,
        }}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span
          style={{
            display: 'inline-flex',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--color-fd-muted-foreground)',
          }}
        >
          <Icon name="chevronDown" size={18} />
        </span>
      </button>
      {open && (
        <p
          style={{
            margin: 0,
            padding: '0 0 20px 0',
            color: 'var(--color-fd-muted-foreground)',
            fontSize: '14px',
            lineHeight: 1.6,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

function BrandMark({ size = 32, fontSize = 18 }: { size?: number; fontSize?: number }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          borderRadius: '8px',
          background: ORANGE,
          color: '#fff',
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: fontSize,
        }}
      >
        S
      </span>
      <span style={{ fontWeight: 700, fontSize: fontSize, color: 'var(--color-fd-foreground)' }}>
        open-swaggo
      </span>
    </div>
  );
}

function HeroTerminal() {
  return (
    <div
      className="hero-terminal"
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--hero-code-bar)',
        background: 'var(--hero-code-bg)',
        boxShadow: '0 24px 48px -16px rgba(15, 23, 42, 0.30)',
      }}
    >
      <div
        className="hero-terminal-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          background: 'var(--hero-code-bar)',
          borderBottom: '1px solid var(--hero-code-bar-border)',
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#ef4444' }} />
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#eab308' }} />
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#22c55e' }} />
        <span style={{ marginLeft: '8px', color: 'var(--code-bar-fg)', fontFamily: MONO, fontSize: 12 }}>
          main.go
        </span>
      </div>
      <pre
        className="hero-terminal-body"
        style={{
          margin: 0,
          padding: '20px',
          fontFamily: MONO,
          fontSize: 13,
          lineHeight: 1.7,
          color: 'var(--hero-code-fg)',
          overflow: 'auto',
        }}
      >
        <span style={{ color: 'var(--hero-code-comment)' }}>{`// Document the endpoint alongside the handler
`}</span>
        <span style={{ color: 'var(--hero-code-keyword)' }}>var </span>
        <span style={{ color: 'var(--hero-code-ident)' }}>ListUsersDoc </span>
        <span>= </span>
        <span style={{ color: 'var(--hero-code-type)' }}>openswag.Endpoint</span>
        <span>{`{
    `}</span>
        <span style={{ color: 'var(--hero-code-ident)' }}>Method</span>
        <span>{`:    `}</span>
        <span style={{ color: 'var(--hero-code-str)' }}>&quot;GET&quot;</span>
        <span>{`,
    `}</span>
        <span style={{ color: 'var(--hero-code-ident)' }}>Path</span>
        <span>{`:      `}</span>
        <span style={{ color: 'var(--hero-code-str)' }}>&quot;/users&quot;</span>
        <span>{`,
    `}</span>
        <span style={{ color: 'var(--hero-code-ident)' }}>Summary</span>
        <span>{`:   `}</span>
        <span style={{ color: 'var(--hero-code-str)' }}>&quot;List all users&quot;</span>
        <span>{`,
    `}</span>
        <span style={{ color: 'var(--hero-code-ident)' }}>Tags</span>
        <span>{`:      []`}</span>
        <span style={{ color: 'var(--hero-code-keyword)' }}>string</span>
        <span>{`{`}</span>
        <span style={{ color: 'var(--hero-code-str)' }}>&quot;Users&quot;</span>
        <span>{`},
    `}</span>
        <span style={{ color: 'var(--hero-code-ident)' }}>Responses</span>
        <span>{`: `}</span>
        <span style={{ color: 'var(--hero-code-keyword)' }}>map</span>
        <span>{`[`}</span>
        <span style={{ color: 'var(--hero-code-keyword)' }}>int</span>
        <span>{`]`}</span>
        <span style={{ color: 'var(--hero-code-type)' }}>openswag.Response</span>
        <span>{`{...},
}`}</span>
      </pre>
    </div>
  );
}

const Cm = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-comment)' }}>{children}</span>
);
const Kw = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-keyword)' }}>{children}</span>
);
const Str = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-str)' }}>{children}</span>
);
const Ty = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-type)' }}>{children}</span>
);
const Fnc = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-fn)' }}>{children}</span>
);
const Id = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-ident)' }}>{children}</span>
);
const Suc = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: 'var(--code-success)' }}>{children}</span>
);

function InstallStepCard({
  num,
  title,
  caption,
  fileLabel,
  children,
}: {
  num: string;
  title: string;
  caption: string;
  fileLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: '9999px',
            background: ORANGE,
            color: '#fff',
            fontFamily: MONO,
            fontSize: 13,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <span
            style={{
              color: 'var(--color-fd-foreground)',
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            {title}
          </span>
          <span
            style={{
              color: 'var(--color-fd-muted-foreground)',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {caption}
          </span>
        </div>
      </div>
      <div
        style={{
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--code-border)',
          background: 'var(--code-bg)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'var(--code-bar)',
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#ef4444' }} />
          <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#eab308' }} />
          <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#22c55e' }} />
          <span style={{ marginLeft: '8px', color: 'var(--code-bar-fg)', fontFamily: MONO, fontSize: 12 }}>
            {fileLabel}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function InstallSteps() {
  const preStyle: React.CSSProperties = {
    margin: 0,
    padding: '20px',
    fontFamily: MONO,
    fontSize: 13,
    lineHeight: 1.7,
    color: 'var(--code-fg)',
    overflow: 'auto',
  };
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '820px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <InstallStepCard
        num="1"
        title="Install the library"
        caption="open-swag-go is a library — use go get, not go install."
        fileLabel="terminal"
      >
        <pre className="install-terminal-body" style={preStyle}>
          <Cm>{`# Add open-swag-go to your module
`}</Cm>
          <span>{`$ go get github.com/gopackx/open-swag-go@latest`}</span>
        </pre>
      </InstallStepCard>

      <InstallStepCard
        num="2"
        title="Define your endpoints in code"
        caption="Plain Go structs and openswag.Endpoint values — no annotations, no codegen."
        fileLabel="main.go"
      >
        <pre className="install-terminal-body" style={preStyle}>
          <Kw>package</Kw>{` main

`}
          <Kw>import</Kw>{` (
    `}<Str>&quot;net/http&quot;</Str>{`

    openswag `}<Str>&quot;github.com/gopackx/open-swag-go&quot;</Str>{`
)

`}
          <Kw>type</Kw>{` `}<Ty>CreateUserRequest</Ty>{` `}<Kw>struct</Kw>{` {
    `}<Id>Name</Id>{`  `}<Kw>string</Kw>{` `}<Str>{'`json:"name"  example:"John Doe"`'}</Str>{`
    `}<Id>Email</Id>{` `}<Kw>string</Kw>{` `}<Str>{'`json:"email" example:"john@example.com"`'}</Str>{`
}

`}
          <Kw>type</Kw>{` `}<Ty>UserResponse</Ty>{` `}<Kw>struct</Kw>{` {
    `}<Id>ID</Id>{`    `}<Kw>string</Kw>{` `}<Str>{'`json:"id"`'}</Str>{`
    `}<Id>Name</Id>{`  `}<Kw>string</Kw>{` `}<Str>{'`json:"name"`'}</Str>{`
    `}<Id>Email</Id>{` `}<Kw>string</Kw>{` `}<Str>{'`json:"email"`'}</Str>{`
}

`}
          <Kw>func</Kw>{` `}<Fnc>main</Fnc>{`() {
    docs := openswag.`}<Fnc>New</Fnc>{`(openswag.`}<Ty>Config</Ty>{`{
        `}<Id>Info</Id>{`: openswag.`}<Ty>Info</Ty>{`{
            `}<Id>Title</Id>{`:   `}<Str>&quot;My API&quot;</Str>{`,
            `}<Id>Version</Id>{`: `}<Str>&quot;1.0.0&quot;</Str>{`,
        },
    })

    docs.`}<Fnc>Add</Fnc>{`(openswag.`}<Ty>Endpoint</Ty>{`{
        `}<Id>Method</Id>{`:  `}<Str>&quot;POST&quot;</Str>{`,
        `}<Id>Path</Id>{`:    `}<Str>&quot;/users&quot;</Str>{`,
        `}<Id>Summary</Id>{`: `}<Str>&quot;Create a user&quot;</Str>{`,
        `}<Id>Tags</Id>{`:    []`}<Kw>string</Kw>{`{`}<Str>&quot;Users&quot;</Str>{`},
        `}<Id>RequestBody</Id>{`: &openswag.`}<Ty>RequestBody</Ty>{`{
            `}<Id>Required</Id>{`: `}<Kw>true</Kw>{`,
            `}<Id>Schema</Id>{`:   `}<Ty>CreateUserRequest</Ty>{`{},
        },
        `}<Id>Responses</Id>{`: `}<Kw>map</Kw>{`[`}<Kw>int</Kw>{`]openswag.`}<Ty>Response</Ty>{`{
            201: {`}<Id>Description</Id>{`: `}<Str>&quot;Created&quot;</Str>{`, `}<Id>Schema</Id>{`: `}<Ty>UserResponse</Ty>{`{}},
        },
    })

    mux := http.`}<Fnc>NewServeMux</Fnc>{`()
    docs.`}<Fnc>Mount</Fnc>{`(mux, `}<Str>&quot;/docs&quot;</Str>{`)

    http.`}<Fnc>ListenAndServe</Fnc>{`(`}<Str>&quot;:8080&quot;</Str>{`, mux)
}`}
        </pre>
      </InstallStepCard>

      <InstallStepCard
        num="3"
        title="Run and view your docs"
        caption="Scalar UI is rendered live from the in-memory spec — no files written, no build step."
        fileLabel="terminal"
      >
        <pre className="install-terminal-body" style={preStyle}>
          <span>{`$ go run main.go

`}</span>
          <Cm>{`# Scalar UI, rendered from the live spec
`}</Cm>
          <Suc>{`→ http://localhost:8080/docs/
`}</Suc>
          <Cm>{`# Raw OpenAPI 3.x JSON
`}</Cm>
          <Suc>{`→ http://localhost:8080/docs/openapi.json`}</Suc>
        </pre>
      </InstallStepCard>
    </div>
  );
}


function DemoLeftPanel() {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${ORANGE_RING}`,
        background: 'var(--code-bg)',
        boxShadow: `0 8px 24px -4px rgba(0,0,0,0.30), 0 0 0 1px ${ORANGE_TINT}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          background: 'var(--code-bar)',
          borderBottom: `1px solid ${ORANGE_RING}`,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#ef4444' }} />
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#eab308' }} />
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#22c55e' }} />
        <span style={{ marginLeft: '8px', color: 'var(--code-bar-fg)', fontFamily: MONO, fontSize: 12 }}>
          handler.go
        </span>
      </div>
      <code
        className="demo-panel-body"
        style={{
          display: 'block',
          flex: 1,
          margin: 0,
          padding: '20px',
          fontFamily: MONO,
          fontSize: 12,
          lineHeight: 1.7,
          color: 'var(--code-fg)',
          whiteSpace: 'pre',
          overflow: 'auto',
        }}
      >
        <div><span style={{ color: 'var(--code-comment)' }}>{'// Handler — net/http standard'}</span></div>
        <div>
          <span style={{ color: 'var(--code-keyword)' }}>{'func '}</span>
          <span style={{ color: 'var(--code-fn)' }}>{'CreateUser'}</span>
          {'(w '}
          <span style={{ color: 'var(--code-type)' }}>{'http.ResponseWriter'}</span>
          {', r *'}
          <span style={{ color: 'var(--code-type)' }}>{'http.Request'}</span>
          {') {'}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-keyword)' }}>{'var '}</span>
          <span style={{ color: 'var(--code-ident)' }}>{'req '}</span>
          <span style={{ color: 'var(--code-type)' }}>{'CreateUserRequest'}</span>
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'json'}</span>
          {'.'}
          <span style={{ color: 'var(--code-fn)' }}>{'NewDecoder'}</span>
          {'(r.'}
          <span style={{ color: 'var(--code-ident)' }}>{'Body'}</span>
          {').'}
          <span style={{ color: 'var(--code-fn)' }}>{'Decode'}</span>
          {'(&req)'}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'w'}</span>
          {'.'}
          <span style={{ color: 'var(--code-fn)' }}>{'WriteHeader'}</span>
          {'('}
          <span style={{ color: 'var(--code-num)' }}>{'http.StatusCreated'}</span>
          {')'}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'json'}</span>
          {'.'}
          <span style={{ color: 'var(--code-fn)' }}>{'NewEncoder'}</span>
          {'(w).'}
          <span style={{ color: 'var(--code-fn)' }}>{'Encode'}</span>
          {'('}
          <span style={{ color: 'var(--code-type)' }}>{'UserResponse'}</span>
          {'{...})'}
        </div>
        <div>{'}'}</div>
        <div>{' '}</div>
        <div><span style={{ color: 'var(--code-comment)' }}>{'// OpenAPI documentation for the handler'}</span></div>
        <div>
          <span style={{ color: 'var(--code-keyword)' }}>{'var '}</span>
          <span style={{ color: 'var(--code-ident)' }}>{'CreateUserDoc '}</span>
          {'= '}
          <span style={{ color: 'var(--code-type)' }}>{'openswag.Endpoint'}</span>
          {'{'}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'Method'}</span>
          {':      '}
          <span style={{ color: 'var(--code-str)' }}>{'"POST"'}</span>
          {','}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'Path'}</span>
          {':        '}
          <span style={{ color: 'var(--code-str)' }}>{'"/users"'}</span>
          {','}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'Summary'}</span>
          {':     '}
          <span style={{ color: 'var(--code-str)' }}>{'"Create a new user"'}</span>
          {','}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'Tags'}</span>
          {':        []'}
          <span style={{ color: 'var(--code-type)' }}>{'string'}</span>
          {'{'}
          <span style={{ color: 'var(--code-str)' }}>{'"Users"'}</span>
          {'},'}
        </div>
        <div>
          {'    '}
          <span style={{ color: 'var(--code-ident)' }}>{'Responses'}</span>
          {':   '}
          <span style={{ color: 'var(--code-keyword)' }}>{'map'}</span>
          {'['}
          <span style={{ color: 'var(--code-keyword)' }}>{'int'}</span>
          {']'}
          <span style={{ color: 'var(--code-type)' }}>{'openswag.Response'}</span>
          {'{...},'}
        </div>
        <div>{'}'}</div>
      </code>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--code-status)',
          borderTop: '1px solid var(--code-status-border)',
          fontFamily: MONO,
          fontSize: 11,
        }}
      >
        <span style={{ color: 'var(--code-bar-fg)' }}>Go · 12 lines · UTF-8</span>
        <span style={{ color: 'var(--code-success)' }}>main</span>
      </div>
    </div>
  );
}

function DemoRightPanel() {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        border: `1px solid ${ORANGE_RING}`,
        background: 'var(--code-bg)',
        boxShadow: `0 8px 24px -4px rgba(0,0,0,0.30), 0 0 0 1px ${ORANGE_TINT}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          background: 'var(--code-bar)',
          borderBottom: `1px solid ${ORANGE_RING}`,
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#ef4444' }} />
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#eab308' }} />
        <span style={{ width: 12, height: 12, borderRadius: '9999px', background: '#22c55e' }} />
        <span style={{ marginLeft: '8px', color: 'var(--code-bar-fg)', fontFamily: MONO, fontSize: 12 }}>
          API Reference
        </span>
        <span style={{ marginLeft: 'auto', color: ORANGE, fontFamily: MONO, fontSize: 10 }}>
          ⚡ Live
        </span>
      </div>
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              padding: '4px 8px',
              borderRadius: '6px',
              background: ORANGE,
              color: '#fff',
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            POST
          </span>
          <code style={{ color: 'var(--code-fg)', fontFamily: MONO, fontSize: 14, fontWeight: 600 }}>
            /users
          </code>
        </div>
        <div>
          <div style={{ color: 'var(--code-fg)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            Create a new user
          </div>
          <div style={{ color: 'var(--code-bar-fg)', fontSize: 12 }}>
            Adds a new user account to the system.
          </div>
        </div>
        <div style={{ height: 1, background: 'var(--code-divider)' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--code-bar-fg)', fontSize: 10, fontWeight: 700, letterSpacing: '1px' }}>
            REQUEST BODY
          </span>
          <span style={{ color: 'var(--code-num)', fontFamily: MONO, fontSize: 11 }}>application/json</span>
        </div>
        <div
          style={{
            padding: '12px',
            borderRadius: '8px',
            background: 'var(--code-inset)',
            border: '1px solid var(--code-inset-border)',
            fontFamily: MONO,
            fontSize: 12,
            color: 'var(--code-fg-soft)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div>
            <span style={{ color: 'var(--code-ident)' }}>email</span>
            <span style={{ color: 'var(--code-bar-fg)' }}>: </span>
            <span style={{ color: 'var(--code-type)' }}>string</span>
            <span style={{ color: 'var(--code-bar-fg)' }}> · required</span>
          </div>
          <div>
            <span style={{ color: 'var(--code-ident)' }}>name</span>
            <span style={{ color: 'var(--code-bar-fg)' }}>: </span>
            <span style={{ color: 'var(--code-type)' }}>string</span>
            <span style={{ color: 'var(--code-bar-fg)' }}> · required</span>
          </div>
        </div>
        <span style={{ color: 'var(--code-bar-fg)', fontSize: 10, fontWeight: 700, letterSpacing: '1px' }}>
          RESPONSES
        </span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            borderRadius: '6px',
            background: 'rgba(16, 185, 129, 0.10)',
            border: '1px solid rgba(16, 185, 129, 0.20)',
          }}
        >
          <span style={{ color: 'var(--code-success)', fontFamily: MONO, fontSize: 12, fontWeight: 700 }}>
            201
          </span>
          <span style={{ color: 'var(--code-fg)', fontSize: 12 }}>Created · UserResponse</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            borderRadius: '6px',
            background: 'rgba(239, 68, 68, 0.10)',
            border: '1px solid rgba(239, 68, 68, 0.20)',
          }}
        >
          <span style={{ color: '#f87171', fontFamily: MONO, fontSize: 12, fontWeight: 700 }}>
            400
          </span>
          <span style={{ color: 'var(--code-fg)', fontSize: 12 }}>Bad Request · Error</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'var(--code-status)',
          borderTop: '1px solid var(--code-status-border)',
          fontFamily: MONO,
          fontSize: 11,
        }}
      >
        <span style={{ color: 'var(--code-bar-fg)' }}>openapi.json · live · UTF-8</span>
        <span style={{ color: ORANGE }}>OpenAPI 3.x</span>
      </div>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        color: ORANGE,
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: '1.5px',
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children, mb = 0 }: { children: React.ReactNode; mb?: number }) {
  return (
    <h2
      className="landing-section-title"
      style={{
        margin: 0,
        marginBottom: mb,
        fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--color-fd-foreground)',
        lineHeight: 1.15,
      }}
    >
      {children}
    </h2>
  );
}

export default function HomePage() {
  return (
    <div style={{ fontSize: '16px', lineHeight: 1.5, background: 'var(--landing-bg)', color: 'var(--color-fd-foreground)' }}>
      {/* Hero */}
      <section
        className="landing-hero-section"
        style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)' }}
      >
        <div className="landing-hero">
          <div className="hero-text" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span
              className="hero-pill"
              style={{
                display: 'inline-flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'var(--brand-pill-bg)',
                border: '1px solid var(--brand-pill-border)',
              }}
            >
              <span
                className="hero-pill-dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '9999px',
                  background: ORANGE,
                }}
              />
              <span className="hero-pill-text" style={{ color: 'var(--brand-pill-text)', fontSize: 13, fontWeight: 600 }}>
                Now supporting OpenAPI 3.1
              </span>
            </span>
            <h1
              className="hero-headline"
              style={{
                margin: 0,
                fontSize: 'clamp(2.25rem, 5.5vw, 3.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--color-fd-foreground)',
              }}
            >
              Generate OpenAPI specs
              <br />
              from Go structs &amp; tags.
            </h1>
            <p
              className="hero-subhead"
              style={{
                margin: 0,
                color: 'var(--color-fd-muted-foreground)',
                fontSize: '18px',
                lineHeight: 1.6,
                maxWidth: '560px',
              }}
            >
              open-swaggo derives docs from your Go struct values and standard struct tags
              (json, validate, example) at runtime via reflection — no codegen, no committed
              spec files, every major framework supported.
            </p>
            <div className="hero-cta-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link
                href="/docs/getting-started/installation"
                className="hero-cta-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  background: ORANGE,
                  color: 'var(--brand-cta-fg)',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                  boxShadow: '0 10px 24px -8px rgba(249, 115, 22, 0.55)',
                }}
              >
                Get Started
                <Icon name="arrowRight" size={18} color="var(--brand-cta-fg)" />
              </Link>
              <a
                href="https://github.com/gopackx/open-swag-go"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  background: 'var(--brand-cta-secondary-bg)',
                  color: 'var(--color-fd-foreground)',
                  border: '1px solid var(--brand-cta-secondary-border)',
                  fontWeight: 600,
                  fontSize: '16px',
                  textDecoration: 'none',
                }}
              >
                <Icon name="github" size={18} />
                View on GitHub
              </a>
            </div>
          </div>
          <HeroTerminal />
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="landing-trust-strip"
        style={{
          background: 'var(--landing-strip)',
          borderTop: '1px solid var(--landing-strip-border)',
          borderBottom: '1px solid var(--landing-strip-border)',
          padding: '24px clamp(20px, 5vw, 80px)',
        }}
      >
        <div
          className="landing-trust-strip-inner"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px 48px',
          }}
        >
          {stats.map((stat, i) => {
            const href = 'href' in stat ? stat.href : undefined;
            const innerStyle: React.CSSProperties = {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              color: 'inherit',
            };
            const inner = (
              <>
                <span className="stat-icon" style={{ display: 'inline-flex' }}>
                  <Icon name={stat.icon} size={18} color={ORANGE} />
                </span>
                <span className="stat-value" style={{ color: 'var(--color-fd-foreground)', fontSize: 14, fontWeight: 600 }}>
                  {stat.value}
                </span>
                <span className="stat-label" style={{ color: 'var(--color-fd-muted-foreground)', fontSize: 14 }}>
                  {stat.label}
                </span>
              </>
            );
            return (
              <div
                key={stat.label}
                className="stat-block"
                style={{ display: 'flex', alignItems: 'center', gap: '24px' }}
              >
                {href ? (
                  <a
                    className="stat-inner"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={innerStyle}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="stat-inner" style={innerStyle}>
                    {inner}
                  </div>
                )}
                {i < stats.length - 1 && (
                  <span className="stat-sep" style={{ color: 'var(--color-fd-muted-foreground)', opacity: 0.4 }}>·</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section
        className="landing-features-section"
        style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <SectionEyebrow>Features</SectionEyebrow>
            <SectionTitle>Everything you need to ship great API docs</SectionTitle>
            <p
              style={{
                margin: 0,
                color: 'var(--color-fd-muted-foreground)',
                fontSize: 16,
                maxWidth: 560,
              }}
            >
              Built for Go developers who value simplicity, performance, and correctness.
            </p>
          </div>
          <div className="landing-features">
            {features.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="feature-card"
                style={{
                  padding: '28px',
                  borderRadius: '12px',
                  background: 'var(--color-fd-card)',
                  border: `1px solid ${ORANGE_RING}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.08), 0 16px 32px -8px rgba(15, 23, 42, 0.12)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    background: ORANGE_SOFT,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name={f.icon} size={22} color={ORANGE} />
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--color-fd-foreground)',
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--color-fd-muted-foreground)',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {f.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section
        className="landing-demo-section"
        style={{
          padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
          background: 'var(--landing-strip)',
          borderTop: '1px solid var(--landing-strip-border)',
          borderBottom: '1px solid var(--landing-strip-border)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '9999px',
                background: ORANGE_TINT,
                border: `1px solid ${ORANGE_RING}`,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '9999px', background: ORANGE }} />
              <span style={{ color: ORANGE, fontSize: 12, fontWeight: 700, letterSpacing: '1.5px' }}>
                LIVE DEMO
              </span>
            </span>
            <SectionTitle>From Go structs to OpenAPI in seconds</SectionTitle>
            <p style={{ margin: 0, color: 'var(--color-fd-muted-foreground)', fontSize: 16 }}>
              Declare openswag.Endpoint values with struct tags on the left, get a complete spec
              on the right.
            </p>
          </div>

          <div className="landing-demo landing-demo-labels" style={{ marginBottom: '24px' }}>
            <DemoLabel num="01" eyebrow="INPUT" label="Go struct values & tags" />
            <span className="landing-demo-spacer" style={{ width: 48 }} aria-hidden />
            <DemoLabel num="02" eyebrow="OUTPUT" label="Live OpenAPI 3.x spec" />
          </div>

          <div className="landing-demo" style={{ alignItems: 'stretch' }}>
            <div style={{ display: 'flex' }}>
              <DemoLeftPanel />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span
                className="demo-arrow"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '9999px',
                  background: ORANGE,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 24px rgba(249, 115, 22, 0.5)',
                }}
              >
                <Icon name="arrowRight" size={22} color="#fff" />
              </span>
              <span
                style={{
                  color: ORANGE,
                  fontFamily: MONO,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                reflect
              </span>
            </div>
            <div style={{ display: 'flex' }}>
              <DemoRightPanel />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="landing-hiw-section"
        style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)' }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
            <SectionTitle>Three steps to production-ready docs</SectionTitle>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {steps.map((s) => (
              <div
                key={s.n}
                style={{
                  padding: '32px',
                  borderRadius: '12px',
                  background: 'var(--color-fd-card)',
                  border: '1px solid var(--color-fd-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '9999px',
                    background: ORANGE,
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {s.n}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'var(--color-fd-foreground)',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--color-fd-muted-foreground)',
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick install */}
      <section
        className="landing-install-section"
        style={{
          padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
          background: 'var(--landing-strip)',
          borderTop: '1px solid var(--landing-strip-border)',
          borderBottom: '1px solid var(--landing-strip-border)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <SectionEyebrow>QUICK INSTALL</SectionEyebrow>
            <SectionTitle>Up and running in 30 seconds</SectionTitle>
            <p
              style={{
                margin: 0,
                color: 'var(--color-fd-muted-foreground)',
                fontSize: 16,
                maxWidth: 560,
              }}
            >
              Three runtime steps. No CLI to install, no codegen, no generated spec files
              checked into your repo.
            </p>
          </div>
          <InstallSteps />
        </div>
      </section>

      {/* Frameworks */}
      <section
        className="landing-frameworks-section"
        style={{ padding: '60px clamp(20px, 5vw, 80px)' }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <span
            style={{
              color: 'var(--color-fd-muted-foreground)',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '1.5px',
            }}
          >
            SUPPORTED FRAMEWORKS
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            {frameworks.map((fw) => (
              <div
                key={fw}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 28px',
                  borderRadius: '10px',
                  background: 'var(--landing-strip)',
                  border: '1px solid var(--landing-strip-border)',
                }}
              >
                <Icon name="box" size={20} />
                <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-fd-foreground)' }}>
                  {fw}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="landing-faq-section"
        style={{
          padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 80px)',
          background: 'var(--landing-strip)',
          borderTop: '1px solid var(--landing-strip-border)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <SectionEyebrow>FAQ</SectionEyebrow>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
          </div>
          <div>
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} isLast={i === faqs.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="landing-footer"
        style={{
          padding: '60px clamp(20px, 5vw, 80px) 40px',
          background: 'var(--landing-bg)',
          borderTop: '1px solid var(--landing-strip-border)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '48px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 260 }}>
              <BrandMark />
              <p style={{ margin: 0, color: 'var(--color-fd-muted-foreground)', fontSize: 14 }}>
                Auto-generate OpenAPI specs from Go.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px' }}>
              {footerCols.map((col) => (
                <div
                  key={col.heading}
                  style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                  <span
                    style={{
                      color: 'var(--color-fd-foreground)',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '1px',
                    }}
                  >
                    {col.heading}
                  </span>
                  {col.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={'external' in l && l.external ? '_blank' : undefined}
                      rel={'external' in l && l.external ? 'noopener noreferrer' : undefined}
                      style={{
                        color: 'var(--color-fd-muted-foreground)',
                        fontSize: 14,
                        textDecoration: 'none',
                      }}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{ height: 1, background: 'var(--color-fd-border)' }} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'var(--color-fd-muted-foreground)',
              fontSize: 13,
            }}
          >
            <span>© 2026 andrianprasetya. All rights reserved.</span>
            <span>Released under the MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DemoLabel({ num, eyebrow, label }: { num: string; eyebrow: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span
        style={{
          width: 32,
          height: 32,
          borderRadius: '9999px',
          background: ORANGE_TINT,
          border: `1px solid ${ORANGE_RING}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: ORANGE,
          fontFamily: MONO,
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {num}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            color: ORANGE,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '1.2px',
          }}
        >
          {eyebrow}
        </span>
        <span style={{ color: 'var(--color-fd-foreground)', fontSize: 14, fontWeight: 600 }}>
          {label}
        </span>
      </div>
    </div>
  );
}
