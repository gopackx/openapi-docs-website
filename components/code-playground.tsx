'use client';

import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

interface CodePlaygroundProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

interface TabbedCodeProps {
  files: Array<{ filename: string; code: string; language?: string }>;
}

export function CodePlayground({
  code,
  language = 'go',
  filename,
  showLineNumbers,
}: CodePlaygroundProps) {
  return (
    <div className="not-prose">
      {filename && (
        <div className="rounded-t-lg border border-b-0 border-fd-border bg-fd-secondary px-4 py-2 text-sm font-medium text-fd-foreground">
          {filename}
        </div>
      )}
      <CodeBlock className={filename ? '[&>figure]:rounded-t-none' : ''}>
        <Pre
          className={showLineNumbers ? '[counter-set:line]' : ''}
          data-lang={language}
        >
          <code>{code}</code>
        </Pre>
      </CodeBlock>
    </div>
  );
}

export function TabbedCode({ files }: TabbedCodeProps) {
  if (files.length === 0) return null;

  return (
    <div className="not-prose">
      <Tabs items={files.map((f) => f.filename)}>
        {files.map((file) => (
          <Tab key={file.filename} value={file.filename}>
            <CodeBlock>
              <Pre data-lang={file.language ?? 'go'}>
                <code>{file.code}</code>
              </Pre>
            </CodeBlock>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
