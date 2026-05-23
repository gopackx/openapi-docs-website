import { source } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

export const revalidate = false;

const SITE_URL = 'https://open-swaggo.andrianprasetya.com';

const LANDING_MARKDOWN = `## Generate OpenAPI specs from Go structs & tags.

open-swaggo derives docs from your Go struct values and standard struct tags (json, validate, example) at build time — zero runtime overhead, idiomatic Go, every major framework supported.

### Features

- **5 Framework Adapters** — First-class support for Chi, Gin, Echo, Fiber, and net/http. Mount docs with a single line of code.
- **Auth Playground** — Test Bearer, Basic, API Key, Cookie, and OAuth2 flows directly in the docs UI.
- **Try-It Console** — Send live API requests with environment management, request history, and auto-generated code snippets.
- **Schema Generation** — Derive OpenAPI schemas from Go structs using standard tags — json, validate, example, and more.
- **Version Diffing** — Compare spec versions, detect breaking changes, and generate migration guides automatically.
- **Theming & Scalar UI** — Predefined themes, dark mode, and custom CSS via Scalar integration for beautiful output.
- **Code Snippets** — Generate ready-to-use code in curl, JavaScript, Go, and Python for every endpoint.
- **Docs Auth** — Protect your documentation with basic auth or API key gates for staging environments.
- **Smart Examples** — Auto-generated request and response examples derived from struct tags and validation rules.

### Live Demo

From Go structs to OpenAPI in seconds. Declare \`openswag.Endpoint\` values with struct tags on the left, get a complete spec on the right.

### How It Works (three steps to production-ready docs)

1. **Define** — Declare \`openswag.Endpoint\` values co-located with your handlers; schemas are derived from your Go struct tags.
2. **Register** — Build a \`*Docs\` with \`openswag.New(config)\` and add endpoints with \`docs.Add\` / \`docs.AddAll\`.
3. **Mount** — Serve the interactive Scalar UI and OpenAPI spec with \`docs.Mount(mux, "/docs")\` (or a framework adapter).

### Quick Install

\`\`\`bash
# Add the library
go get github.com/gopackx/open-swag-go

# Add a framework adapter (optional)
go get github.com/gopackx/open-swag-go/adapters/gin
\`\`\`

### Supported Frameworks

Gin, Echo, Fiber, Chi, net/http.

### FAQ

**How does open-swaggo differ from swaggo/swag?**
open-swaggo supports OpenAPI 3.x natively and uses co-located struct definitions instead of comment annotations, with pluggable framework adapters and a built-in Scalar UI. It's a modern rethink built for today's Go ecosystem.

**Which Go frameworks are supported?**
Gin, Echo, Fiber, Chi, and net/http are supported out of the box. The adapter system is pluggable, so adding a new framework takes minimal effort.

**Can I use it in my CI/CD pipeline?**
Absolutely. You can call \`docs.SpecJSON()\` to export the OpenAPI spec as JSON in a small Go program and validate it on every push.

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

  // All docs pages — rendered to clean markdown via the fumadocs MDX pipeline.
  const rendered = await Promise.all(pages.map((page) => getLLMText(page)));
  for (const md of rendered) {
    out.push(md.trim());
    out.push('');
    out.push('---');
    out.push('');
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
