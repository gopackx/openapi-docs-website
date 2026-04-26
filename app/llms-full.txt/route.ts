import { source } from '@/lib/source';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export const revalidate = false;

const SITE_URL = 'https://open-swaggo.andrianprasetya.com';
const CONTENT_ROOT = path.join(process.cwd(), 'content/docs');

const LANDING_MARKDOWN = `## Generate OpenAPI specs from Go structs & tags.

open-swaggo derives docs from your Go struct values and standard struct tags (json, validate, example) at build time — zero runtime overhead, idiomatic Go, every major framework supported.

### Features

- **5 Framework Adapters** — First-class support for Chi, Gin, Echo, Fiber, and net/http. Mount docs with a single line of code.
- **Auth Playground** — Test Bearer, Basic, API Key, Cookie, and OAuth2 flows directly in the docs UI.
- **Try-It Console** — Send live API requests with environment management, request history, and auto-generated code snippets.
- **Schema Generation** — Derive OpenAPI schemas from Go structs using standard tags — json, validate, example, and more.
- **Version Diffing** — Compare spec versions, detect breaking changes, and generate migration guides automatically.
- **Theming & Scalar UI** — Predefined themes, dark mode, and custom CSS via Scalar integration for beautiful output.
- **Code Snippets** — Generate ready-to-use code in curl, JavaScript, Go, Python, and PHP for every endpoint.
- **Docs Auth** — Protect your documentation with basic auth or API key gates for staging environments.
- **Smart Examples** — Auto-generated request and response examples derived from struct tags and validation rules.

### Live Demo

From Go structs to OpenAPI in seconds. Declare \`openswag.Endpoint\` values with struct tags on the left, get a complete spec on the right.

### How It Works (three steps to production-ready docs)

1. **Annotate** — Add standard Go comments above your handlers with open-swaggo tags.
2. **Generate** — Run \`open-swaggo gen ./...\` and watch your spec file appear in seconds.
3. **Ship** — Serve your spec with Swagger UI, ReDoc, or feed it into your CI pipeline.

### Quick Install

\`\`\`bash
# Install open-swaggo
go install github.com/gopackx/open-swag-go@latest

# Initialize your project
open-swaggo init

# Generate your spec
open-swaggo gen ./...
\`\`\`

### Supported Frameworks

Gin, Echo, Fiber, Chi, net/http.

### FAQ

**How does open-swaggo differ from swaggo/swag?**
open-swaggo supports OpenAPI 3.x natively, has pluggable framework adapters, and generates specs at build time with zero runtime overhead. It's a modern rethink built for today's Go ecosystem.

**Which Go frameworks are supported?**
Gin, Echo, Fiber, Chi, and net/http are supported out of the box. The adapter system is pluggable, so adding a new framework takes minimal effort.

**Can I use it in my CI/CD pipeline?**
Absolutely. open-swaggo is a single binary with no dependencies. Add \`open-swaggo gen ./...\` to your build step and validate specs on every push.

**Is it production-ready?**
Yes. open-swaggo is used in production by teams worldwide. It's MIT-licensed, actively maintained, and covered by comprehensive tests.

**Is it free and open source?**
Absolutely. open-swaggo is MIT-licensed and always will be. Contributions are welcome on GitHub.

GitHub: https://github.com/gopackx/open-swag-go
License: MIT
`;

export async function GET() {
  const pages = source.getPages();

  const out: string[] = [];
  out.push('# OPEN SWAGGO — Full Documentation');
  out.push('');
  out.push(
    '> A Go library to generate OpenAPI 3 / Swagger 2 specifications directly from your source code annotations — no runtime overhead, idiomatic Go, and compatible with any HTTP framework.',
  );
  out.push('');
  out.push(`Site: ${SITE_URL}`);
  out.push('Source: https://github.com/gopackx/open-swag-go');
  out.push('');
  out.push('---');
  out.push('');

  // Landing page first
  out.push('# Landing Page');
  out.push('');
  out.push(`URL: ${SITE_URL}/`);
  out.push('');
  out.push(LANDING_MARKDOWN);
  out.push('');
  out.push('---');
  out.push('');

  // All docs pages
  for (const page of pages) {
    const filePath = await resolveMdxFile(page.slugs);
    if (!filePath) continue;

    let raw: string;
    try {
      raw = await fs.readFile(filePath, 'utf-8');
    } catch {
      continue;
    }

    const content = stripFrontmatter(raw).trim();

    out.push(`# ${page.data.title}`);
    out.push('');
    out.push(`URL: ${SITE_URL}${page.url}`);
    if (page.data.description) {
      out.push('');
      out.push(`> ${page.data.description}`);
    }
    out.push('');
    out.push(content);
    out.push('');
    out.push('---');
    out.push('');
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

async function resolveMdxFile(slugs: readonly string[]): Promise<string | null> {
  const slugPath = slugs.join('/');
  const candidates: string[] = [];
  if (slugs.length === 0) {
    candidates.push(path.join(CONTENT_ROOT, 'index.mdx'));
    candidates.push(path.join(CONTENT_ROOT, 'index.md'));
  } else {
    candidates.push(path.join(CONTENT_ROOT, slugPath + '.mdx'));
    candidates.push(path.join(CONTENT_ROOT, slugPath + '.md'));
    candidates.push(path.join(CONTENT_ROOT, slugPath, 'index.mdx'));
    candidates.push(path.join(CONTENT_ROOT, slugPath, 'index.md'));
  }
  for (const c of candidates) {
    try {
      await fs.access(c);
      return c;
    } catch {
      // try next
    }
  }
  return null;
}

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  // skip the closing "\n---" plus the newline after it
  let after = end + 4;
  if (raw[after] === '\n') after += 1;
  return raw.slice(after);
}
