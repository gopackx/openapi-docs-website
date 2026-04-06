# Open Swag Go — Documentation Website

Documentation website for the [open-swag-go](https://github.com/example/open-swag-go) package, built with [Fumadocs](https://fumadocs.dev), Next.js 15, and Tailwind CSS v4.

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSG)
- **Docs Framework:** Fumadocs v15
- **Content:** MDX
- **Styling:** Tailwind CSS v4
- **Package Manager:** Bun
- **Testing:** Vitest + React Testing Library + fast-check

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) 1.0+

### Install

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
```

### Serve Production Build

```bash
bun run start
```

### Run Tests

```bash
bun run test
```

## Project Structure

```
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout with DocsLayout + VersionSwitcher
│   ├── [[...slug]]/        # Dynamic MDX page renderer
│   └── api/search/         # Fumadocs search API
├── components/             # Custom React components
│   ├── code-playground.tsx  # Code blocks with tabs & filename headers
│   ├── before-after.tsx     # Side-by-side code comparison
│   ├── framework-tabs.tsx   # Chi/Gin/Echo/Fiber/net-http tabs
│   ├── version-switcher.tsx # Version dropdown
│   ├── api-signature.tsx    # Go function signature display
│   └── comparison-table.tsx # Feature comparison table
├── content/docs/           # MDX documentation content
│   ├── getting-started/    # Installation & quick start
│   ├── features/           # Feature documentation (10 pages)
│   ├── adapters/           # Framework adapter guides (5 + overview)
│   ├── api-reference/      # API reference (6 pages)
│   ├── examples/           # Real-world examples (5 pages)
│   └── guides/             # Best practices, CI/CD, TypeScript types
├── lib/source.ts           # Fumadocs content source config
├── __tests__/              # Vitest tests
│   ├── components/         # Unit tests for custom components
│   └── properties/         # Property-based tests (fast-check)
└── versions.json           # Version switcher config
```

## Documentation Sections

| Section | Pages | Description |
|---------|-------|-------------|
| Getting Started | 2 | Installation and quick start guide |
| Features | 10 | Endpoints, auth, try-it console, theming, etc. |
| Adapters | 6 | Chi, Gin, Echo, Fiber, net/http + overview |
| API Reference | 6 | Core, auth, tryit, versioning, schema, examples |
| Examples | 5 | Basic CRUD to multi-tenant SaaS |
| Guides | 5 | Best practices, CI/CD, TypeScript types, migration |
| Standalone | 3 | FAQ, Troubleshooting, Contributing |

## TypeScript Type Generation

Generate types from your running Go API:

```bash
bun add -d openapi-typescript
```

```json
{
  "scripts": {
    "generate:api-schema": "bunx openapi-typescript http://localhost:3434/docs/json -o ./app/types/api-schema.ts"
  }
}
```

```bash
bun run generate:api-schema
```

See the [TypeScript Types guide](/guides/typescript-types) for full details including openapi-fetch and orval.

## License

[MIT](LICENSE)
