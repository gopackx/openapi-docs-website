'use client';

import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

interface BeforeAfterProps {
  before: { title?: string; code: string; language?: string };
  after: { title?: string; code: string; language?: string };
}

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <div className="rounded-t-lg border border-b-0 border-fd-border bg-fd-secondary px-4 py-2 text-sm font-medium text-fd-foreground">
          {before.title ?? 'Before'}
        </div>
        <CodeBlock className="[&>figure]:rounded-t-none">
          <Pre data-lang={before.language ?? 'go'}>
            <code>{before.code}</code>
          </Pre>
        </CodeBlock>
      </div>
      <div>
        <div className="rounded-t-lg border border-b-0 border-fd-border bg-fd-secondary px-4 py-2 text-sm font-medium text-fd-foreground">
          {after.title ?? 'After'}
        </div>
        <CodeBlock className="[&>figure]:rounded-t-none">
          <Pre data-lang={after.language ?? 'go'}>
            <code>{after.code}</code>
          </Pre>
        </CodeBlock>
      </div>
    </div>
  );
}
