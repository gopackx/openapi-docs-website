import { source } from '@/lib/source';

export const revalidate = false;

const SITE_URL = 'https://open-swaggo.andrianprasetya.com';

const CATEGORY_ORDER = [
  'getting-started',
  'adapters',
  'features',
  'api-reference',
  'examples',
  'guides',
  '_misc',
];

const CATEGORY_LABELS: Record<string, string> = {
  'getting-started': 'Getting Started',
  adapters: 'Framework Adapters',
  features: 'Features',
  'api-reference': 'API Reference',
  examples: 'Examples',
  guides: 'Guides',
  _root: 'Documentation Home',
  _misc: 'Reference',
};

export function GET() {
  const pages = source.getPages();

  // Group by first slug segment
  const grouped = new Map<string, typeof pages>();
  for (const page of pages) {
    const head = page.slugs[0];
    const key = page.slugs.length === 0 ? '_root' : head ?? '_misc';
    const inSet = grouped.get(key);
    if (inSet) inSet.push(page);
    else grouped.set(key, [page]);
  }

  const sortedKeys = [
    '_root',
    ...CATEGORY_ORDER.filter((k) => grouped.has(k)),
    ...Array.from(grouped.keys()).filter(
      (k) => k !== '_root' && !CATEGORY_ORDER.includes(k),
    ),
  ];

  const lines: string[] = [];
  lines.push('# OPEN SWAGGO');
  lines.push('');
  lines.push(
    '> A Go library to generate OpenAPI 3 / Swagger 2 specifications directly from your source code annotations — no runtime overhead, idiomatic Go, and compatible with any HTTP framework. First-class adapters for Chi, Gin, Echo, Fiber, and net/http.',
  );
  lines.push('');
  lines.push(
    'open-swaggo derives docs from your Go struct values and standard struct tags (json, validate, example) at build time. Source: https://github.com/gopackx/open-swag-go',
  );
  lines.push('');

  // Landing page entry
  lines.push('## Landing');
  lines.push('');
  lines.push(
    `- [Home](${SITE_URL}/): Marketing landing — feature overview, live struct-to-OpenAPI demo, install instructions, supported frameworks (Gin, Echo, Fiber, Chi, net/http), and FAQ.`,
  );
  lines.push('');

  // Docs sections
  for (const key of sortedKeys) {
    const catPages = grouped.get(key);
    if (!catPages || catPages.length === 0) continue;
    lines.push(`## ${CATEGORY_LABELS[key] ?? prettify(key)}`);
    lines.push('');
    for (const page of catPages) {
      const desc = page.data.description ? `: ${page.data.description}` : '';
      lines.push(`- [${page.data.title}](${SITE_URL}${page.url})${desc}`);
    }
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

function prettify(slug: string): string {
  return slug
    .split('-')
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}
