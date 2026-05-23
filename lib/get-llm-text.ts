import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import { SKIP, visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { InferPageType } from 'fumadocs-core/source';
import type { source } from '@/lib/source';

const SITE_URL = 'https://open-swaggo.andrianprasetya.com';

/**
 * Flatten MDX-specific nodes into plain markdown so the output is clean for
 * LLM consumption:
 *   - drop `import`/`export` statements (`mdxjsEsm`)
 *   - drop expressions / JSX comments (`{/* ... *\/}`)
 *   - unwrap every JSX element (`<Tabs>`, `<Tab>`, `<Cards>`, `<Card>`, ...),
 *     keeping its children so the inner markdown/code survives.
 */
function remarkFlattenMdx() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      if (
        node.type === 'mdxjsEsm' ||
        node.type === 'mdxFlowExpression' ||
        node.type === 'mdxTextExpression'
      ) {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }

      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        // Replace the JSX element with its children (unwrap the tag).
        parent.children.splice(index, 1, ...node.children);
        return [SKIP, index];
      }
    });
  };
}

const processor = remark().use(remarkMdx).use(remarkGfm).use(remarkFlattenMdx);

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith('---')) return raw;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return raw;
  let after = end + 4;
  if (raw[after] === '\n') after += 1;
  return raw.slice(after);
}

/**
 * Convert a docs page into clean markdown for `llms-full.txt` and the per-page
 * `.mdx` endpoints, using fumadocs' MDX processing pipeline.
 */
export async function getLLMText(
  page: InferPageType<typeof source>,
): Promise<string> {
  const processed = await processor.process({
    path: page.data._file.absolutePath,
    value: stripFrontmatter(page.data.content),
  });

  const header = [
    `# ${page.data.title}`,
    `URL: ${SITE_URL}${page.url}`,
    page.data.description ? `\n> ${page.data.description}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  return `${header}\n\n${String(processed.value).trim()}\n`;
}
