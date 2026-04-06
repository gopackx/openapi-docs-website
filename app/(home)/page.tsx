'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const installCommand = 'go get github.com/gopackx/open-swag-go';

const features = [
  {
    title: '5 Framework Adapters',
    description:
      'First-class support for Chi, Gin, Echo, Fiber, and net/http. Mount docs with a single line of code.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" /></svg>
    ),
    href: '/docs/adapters/overview',
  },
  {
    title: 'Auth Playground',
    description:
      'Test Bearer, Basic, API Key, Cookie, and OAuth2 flows directly in the docs UI.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
    href: '/docs/features/authentication',
  },
  {
    title: 'Try-It Console',
    description:
      'Send live API requests with environment management, request history, and auto-generated code snippets.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
    ),
    href: '/docs/features/try-it-console',
  },
  {
    title: 'Schema Generation',
    description:
      'Derive OpenAPI schemas from Go structs using standard tags — json, validate, example, and more.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
    ),
    href: '/docs/features/schema-generation',
  },
  {
    title: 'Version Diffing',
    description:
      'Compare spec versions, detect breaking changes, and generate migration guides automatically.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
    ),
    href: '/docs/features/version-diffing',
  },
  {
    title: 'Theming & Scalar UI',
    description:
      'Predefined themes, dark mode, and custom CSS via Scalar integration for beautiful output.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
    ),
    href: '/docs/features/theming',
  },
  {
    title: 'Code Snippets',
    description:
      'Auto-generated examples in curl, JS, Go, Python, and PHP for every single endpoint.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    href: '/docs/features/code-snippets',
  },
  {
    title: 'Docs Auth',
    description:
      'Protect your documentation with basic auth or API key authentication out of the box.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
    href: '/docs/features/docs-auth',
  },
  {
    title: 'Smart Examples',
    description:
      'Auto-generate realistic example values from struct field names and validation tags.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /></svg>
    ),
    href: '/docs/features/example-generator',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg text-slate-400 hover:bg-gray-200 hover:text-slate-900 transition-colors"
      aria-label="Copy install command"
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}

export default function HomePage() {
  return (
    <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
      {/* Hero Section */}
      <section style={{ paddingTop: '96px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div style={{ maxWidth: '896px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          {/* Light mode logo */}
          <Image
            src="/openapi-icon-transparent.png"
            alt="openapi logo"
            width={350}
            height={350}
            style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '12px' }}
            unoptimized
          />
          <h1 style={{
            fontSize: 'clamp(2.50rem, 6vw, 4.50rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            marginBottom: '32px',
          }}>
            OPEN SWAG GO
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
            color: 'var(--color-fd-muted-foreground)',
            maxWidth: '640px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '48px',
            lineHeight: 1.7,
          }}>
            Define endpoints as structs, build schemas fluently, and visualize with Scalar.
          </p>

          {/* Command Box */}
          <div style={{ maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '12px',
              border: '1px solid var(--color-fd-border)',
              backgroundColor: 'var(--color-fd-secondary)',
              padding: '4px 12px 4px 4px',
            }}>
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: '14px',
                color: 'var(--color-fd-muted-foreground)',
              }}>
                <span style={{ marginRight: '12px', userSelect: 'none', opacity: 0.5 }}>$</span>
                <code>{installCommand}</code>
              </div>
              <CopyButton text={installCommand} />
            </div>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
            <Link
              href="/docs/getting-started/installation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-fd-foreground)',
                color: 'var(--color-fd-background)',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
                transition: 'opacity 0.2s',
              }}
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/docs/examples/basic"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 32px',
                borderRadius: '12px',
                border: '1px solid var(--color-fd-border)',
                backgroundColor: 'var(--color-fd-background)',
                color: 'var(--color-fd-foreground)',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'background-color 0.2s',
              }}
            >
              View Examples
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            Everything you need for OpenAPI docs in Go
          </h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--color-fd-foreground)', marginLeft: 'auto', marginRight: 'auto', borderRadius: '9999px' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}>
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              style={{
                display: 'block',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid var(--color-fd-border)',
                backgroundColor: 'var(--color-fd-card)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="hover:!-translate-y-1 hover:!border-fd-foreground hover:!shadow-lg"
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                border: '1px solid var(--color-fd-border)',
                backgroundColor: 'var(--color-fd-background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-fd-muted-foreground)' }}>
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--color-fd-border)',
        backgroundColor: 'var(--color-fd-secondary)',
        padding: '48px 24px',
      }}>
        <div style={{
          maxWidth: '1280px',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, letterSpacing: '-0.025em' }}>OPEN SWAG GO</span>
            <span style={{ color: 'var(--color-fd-muted-foreground)' }}>© 2026</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500 }}>
            <a
              href="https://github.com/gopackx/open-swag-go"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-fd-muted-foreground)', textDecoration: 'none' }}
            >
              GitHub
            </a>
            <span style={{ color: 'var(--color-fd-muted-foreground)' }}>MIT License</span>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--color-fd-muted-foreground)' }}>
            Made for Andrian Prasetya
          </div>
        </div>
      </footer>
    </div>
  );
}
